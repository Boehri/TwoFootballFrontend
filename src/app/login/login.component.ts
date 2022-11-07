import { Component, OnInit } from '@angular/core';
import { OpenLigaDbService } from '../open-liga-db.service';
import { User } from '../result';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  UserEmail: String = '';
  Users: User[] = [];
  UserLoggedIn: boolean = false;
  test: number = 1;  

  constructor(private opendbligdbaservice: OpenLigaDbService) {
    this.getUserData();
  }

  ngOnInit(): void {

  }

  public getUserData(): void {
    this.opendbligdbaservice.getUserData().subscribe({
      next: (data) => {
        this.Users = data;
      },
    });
  }

  checkMail() {
    for(const user of this.Users){
      if(this.UserEmail == user.nutzerEmail ){
        this.UserLoggedIn = true;
      }  
    }
  }
}
