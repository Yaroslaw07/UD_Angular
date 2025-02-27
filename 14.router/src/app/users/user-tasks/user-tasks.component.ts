import { Component, inject, input } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  // userId = input.required<string>();
  // private usersService = inject(UsersService);
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);

  // userName = computed(() => this.usersService.users.find((u) => u.id === this.userId())?.name);
  userName = input.required<string>();
  message = input.required<string>();
  // private activatedRoute = inject(ActivatedRoute);

  // ngOnInit() {
  //   this.activatedRoute.data.subscribe({
  //     next: (data) => {
  //       console.log('Data: ', data);
  //     }
  //   });
  // }

  // ngOnInit(): void {
  //   console.log('Input data: ', this.message());
  //   console.log(this.activatedRoute.snapshot);
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) => {
  //       this.userName = this.usersService.users.find((u) => u.id === paramMap.get('userId'))?.name || '';
  //     },
  //   });

  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }
}

export const resolveUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const userService = inject(UsersService);
  const userName = userService.users.find((u) => u.id === activatedRoute.paramMap.get('userId'))?.name || '';

  return userName;
};

export const resolveTitle: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => resolveUserName(activatedRoute, routerState) + "'s tasks";
