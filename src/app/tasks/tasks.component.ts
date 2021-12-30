import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { DialogComponent } from '../dialog/dialog.component';
import { TasksService } from '../shared/tasks.service';
import { Task } from '../shared/Task';
import { Subscription, noop } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  public newTask: string;
  todos: Task[] = [];
  inprogress: Task[] = [];
  done: Task[] = [];

  tasksArr: Task[] = [];
  differ: any;
  subscription: Subscription;

  constructor(
    private dialog: MatDialog, 
    private tasksService: TasksService, 
    private dataStorageService: DataStorageService
  ) {}

  getSubscriber = {
    next: (tasks: Task[]) => {
      tasks.forEach((taskObj) => {
        if(taskObj.status === 'todo') {
          this.todos.push(taskObj);
        } else if(taskObj.status === 'progress') {
          this.inprogress.push(taskObj);
        } else {
          this.done.push(taskObj);
        }
      });
    },
    error: noop,
    complete: () => {}
  };

  updateSubscriber = {
    next: (tasks: Task[]) => {
      this.todos = [];
      this.inprogress = [];
      this.done = [];
      tasks.forEach((taskObj) => {
        if(taskObj.status === 'todo') {
          this.todos.push(taskObj);
        } else if(taskObj.status === 'progress') {
          this.inprogress.push(taskObj);
        } else {
          this.done.push(taskObj);
        }
      });
    }
  };

  ngOnInit() {
    // initial load of tasks in the UI 
    this.tasksService.getTasks().subscribe(this.getSubscriber);
    // reload of tasks in the UI after every change detected
    this.subscription = this.tasksService.tasksChanged.subscribe(this.updateSubscriber);
    // load all tasks from firebase db
    this.dataStorageService.fetchTasks().subscribe(responseTasks => {
      this.tasksService.setTasks(responseTasks);
      console.log(responseTasks);
    })
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    // Updating task status
    if(event.container.data == this.inprogress) {
      this.tasksService.updateProgressList(event.container.data);
    } else if(event.container.data == this.done) {
      this.tasksService.updateDoneList(event.container.data);
    } else {
      this.tasksService.updateTodoList(event.container.data);
    }
    // update tasks in db
    // this.dataStorageService.createAndStoreTasks
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
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
