import { RouterModule, 
  Routes, 
  Router } from '@angular/router';
import { AppComponent } from './app.component';
import { ProjectHome } from './project/projectHome';
import { UpdProject } from './project/update.project';
import { SkillHome } from './skill/skillHome';
import { UpdSkill } from './skill/skill.update';
import { SitelinkHome } from './sitelink/sitelinkHome';
import { UpdSitelink } from './sitelink/sitelink.update';
import { Home } from './home/home';

export const appRoutes: Routes = [
    { path: 'login', component: AppComponent },
    { path: 'home', component: Home },
    { path: 'project-home', component: ProjectHome },
    { path: 'project-home/project-upd', component: UpdProject },
    { path: 'skill-home', component: SkillHome },
    { path: 'skill-home/skill-upd', component: UpdSkill },
    { path: 'sitelink-home', component: SitelinkHome },
    { path: 'sitelink-home/sitelink-upd', component: UpdSitelink }
];
