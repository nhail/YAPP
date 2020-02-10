export enum SessionCreateMessages {
  NameRequired = 'Name is required',
  ShowVotesRequired = 'Who can show votes is required',
  ResetVotesRequired = 'Who can reset votes is required'
}

if (!Object.isFrozen(SessionCreateMessages)) {
  Object.freeze(SessionCreateMessages);
}
