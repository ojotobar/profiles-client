import { Routes } from '@angular/router';
import { HomeComponent } from './common/home/home.component';
import { AboutComponent } from './common/about/about.component';
import { ContactComponent } from './common/contact/contact.component';
import { FaqsComponent } from './common/faqs/faqs.component';
import { NotauthorizedComponent } from './common/notauthorized/notauthorized.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

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
        component: DashboardComponent
    },
    {
        path: '**', 
        component: NotFoundComponent
    }
];
