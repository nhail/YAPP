import { NgModule } from '@angular/core';

import { SessionShellComponent } from './container/shell/session-shell.component';
import { SessionCreateComponent } from './component/create/session-create.component';
import { SessionJoinComponent } from './component/join/session-join.component';
import { SessionRoutingModule } from './session-routing.module';
import { CommonModule } from '@angular/common';
import { UserInterfaceModule } from '../shared/user-interface.module';

@NgModule({
  imports: [
    CommonModule,
    SessionRoutingModule,
    UserInterfaceModule
  ],
  declarations: [
    SessionShellComponent,
    SessionCreateComponent,
    SessionJoinComponent
  ]
})
export class SessionModule { }
