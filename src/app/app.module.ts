import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import {AlertService, AuthenticationService,  UserService} from './_services';
import { HomeComponent } from './home';
import { OrgstructureComponent } from './admin/orgstructure/orgstructure.component';
import { UserComponent } from './user/user.component';
import {BsDatepickerModule, BsDropdownModule, BsModalService, ModalBackdropComponent, PopoverModule} from 'ngx-bootstrap';
import {ModalContainerComponent} from 'ngx-bootstrap/modal';
import { NetworkStatisticsComponent } from './admin/network-statistics/network-statistics.component';
import { AdminOfficeComponent } from './admin/admin-office/admin-office.component';
import {PagerService} from './_services/pager.service';
import {BankService} from './_services/bank.service';
import { BankComponent } from './admin-office/admin-cabinet/bank/bank.component';
import {CooperationComponent} from './admin-office/admin-cabinet/cooperation/cooperation.component';
import {NotificationComponent} from './admin-office/admin-cabinet/notification/notification.component';
import { SurveyComponent } from './user/survey/survey.component';
import { ScoringComponent } from './user/scoring/scoring.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        PopoverModule,
        FormsModule,
        BsDatepickerModule.forRoot(),
        BsDropdownModule,
        JwtModule.forRoot({
          config: {
            throwNoTokenError: false,
            tokenGetter: () => {
              return localStorage.getItem('currentUser');
              },
            whitelistedDomains: ['localhost:4200']
          }
        }),
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        OrgstructureComponent ,
        UserComponent ,
        ModalBackdropComponent,
      ModalContainerComponent,
      NotificationComponent,
      NetworkStatisticsComponent ,
      AdminOfficeComponent ,
      BankComponent ,
      CooperationComponent,
      SurveyComponent,
      ScoringComponent

    ],



    providers: [
        AuthGuard,
        BsModalService,
        AlertService,
        AuthenticationService,
        JwtHelperService,
        UserService,
        PagerService,
      BankService,
        fakeBackendProvider,
      // CustomerResolver
    ],
    bootstrap: [AppComponent],
  entryComponents: [ModalBackdropComponent, ModalContainerComponent]
})

export class AppModule { }
