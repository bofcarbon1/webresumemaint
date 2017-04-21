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
import {Project} from '../project/project';
import {WRService} from '../webresumemaint.service';
import { appRoutes } from '../routes';

function validateYear(yearControl) {
  if (!(yearControl.value < 2007 || yearControl.value > 2018)) {
    return null;
  } else {
    return { 'invalidYear': true };
  }
}

@Directive({
  selector: '[year-input]',
  providers: [{ provide: Validators, useValue: validateYear, multi: true }]
})
class YearValidator {}

@Component({
  selector: 'proj-upd',
  templateUrl: '../project/update.project.html',
  styles: [
    `input.ng-touched.ng-invalid {
      border: 1px solid red;
    }`
  ]
})

export class UpdProject {
  public events: any[] = []; // use later to display form changes
  project: Project; //object for Project model
  myProject: Project; //same but for observable usage
  projectID: string;  // store the selected project ID
  myProjectID: string // same but for stupid subscribe params now
  public submitted: boolean = false; //keep track of form submission
  updProjForm: FormGroup;
  errorMessage: string; //store the form error msg
  successMessage: string; //store the form success msg
  addResult: string;  // store the result of the add project API call 
  updResult: string; //store the result of the upd project API call
  myAddResult: string; // same but for observable usage
  myUpdResult: string // same but for observable usage
  public projectName: string;
  public projectYear: string;
  public projectNote: string;
  public projectType: string;
  public projectPreselect: string;
  types: string[] = [
    'web',
    'database',
    'service'
  ];
  private subscription: Subscription;
  param: string;
  
  constructor(private wrservice : WRService, 
    private fb: FormBuilder, 
    private route: ActivatedRoute
    ) {
    this.updProjForm = this.fb.group({
      'name': ['', Validators.required],
      'year': ['', validateYear],
      'note': ['', Validators.required],
      'type': ['web']
    });
  }
  
  ngOnInit() {
    this.projectID = "0";
    //Get project details and bind to form for update
    this.route.params.subscribe(params => {
      this.projectID = params['id'];
    });

    if (parseInt(this.projectID) > 0) {
      this.getProjectByID();
    }
    else {
      //Set project details and bind to form for add
      this.projectPreselect = 'web';
      this.updProjForm = this.fb.group({
        'name': ['', Validators.required],
        'year': ['', validateYear],
        'note': ['', Validators.required],
        'type': ['web']
      });
    }
  }

  ngOnDestroy(){
    //this.subscription.unsubscribe(); 
  }
  
  private getProjectByID(): void {
    this.wrservice
      .GetProject(this.projectID)
      .subscribe(data => this.myProject = data,
        error => console.log(error),
        () => {
          this.project = this.myProject;
          var projectString = JSON.stringify(this.myProject);
          var projectParsed = JSON.parse(projectString);
          this.projectName = projectParsed.name;
          this.projectYear = projectParsed.year;
          this.projectNote = projectParsed.note;
          this.projectType = projectParsed.type;
          this.projectPreselect = this.projectType;
          this.updProjForm = this.fb.group({
            'name': [this.projectName, Validators.required],
            'year': [this.projectYear, validateYear],
            'note': [this.projectNote, Validators.required]
            //'type': [this.projectType]
            });
          }
      );
  }
  
  updProject() {
    let model;
    this.submitted = true;
    model = this.updProjForm.value;
    //We created a Work around using the 'change' event on the form
    //with each project control. We save the changes that way now.
    //We now have to check to see if we have a changed value and override
    //whatever value we have coming from the form during an update
    //We should not have to do this if we have two way binding 
    //Next to do is to remove the need save each change on the form
    model.name = this.projectName;
    model.year = this.projectYear;
    model.note = this.projectNote;
    model.type = this.projectType;
    let proj = new Project();
    Object.assign(proj, model);
    //We use our service for data requests not the collection
    //If we have have a value in a project id then we call our update project
    //otherwise we call our add project 
    if (parseInt(this.projectID) > 0) {
      //Call the project update service
      this.wrservice
        .UpdProject(this.projectID, proj)
        .subscribe(data => this.myUpdResult = data,
          error => console.log(error),
          () => {
            this.updResult = this.myUpdResult;
          }
        );
      this.successMessage = `Project ${model.name} update was successful`;
    }
    else {
      //Call the add project service 
      this.wrservice
        .AddProject(proj)
        .subscribe(data => this.myAddResult = data,
          error => console.log(error),
          () => {
            this.addResult = this.myAddResult;
          }
        );
      this.successMessage = `Project ${model.name} creation was successful`;
    }
    
  }
  
  //Workaround to be removed with up to date form
  modifiedName (namevalue) {
    this.projectName = namevalue;
  }
  
  //Workaround to be removed with up to date form
  modifiedYear (yearvalue) {
    this.projectYear = yearvalue;
  }
  
  //Workaround to be removed with up to date form
  modifiedNote (notevalue) {
    this.projectNote = notevalue;
  }
  
  //Workaround to be removed with up to date form
  modifiedType (typevalue) {
    this.projectType = typevalue;
  }


}
