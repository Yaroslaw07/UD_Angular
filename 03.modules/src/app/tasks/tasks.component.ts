import { Component, Input } from "@angular/core";
import { TasksService } from "./task/tasks.service";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.css",
})
export class TasksComponent {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;

  isAddingTask = false;

  constructor(private tasksService: TasksService) {}

  getSelectedTasks() {
    return this.tasksService.getUserTasks(this.id);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask() {
    this.isAddingTask = false;
  }
}
