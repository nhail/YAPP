import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ValidationHelpers } from '../../../shared/ValidationHelpers';
import { SessionCreateMessages } from './session-create.messages';
import { PlayerType } from '../../../shared/PlayerType';

@Component({
  selector: 'yapp-session-create',
  templateUrl: './session-create.component.html',
  styleUrls: ['./session-create.component.css']
})
export class SessionCreateComponent implements OnInit {
  createFormGroup: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createFormGroup = this.fb.group({
      name: ['', [ValidationHelpers.addMessage(Validators.required, SessionCreateMessages.NameRequired)]],
      changeVote: [true],
      showVotes: [[PlayerType.Pig, PlayerType.Chicken], [ValidationHelpers.addMessage(Validators.required, SessionCreateMessages.ShowVotesRequired)]],
      resetVotes: [[PlayerType.Pig, PlayerType.Chicken], [ValidationHelpers.addMessage(Validators.required, SessionCreateMessages.ResetVotesRequired)]]
    })
  }

  get playerType() { return PlayerType; }

  get controls(): { [key: string]: AbstractControl } {
    return this.createFormGroup.controls;
  }

  onSubmit() {
  }
}
