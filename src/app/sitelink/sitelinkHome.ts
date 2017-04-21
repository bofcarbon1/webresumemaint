import {Component,  OnInit} from '@angular/core';
import { Http, 
  Response, 
  RequestOptions, 
  HttpModule, 
  Headers } from '@angular/http';
import { RouterModule } from '@angular/router';
import {WRService} from '../webresumemaint.service';
import {Sitelink} from '../sitelink/sitelink';
import { appRoutes } from '../routes';

@Component({
  selector: 'sitelinkHome',
  templateUrl: './sitelinkHome.html'
})

export class SitelinkHome implements OnInit {
  sitelinks:string;
  public mySitelinks:string;
  selectedSitelink: Sitelink;
  
  constructor(public wrservice : WRService) {}
  
  ngOnInit() {
    this.getSitelinks();
  }
  
  private getSitelinks(): void {
    this.wrservice
      .GetSiteLinks()
      .subscribe(data => this.mySitelinks = data,
        error => console.log(error),
        () => {
          this.sitelinks = this.mySitelinks;
          }
      );
  }
  
  selectSitelink(sitelink: Sitelink){
    this.selectedSitelink = sitelink;
  }
  
}