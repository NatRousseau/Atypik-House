import { Component, OnInit } from '@angular/core';

export interface Tile {
  
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tiles: Tile[] = [
    {text: 'Votre site de location de logement atypique', cols: 2, rows: 1},
    
    {text: 'Une location ?', cols: 1, rows: 1 },
    {text: 'Un bien à louer', cols: 1, rows: 1},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
