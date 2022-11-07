import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountServiceService {
  constructor(private http:HttpClient) {}

  addData(postUser: Object) {
    let endPoint =
      'https://sheltered-thicket-12510.herokuapp.com/api/twofootball/nutzer';
    this.http.post(endPoint, postUser).subscribe((data) => {
      console.log(data);
    });

  }
}
