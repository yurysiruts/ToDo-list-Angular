import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../shared/Task'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
    // console.log(this.task);
  }

}
