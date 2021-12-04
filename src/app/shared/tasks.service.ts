import { Injectable } from "@angular/core";
import { Task } from "./Task";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  todos: Task[] = [
    {
      taskName: "Test One",
      taskDescription: "Descirption for test 1",
      status: "todo",
      addDate: Date.now(),
      progreeDate: null,
      doneDate: null,
      id: null
    },
    {
      taskName: "Test Two",
      taskDescription: "Descirption for test 2",
      status: "todo",
      addDate: Date.now(),
      progreeDate: null,
      doneDate: null,
      id: null
    },
  ];
  inprogress: Task[] = [
    {
      taskName: "Stand",
      taskDescription: "Descirption for task in progress",
      status: "progress",
      addDate: null,
      progreeDate: new Date('03/20/2020').getTime(),
      doneDate: null,
      id: null
    },
    {
      taskName: "Code",
      taskDescription: "Descirption for task in progress",
      status: "progress",
      addDate: null,
      progreeDate: new Date('03/20/2020').getTime(),
      doneDate: null,
      id: null
    },
    {
      taskName: "Check e-mail",
      taskDescription: "Descirption for task in progress",
      status: "progress",
      addDate: null,
      progreeDate: new Date('03/20/2020').getTime(),
      doneDate: null,
      id: null
    }
  ];
  done: Task[] = [
    {
      taskName: "Get up",
      taskDescription: "Descirption for already done tasks",
      status: "done",
      addDate: null,
      progreeDate: null,
      doneDate: new Date('06/5/2021').getTime(),
      id: null
    },
    {
      taskName: "Brush teeth",
      taskDescription: "Descirption for already done tasks",
      status: "done",
      addDate: null,
      progreeDate: null,
      doneDate: new Date('06/5/2021').getTime(),
      id: null
    },
    {
      taskName: "Take a shower",
      taskDescription: "Descirption for already done tasks",
      status: "done",
      addDate: null,
      progreeDate: null,
      doneDate: new Date('06/5/2021').getTime(),
      id: null
    }
  ];

  addTask(newTask: Task) {
    console.log(newTask);
    if(newTask.status === 'todo') {
      this.todos.push({
        taskName: newTask.taskName,
        taskDescription: "Mock Description for now...",
        status: newTask.status,
        addDate: newTask.addDate,
      });
    }
    else if(newTask.status === 'progress') {
      this.inprogress.push({
        taskName: newTask.taskName,
        taskDescription: "Mock Description for now...",
        status: newTask.status,
        addDate: newTask.addDate,
      });
    } else {
      this.done.push({
        taskName: newTask.taskName,
        taskDescription: "Mock Description for now...",
        status: newTask.status,
        addDate: newTask.addDate,
      });
    };
  }
}