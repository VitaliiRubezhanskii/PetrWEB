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
import { BankComponent } from './admin/admin-office/admin-cabinet/bank/bank.component';
import {CooperationComponent} from './admin/admin-office/admin-cabinet/cooperation/cooperation.component';
import {NotificationComponent} from './admin/admin-office/admin-cabinet/notification/notification.component';
import { SurveyComponent } from './user/survey/survey.component';
import { ScoringComponent } from './user/scoring/scoring.component';
import {CooperationMessageService} from './_services/cooperation-message.service';
import {UserMessageService} from './_services/user-message.service';
import {UploadFileService} from './_services/uploadFile.service';
import {AddQuestionModalComponent} from './questionary/add-question-modal/add-question-modal.component';
import {QuestionnaireService} from './_services/questionnaire.service';
import {QuestionService} from './_services/question.service';
import {DialogsService} from './_services/dialogs.service';
import {AnswerComponent} from './questionary/answer/answer.component';
import {CreateComponent} from './questionary/create/create.component';
import {ManageComponent} from './questionary/manage/manage.component';
import {ManageQuestionnaireComponent} from './questionary/manage-questionnaire/manage-questionnaire.component';
import {QuestionTypeComponent} from './questionary/question-type/question-type.component';
import {ResponseDetailsComponent} from './questionary/response-details/response-details.component';
import {ConfirmDialog} from './shared/confirm-dialog.component';

import {
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatRadioModule,
  MatTabsModule,
  MatSnackBarModule,
  MatNativeDateModule,
  MatProgressSpinnerModule
} from '@angular/material';
import {FilterPipe} from './shared/filter.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ResponseComponent} from './questionary/response/response.component';
import {ResponseService} from './_services/response.service';
import {SurveyService} from './_services/survey.service';

@NgModule({
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      MatIconModule,
      MatListModule,
      MatInputModule,
      MatButtonModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatRadioModule,
      MatTabsModule,
      MatSnackBarModule,
      MatFormFieldModule,
      MatNativeDateModule,
      MatProgressSpinnerModule,
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
      ScoringComponent,
      AddQuestionModalComponent,
      AnswerComponent,
      CreateComponent,
      ManageComponent,
      ManageQuestionnaireComponent,
      QuestionTypeComponent,
      ResponseDetailsComponent,
      ResponseComponent,
      ConfirmDialog,
      FilterPipe
    ],
    providers: [
        AuthGuard,
        BsModalService,
        AlertService,
        AuthenticationService,
        JwtHelperService,
        UserService,
        PagerService,
      UploadFileService,
      CooperationMessageService,
      BankService,
      UserMessageService,
        fakeBackendProvider,
      QuestionnaireService,
      QuestionService,
      ResponseService,
      DialogsService,
      SurveyService
    ],
    bootstrap: [AppComponent],
  entryComponents: [ModalBackdropComponent, ModalContainerComponent, AddQuestionModalComponent, ConfirmDialog]
})

export class AppModule { }
