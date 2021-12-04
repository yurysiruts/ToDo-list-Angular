import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { DialogComponent } from '../dialog/dialog.component';
import { TasksService } from '../shared/tasks.service';
import { Task } from '../shared/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  public newTask: string;
  todos: Task[] = [];
  inprogress: Task[] = [];
  done: Task[] = [];

  constructor(public dialog: MatDialog, public tasksService: TasksService) {}

  ngOnInit(): void {
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

  openDialog(newStatus:string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {status: newStatus}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newTask = '';
      console.log(result);
    });
  }

}
