import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchAPIDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  // userData: any [] = [];
  userData = {Username: '', Password: '', Email: '', Birthday: ''}

  constructor(public fetchAPIData: FetchAPIDataService, public snackBar: MatSnackBar, public dialogRef: MatDialogRef<UserProfileComponent>, public router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchAPIData.getUser().subscribe((response: any) => {
      this.userData = response;
      console.log(this.userData);
      return this.userData;
    });
  }

  updateUser(): void {
    this.fetchAPIData.updateUser(this.userData).subscribe((response) => {
      console.log(response);
      this.snackBar.open('User information update successful.', 'OK', {duration: 2000});
    }, (response => {
      console.log(response);
      this.snackBar.open(response, 'OK', {duration: 2000});
    }))
  }

  deleteUser(): void {
    this.fetchAPIData.deleteUser().subscribe((response) => {
      // localStorage.clear();
      // this.dialogRef.close();
      console.log(response);
      this.snackBar.open('Profile deletion successful.', 'OK', {duration: 2000});
      this.router.navigate(['welcome']);
    }, (response => {
      console.log(response);
      this.snackBar.open(response, 'OK', {duration: 2000});
    }))
  }

  loginUser(): void {
    this.fetchAPIData.userLogin(this.userData).subscribe((response) => {
    // Logic for a successful user login goes here! (To be implemented)
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.user.Username);
      this.dialogRef.close(); // This will close the modal on success!
      console.log(response);
      this.snackBar.open('User login successful.', 'OK', {duration: 2000});
      this.router.navigate(['movies']);
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {duration: 2000});
    });
  }
}
