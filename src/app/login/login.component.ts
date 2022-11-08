import { Component, OnInit } from '@angular/core';
import { OpenLigaDbService } from '../open-liga-db.service';
import { User } from '../open-liga-db-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  UserEmail: string = '';
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

  async checkMail() {
    for(const user of this.Users){
      if(user.nutzerEmail === this.UserEmail ){
        this.UserLoggedIn = true; 
        alert('Du bist eingeloggt!');
        localStorage.setItem('user', this.UserEmail);
      }  
    }
    if (this.UserLoggedIn == false) {
      alert('Bitte gib eine korrekte Email ein!')
      localStorage.setItem('user', this.UserEmail);
    }
  }
}
