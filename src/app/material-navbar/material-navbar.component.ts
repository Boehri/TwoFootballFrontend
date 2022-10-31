import { Component, OnInit } from '@angular/core';
import { OpenLigaDbService } from '../open-liga-db.service';
import { ShowTableComponent } from '../show-table/show-table.component';

@Component({
  selector: 'app-material-navbar',
  templateUrl: './material-navbar.component.html',
  styleUrls: ['./material-navbar.component.scss'],
})
export class MaterialNavbarComponent implements OnInit {
  
  selectedLeague: String = '';

  constructor( private opendbligaservice: OpenLigaDbService) {

  }

  ngOnInit(): void {}

  onLeagueChange(selectedLeague: String){
    this.opendbligaservice.setselectedLeague(selectedLeague);
  }

}

