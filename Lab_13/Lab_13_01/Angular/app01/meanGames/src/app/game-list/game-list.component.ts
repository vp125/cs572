import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

import { GamesDataService } from '../games-data.service';

export class Game {
  _id!: number;
  title!: string;
  year!: string;
  price!: number;
  rate!:string;
  minPlayers!: number;
  maxPlayers!: number;
  minAge!: number;
}

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  title= "MEAN Games";

  games!: Game[]; // = [this.gam1e,this.game2];

  message!:string;
  err!:string;

  addGameForm!: FormGroup;

  constructor(private gamesDataService:GamesDataService,
              private authenticationService:AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router
    ) { }

  ngOnInit(): void {
    this.addGameForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      year: ['', Validators.required],
      rate: ['', Validators.required],
      minPlayers: ['', Validators.required],
      maxPlayers: ['', Validators.required],
      minAge: ['', Validators.required],
      designer: ['', Validators.required]
    });

    this.getGames();
  }

  private getGames(): void {
    this.gamesDataService.getGames().then((response) => this.gotGames(response)).catch(this.handleError);
  }

  //private gotGames(gamesListComponent:GameListComponent,response: Game[]) {
  private gotGames(response: Game[]) {
    console.log(response);
    this.games = response;
  }

  private addOneGame() : void {
    this.gamesDataService.addOneGame(this.addGameForm.value)
      .then((response) => this.addedOneGame(response))
      .catch((error) => this.handleError(error));
  }

  private addedOneGame(response:any) : void {
    console.log(response);
    this.router.navigate([this.router.url]);

  }

  private handleError(error:any) {
    console.log(error);
  }

  isLoggedIn():boolean {
    return this.authenticationService.isLoggedIn();
  }

  onAddGame(): void {
    this.addOneGame();
  }
}
