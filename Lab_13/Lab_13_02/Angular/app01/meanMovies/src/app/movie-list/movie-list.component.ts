import { AuthenticationService } from '../authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

import { MoviesDataService } from '../movies-data.service';

export class Actor {
  name!:string;
  dob!:Date;
}
export class Movie {
  _id!: number;
  title!: string;
  writer!: string;
  year!: string;
  rating!:number;
  actors!: Actor[];
}

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  title= "MEAN Movies";

  movies!: Movie[]; // = [this.gam1e,this.movie2];

  message!:string;
  err!:string;

  addMovieForm!: FormGroup;

  constructor(private moviesDataService:MoviesDataService,
              private authenticationService:AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router
    ) { }

  ngOnInit(): void {
    this.addMovieForm = this.formBuilder.group({
      title: ['', Validators.required],
      writer: ['', Validators.required],
      year: ['', Validators.required],
      rating: ['', Validators.required]
    });

    this.getMovies();
  }

  private getMovies(): void {
    this.moviesDataService.getMovies().then((response) => this.gotMovies(response)).catch(this.handleError);
  }

  //private gotMovies(moviesListComponent:MovieListComponent,response: Movie[]) {
  private gotMovies(response: Movie[]) {
    console.log(response);
    this.movies = response;
  }

  private addOneMovie() : void {
    this.moviesDataService.addOneMovie(this.addMovieForm.value)
      .then((response) => this.addedOneMovie(response))
      .catch((error) => this.handleError(error));
  }

  private addedOneMovie(response:any) : void {
    console.log(response);
    this.router.navigate([this.router.url]);
    this.addMovieForm.reset();
  }

  private handleError(error:any) {
    console.log(error);
  }

  isLoggedIn():boolean {
    return this.authenticationService.isLoggedIn();
  }

  onAddMovie(): void {
    this.addOneMovie();
  }
}
