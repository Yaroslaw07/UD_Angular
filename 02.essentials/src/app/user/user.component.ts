import {
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  output,
  Output,
} from '@angular/core';
import { User } from './user.model';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [CardComponent],
})
export class UserComponent {
  @Input({ required: true }) user!: User;
  @Input({ required: true }) isSelected!: boolean;
  @Output() select = new EventEmitter<string>();

  // avatar = input.required<string>();
  // name = input.required<string>();
  // select = output<string>();

  get imagePath() {
    return `assets/users/${this.user.avatar}`;
  }

  // imagePath = computed(() => 'assets/users/' + this.avatar);

  onSelectUser() {
    this.select.emit(this.user.id);
  }
}
