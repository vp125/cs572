// import system dependency here
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

// import application dependency here
import { Movie } from './movie-list/movie-list.component';

@Injectable({
  providedIn: 'root'
})
export class MoviesDataService {

  private baseURL: string = "http://localhost:3000/api";

  constructor(private http:HttpClient) { }

  public getMovies() : Promise<Movie[]> {
    // 1- Build URL
    const url: string = this.baseURL+"/movies";
    // 2- Tell HTTP service to make a request
    // 3- Convert the Obserable to a Promise
    // 4- Convert the Response to JSON
    // 5- Return response
    // 6- Catch and handle error
    return this.http.get(url).toPromise().then(this.gotMovies).catch(this.handleError);
  }

  private gotMovies(response:any): Movie[]{
    return response as Movie[];
  }

  private handleError(error:any): Movie[] {
    console.log("Error ",error);
    return [];
  }

  public getOneMovie(movieId:string) : Promise<Movie> {
    // 1- Build URL
    const url: string = this.baseURL+"/movies/"+movieId;
    // 2- Tell HTTP service to make a request
    // 3- Convert the Obserable to a Promise
    // 4- Convert the Response to JSON
    // 5- Return response
    // 6- Catch and handle error
    return this.http.get(url).toPromise().then(this.gotOneMovie).catch(this.handleErrorOneMovie);
  }

  public addOneMovie(movie:Movie) : Promise<Movie>{
    // 1- Build URL
    const url: string = this.baseURL+"/movies";
    // 2- Tell HTTP service to make a request
    // 3- Convert the Obserable to a Promise
    // 4- Convert the Response to JSON
    // 5- Return response
    // 6- Catch and handle error
    return this.http.post(url,movie).toPromise().then(this.addedOneMovie).catch(this.handleErrorOneMovie);
  }

  public updateOneMovie(movie:Movie) : Promise<Movie>{
    // 1- Build URL
    const url: string = this.baseURL+"/movies/"+movie._id;
    // 2- Tell HTTP service to make a request
    // 3- Convert the Obserable to a Promise
    // 4- Convert the Response to JSON
    // 5- Return response
    // 6- Catch and handle error
    return this.http.put(url,movie).toPromise().then(this.updatedOneMovie).catch(this.handleErrorOneMovie);
  }

  public deleteOneMovie(movieId:string) : Promise<Movie>{
    // 1- Build URL
    const url: string = this.baseURL+"/movies/"+movieId;
    // 2- Tell HTTP service to make a request
    // 3- Convert the Obserable to a Promise
    // 4- Convert the Response to JSON
    // 5- Return response
    // 6- Catch and handle error
    return this.http.delete(url).toPromise().then(this.deletedOneMovie).catch(this.handleErrorOneMovie);
  }

  public searchMovie(movie:Movie) : Promise<Movie[]>{
    // 1- Build URL
    // 2- Tell HTTP service to make a request
    // 3- Convert the Obserable to a Promise
    // 4- Convert the Response to JSON
    // 5- Return response
    // 6- Catch and handle error

    const url: string = this.baseURL+"/movies/search";
    let query = "?";
    let flag = false;

    if(movie.title){
        query += "title="+movie.title;
        flag = true;
    }
    if(movie.year){
        if(flag) {
            query += "&";
        }
        else {
            flag = true;
        }
        query += "year="+movie.year;
    }
    if(movie.rating){
        if(flag) {
            query += "&";
        }
        query += "rate="+movie.rating;
    }
    return this.http.get(url+query).toPromise().then(this.searchedMovie).catch(this.handleError);
  }

  private gotOneMovie(response:any): Movie{
    return response as Movie;
  }

  private addedOneMovie(response:any): Movie {
    return response as Movie;
  }

  private updatedOneMovie(response:any): Movie {
    return response as Movie;
  }

  private deletedOneMovie(response:any): any {
    return response as Movie;
  }

  private searchedMovie(response:any) : Movie[] {
    return response as Movie[];
  }

  private handleErrorOneMovie(error:any): any {
    console.log("Error ",error);
  }
}
