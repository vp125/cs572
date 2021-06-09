import { GamesDataService } from './../games-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Game } from '../game-list/game-list.component';

@Component({
  selector: 'app-games-detail',
  templateUrl: './games-detail.component.html',
  styleUrls: ['./games-detail.component.css']
})
export class GamesDetailComponent implements OnInit {
  game!: Game;
  gameId!: string;
  updateGameForm!: FormGroup;

  constructor(private gamesDataService:GamesDataService,
              private route:ActivatedRoute,
              private router:Router,
              private formBuilder: FormBuilder,
              ) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.params.gameId;
    this.getOneGame(this.gameId);

    this.updateGameForm = this.formBuilder.group({
      price: ['', Validators.required],
      minPlayers: ['', Validators.required],
      maxPlayers: ['', Validators.required],
      minAge: ['', Validators.required]
    });

  }

  private getOneGame(gameId:string): void {
    this.gamesDataService.getOneGame(gameId).then((response) => this.gotOneGame(this,response)).catch(this.handleError);
  }

  private gotOneGame(gamesDetailComponent:GamesDetailComponent,response:Game) {
    console.log(response);
    gamesDetailComponent.game = response;
    this.updateFormValue();
  }

  private updateOneGame() : void {
    let updateGame: Game = this.updateGameForm.value;
    updateGame._id = this.game._id;
    updateGame.title = this.game.title;
    updateGame.year = this.game.year;
    updateGame.rate = this.game.rate;

    this.gamesDataService.updateOneGame(updateGame).then((response) => this.updatedOneGame(this,response)).catch(this.handleError);
  }

  private updatedOneGame(gamesDetailComponent:GamesDetailComponent,response:Game) {
    console.log(response);
    this.getOneGame(this.gameId);
  }

  private handleError(error:any) {
    console.log(error);
  }

  onUpdateGame() {
    this.updateOneGame();
  }

  private updateFormValue(){
    this.updateGameForm.controls['price'].setValue(this.game.price);
    this.updateGameForm.controls['minPlayers'].setValue(this.game.minPlayers);
    this.updateGameForm.controls['maxPlayers'].setValue(this.game.maxPlayers);
    this.updateGameForm.controls['minAge'].setValue(this.game.minAge);
  }
}
