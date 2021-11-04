import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrls: ['./movie-synopsis.component.scss']
})

export class MovieSynopsisComponent implements OnInit {
  /**
   * @param data 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)

    public data: {
      description: string
    }
  ) { }

  ngOnInit(): void {
  }
}