
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ShowTableComponent } from './show-table/show-table.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {path: 'login', component: LoginComponent},
   {path: 'results', component: ShowTableComponent},
   {path: 'registration', component: RegisterComponent},
   {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot(routes)

   ],
   declarations: [
      AppComponent,
      ShowTableComponent,
      LoginComponent,
      RegisterComponent
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
