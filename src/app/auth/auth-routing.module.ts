import { NonauthGuard } from './../shared/nonauth.guard';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
    {
        path: 'auth/login',
        component: LoginComponent,
        canActivate: [NonauthGuard]
    },
    {
        path: 'auth/register',
        component: RegisterComponent,
        canActivate: [NonauthGuard]
    },
    {
        path: 'auth/myProfile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    }

]

export const AuthRoutingModule = RouterModule.forChild(routes);