import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards';
import {OrgstructureComponent} from './admin/orgstructure/orgstructure.component';
import {UserComponent} from './user/user.component';
import {HomeComponent} from './home';
import {NetworkStatisticsComponent} from './admin/network-statistics/network-statistics.component';
import { AdminOfficeComponent } from './admin/admin-office/admin-office.component';
// import {CustomerResolver} from './_services';

const appRoutes: Routes = [
    {
      path: '',
      canActivateChild: [AuthGuard],
      children: [
        {
          path: '',
          component: HomeComponent,
          data: {}
        },
        {
          path: 'admin',
          canActivateChild: [AuthGuard],
          children: [
            {
            path: 'structure',
            component: OrgstructureComponent,
            canActivate: [AuthGuard],
            data: {
                  allowedRoles: ['ROLE_ADMIN']
                }
            // resolve: {
            //       customers: CustomerResolver
            //   }
          },
            {
              path: 'statistics',
              component: NetworkStatisticsComponent,
              data: {
                allowedRoles: ['ROLE_ADMIN']
              }
            },
            {
              path: 'cabinet',
              component: AdminOfficeComponent ,
              data: {
                allowedRoles: ['ROLE_ADMIN']
              }
            },
          ]
        },
        {
          path: 'user',
          component: UserComponent,
          data: {
            allowedRoles: ['ROLE_USER']
          }
        },
        {
          path: '**', redirectTo: ''
        },
]}];

export const routing = RouterModule.forRoot(appRoutes);
