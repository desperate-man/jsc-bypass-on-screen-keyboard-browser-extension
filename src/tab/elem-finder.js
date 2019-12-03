import {
  JSC_CLASS_NAME_KEYBOARD,
  JSC_CLASS_NAME_IFRAME,
  JSC_INPUT_USERNAME,
  JSC_INPUT_PASSWORD,
  JSC_INPUT_HIDDEN_PASSWORD,
  JSC_FAKE_INPUT_PASSWORD,
} from '../shared/constants';

const findInsideElem = elem => {
  const keyboardBoxElem = elem.getElementsByClassName(JSC_CLASS_NAME_KEYBOARD)[0];

  if (keyboardBoxElem) {
    const secretInputs = [...keyboardBoxElem.getElementsByTagName('input')];

    if (secretInputs && secretInputs.length > 0) {
      return secretInputs;
    }
  }

  return null;
};

export const findLoginForm = callback => () => {
  const getIframe = () => {
    const iframe = document.getElementsByClassName(JSC_CLASS_NAME_IFRAME)[0];

    if (iframe) {
      return iframe.contentDocument || iframe.contentDocument.document;
    }

    return undefined;
  };

  const documents = [document, getIframe()];

  for (let i = 0; i < documents.length; i++) {
    if (documents[i]) {
      const secretInputs = findInsideElem(documents[i]);

      if (secretInputs) {
        callback(documents[i], secretInputs);
        break;
      }
    }
  }
};

export const getUsernameInput = document => document && document.getElementById(JSC_INPUT_USERNAME);

export const getPasswordInput = document => document && document.getElementById(JSC_INPUT_PASSWORD);

export const getHiddenPasswordInput = document => document && document.getElementById(JSC_INPUT_HIDDEN_PASSWORD);

export const getOrCreateFakePasswordInput = document => {
  if (document) {
    let fakePasswordInput = document.getElementById(JSC_FAKE_INPUT_PASSWORD);

    if (!fakePasswordInput) {
      const passwordInput = getPasswordInput(document);

      if (passwordInput) {
        fakePasswordInput = passwordInput.cloneNode();
        fakePasswordInput.setAttribute('id', JSC_FAKE_INPUT_PASSWORD);
        passwordInput.style.display = 'none';
        passwordInput.parentNode.appendChild(fakePasswordInput);
      }
    }

    return fakePasswordInput;
  }
};
