import { findTarget, getUsernameInput, getPasswordInput, getHiddenPasswordInput } from './finder';
import { getSecretCharacters } from './decoder';
import { TARGET_SEARCH_INTERVAL } from './constants';

let ownerDocument = null;
let secretInputs = null;

export function onIdentifiedTarget(callback) {
  const finder = findTarget((foundOwnerDocument, foundSecretInputs) => {
    ownerDocument = foundOwnerDocument;
    secretInputs = foundSecretInputs;
    callback();
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

export function enterLoginDetails(username, password) {
  if (secretInputs && username && password) {
    const usernameInput = getUsernameInput(ownerDocument);
    const passwordInput = getPasswordInput(ownerDocument);
    const hiddenPasswordInput = getHiddenPasswordInput(ownerDocument);
    const charsToSecretKeysMap = getSecretCharacters(secretInputs);

    if (Object.keys(charsToSecretKeysMap).length) {
      [passwordInput, hiddenPasswordInput].forEach(elem => elem.removeAttribute('readonly'));

      const hiddenPassword = password
        .split('')
        .reduce((result, char) => (result += charsToSecretKeysMap[getCharacterKey(char)]), '');

      usernameInput.value = username;
      passwordInput.value = password;
      hiddenPasswordInput.value = hiddenPassword;
    }
  }
}
