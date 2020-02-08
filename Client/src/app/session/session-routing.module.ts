import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { SessionShellComponent } from './container/shell/session-shell.component';

const sessionRoutes: Routes = [
  { path: '', component: SessionShellComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(sessionRoutes)
  ],
  exports: [RouterModule]
})
export class SessionRoutingModule { }
