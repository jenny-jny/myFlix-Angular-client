import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// This import brings in the API calls created
import { FetchAPIDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = {Username: '', Password: '', Email: '', Birthday: ''}

  /**
   * @param fetchAPIData 
   * @param dialogRef 
   * @param snackBar 
   */
  constructor(public fetchAPIData: FetchAPIDataService, public dialogRef: MatDialogRef<UserRegistrationFormComponent>, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchAPIData.userRegistration(this.userData).subscribe((response) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      console.log(response);
      this.snackBar.open('User registration succesful.', 'OK', {duration: 2000});
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {duration: 2000});
    });
  }
}