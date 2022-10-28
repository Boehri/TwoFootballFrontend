import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ShowTableComponent } from './show-table/show-table.component';
import { FormsModule } from '@angular/forms';
import { MaterialNavbarComponent } from './material-navbar/material-navbar.component';

@NgModule({
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule

   ],
   declarations: [
      AppComponent,
      SidebarComponent,
      ShowTableComponent,
      MaterialNavbarComponent
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
