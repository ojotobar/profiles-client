import { Routes } from '@angular/router';
import { HomeComponent } from './common/home/home.component';
import { AboutComponent } from './common/about/about.component';
import { ContactComponent } from './common/contact/contact.component';
import { FaqsComponent } from './common/faqs/faqs.component';
import { NotauthorizedComponent } from './common/notauthorized/notauthorized.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { TermsAndConditionsComponent } from './common/terms-and-conditions/terms-and-conditions.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { UserDashboardComponent } from './admin/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { unauthGuard } from './guards/unauth.guard';
import { AccountConfirmationComponent } from './account/account-confirmation/account-confirmation.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { DocsComponent } from './common/docs/docs.component';
import { ApiHomeComponent } from './apis/api-home/api-home.component';
import { EducationManagementComponent } from './education/education-management/education-management.component';
import { AddEducationComponent } from './education/add-education/add-education.component';
import { EditEducationComponent } from './education/edit-education/edit-education.component';
import { ExperienceManagementComponent } from './experience/experience-management/experience-management.component';
import { AddExperienceComponent } from './experience/add-experience/add-experience.component';
import { EditExperienceComponent } from './experience/edit-experience/edit-experience.component';
import { CertiticationManagementComponent } from './certifications/certitication-management/certitication-management.component';
import { AddCertiticationComponent } from './certifications/add-certitication/add-certitication.component';
import { EditCertiticationComponent } from './certifications/edit-certitication/edit-certitication.component';

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
        path: 'account/change-password',
        component: ChangePasswordComponent,
        canActivate: [authGuard]
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
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent
    },
    {
        path: '**', 
        component: NotFoundComponent
    }
];
