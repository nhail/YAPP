import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SessionShellComponent } from './container/shell/session-shell.component';
import { SessionCreateComponent } from './component/create/session-create.component';
import { SessionJoinComponent } from './component/join/session-join.component';
import { SessionRoutingModule } from './session-routing.module';
import { UserInterfaceModule } from '../shared/user-interface.module';
import { ShellInfoComponent } from './component/info/shell-info.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SessionRoutingModule,
    UserInterfaceModule
  ],
  declarations: [
    SessionShellComponent,
    SessionCreateComponent,
    SessionJoinComponent,
    ShellInfoComponent
  ]
})
export class SessionModule { }
