import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchAPIDataService } from '../fetch-api-data.service';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
  movies: any [] = [];
  favoriteMoviesID: any [] = [];

  constructor(public fetchAPIData: FetchAPIDataService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchAPIData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      this.getFavoriteMovies();
      return this.movies;
    });
  }

  openMovieGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: {name, description}, 
      width: '280px'
    });
  }

  openMovieDirectorDialog(name: string, birth: string, death: string, bio: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {name, birth, death, bio}, 
      width: '280px'
    });
  }

  openMovieSynopsisDialog(description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {description}, 
      width: '280px'
    });
  }

  getFavoriteMovies(): void {
    this.fetchAPIData.getUser().subscribe((response: any) => {
      this.favoriteMoviesID = response.FavoriteMovies;
      console.log(this.favoriteMoviesID);
      return this.favoriteMoviesID;
    });
  }

  checkNotInFavorite(_id: string): any {
    return !this.favoriteMoviesID.includes(_id);
  }

  addFavorite(_id: string): void {
    if(!this.favoriteMoviesID.includes(_id)){
      this.fetchAPIData.addFavoriteMovie(_id).subscribe((response: any) => {
        let favoriteMovies = response.FavoriteMovies;
        console.log(favoriteMovies);
        this.snackBar.open('Added to favorite movies.', 'OK', {duration: 2000});
        window.location.reload();
        return favoriteMovies;
      }, (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {duration: 2000});
      });
    }
  }

  removeFavorite(_id: string): void {
    if(this.favoriteMoviesID.includes(_id)){
      this.fetchAPIData.deleteFavoriteMovie(_id).subscribe((response: any) => {
        let favoriteMovies = response.FavoriteMovies;
        console.log(favoriteMovies);
        this.snackBar.open('Removed from favorite movies.', 'OK', {duration: 2000});
        window.location.reload();
        return favoriteMovies;
      }, (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {duration: 2000});
      });
    }
  }
}