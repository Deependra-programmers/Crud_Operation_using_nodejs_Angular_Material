import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
@Component({
  selector: 'app-snackbarmsg',
  templateUrl: './snackbarmsg.component.html',
  styleUrls: ['./snackbarmsg.component.css']
})
export class SnackbarmsgComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:any,
public snackbarRef:MatSnackBarRef<SnackbarmsgComponent>) { }

  ngOnInit(): void {
  }
  
}
