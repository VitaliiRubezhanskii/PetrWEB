import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { HomeComponent } from './home';

import { AdminComponent } from './admin/admin.component'
;
import { UserComponent } from './user/user.component';
import {UserGuard} from './_guards/user.guard';
import {BsDatepickerModule, BsDropdownModule, BsModalService, ModalBackdropComponent, PopoverModule} from 'ngx-bootstrap';
import {ModalContainerComponent} from 'ngx-bootstrap/modal';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        PopoverModule,
        FormsModule,
        BsDatepickerModule.forRoot(),
        BsDropdownModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        AdminComponent ,
        UserComponent ,
        ModalBackdropComponent,
      ModalContainerComponent
    ],
    providers: [
        AuthGuard,
        BsModalService,
        UserGuard,
        AlertService,
        AuthenticationService,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent],
  entryComponents: [ModalBackdropComponent, ModalContainerComponent]
})

export class AppModule { }
