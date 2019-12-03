import { findLoginForm, getPasswordInput, getHiddenPasswordInput, getOrCreateFakePasswordInput } from './elem-finder';
import { getCharacterKey, getSecretCharacters } from './decoder';
import { TARGET_SEARCH_INTERVAL } from '../shared/constants';

let ownerDocument = null;
let secretInputs = null;

function onPasswordChanged(e, passwordInput, hiddenPasswordInput, charsToSecretKeysMap) {
  const hiddenPassword = e.target.value
    .split('')
    .reduce((result, char) => (result += charsToSecretKeysMap[getCharacterKey(char)]), '');

  passwordInput.value = e.target.value;
  hiddenPasswordInput.value = hiddenPassword;
}

export function startWaitingForLoginForm(onLoginFormFound) {
  const finder = findLoginForm((foundOwnerDocument, foundSecretInputs) => {
    if (ownerDocument !== foundOwnerDocument) {
      ownerDocument = foundOwnerDocument;
      secretInputs = foundSecretInputs;

      if (onLoginFormFound) {
        onLoginFormFound();
      }
    }
  });

  const checkInterval = setInterval(finder, TARGET_SEARCH_INTERVAL);

  setTimeout(finder, 0);

  return {
    remove: () => {
      clearInterval(checkInterval);
      ownerDocument = null;
      secretInputs = null;
    },
  };
}

export function startTrackingCredentials() {
  const passwordInput = getPasswordInput(ownerDocument);
  const hiddenPasswordInput = getHiddenPasswordInput(ownerDocument);

  if (secretInputs && passwordInput && hiddenPasswordInput) {
    const fakePasswordInput = getOrCreateFakePasswordInput(ownerDocument);
    const charsToSecretKeysMap = getSecretCharacters(secretInputs);

    if (Object.keys(charsToSecretKeysMap).length) {
      [passwordInput, hiddenPasswordInput, fakePasswordInput].forEach(elem => elem.removeAttribute('readonly'));

      fakePasswordInput.addEventListener('input', e =>
        onPasswordChanged(e, passwordInput, hiddenPasswordInput, charsToSecretKeysMap)
      );
    }
  }
}
