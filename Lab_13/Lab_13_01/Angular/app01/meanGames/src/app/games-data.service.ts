// import system dependency here
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

// import application dependency here
import { Game } from './game-list/game-list.component';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {

  private baseURL: string = "http://localhost:3000/api";

  constructor(private http:HttpClient) { }

  public getGames() : Promise<Game[]> {
    // 1- Build URL
    const url: string = this.baseURL+"/games";
    // 2- Tell HTTP service to make a request
    // 3- Convert the Obserable to a Promise
    // 4- Convert the Response to JSON
    // 5- Return response
    // 6- Catch and handle error
    return this.http.get(url).toPromise().then(this.gotGames).catch(this.handleError);
  }

  private gotGames(response:any): Game[]{
    return response as Game[];
  }

  private handleError(error:any): Game[] {
    console.log("Error ",error);
    return [];
  }

  public getOneGame(gameId:string) : Promise<Game> {
    // 1- Build URL
    const url: string = this.baseURL+"/games/"+gameId;
    // 2- Tell HTTP service to make a request
    // 3- Convert the Obserable to a Promise
    // 4- Convert the Response to JSON
    // 5- Return response
    // 6- Catch and handle error
    return this.http.get(url).toPromise().then(this.gotOneGame).catch(this.handleErrorOneGame);
  }

  public addOneGame(game:Game) : Promise<Game>{
    // 1- Build URL
    const url: string = this.baseURL+"/games";
    // 2- Tell HTTP service to make a request
    // 3- Convert the Obserable to a Promise
    // 4- Convert the Response to JSON
    // 5- Return response
    // 6- Catch and handle error
    return this.http.post(url,game).toPromise().then(this.addedOneGame).catch(this.handleErrorOneGame);
  }

  public updateOneGame(game:Game) : Promise<Game>{
    // 1- Build URL
    const url: string = this.baseURL+"/games/"+game._id;
    // 2- Tell HTTP service to make a request
    // 3- Convert the Obserable to a Promise
    // 4- Convert the Response to JSON
    // 5- Return response
    // 6- Catch and handle error
    return this.http.put(url,game).toPromise().then(this.updatedOneGame).catch(this.handleErrorOneGame);
  }

  public searchGame(game:Game) : Promise<Game[]>{
    // 1- Build URL
    // 2- Tell HTTP service to make a request
    // 3- Convert the Obserable to a Promise
    // 4- Convert the Response to JSON
    // 5- Return response
    // 6- Catch and handle error

    const url: string = this.baseURL+"/games/search";
    let query = "?";
    let flag = false;

    if(game.title){
        query += "title="+game.title;
        flag = true;
    }
    if(game.year){
        if(flag) {
            query += "&";
        }
        else {
            flag = true;
        }
        query += "year="+game.year;
    }
    if(game.rate){
        if(flag) {
            query += "&";
        }
        query += "rate="+game.rate;
    }
    return this.http.get(url+query).toPromise().then(this.searchedGame).catch(this.handleError);
  }

  private gotOneGame(response:any): Game{
    return response as Game;
  }

  private addedOneGame(response:any): Game {
    return response as Game;
  }

  private updatedOneGame(response:any): Game {
    return response as Game;
  }

  private searchedGame(response:any) : Game[] {
    return response as Game[];
  }

  private handleErrorOneGame(error:any): any {
    console.log("Error ",error);
  }
}
