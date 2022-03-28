import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/animations/route.animations';
import { Observable } from 'rxjs';
import { BudegaUser, Role } from '../models/models';
import { Store } from '@ngrx/store';
import {
  AppState,
  selectBudegaRolesList,
  selectBudegaUserList
} from '../user.selectors';
import {
  loadBudegaRoles,
  loadBudegaUsers,
  registerBudegaEmployee
} from '../user.actions';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'budega-users-main',
  templateUrl: './users-main.component.html',
  styleUrls: ['./users-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersMainComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  userList$: Observable<BudegaUser[]>;
  roleList$: Observable<Role[]>;
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    role: [null, [Validators.required]]
  });

  // TODO: bug on enable -> se clicar e esperar o balão sair muda o estado q so deveria mudar com a confirmação
  // TODO: Ao criar usuário novo redirecionar para edição -> completar o cadastro
  // TODO: melhorar mensagem de erro no form do novo usuário
  // TODO: Ver se é preciso usar um reducer para o ativar e desativar

  constructor(private userStore: Store<AppState>, private fb: FormBuilder) {
    this.userList$ = this.userStore.select(selectBudegaUserList);
    this.roleList$ = this.userStore.select(selectBudegaRolesList);
  }

  ngOnInit(): void {
    this.userStore.dispatch(loadBudegaUsers());
    this.userStore.dispatch(loadBudegaRoles());
  }

  save() {
    this.userStore.dispatch(
      registerBudegaEmployee({ newBudegaEmployee: this.form.value })
    );
  }

  submit() {
    if (this.form.valid) {
      this.save();
    }
  }

  customCompare(o1, o2) {
    return o1.id === o2.id;
  }
}
