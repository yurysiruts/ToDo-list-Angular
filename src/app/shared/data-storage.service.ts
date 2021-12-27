import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Task } from './Task';
import { TasksService } from './tasks.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService implements OnInit {

  constructor(private http: HttpClient, private tasksService: TasksService) {}

  ngOnInit(): void {
    // this.tasksService.tasksChanged.subscribe(
    //   (tasks: Task[]) => {
    //     this.fetchTasks();
    //   }
    // )
  }

  createAndStoreTasks(tasks: Task[]) {
    this.http 
      .put(
        'https://todo-list-manager-34149-default-rtdb.europe-west1.firebasedatabase.app/tasks.json', 
        tasks
      )
      .subscribe(res => {
        console.log(res);
      })
  }

  fetchTasks() {
    this.http
      .get<Task[]>('https://todo-list-manager-34149-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')
      .subscribe(responseTasks => {
        this.tasksService.setTasks(responseTasks);
        console.log(responseTasks);
      })
  }
}
