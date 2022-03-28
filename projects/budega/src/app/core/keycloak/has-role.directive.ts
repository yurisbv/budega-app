import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { AuthGuardService } from './auth-guard.service';

@Directive({
  selector: '[budegaHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() budegaHasRole: string[];
  isVisible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private keycloakAuthService: AuthGuardService
  ) {}

  ngOnInit() {
    this.keycloakAuthService.getUserRole().then((roles) => {
      if (!roles) {
        this.viewContainerRef.clear();
      }
      for (const role of this.budegaHasRole) {
        if (roles.includes(role)) {
          if (!this.isVisible) {
            this.isVisible = true;
            this.viewContainerRef.createEmbeddedView(this.templateRef);
            return;
          }
        } else {
          this.isVisible = false;
          this.viewContainerRef.clear();
        }
      }
    });
  }
}
