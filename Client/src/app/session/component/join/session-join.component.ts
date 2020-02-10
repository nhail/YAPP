import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { PlayerType } from '../../../shared/PlayerType';
import { ValidationHelpers } from '../../../shared/ValidationHelpers';
import { SessionJoinMessages } from './session-join.messages';

@Component({
  selector: 'yapp-session-join',
  templateUrl: './session-join.component.html',
  styleUrls: ['./session-join.component.css']
})
export class SessionJoinComponent implements OnInit {

  joinFormGroup: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.joinFormGroup = this.fb.group({
      name: ['', [ValidationHelpers.addMessage(Validators.required, SessionJoinMessages.NameRequired)]],
      sessionId: ['', [ValidationHelpers.addMessage(Validators.required, SessionJoinMessages.SessionRequired)]]
    })
  }

  get playerType() { return PlayerType; }

  get controls(): { [key: string]: AbstractControl } {
    return this.joinFormGroup.controls;
  }

  onSubmit() {
  }
}
