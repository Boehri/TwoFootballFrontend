import { group } from '@angular/animations';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { OpenLigaDbService } from '../open-liga-db.service';
import { currentgameday, Match, TeaminTable } from '../result';

@Component({
  selector: 'app-show-table',
  templateUrl: './show-table.component.html',
  styleUrls: ['./show-table.component.scss'],
})
export class ShowTableComponent implements OnInit {
  table: TeaminTable[] = [];
  selectedTable: TeaminTable | null = null;
  public selectedLeague: String = 'bl1';
  leagues: String[] = [];
  gameday: Match[] = [];
  gamedays: number[] = [];
  selectedGameday: number = 1;
  leaguepreference: String = 'bl1';
  teampreference: number = 16;
  allMatchesOfSeason: Match[] = [];
  listOfMatchesFromSelectedTeam: Match[] = [];
  currentGameday: number = 1;

  constructor(private opendbligdbaservice: OpenLigaDbService) {
    this.getCurrentGameday(this.leaguepreference);
    this.getLeagues();
    this.getTable();
    this.getGamedays();
    this.myclub();
  }

  ngOnInit(): void {}

  private getGamedays() {
    this.gamedays = this.opendbligdbaservice.getGamedays();
  }

  getAllMatchesOfGameday(gameday: number, league: String): void {
    this.opendbligdbaservice.getCompleteGameday(gameday, league).subscribe({
      next: (gameday) => {
        this.gameday = gameday;
      },
    });
  }
  onGamedayChange(): void {
    this.getAllMatchesOfGameday(this.selectedGameday, this.selectedLeague);
  }

  getTable(): void {
    this.opendbligdbaservice.getTable().subscribe({
      next: (table) => {
        this.table = table;
      },
    });
  }

  getTableByLeague(league: String): void {
    this.opendbligdbaservice.getTableByLeague(league).subscribe({
      next: (table) => {
        this.table = table;
      },
    });
  }
  private getLeagues(): void {
    this.leagues = this.opendbligdbaservice.getLeagues();
    if (this.selectedLeague == undefined && this.leagues.length > 0)
      this.selectedLeague = this.leagues[0];
  }

  public onLeagueChange(selectedLeague: String) {
    this.selectedLeague = selectedLeague;
    this.getCurrentGameday(this.selectedLeague);
    this.getTableByLeague(this.selectedLeague);
    this.getAllMatchesOfGameday(this.selectedGameday, this.selectedLeague);
  }

  select(t: TeaminTable): void {
    this.selectedTable = t;
  }

  public async myclub() {
    this.cleanMatches();
    this.getTableByLeague(this.leaguepreference);

    this.allMatchesOfSeason = await this.getAllMatchesOfSeason();

    this.showMatchesForTeampreference();
  }

  async getAllMatchesOfSeason(): Promise<Match[]> {
    let data = await this.opendbligdbaservice
      .getAllMatchesOfSeason()
      .toPromise();

    let matches: Match[] = [];

    for (const dat of data) {
      let match: Match = dat;
      matches.push(match);
    }

    return matches;
  }

  showMatchesForTeampreference() {
    for (const match of this.allMatchesOfSeason) {
      // not a match in which the selected team is? -> next
      if (                                  
        match.Group.GroupOrderID < this.currentGameday - 8 ||                     // wenn Spieltag kleiner als aktueller Spieltag - 10, suche weiter, ansonsten hinzufügen 
        match.Team1.TeamId != this.teampreference &&        //wenn Team 1 und Teampräferenz ungleich, suche weiter, ansonsten hinzufügen
        match.Team2.TeamId != this.teampreference           //wenn Team 2 und Teampräferenz ungleich, suche weiter, ansonsten hinzufügen
      )
        continue;

      // match with selected team? add to list
      this.gameday.push(match);
    }
    this.gameday.length = 10;
  }

  private cleanMatches(): void {
    this.gameday = [];
  }

  public getCurrentGameday(league: String): void {
    this.opendbligdbaservice
      .getCurrentGamedayByLeague(league)
      .subscribe((data) => {
        this.currentGameday = data.GroupOrderID;
      });
  }
}
