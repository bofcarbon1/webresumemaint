import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,
  ReactiveFormsModule,
  FormBuilder, 
  FormGroup,
  FormControl,
  Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './routes';
import { WRService } from './webresumemaint.service';
import { ProjectHome } from './project/projectHome';
import { UpdProject } from './project/update.project';
import { SkillHome } from './skill/skillHome';
import { UpdSkill } from './skill/skill.update';
import { SitelinkHome } from './sitelink/sitelinkHome';
import { UpdSitelink } from './sitelink/sitelink.update';
import { LoginComponent } from './authenticate/login.component';
import { AuthenticationService } from './authenticate/authentication.service';
import { Home } from './home/home';


@NgModule({
  declarations: [
    AppComponent, ProjectHome, UpdProject, SkillHome, UpdSkill,
    SitelinkHome, UpdSitelink, LoginComponent, Home
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [WRService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
