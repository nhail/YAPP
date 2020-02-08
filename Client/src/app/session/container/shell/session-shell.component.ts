import { Component, OnInit } from '@angular/core';
import { SessionShellTabs } from './session-shell-tabs';

@Component({
  templateUrl: './session-shell.component.html',
  styleUrls: ['./session-shell.component.css']
})
export class SessionShellComponent implements OnInit {

  private _currentTab: SessionShellTabs = SessionShellTabs.Create;
  get currentTab(): SessionShellTabs {
    return this._currentTab;
  }
  
  setCurrentTab(tab: SessionShellTabs) {
    this._currentTab = tab;
  }

  get sessionShellTabs() { return SessionShellTabs; }

  constructor() { }

  ngOnInit() {
  }


}
