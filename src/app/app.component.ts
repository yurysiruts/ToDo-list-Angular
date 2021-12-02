import { Component, OnInit } from '@angular/core';
import { TasksService } from './shared/tasks.service';
import { DialogComponent } from './dialog/dialog.component';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todos = [];
  inprogress = [];
  done = [];

  constructor(public dialog: MatDialog, public tasksService: TasksService) {}

  ngOnInit() {
    this.todos = this.tasksService.todos;
    this.inprogress = this.tasksService.inprogress;
    this.done = this.tasksService.done;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  newTask: string;
  taskStatus: string;

  openDialog(newStatus:string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {task: this.newTask, status: newStatus},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newTask = '';
      console.log(result);
    });
  }
}
