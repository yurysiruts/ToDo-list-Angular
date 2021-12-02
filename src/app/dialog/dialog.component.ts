import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogData } from '../shared/dialogData';
import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public status;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public tasksService: TasksService,
  ) {}
  
  ngOnInit() {
    this.status = this.data.status;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddTask() {
    this.tasksService.addTask(this.data);
  }
}
