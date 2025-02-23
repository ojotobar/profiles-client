import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FaqsComponent } from './faqs/faqs.component';

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
        path: '**', 
        component: PageNotFoundComponent
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    }
];
