import { Component, OnInit } from '@angular/core';
import { OpenLigaDbService } from '../open-liga-db.service';
import { Liga, Verein } from '../result';
import { AccountServiceService } from '../services/account-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  Vereine: Verein[] = [];
  Ligen: Liga[] = [];
  selectedTeam = '';
  vereinID: number = 1;
  UserEmail: String = '';
  selectedLeague = '';
  test: String = 'hallo';

  constructor(
    private opendbligdbaservice: OpenLigaDbService,
    private accountservice: AccountServiceService
  ) {
    this.getVereinData();
    this.getLigaData();
  }

  ngOnInit(): void {}

  public getVereinData(): void {
    this.opendbligdbaservice.getVereinData().subscribe({
      next: (data) => {
        this.Vereine = data;
      },
    });
  }
  /*
  getVereinIDBySelectedTeam(selectedTeam: String):void {
      for(let verein of this.Vereine){
        if(selectedTeam === verein.verein){
        this.test = 'in if';
      }
        
      }
    

  }
*/
  public getLigaData(): void {
    this.opendbligdbaservice.getLigaData().subscribe({
      next: (data) => {
        this.Ligen = data;
      },
    });
  }

  storeUserOnDB(): void {
    alert(
      'Du bist registriert mit folgender Email: ' +
        this.UserEmail 
    );
    let user = {
      email: this.UserEmail,
      praefverein: parseInt(this.selectedTeam),
      praefliga: parseInt(this.selectedLeague),
    };
    this.accountservice.addData(user);
  }
  onSubmit() {
    this.storeUserOnDB();
  }
}
