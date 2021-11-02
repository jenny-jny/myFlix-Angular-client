import { Component, OnInit } from '@angular/core';

import { FetchAPIDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})

export class FavoriteMoviesComponent implements OnInit {
  movies: any [] = [];
  favoriteMoviesID: any [] = [];
  favoriteMoviesData: any [] = [];

  constructor(public fetchAPIData: FetchAPIDataService) { }

  ngOnInit(): void {
    this.getMovies()
  }

  getMovies(): void {
    this.fetchAPIData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      this.getFavoriteMovies()
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    this.fetchAPIData.getUser().subscribe((response: any) => {
      this.favoriteMoviesID = response.FavoriteMovies;
      console.log(this.favoriteMoviesID);
      this.movies.forEach((movie: any) => {
        if(this.favoriteMoviesID.includes(movie._id)){
          this.favoriteMoviesData.push(movie);
        }
      })
      return this.favoriteMoviesData;
    });
  }
}