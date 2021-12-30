import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from './Task';
import { TasksService } from './tasks.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService implements OnDestroy {

  subscription: Subscription;

  constructor(private http: HttpClient) {}

  // subscriber = {
  //   next: (tasks) => {
  //     this.createAndStoreTasks(tasks);
  //   }
  // }

  // storageCall() {
  //   this.subscription = this.tasksService.tasksChanged.subscribe(this.subscriber);
  // }

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
    return this.http
      .get<Task[]>('https://todo-list-manager-34149-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
