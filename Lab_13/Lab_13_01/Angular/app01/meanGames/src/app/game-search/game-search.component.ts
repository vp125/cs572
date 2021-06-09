import { GamesDataService } from './../games-data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Game } from '../game-list/game-list.component';

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.css']
})
export class GameSearchComponent implements OnInit {
  searchGameForm!: FormGroup;
  games!:Game[];

  constructor(private gamesDataService:GamesDataService,
              private formBuilder:FormBuilder
    ) { }

  ngOnInit(): void {
    this.searchGameForm = this.formBuilder.group({
      title:['',Validators.required],
      year:['',Validators.required],
      rate:['',Validators.required]
    });
  }

  private searchGame() {
    this.gamesDataService.searchGame(this.searchGameForm.value)
      .then((response)=>this.handleSearchedGame(response))
      .catch((error)=>this.handleError);
  }

  private handleSearchedGame(response:any){
    this.games = response;
  }

  private handleError(error:any){
    console.log(error);

  }

  onSearchGame() {
    this.searchGame();
  }
}
