import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Liga, Verein, User, currentgameday, TeaminTable } from './open-liga-db-interface';

@Injectable({
  providedIn: 'root',
})
export class OpenLigaDbService {
  private leagues: String[] = ['bl1', 'bl2', 'bl3de'];
  private selectedLeague: String = 'bl1';
  private gamedays: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
  ];
  private teampreference: number | undefined; 
  constructor(private http: HttpClient) {
  }

  public getCompleteGameday(gameday: number, league: String): Observable<any> {
    if (gameday == undefined)
      return throwError("no season given. Can't get table");

    if (this.gamedays.find((s) => s == gameday) == undefined)
      return throwError('unknown season!');

    return this.http.get(
      `https://www.openligadb.de/api/getmatchdata/${league}/2022/${gameday}`
    );
  }

  getGamedays():number[]{
    return this.gamedays;
  }

  getTable(): Observable<any> {
    const url = 'https://www.openligadb.de/api/getbltable/bl1/2022';

    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.get<TeaminTable[]>(url, { headers });
  }

  getTableByLeague(league: String): Observable<any> {
    if (league == undefined)
      return throwError("no season given. Can't get table");

    if (this.leagues.find((s) => s == league) == undefined)
      return throwError('unknown season!');

    return this.http.get(
      `https://www.openligadb.de/api/getbltable/${league}/2022`
    );
  }
  public getLeagues(): String[] {
    return this.leagues;
  }

  getAllMatchesOfSeason(): Observable<any>{
    return this.http.get(`https://www.openligadb.de/api/getmatchdata/bl1/2022`);
  }

  
  getCurrentGamedayByLeague(league: String): Observable<any> {
      return (
        this.http.get <currentgameday>(`https://www.openligadb.de/api/getcurrentgroup/${league}`)
      );
  }

  getUserData():Observable<any>{
    return this.http.get<User>(
      `https://sheltered-thicket-12510.herokuapp.com/api/twofootball/nutzer/all`
    );
  }
  getVereinData(): Observable<any>{
    return this.http.get<Verein>(
      `https://sheltered-thicket-12510.herokuapp.com/api/twofootball/verein/all`
    )
  }
  getLigaData():Observable<any>{
    return this.http.get<Liga>(
      `https://sheltered-thicket-12510.herokuapp.com/api/twofootball/liga/all`
    );
  }
  
}

