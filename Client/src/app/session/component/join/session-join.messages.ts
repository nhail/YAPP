export enum SessionJoinMessages {
  NameRequired = 'Name is required',
  SessionRequired = 'Session is required',
}

if (!Object.isFrozen(SessionJoinMessages)) {
  Object.freeze(SessionJoinMessages);
}
