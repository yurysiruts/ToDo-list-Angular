import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TasksService } from '../shared/tasks.service';
import { Task } from '../shared/Task';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public status;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    public tasksService: TasksService,
  ) {}
  
  ngOnInit() {
    this.status = this.data.status;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddTask() {
    this.data.addDate = Date.now();
    this.tasksService.addTask(this.data);
  }
}
