import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../shared/Task';
import { TasksService } from 'src/app/shared/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Input() index: number;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    // console.log(this.task);
  }

  deleteTask(id: string) {
    this.tasksService.deleteTask(id);
  }

}
