import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  title: string | undefined;
  message: string | undefined;
  
  constructor(
    public matDialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) 
  { 
    this.title = _data.title;
    this.message = _data.message;
  }

  ngOnInit(): void {
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.matDialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.matDialogRef.close(false);
  }

}

export class ConfirmDialogModel {

  constructor(public title: string, public message: string) {
  }
}
