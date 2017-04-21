import {Component,  OnInit} from '@angular/core';
import { Http, 
  Response, 
  RequestOptions, 
  HttpModule, 
  Headers } from '@angular/http';
import { RouterModule } from '@angular/router';
import {WRService} from '../webresumemaint.service';
import {Project} from '../project/project';
import { appRoutes } from '../routes';

@Component({
  selector: 'projectHome',
  templateUrl: './projectHome.html'
})

export class ProjectHome implements OnInit {
  allprojects:string;
  public myProjects:string;
  selectedProject: Project;
  
  constructor(public wrservice : WRService) {}
  
  ngOnInit() {
    this.getProjects();
  }
  
  private getProjects(): void {
    this.wrservice
      .GetProjects()
      .subscribe(data => this.myProjects = data,
        error => console.log(error),
        () => {
          this.allprojects = this.myProjects;
          }
      );
  }
  
  selectProject(project: Project){
    this.selectedProject = project;
  }
  
}