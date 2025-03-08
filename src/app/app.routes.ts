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
        canActivate: [authGuard, adminGuard]
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
        component: LoginComponent
    },
    {
        path: 'account/register',
        component: RegisterComponent
    },
    {
        path: 'account/reset-password',
        component: ResetPasswordComponent
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
