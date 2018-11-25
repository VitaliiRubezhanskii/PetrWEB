import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './user/user.component';
import {UserGuard} from './_guards/user.guard';

const appRoutes: Routes = [
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'user', component: UserComponent, canActivate: [UserGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
