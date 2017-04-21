//Angular 2 Specific
import {Component, Inject} from '@angular/core';
import { Http, 
  Response, 
  RequestOptions, 
  HttpModule, 
  Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import {APP_BASE_HREF, 
  LocationStrategy, 
  HashLocationStrategy} from '@angular/common';
import { AuthenticationService } from '../authenticate/authentication.service';

@Component({
  selector: 'home',
  templateUrl: './home.html'
})

export class Home {
  isAuthenticated: boolean;
  
  constructor( private authenticationService: AuthenticationService) {
   
  }
  
  ngOnInit() {
    this.isAuthenticated = false; 
  }
  
  checkisAuthenticated() {
    this.isAuthenticated = this.authenticationService.getisAuthenticated();
    return this.isAuthenticated;
  }

}