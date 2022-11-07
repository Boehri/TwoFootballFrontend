import { Component, OnInit } from '@angular/core';
import { OpenLigaDbService } from '../open-liga-db.service';
import { Verein } from '../result';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  Vereine: Verein[] = []; 
  selectedTeam: String = '';
  vereinID: number | undefined;
  UserEmail: String = '';

  constructor(private opendbligdbaservice: OpenLigaDbService) {
    this.getVereinData();
  }

  ngOnInit(): void {}

  public getVereinData(): void {
    this.opendbligdbaservice.getVereinData().subscribe({
      next: (data) => {
        this.Vereine = data;
      },
    });
  }
  getVereinIDBySelectedTeam(selectedTeam: String){
    for(const verein of this.Vereine){
      if(selectedTeam != verein.verein){
        continue;
      }
      this.vereinID = verein.vereinID; 

    }
  }
}
