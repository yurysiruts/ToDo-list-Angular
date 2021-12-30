import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, of, Subject } from "rxjs";
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DataStorageService } from "./data-storage.service";
import { Task } from "./Task";


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks: Task[] = [
    // {
    //   taskName: "Test One",
    //   taskDescription: "Some dummy text right here added by myself, couse lorem wasn't working here in the string or smthing u know -)",
    //   status: "todo",
    //   addDate: new Date('12/2/2021').getTime(),
    //   progreeDate: null,
    //   doneDate: null,
    //   id: Math.random().toString(16)
    // },
  ];

  tasksChanged = new Subject<Task[]>();

  constructor( private removeDialog: MatDialog, private dataStorageService: DataStorageService) {}

  getTasks(): Observable<Task[]> {
    const tasks$ = of(this.tasks);
    return tasks$;
  }

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.tasksChanged.next(this.tasks);
  }

  addTask(newTask: Task) {
    this.tasks.push(newTask);
    this.tasksChanged.next(this.tasks);
    this.dataStorageService.createAndStoreTasks(this.tasks)
    console.log(this.tasks);
  }

  deleteTask(id) {
    let taskObj: Task;
    const idx = this.tasks.findIndex((task) => {
      taskObj = task;
      return task.id === id;
    });
    const confirmDialog = this.removeDialog.open(ConfirmDialogComponent, {
      data: {
        name: `${taskObj.taskName}`,
        title: "Confirmation message"
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.tasks.splice(idx, 1);
        console.log(this.tasks);
        this.tasksChanged.next(this.tasks);
        this.dataStorageService.createAndStoreTasks(this.tasks);
      }
    });
  }

  updateProgressList(newProgressList) {
    newProgressList.forEach(item => {
      if(item.status !== 'progress') {
        item.status = 'progress';
      };
      if(item.progreeDate === null || !item.progreeDate) {
        console.log(new Date().getTime());
        item.progreeDate = new Date().getTime();
      };
    });
    this.dataStorageService.createAndStoreTasks(this.tasks);
    console.log(newProgressList);
  }

  updateDoneList(newDoneList) {
    newDoneList.forEach(item => {
      if(item.status !== 'done') {
        item.status = 'done';
      };
      if(item.doneDate === null || !item.doneDate) {
        console.log(new Date().getTime());
        item.doneDate = new Date().getTime();
      };
    });
    this.dataStorageService.createAndStoreTasks(this.tasks);
    console.log(newDoneList);
  }

  updateTodoList(newTodoList) {
    newTodoList.forEach(item => {
      if(item.status !== 'todo') {
        item.status = 'todo';
      };
      if(item.addDate === null || !item.addDate) {
        console.log(new Date().getTime());
        item.addDate = new Date().getTime();
      };
    });
    this.dataStorageService.createAndStoreTasks(this.tasks);
    console.log(newTodoList);
  }
}