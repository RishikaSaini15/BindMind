import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Router, Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RegisterComponent } from './register/register.component';
import {NotFoundComponent} from './components/error/not-found/not-found.component';
import {UnauthorizedComponent} from './components/error/unauthorized/unauthorized.component';
import {AuthGuard} from './guards/auth.guard';
import {Role} from './models/role';


const routes: Routes =[
  {path: '', redirectTo:'homepage', pathMatch:'full'},
  { path: 'homepage', component: HomepageComponent },
  // {path: '', redirectTo:'login', pathMatch:'full'},
  {
    path: 'home',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }], canActivate: [AuthGuard], data: {roles: [Role.STUDENT, Role.TEACHER]}},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'404', component: NotFoundComponent},
  {path:'401', component: UnauthorizedComponent}


];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/404']);
    }
  }
}
