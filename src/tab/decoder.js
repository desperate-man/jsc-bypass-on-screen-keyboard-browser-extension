import { CHAR_SUFFIX_UPPERCASE, CHAR_SUFFIX_LOWERCASE } from '../shared/constants';

export const getCharacterKey = char => {
  if (!isNaN(char * 1)) {
    return char;
  } else if (char !== char.toUpperCase() && char === char.toLowerCase()) {
    return `${char}${CHAR_SUFFIX_UPPERCASE}`;
  }

  return `${char}${CHAR_SUFFIX_LOWERCASE}`;
};

export const getSecretCharacters = secretInputs => {
  if (secretInputs) {
    return secretInputs.reduce(
      (result, elem) => ({
        ...result,
        [getCharacterKey(elem.value)]: elem.id.substring(1, elem.id.length),
      }),
      {}
    );
  }

  return {};
};
