import {Host, 
  Component, 
  Directive, 
  OnInit, 
  OnDestroy,
  Pipe,
  PipeTransform
} from '@angular/core';
import { FormsModule, 
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Rx";
import { Skill } from '../skill/skill';
import { WRService } from '../webresumemaint.service';
import { appRoutes } from '../routes';

@Component({
  selector: 'skill-upd',
  templateUrl: '../skill/skill.update.html',
  styles: [
    `input.ng-touched.ng-invalid {
      border: 1px solid red;
    }`
  ]
})

export class UpdSkill {
  public events: any[] = []; // use later to display form changes
  skill: Skill; //object for Skill model
  mySkill: Skill; //same but for observable usage
  skillID: string;  // store the selected skill ID
  mySkillID: string // same but for stupid subscribe params now
  public submitted: boolean = false; //keep track of form submission
  updSkillForm: FormGroup;
  errorMessage: string; //store the form error msg
  successMessage: string; //store the form success msg
  addResult: string;  // store the result of the add skill API call 
  updResult: string; //store the result of the upd skill API call
  myAddResult: string; // same but for observable usage
  myUpdResult: string // same but for observable usage
  public skillName: string;
  public skillType: string;
  public skillPreselect: string;
  private subscription: Subscription;
  param: string;
  types: string[] = [
    'web',
    'database',
    'service'
  ];
  
  constructor(private wrservice : WRService, 
    private fb: FormBuilder, 
    private route: ActivatedRoute
    ) {
    this.updSkillForm = this.fb.group({
      'skillname': ['', Validators.required],
      'skilltype': ['web']
    });
  }
  
  ngOnInit() {
    this.skillID = "0";
    //Get skill details and bind to form for update
    this.route.params.subscribe(params => {
      this.skillID = params['id'];
    });

    if (parseInt(this.skillID) > 0) {
      this.getSkillByID();
    }
    else {
      //Set skill details and bind to form for add
      this.skillPreselect = 'web';
      this.updSkillForm = this.fb.group({
        'skillname': ['', Validators.required],
        'skilltype': ['web']
      });
    }
  }

  ngOnDestroy(){
     
  }
  
  private getSkillByID(): void {
    this.wrservice
      .GetSkill(this.skillID)
      .subscribe(data => this.mySkill = data,
        error => console.log(error),
        () => {
          this.skill = this.mySkill;
          var skillString = JSON.stringify(this.mySkill);
          var skillParsed = JSON.parse(skillString);
          this.skillName = skillParsed.skillname;
          this.skillType = skillParsed.skilltype;
          this.skillPreselect = this.skillType;
          this.updSkillForm = this.fb.group({
            'skillname': [this.skillName, Validators.required]
            });
          }
      );
  }
  
  updSkill() {
    let model;
    this.submitted = true;
    model = this.updSkillForm.value;
    //We created a Work around using the 'change' event on the form
    //with each skill control. We save the changes that way now.
    //We now have to check to see if we have a changed value and override
    //whatever value we have coming from the form during an update
    //We should not have to do this if we have two way binding 
    //Next to do is to remove the need save each change on the form
    model.skillname = this.skillName;
    model.skilltype = this.skillType;
    let skill = new Skill();
    Object.assign(skill, model);
    //We use our service for data requests not the collection
    //If we have have a value in a skill id then we call our update skill
    //otherwise we call our add skill 
    if (parseInt(this.skillID) > 0) {
      //Call the skill update service
      this.wrservice
        .UpdSkill(this.skillID, skill)
        .subscribe(data => this.myUpdResult = data,
          error => console.log(error),
          () => {
            this.updResult = this.myUpdResult;
          }
        );
      this.successMessage = `Skill ${model.skillname} update was successful`;
    }
    else {
      //Call the add skill service 
      this.wrservice
        .AddSkill(skill)
        .subscribe(data => this.myAddResult = data,
          error => console.log(error),
          () => {
            this.addResult = this.myAddResult;
          }
        );
      this.successMessage = `Skill ${model.skillname} creation was successful`;
    }
    
  }
  
  //Workaround to be removed with up to date form
  modifiedSkillName (skillnamevalue) {
    this.skillName = skillnamevalue;
  }
  
  //Workaround to be removed with up to date form
  modifiedSkillType (skilltypevalue ) {
    this.skillType = skilltypevalue;
  }


}
