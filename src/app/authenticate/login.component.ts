import { 
    Component, 
    Output,
    Input,} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Http, Response, Request, RequestMethod} from '@angular/http';
import { User } from '../authenticate/user';
import { AuthenticationService } from '../authenticate/authentication.service';

@Component({
  selector: 'login-form',
    template : `
  <!-- Display the login form only if the user is not logged in -->
  <div *ngIf="!isAuthenticated">
    <form [formGroup]="loginForm" (ngSubmit)="submitForm(loginForm.value)">
      <div class="form-group" 
        [ngClass]="{'has-error':!loginForm.controls['email'].valid 
        && loginForm.controls['email'].touched}">
        <br>
        <p><strong>Please Login!</strong></p>
        <br>
       <table>
        <tr>
         <td>
          <label>User:&nbsp;&nbsp;</label>
         </td>
         <td>
          <input class="form-control" type="text" placeholder="John@doe.com" 
           style="width: 200px"  [formControl]="loginForm.controls['email']">
         </td>
         <td>
          <label>&nbsp;&nbsp;Password:&nbsp;&nbsp;</label>
         </td>
         <td>
          <input class="form-control" type="password" placeholder="Password" 
           style="width: 200px" [formControl]="loginForm.controls['password']">
         </td>
         <td>
          &nbsp;&nbsp;&nbsp;&nbsp; 
          <button type="submit" class="btn btn-primary" 
          [disabled]="!loginForm.valid">Submit</button>
         </td>
        </tr>
       </table>
        <div *ngIf="loginForm.controls['email'].hasError('required') 
        && loginForm.controls['email'].touched" class="alert alert-danger">You must add an email.
        </div>
        <div *ngIf="loginForm.controls['password'].hasError('required') 
            && loginForm.controls['password'].touched" class="alert alert-danger">You must add a password.
        </div>
      </div>
    </form>
  </div>
  <div *ngIf="isAuthenticated" style=" position:relative;
    float:right;">
   <table>
    <tr>
     <td>
        &nbsp;&nbsp; 
        <p><strong>Welcome {{userName}}!</strong></p>
        &nbsp;&nbsp; 
        <a (click)="logout()" style="color: black">Logout</a>
     </td>
     <td>
      &nbsp;&nbsp;
      <img src="./img/{{imgName}}.jpg" alt=" " 
        style="border: 5px solid black" height="120" width="120">
     </td>
    </tr>
   </table>
  </div>

  `
})
export class LoginComponent {
  
  // Declare our variables loginForm for a reactive form and authenticated boolean
  
  loginForm : FormGroup;
  currentUser: User;
  userName: string;
  imgName: string;
  myUser: User;
  model: any = {};
  @Output()
  isAuthenticated: boolean;
  
  constructor(fb: FormBuilder, public http: Http, 
    private authenticationService: AuthenticationService) {
   
    this.loginForm = fb.group({
      'email' : [null, Validators.required],
      'password': [null, Validators.required],
    })
  }
  
  submitForm(value: any) {
    // Once the form is submitted and we get the users email and password 
    let form = {
      'username' : value.email,
      'password' : value.password
    }
    this.authenticateUser(value);
  } 
  
  // Call the authenticate API to get JWT 
  private authenticateUser(value: any): void {
    
    this.authenticationService.login(value.email, value.password)
      .subscribe(data => this.myUser = data,
        error => console.log(error),
        () => {
          this.currentUser = this.myUser;
          var userString = JSON.stringify(this.myUser);
          var userParsed = JSON.parse(userString);
          this.userName = userParsed.name;
          // if there was a match found a name is returned
          // if there is a name I say you are authenticated 
          if (this.userName) {
                this.isAuthenticated = true;    
            }
            else {
                this.isAuthenticated = false;
            }
          if (this.isAuthenticated == true) {
                // store user jwt token in local storage for access check
                localStorage.setItem('userJWT', userParsed.token);
                // Send the isAuthenticated state to the authenticaiton service
                this.authenticationService.setisAuthenticated(this.isAuthenticated);
            }
          // While we are at let's set the user image 
          this.setimgName();   
          
          }
      );
    
    // We’ll use the reset() method to reset the form. So if a user logs 
    // out they will need to enter their credentials again. If we did not 
    // do this, the previous values would still be displayed.
    this.loginForm.reset();
  }

 // We’ll implement a logout function that removes the jwt and user profile from 
 // localStorage and sets the authenticated boolean to false which will cause 
 // the component to display the login form. We also tell the authentication service
 // to update authentication. 
  logout(){
    localStorage.removeItem('userJWT');
    this.isAuthenticated = false;
    this.authenticationService.setisAuthenticated(this.isAuthenticated);
  }
  
  //Get the correct image source (yep only 2 of us)
  setimgName() {
      if (this.userName == "Brian") {
        this.imgName = "brian";   
      }
      else {
        this.imgName = "projmgr";
      }
  }
  
}
