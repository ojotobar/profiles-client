import { Routes } from '@angular/router';
import { ProjectManagementComponent } from './components/projects/project-management/project-management.component';
import { EditProjectComponent } from './components/projects/edit-project/edit-project.component';
import { AddProjectComponent } from './components/projects/add-project/add-project.component';
import { AccountConfirmationComponent } from './components/account/account-confirmation/account-confirmation.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { ResetPasswordComponent } from './components/account/reset-password/reset-password.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './components/admin/user-dashboard/user-dashboard.component';
import { ApiHomeComponent } from './components/apis/api-home/api-home.component';
import { AddCertiticationComponent } from './components/certifications/add-certitication/add-certitication.component';
import { CertiticationManagementComponent } from './components/certifications/certitication-management/certitication-management.component';
import { EditCertiticationComponent } from './components/certifications/edit-certitication/edit-certitication.component';
import { AboutComponent } from './components/common/about/about.component';
import { ContactComponent } from './components/common/contact/contact.component';
import { DocsComponent } from './components/common/docs/docs.component';
import { FaqsComponent } from './components/common/faqs/faqs.component';
import { HomeComponent } from './components/common/home/home.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { NotauthorizedComponent } from './components/common/notauthorized/notauthorized.component';
import { TermsAndConditionsComponent } from './components/common/terms-and-conditions/terms-and-conditions.component';
import { AddEducationComponent } from './components/education/add-education/add-education.component';
import { EditEducationComponent } from './components/education/edit-education/edit-education.component';
import { EducationManagementComponent } from './components/education/education-management/education-management.component';
import { AddExperienceComponent } from './components/experience/add-experience/add-experience.component';
import { EditExperienceComponent } from './components/experience/edit-experience/edit-experience.component';
import { ExperienceManagementComponent } from './components/experience/experience-management/experience-management.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';
import { unauthGuard } from './guards/unauth.guard';
import { CareerSummaryComponent } from './components/career-summary/career-summary/career-summary.component';
import { AddCareerSummaryComponent } from './components/career-summary/add-career-summary/add-career-summary.component';
import { EditCareerSummaryComponent } from './components/career-summary/edit-career-summary/edit-career-summary.component';
import { SkillComponent } from './components/skill/skill/skill.component';
import { AddSkillComponent } from './components/skill/add-skill/add-skill.component';
import { EditSkillComponent } from './components/skill/edit-skill/edit-skill.component';
import { ForgotPasswordComponent } from './components/account/forgot-password/forgot-password.component';
import { PrivacyPolicyComponent } from './components/common/privacy-policy/privacy-policy.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'faqs',
        component: FaqsComponent
    },
    {
        path: 'unauthorized',
        component: NotauthorizedComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'pro-dashboard',
        component: UserDashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard]
    },
    {
        path: 'account/login',
        component: LoginComponent,
        canActivate: [unauthGuard]
    },
    {
        path: 'account/register',
        component: RegisterComponent,
        canActivate: [unauthGuard]
    },
    {
        path: 'account/reset-password',
        component: ResetPasswordComponent,
        canActivate: [unauthGuard]
    },
    {
        path: 'account/confirm',
        component: AccountConfirmationComponent,
        canActivate: [unauthGuard]
    },
    {
        path: 'account/change-reset-password/:email',
        component: ForgotPasswordComponent,
        canActivate: [unauthGuard]
    },
    {
        path: 'docs/v1',
        component: DocsComponent,
        //canActivate: [authGuard]
    },
    {
        path: 'docs/apis',
        component: ApiHomeComponent,
        //canActivate: [authGuard]
    },
    {
        path: 'educations',
        component: EducationManagementComponent,
        canActivate: [authGuard]
    },
    {
        path: 'education/add',
        component: AddEducationComponent,
        canActivate: [authGuard]
    },
    {
        path: 'education/:id',
        component: EditEducationComponent,
        canActivate: [authGuard]
    },
    {
        path: 'experiences',
        component: ExperienceManagementComponent,
        canActivate: [authGuard]
    },
    {
        path: 'experience/add',
        component: AddExperienceComponent,
        canActivate: [authGuard]
    },
    {
        path: 'experience/:id',
        component: EditExperienceComponent,
        canActivate: [authGuard]
    },
    {
        path: 'certification/add',
        component: AddCertiticationComponent,
        canActivate: [authGuard]
    },
    {
        path: 'certification/:id',
        component: EditCertiticationComponent,
        canActivate: [authGuard]
    },
    {
        path: 'certifications',
        component: CertiticationManagementComponent,
        canActivate: [authGuard]
    },
    {
        path: 'project/add',
        component: AddProjectComponent,
        canActivate: [authGuard]
    },
    {
        path: 'project/:id',
        component: EditProjectComponent,
        canActivate: [authGuard]
    },
    {
        path: 'projects',
        component: ProjectManagementComponent,
        canActivate: [authGuard]
    },
    {
        path: 'career-summary',
        component: CareerSummaryComponent,
        canActivate: [authGuard]
    },
    {
        path: 'career-summary/add',
        component: AddCareerSummaryComponent,
        canActivate: [authGuard]
    },
    {
        path: 'career-summary/:id',
        component: EditCareerSummaryComponent,
        canActivate: [authGuard]
    },
    {
        path: 'skills',
        component: SkillComponent,
        canActivate: [authGuard]
    },
    {
        path: 'skill/add',
        component: AddSkillComponent,
        canActivate: [authGuard]
    },
    {
        path: 'skill/:id',
        component: EditSkillComponent,
        canActivate: [authGuard]
    },
    {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
    },
    {
        path: '**', 
        component: NotFoundComponent
    }
];
