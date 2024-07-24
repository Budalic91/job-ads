import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../models';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  title = '';
  content = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private dialogRef: MatDialogRef<DialogComponent>) {
      if (data) {
        this.title = data.title;
        this.content = data.content;
      }
    }

  public onCancel() {
    this.dialogRef.close(false);
  }

  public onConfirm() {
    this.dialogRef.close(true);
  }

}
