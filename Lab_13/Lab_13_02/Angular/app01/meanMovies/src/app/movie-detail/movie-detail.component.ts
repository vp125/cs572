import { MoviesDataService } from '../movies-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Movie } from '../movie-list/movie-list.component';
import { AuthenticationService } from './../authentication.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MoviesDetailComponent implements OnInit {
  movie!: Movie;
  movieId!: string;
  deleteMovieForm!: FormGroup;

  constructor(private moviesDataService:MoviesDataService,
              private route:ActivatedRoute,
              private router:Router,
              private formBuilder: FormBuilder,
              private authenticationService:AuthenticationService
              ) { }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.params.movieId;
    this.getOneMovie(this.movieId);
    this.deleteMovieForm = this.formBuilder.group({});

    // this.updateMovieForm = this.formBuilder.group({
    //   price: ['', Validators.required],
    //   minPlayers: ['', Validators.required],
    //   maxPlayers: ['', Validators.required],
    //   minAge: ['', Validators.required]
    // });

  }

  private getOneMovie(movieId:string): void {
    this.moviesDataService.getOneMovie(movieId).then((response) => this.gotOneMovie(this,response)).catch(this.handleError);
  }

  private gotOneMovie(moviesDetailComponent:MoviesDetailComponent,response:Movie) {
    console.log(response);
    moviesDetailComponent.movie = response;
    this.updateFormValue();
  }

  private updateOneMovie() : void {
    // let updateMovie: Movie = this.updateMovieForm.value;
    // updateMovie._id = this.movie._id;
    // updateMovie.title = this.movie.title;
    // updateMovie.year = this.movie.year;
    // updateMovie.rating = this.movie.rating;

    // this.moviesDataService.updateOneMovie(updateMovie).then((response) => this.updatedOneMovie(this,response)).catch(this.handleError);
  }

  private updatedOneMovie(moviesDetailComponent:MoviesDetailComponent,response:Movie) {
    console.log(response);
    this.getOneMovie(this.movieId);
  }

  private deleteOneMovie() : void {
    this.moviesDataService.deleteOneMovie(this.movieId).then((response) => this.deletedOneMovie(this,response)).catch(this.handleError);
  }

  private deletedOneMovie(moviesDetailComponent:MoviesDetailComponent,response:Movie) {
    console.log(response);
    location.reload();
  }

  private handleError(error:any) {
    console.log(error);
  }

  onDeleteMovie() {
    this.deleteOneMovie();
  }

  onUpdateMovie() {
    this.updateOneMovie();
  }

  private updateFormValue(){
    // this.updateMovieForm.controls['price'].setValue(this.movie.price);
    // this.updateMovieForm.controls['minPlayers'].setValue(this.movie.minPlayers);
    // this.updateMovieForm.controls['maxPlayers'].setValue(this.movie.maxPlayers);
    // this.updateMovieForm.controls['minAge'].setValue(this.movie.minAge);
  }

  isLoggedIn():boolean {
    return this.authenticationService.isLoggedIn();
  }
}
