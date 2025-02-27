import { CanMatchFn, Routes } from '@angular/router';
import { userRoutes } from './users/users.routes';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { resolveTitle, resolveUserName, UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';

const dummyMatch: CanMatchFn = (route, segments) => {
  //   const router = inject(Router);
  //   const shouldGetAccess = Math.random() > 0.5;

  //   if (shouldGetAccess) {
  //     return true;
  //   }

  //   return new RedirectCommand(router.parseUrl('/unauthorized'));

  return true;
};

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No task selected',
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    runGuardsAndResolvers: 'always',
    children: userRoutes,
    canMatch: [dummyMatch],
    data: {
      message: 'Hello!',
    },
    resolve: {
      userName: resolveUserName,
    },
    title: resolveTitle,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
