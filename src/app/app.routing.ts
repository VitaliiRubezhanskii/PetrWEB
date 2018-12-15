import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards';
import {OrgstructureComponent} from './admin/orgstructure/orgstructure.component';
import {UserComponent} from './user/user.component';
import {HomeComponent} from './home';
import {NetworkStatisticsComponent} from './admin/network-statistics/network-statistics.component';
import {BankComponent} from './admin/admin-office/admin-cabinet/bank/bank.component';
import {NotificationComponent} from './admin/admin-office/admin-cabinet/notification/notification.component';
import {CooperationComponent} from './admin/admin-office/admin-cabinet/cooperation/cooperation.component';
import {SurveyComponent} from './user/survey/survey.component';
import {ScoringComponent} from './user/scoring/scoring.component';
import {CreateComponent} from './questionary/create/create.component';
import {ManageComponent} from './questionary/manage/manage.component';
import {ManageQuestionnaireComponent} from './questionary/manage-questionnaire/manage-questionnaire.component';
import {ResponseComponent} from './questionary/response/response.component';
import {ResponseDetailsComponent} from './questionary/response-details/response-details.component';
import {AnswerComponent} from './questionary/answer/answer.component';


const appRoutes: Routes = [
    {
      path: '',
      canActivate: [AuthGuard],
      children: [
        {
          path: '',
          component: HomeComponent,
          data: {}
        },
        { path: 'create', component: CreateComponent },
        { path: 'manage', component: ManageComponent },
        { path: 'manage/:id', component: ManageQuestionnaireComponent },
        { path: 'responses', component: ResponseComponent  },
        { path: 'response/:id', component: ResponseDetailsComponent },
        { path: 'answer/:id', component: AnswerComponent },
        {
          path: 'admin',
          canActivateChild: [AuthGuard],
          children: [
            {
            path: 'structure',
            component: OrgstructureComponent,
            data: {
                  allowedRoles: ['ROLE_ADMIN']
                }
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
              canActivateChild: [AuthGuard],
              children: [
                {
                  path: 'banks',
                  component: BankComponent,
                data: {
                  allowedRoles: ['ROLE_ADMIN']
                }
              },
                {
                  path: 'requests',
                  component: CooperationComponent,
                  data: {
                    allowedRoles: ['ROLE_ADMIN']
                  }
                },
                {
                  path: 'messages',
                  component: NotificationComponent,
                  data: {
                    allowedRoles: ['ROLE_ADMIN']
                  }
                },
              ]
            }
          ]
        },
        {
          path: 'user',
          canActivateChild: [AuthGuard],
          children: [
            {
            path: 'survey',
            component: SurveyComponent,
            data: {
              allowedRoles: ['ROLE_USER']
            }
          },
            {
              path: 'scoring',
              component: ScoringComponent,
              data: {
                allowedRoles: ['ROLE_USER']
              }
            }
          ]
        },
        {
          path: '**', redirectTo: ''
        },
      ]}];
export const routing = RouterModule.forRoot(appRoutes);
