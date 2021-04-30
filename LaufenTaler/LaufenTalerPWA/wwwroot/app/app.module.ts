import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { IgxIconModule, IgxAvatarModule, IgxButtonModule, IgxListModule, IgxInputGroupModule, IgxSelectModule } from 'igniteui-angular';
import { FormsModule } from '@angular/forms';
import { MyInfoComponent } from './my-info/my-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyInfoComponent
  ],
  imports: [
    BrowserModule,
    HammerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IgxIconModule,
    IgxAvatarModule,
    IgxButtonModule,
    IgxListModule,
    FormsModule,
    IgxInputGroupModule,
    IgxSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
