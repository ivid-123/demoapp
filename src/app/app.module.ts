import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from './common/common.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationGuard } from './common/authguard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './common/header/header.component';
import { CardOrientation1Component } from './videoTemplates/threeVideoLayout/card-orientation1/card-orientation1.component';
import { CardOrientation2Component } from './videoTemplates/threeVideoLayout/card-orientation2/card-orientation2.component';
import { CardOrientation3Component } from './videoTemplates/threeVideoLayout/card-orientation3/card-orientation3.component';
import { CardOrientation4Component } from './videoTemplates/threeVideoLayout/card-orientation4/card-orientation4.component';
import { SingleCardOrientationComponent } from './videoTemplates/oneVideolayout/single-card-orientation/single-card-orientation.component';
import { TwoCardOrientationComponent } from './videoTemplates/twoVideoLayout/two-card-orientation/two-card-orientation.component';
import { VideosGraphPageComponent } from './videos-graph-page/videos-graph-page.component';
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    HeaderComponent,
    CardOrientation1Component,
    CardOrientation2Component,
    CardOrientation3Component,
    CardOrientation4Component,
    SingleCardOrientationComponent,
    TwoCardOrientationComponent,
    VideosGraphPageComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule
  ],
  providers: [AuthenticationGuard, { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
