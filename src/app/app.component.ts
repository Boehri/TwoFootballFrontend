import { Component, OnInit } from '@angular/core';
import { OpenLigaDbService } from './open-liga-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Hello World!';
  ngOnInit(): void {}

  constructor(private opendbligdbaservive: OpenLigaDbService) {
  }

}
