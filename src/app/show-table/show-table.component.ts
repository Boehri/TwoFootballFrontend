import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { OpenLigaDbService } from '../open-liga-db.service';
import { TeaminTable } from '../result';

@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.scss'],
})
export class ShowTableComponent implements OnInit {
  
  table: Array<TeaminTable> = [];
  selectedTable: TeaminTable | null = null;
  public selectedLeague: String = '';
  leagues: String[] = [];


  constructor(private opendbligdbaservive: OpenLigaDbService) {
    this.getLeagues();
    this.getTable();

  }

  ngOnInit(): void {}

  getTable():void{

    this.opendbligdbaservive.getTable().subscribe({
      next:(table)=>{
        this.table=table;
      }
    })

  }

  getTableByLeague(league: String):void{
    this.opendbligdbaservive.getTableByLeague(league).subscribe({
      next:(table)=>{
        this.table=table;
      }
    })
  }
  private getLeagues():void{
    this.leagues = this.opendbligdbaservive.getLeagues();
    if(this.selectedLeague == undefined && this.leagues.length > 0)
    this.selectedLeague=this.leagues[0];
  }

  public onLeagueChange():void{
    this.getTableByLeague(this.selectedLeague);
  }

  select(t: TeaminTable): void {
    this.selectedTable = t;
  }

  setselectedLeague(selectedLeague: String){
    this.selectedLeague=selectedLeague;
    this.getTableByLeague(this.selectedLeague);
  }
  

}
