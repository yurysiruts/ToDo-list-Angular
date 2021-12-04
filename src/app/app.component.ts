import { Component, OnInit } from '@angular/core';
import { TasksService } from './shared/tasks.service';
import { Task } from './shared/Task';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public tasksService: TasksService) {}

  ngOnInit() {
  }
  
}