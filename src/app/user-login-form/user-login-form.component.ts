import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// This import brings in the API calls created
import { FetchAPIDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  /**
   * @param fetchAPIData 
   * @param dialogRef 
   * @param snackBar 
   * @param router 
   */
  constructor(public fetchAPIData: FetchAPIDataService, public dialogRef: MatDialogRef<UserLoginFormComponent>, public snackBar: MatSnackBar, public router: Router) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
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