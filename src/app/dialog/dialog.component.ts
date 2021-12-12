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
  public description: boolean = false;

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
    if(this.data.status === 'todo') {
      this.data.addDate = Date.now();
    } else if(this.data.status === 'progress') {
      this.data.progreeDate = Date.now();
    } else {
      this.data.doneDate = Date.now();
    };
    this.data.id = Math.random().toString(16);
    console.log(this.data);
    this.tasksService.addTask(this.data);
  }

  addDescription() {
    this.description = !this.description;
  }
}
