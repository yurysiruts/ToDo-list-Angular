import { Component, OnDestroy, OnInit } from '@angular/core';
import { TasksService } from './shared/tasks.service';
import { Task } from './shared/Task';
import { noop, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  firstSubscription: Subscription;

  constructor(public tasksService: TasksService) {}

  ngOnInit() {
    const intervObs = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count === 5) { observer.complete() }
        count++;
      }, 1000)
    });

    this.firstSubscription  = intervObs
      .pipe(map(item => `Round: ${item}`))
      .subscribe(
        val => console.log(val),
        noop,
        complete => console.log("Complete!") 
      );
  }

  ngOnDestroy() {
    this.firstSubscription.unsubscribe();
  }
  
}