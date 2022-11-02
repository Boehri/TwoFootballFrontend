import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { TeaminTable } from './result';

@Injectable({
  providedIn: 'root',
})
export class OpenLigaDbService {
  private leagues: String[] = ['bl1', 'bl2', 'bl3de'];
  private selectedLeague: String = 'bl1';
  constructor(private http: HttpClient) {}

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

  getcurrentTable(): Observable<any> {
    return this.http.get(
      `https://www.openligadb.de/api/getbltable/${this.getselectedLeague}/2022`
    );
  }
  public getLeagues(): String[] {
    return this.leagues;
  }
  public getselectedLeague(): String {
    return this.selectedLeague;
  }
  public setselectedLeague(selectedLeague: String) {
    this.selectedLeague = selectedLeague;
  }
  getCurrentGamedayByLeague(league: String): Observable<any> {
    return this.http.get(
      `https://www.openligadb.de/api/getmatchdata/${league}`
    );
  }
}
