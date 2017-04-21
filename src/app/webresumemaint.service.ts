import { Injectable } from '@angular/core';
import { Http, 
    Response, 
    RequestOptions, 
    Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import {Project} from './project/project';
import {Skill} from './skill/skill';
import {Sitelink} from './sitelink/sitelink';

@Injectable()
export class WRService {
    public headers: Headers;
    actionUrlPersonal:string; 
    actionUrlEmail:string;
    actionUrlSiteLinks:string;
    actionUrlServices:string;
    actionUrlProjects:string;
    actionUrlProject:string;
    actionUrlnewProject:string;
    actionUrlupdProject:string;
    actionUrlAllSkills:string;
    actionUrlSkills:string;
    actionUrlSkill:string;
    actionUrlnewSkill:string;
    actionUrlupdSkill:string;
    actionUrlSitelinks:string;
    actionUrlSitelink:string;
    actionUrlnewSitelink:string;
    actionUrlupdSitelink:string;
    skilltype:string;
    projectID:string;
    
    constructor(private http: Http) {
        this.actionUrlPersonal =
            'https://expressapis-bofcarbon1.c9users.io:8082/api/resume/personal';
        this.actionUrlEmail =
            'https://expressapis-bofcarbon1.c9users.io:8082/api/resume/email';
        this.actionUrlSiteLinks =
            'https://expressapis-bofcarbon1.c9users.io:8082/api/resume/sitelinks';
         this.actionUrlSitelink =
            'https://expressapis-bofcarbon1.c9users.io:8082/api/resume/sitelink?sitelinkID=';
        this.actionUrlnewSitelink =
            'https://expressapis-bofcarbon1.c9users.io:8082/api/resume/newSitelink?sitename=';
        this.actionUrlupdSitelink =
            'https://expressapis-bofcarbon1.c9users.io:8082/api/resume/updSitelink?id=';
        this.actionUrlServices =
            'https://expressapis-bofcarbon1.c9users.io:8082/api/resume/services';
        this.actionUrlAllSkills =
            'https://expressapis-bofcarbon1.c9users.io:8082/api/resume/allskills';
        this.actionUrlSkills =
            'https://expressapis-bofcarbon1.c9users.io:8082/api/resume/skills?skilltype=';
        this.actionUrlSkill =
            'https://expressapis-bofcarbon1.c9users.io:8082/api/resume/skill?skillID=';
        this.actionUrlProjects =
            'https://expressapis-bofcarbon1.c9users.io:8082/api/resume/projects';
        this.actionUrlProject =
            'https://expressapis-bofcarbon1.c9users.io:8082/api/resume/project?projectID=';
        this.actionUrlnewProject =
            'https://expressapis-bofcarbon1.c9users.io:8082/api/resume/newProject?name=';
        this.actionUrlupdProject =
            'https://expressapis-bofcarbon1.c9users.io:8082/api/resume/updProject?id=';
        this.actionUrlnewSkill =
            'https://expressapis-bofcarbon1.c9users.io:8082/api/resume/newSkill?skillname=';
        this.actionUrlupdSkill =
            'https://expressapis-bofcarbon1.c9users.io:8082/api/resume/updSkill?id=';
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        let proj = new Project();
    }
    
    public GetPersonal = (): Observable<string> => {
        return this.http.get(this.actionUrlPersonal)
            .map((response: Response) => <string>response.json())
            .catch(this.handleError);
    }
    
    public GetEmail = (): Observable<string> => {
        return this.http.get(this.actionUrlEmail)
            .map((response: Response) => <string>response.json())
            .catch(this.handleError);
    }
    
    public GetSiteLinks = (): Observable<any> => {
        return this.http.get(this.actionUrlSiteLinks)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public GetSitelink = (sitelinkID): Observable<any> => {
        return this.http.get(this.actionUrlSitelink + sitelinkID)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public AddSitelink = (sitelink): Observable<any> => {
        let params = 
        sitelink.sitename + '&sitelink=' + sitelink.sitelink;
        return this.http.get(this.actionUrlnewSitelink + params)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public UpdSitelink = (sitelinkID, sitelink): Observable<any> => {
        let params2 = 
        sitelinkID + '&sitename=' + sitelink.sitename
        + '&sitelink=' + sitelink.sitelink;
        return this.http.get(this.actionUrlupdSitelink + params2)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public GetServices = (): Observable<any> => {
        return this.http.get(this.actionUrlServices)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public GetAllSkills = (): Observable<any> => {
        return this.http.get(this.actionUrlAllSkills)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public GetSkills = (skilltype): Observable<any> => {
        return this.http.get(this.actionUrlSkills + skilltype)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public GetSkill = (skillID): Observable<any> => {
        return this.http.get(this.actionUrlSkill + skillID)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public GetProjects = (): Observable<any> => {
        return this.http.get(this.actionUrlProjects)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public GetProject = (projectID): Observable<any> => {
        return this.http.get(this.actionUrlProject + projectID)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public AddProject = (proj): Observable<any> => {
        let params = 
        proj.name + '&year=' + proj.year + '&note=' + proj.note + '&type=' + proj.type;
        return this.http.get(this.actionUrlnewProject + params)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public UpdProject = (projectID, proj): Observable<any> => {
        let params2 = 
        projectID + '&name=' + proj.name + '&year=' + proj.year + '&note=' + proj.note + '&type=' + proj.type;
        console.log("params2: ", params2);
        return this.http.get(this.actionUrlupdProject + params2)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public AddSkill = (skill): Observable<any> => {
        let params = 
        skill.skillname + '&skilltype=' + skill.skilltype;
        return this.http.get(this.actionUrlnewSkill + params)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    public UpdSkill = (skillID, skill): Observable<any> => {
        console.log("skill: ", skill);
        let params2 = 
        skillID + '&skillname=' + skill.skillname
        + '&skilltype=' + skill.skilltype;
        return this.http.get(this.actionUrlupdSkill + params2)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    //    .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
       
    }
}
