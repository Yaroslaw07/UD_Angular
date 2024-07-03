import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/card/shared.module";
import { FormsModule } from "@angular/forms";

import { DatePipe } from "@angular/common";

import { TasksComponent } from "./tasks.component";
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from "./new-task/new-task.component";

@NgModule({
  declarations: [TasksComponent, TaskComponent, NewTaskComponent],
  imports: [SharedModule, DatePipe, FormsModule],
  exports: [TasksComponent],
})
export class TasksModule {}
