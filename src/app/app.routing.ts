import { Routes, RouterModule }  from '@angular/router';
import { NgModule } from '@angular/core';

import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'blog', component: BlogComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
];

@NgModule({ imports: [RouterModule.forRoot(appRoutes)], exports: [RouterModule] })

export class AppRoutingModule {}
