import {
  CLASS_NAME_KEYBOARD,
  CLASS_NAME_IFRAME,
  INPUT_USERNAME,
  INPUT_PASSWORD,
  INPUT_HIDDEN_PASSWORD,
} from './constants';

const findInsideElem = elem => {
  const keyboardBoxElem = elem.getElementsByClassName(CLASS_NAME_KEYBOARD)[0];

  if (keyboardBoxElem) {
    const secretInputs = [...keyboardBoxElem.getElementsByTagName('input')];

    if (secretInputs && secretInputs.length > 0) {
      return secretInputs;
    }
  }

  return null;
};

export const findTarget = callback => () => {
  const getIframe = () => {
    const iframe = document.getElementsByClassName(CLASS_NAME_IFRAME)[0];

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

export const getUsernameInput = document => document.getElementById(INPUT_USERNAME);

export const getPasswordInput = document => document.getElementById(INPUT_PASSWORD);

export const getHiddenPasswordInput = document => document.getElementById(INPUT_HIDDEN_PASSWORD);
