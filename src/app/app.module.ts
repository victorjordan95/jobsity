import { SharedModule } from './shared/shared.module';
import {CalendarComponent} from 'ap-angular2-fullcalendar/src/calendar/calendar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { FirebaseConfig } from './../environments/firebase.config';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxMaskModule} from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrderModule } from 'ngx-order-pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SearchComponent } from './layout/header/search/search.component';
import { NavigationTriggerComponent } from './layout/header/navigation-trigger/navigation-trigger.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { CriarEventoComponent } from './pages/agendamento/criar-evento/criar-evento.component';
import { ToastrModule } from 'ngx-toastr';
import { LoaderComponent } from './layout/loader/loader.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    SearchComponent,
    NavigationTriggerComponent,
    AgendamentoComponent,
    CalendarComponent,
    CriarEventoComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    PerfectScrollbarModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      progressBar: true,
      tapToDismiss: true,
      closeButton: true
    }),
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
    NgSelectModule,
    OrderModule,
    NgxChartsModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
