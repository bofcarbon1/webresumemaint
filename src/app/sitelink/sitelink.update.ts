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
import { Sitelink } from '../sitelink/sitelink';
import { WRService } from '../webresumemaint.service';
import { appRoutes } from '../routes';

@Component({
  selector: 'sitelink-upd',
  templateUrl: '../sitelink/sitelink.update.html',
  styles: [
    `input.ng-touched.ng-invalid {
      border: 1px solid red;
    }`
  ]
})

export class UpdSitelink {
  public events: any[] = []; // use later to display form changes
  sitelink: Sitelink; //object for Sitelink model
  mySitelink: Sitelink; //same but for observable usage
  sitelinkID: string;  // store the selected sitelink ID
  mySitelinkID: string // same but for stupid subscribe params now
  public submitted: boolean = false; //keep track of form submission
  updSitelinkForm: FormGroup;
  errorMessage: string; //store the form error msg
  successMessage: string; //store the form success msg
  addResult: string;  // store the result of the add sitelink API call 
  updResult: string; //store the result of the upd sitelink API call
  myAddResult: string; // same but for observable usage
  myUpdResult: string // same but for observable usage
  public siteName: string;
  public siteLink: string;
  private subscription: Subscription;
  param: string;
  
  constructor(private wrservice : WRService, 
    private fb: FormBuilder, 
    private route: ActivatedRoute
    ) {
    this.updSitelinkForm = this.fb.group({
      'sitename': ['', Validators.required],
      'sitelink': ['', Validators.required]
    });
  }
  
  ngOnInit() {
    this.sitelinkID = "0";
    //Get sitelink details and bind to form for update
    this.route.params.subscribe(params => {
      this.sitelinkID = params['id'];
    });

    if (parseInt(this.sitelinkID) > 0) {
      this.getSitelinkByID();
    }
    else {
      //Set sitelink details and bind to form for add
      this.updSitelinkForm = this.fb.group({
        'sitename': ['', Validators.required],
        'sitelink': ['', Validators.required]
      });
    }
  }

  ngOnDestroy(){
     
  }
  
  private getSitelinkByID(): void {
    this.wrservice
      .GetSitelink(this.sitelinkID)
      .subscribe(data => this.mySitelink = data,
        error => console.log(error),
        () => {
          this.sitelink = this.mySitelink;
          var sitelinkString = JSON.stringify(this.mySitelink);
          var sitelinkParsed = JSON.parse(sitelinkString);
          this.siteName = sitelinkParsed.sitename;
          this.siteLink = sitelinkParsed.sitelink;
          this.updSitelinkForm = this.fb.group({
            'sitename': [this.siteName, Validators.required],
            'sitelink': [this.siteLink, Validators.required],
            });
          }
      );
  }
  
  updSitelink() {
    let model;
    this.submitted = true;
    model = this.updSitelinkForm.value;
    model.sitename = this.siteName;
    model.sitelink = this.siteLink;
    let sitelink = new Sitelink();
    Object.assign(sitelink, model);
    //We use our service for data requests not the collection
    //If we have have a value in a sitelink id then we call our update sitelink
    //otherwise we call our add sitelink 
    if (parseInt(this.sitelinkID) > 0) {
      //Call the sitelink update service
      this.wrservice
        .UpdSitelink(this.sitelinkID, sitelink)
        .subscribe(data => this.myUpdResult = data,
          error => console.log(error),
          () => {
            this.updResult = this.myUpdResult;
          }
        );
      this.successMessage = `Sitelink ${model.sitename} update was successful`;
    }
    else {
      //Call the add sitelink service 
      this.wrservice
        .AddSitelink(sitelink)
        .subscribe(data => this.myAddResult = data,
          error => console.log(error),
          () => {
            this.addResult = this.myAddResult;
          }
        );
      this.successMessage = `Sitelink ${model.sitename} creation was successful`;
    }
    
  }
  
  //Workaround to be removed with up to date form
  modifiedSiteName (sitenamevalue) {
    this.siteName = sitenamevalue;
  }
  
  //Workaround to be removed with up to date form
  modifiedSiteLink (sitelinkvalue ) {
    this.siteLink = sitelinkvalue;
  }


}
