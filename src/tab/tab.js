import { onIdentifiedTarget } from './actions';

function waitForLoginPage() {
  onIdentifiedTarget(() => {
    document.body.style.border = '5px solid red';
  });
}

waitForLoginPage();
