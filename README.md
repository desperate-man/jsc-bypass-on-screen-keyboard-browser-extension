## Description

Browser extension for Chrome and Firefox that helps to log in to [Jogos Santa Casa](https://www.jogossantacasa.pt/) website without virtual keyboard.

## Prerequisites:

- [Install Yarn](https://yarnpkg.com/lang/en/docs/install/)
- [Install Node >= 10](https://nodejs.org/en/download/), consider [nvm ](https://github.com/nvm-sh/nvm) (for MacOS) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (for Windows)

## Commands

```sh
yarn # downloads dependencies
yarn dev # for Chrome development, see Debugging/Chrome
yarn dev:firefox # for FF development, see Debugging/Firefox
yarn release # releases Chrome and FF extensions into "./release/${browser}" folders
```

For signing Firefox extension look for `web-ext sign` command reference [here](https://extensionworkshop.com/documentation/develop/web-ext-command-reference#web-ext-sign) or [here](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/).

## Debugging

### Chrome

1. Run `yarn dev`
2. Navigate to [chrome://extensions](chrome://extensions)
3. Switch on "Developer mode"
4. Click "Load unpacked"
5. Point to `./dist` folder

More info: https://developer.chrome.com/apps/tut_debugging

### Firefox

1. Run `yarn dev:firefox` - running this command is enough as it opens a new window with a temporary extension, if it doesn't happen then continue.
2. Navigate to [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox) or "Add-ons -> Settings -> Debug Add-ons"
3. Click "Load Temporary Add-on"
4. Point to `./dist/manifest.json`

More info: https://extensionworkshop.com/documentation/develop/debugging/

## License

All source code in this project are licensed under the MIT license.

Copyright (C) 2019 desperate-man

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Trademarks

Jogos Santa Casa and https://www.jogossantacasa.pt/ are Copyright © Jogos Santa Casa.
