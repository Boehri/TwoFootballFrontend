import { group } from '@angular/animations';
import { NgFor } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { OpenLigaDbService } from '../open-liga-db.service';
import { Verein, User, currentgameday, Match, TeaminTable } from '../open-liga-db-interface';

@Component({
  selector: 'app-show-results',
  templateUrl: './show-results.component.html',
  styleUrls: ['./show-results.component.scss'],
})
export class ShowResultsComponent implements OnInit {
  table: TeaminTable[] = [];
  selectedTable: TeaminTable | null = null;
  public selectedLeague: String = 'bl1';
  leagues: String[] = [];
  gameday: Match[] = [];
  gamedays: number[] = [];
  selectedGameday: number = 1;
  leaguepreference: String = 'bl1';
  teampreference: number = 16;
  teampreferencename: String = '';
  allMatchesOfSeason: Match[] = [];
  listOfMatchesFromSelectedTeam: Match[] = [];
  currentGameday: number = 1;
  Users: User[] = [];
  Vereine: Verein[] = [];
  showMailInput: Boolean = true;
  UserEmail: string = '';

  constructor(private opendbligdbaservice: OpenLigaDbService) {
    this.getUserEmail();
    this.onLeagueChange('bl1');
    this.getLeagues();
    this.getTable();
    this.getGamedays();
    this.myclub();
    this.getUserData();
    this.getVereinData();
  }

  ngOnInit(): void {}

  logout() {
    localStorage.clear();
  }

  async getUserEmail() {
    let UserEmail: any = localStorage.getItem('user');
    this.UserEmail = await UserEmail;
  }

  private getGamedays(): void {
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
        match.Group.GroupOrderID < this.currentGameday - 8 || // wenn Spieltag kleiner als aktueller Spieltag - 10, suche weiter, ansonsten hinzuf??gen
        (match.Team1.TeamId != this.teampreference && //wenn Team 1 und Teampr??ferenz ungleich, suche weiter, ansonsten hinzuf??gen
          match.Team2.TeamId != this.teampreference) //wenn Team 2 und Teampr??ferenz ungleich, suche weiter, ansonsten hinzuf??gen
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

  public getUserData(): void {
    this.opendbligdbaservice.getUserData().subscribe({
      next: (data) => {
        this.Users = data;
      },
    });
  }

  public getVereinData(): void {
    this.opendbligdbaservice.getVereinData().subscribe({
      next: (data) => {
        this.Vereine = data;
      },
    });
  }

  getUserPreferenceByMail() {
    for (let user of this.Users) {
      if (user.nutzerEmail === this.UserEmail) {
        this.teampreference = user.nutzerPraefVerein;
      }
    }
  }
}
