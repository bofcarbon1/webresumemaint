import {Component,  OnInit} from '@angular/core';
import { Http, 
  Response, 
  RequestOptions, 
  HttpModule, 
  Headers } from '@angular/http';
import { RouterModule } from '@angular/router';
import {WRService} from '../webresumemaint.service';
import {Skill} from '../skill/skill';
import { appRoutes } from '../routes';

@Component({
  selector: 'skillHome',
  templateUrl: './skillHome.html'
})

export class SkillHome implements OnInit {
  allskills:string;
  public mySkills:string;
  selectedSkill: Skill;
  
  constructor(public wrservice : WRService) {}
  
  ngOnInit() {
    this.getAllSkills();
  }
  
  private getAllSkills(): void {
    this.wrservice
      .GetAllSkills()
      .subscribe(data => this.mySkills = data,
        error => console.log(error),
        () => {
          this.allskills = this.mySkills;
          console.log("this.allskills: ", this.allskills)
          }
      );
  }
  
  selectSkill(skill: Skill){
    this.selectedSkill = skill;
  }
  
}