import { Directive, TemplateRef, ViewContainerRef, effect, inject, Input } from '@angular/core';

import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  @Input('appAuth') userType: Permission = 'guest';

  private authService = inject(AuthService);

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
    effect(() => {
      this.viewContainerRef.clear();
      if (this.authService.activePermission() == this.userType) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}
