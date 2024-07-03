import { Component } from "@angular/core";
import { DUMMY_USERS } from "./dummy-user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  users = DUMMY_USERS;

  currentUserId?: string;

  get selectedUser() {
    return this.users.find((user) => user.id === this.currentUserId)!;
  }

  onSelectUser(id: string) {
    this.currentUserId = id;
  }
}
