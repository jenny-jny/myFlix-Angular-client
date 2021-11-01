import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FavoriteMoviesComponent } from '../favorite-movies/favorite-movies.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  // // This is the function that will open the movie card component when the movies button is clicked  
  // openMovies(): void {
  //   // Assigning the dialog a width
  //   this.dialog.open(MovieCardComponent, {width: '280px'});
  // }

  openUserFavoriteMoviesDialog(): void {
    this.dialog.open(FavoriteMoviesComponent, {width: '280px'});
  }

  // This is the function that will open the dialog when the profile button is clicked  
  openUserProfileDialog(): void {
    // Assigning the dialog a width
    this.dialog.open(UserProfileComponent, {width: '280px'});
  }
}
