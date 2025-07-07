import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdmindashboardComponent } from './admin/components/admindashboard/admindashboard.component';
import { ContractordashboardComponent } from './contractor/components/contractordashboard/contractordashboard.component';
import { UserdashboardComponent } from './users/components/userdashboard/userdashboard.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';

export const routes: Routes = [

    {
        path: "",
        component: HomeComponent
    },

    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: 'admindashboard',
        component: AdmindashboardComponent,
    },
    {
        path: 'contractordashboard',
        component: ContractordashboardComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'userdashboard',
        component: UserdashboardComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'myprofile',
        component: MyprofileComponent
    }

];
