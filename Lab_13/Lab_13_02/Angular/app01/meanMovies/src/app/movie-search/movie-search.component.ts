import { MoviesDataService } from '../movies-data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Movie } from '../movie-list/movie-list.component';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  searchMovieForm!: FormGroup;
  movies!:Movie[];

  constructor(private moviesDataService:MoviesDataService,
              private formBuilder:FormBuilder
    ) { }

  ngOnInit(): void {
    this.searchMovieForm = this.formBuilder.group({
      title:['',Validators.required],
      year:['',Validators.required],
      rate:['',Validators.required]
    });
  }

  private searchMovie() {
    this.moviesDataService.searchMovie(this.searchMovieForm.value)
      .then((response)=>this.handleSearchedMovie(response))
      .catch((error)=>this.handleError);
  }

  private handleSearchedMovie(response:any){
    this.movies = response;
  }

  private handleError(error:any){
    console.log(error);

  }

  onSearchMovie() {
    this.searchMovie();
  }
}
