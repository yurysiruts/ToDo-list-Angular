import { Injectable } from "@angular/core";
import { DialogData } from "./dialogData";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  todos = ["Test One", "Test Two"];
  inprogress = ['Stand', 'Code', 'Woke', 'Check e-mail', 'Grow a pare'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  addTask(newTask: DialogData) {
    console.log(newTask);
    if(newTask.status === 'new') {
      this.todos.push(newTask.task);
    } 
    else if(newTask.status === 'progress') {
      this.inprogress.push(newTask.task);
    } else {
      this.done.push(newTask.task);
    };
  }
}