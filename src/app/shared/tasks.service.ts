import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, of, Subject } from "rxjs";
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Task } from "./Task";


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks: Task[] = [
    {
      taskName: "Test One",
      taskDescription: "Some dummy text right here added by myself, couse lorem wasn't working here in the string or smthing u know -)",
      status: "todo",
      addDate: new Date('12/2/2021').getTime(),
      progreeDate: null,
      doneDate: null,
      id: Math.random().toString(16)
    },
    {
      taskName: "Test Two",
      taskDescription: "Descirption for test 2",
      status: "todo",
      addDate: new Date('12/2/2021').getTime(),
      progreeDate: null,
      doneDate: null,
      id: Math.random().toString(16)
    },    {
      taskName: "Stand",
      taskDescription: "Descirption for task in progress",
      status: "progress",
      addDate: null,
      progreeDate: new Date('03/20/2020').getTime(),
      doneDate: null,
      id: Math.random().toString(16)
    },
    {
      taskName: "Code",
      taskDescription: "Descirption for task in progress",
      status: "progress",
      addDate: null,
      progreeDate: new Date('03/20/2020').getTime(),
      doneDate: null,
      id: Math.random().toString(16)
    },
    {
      taskName: "Check e-mail",
      taskDescription: "Descirption for task in progress",
      status: "progress",
      addDate: null,
      progreeDate: new Date('03/20/2020').getTime(),
      doneDate: null,
      id: Math.random().toString(16)
    },    {
      taskName: "Get up",
      taskDescription: "Descirption for already done tasks",
      status: "done",
      addDate: null,
      progreeDate: null,
      doneDate: new Date('06/5/2021').getTime(),
      id: Math.random().toString(16)
    },
    {
      taskName: "Brush teeth",
      taskDescription: "Descirption for already done tasks",
      status: "done",
      addDate: null,
      progreeDate: null,
      doneDate: new Date('06/5/2021').getTime(),
      id: Math.random().toString(16)
    },
    {
      taskName: "Take a shower",
      taskDescription: "Descirption for already done tasks",
      status: "done",
      addDate: null,
      progreeDate: null,
      doneDate: new Date('06/5/2021').getTime(),
      id: Math.random().toString(16)
    }
  ]

  tasksChanged = new Subject<Task[]>();

  constructor(private removeDialog: MatDialog) {}

  getTasks(): Observable<Task[]> {
    const tasks$ = of(this.tasks);
    return tasks$;
  }  

  addTask(newTask: Task) {
    this.tasks.push(newTask);
    this.tasksChanged.next(this.tasks);
    console.log(this.tasks)
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
      }
    });
  }

  updateProgressList(newProgressList) {
    newProgressList.forEach(item => {
      if(item.status !== 'progress') {
        item.status = 'progress';
      };
      if(item.progreeDate === null) {
        console.log(new Date().getTime());
        item.progreeDate = new Date().getTime();
      };
    });
    console.log(newProgressList);
  }

  updateDoneList(newDoneList) {
    newDoneList.forEach(item => {
      if(item.status !== 'done') {
        item.status = 'done';
      };
      if(item.doneDate === null) {
        console.log(new Date().getTime());
        item.doneDate = new Date().getTime();
      };
    });
    console.log(newDoneList);
  }

  updateTodoList(newTodoList) {
    newTodoList.forEach(item => {
      if(item.status !== 'todo') {
        item.status = 'todo';
      };
      if(item.addDate === null) {
        console.log(new Date().getTime());
        item.addDate = new Date().getTime();
      };
    });
  }
}