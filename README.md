# Extract from CSS

Extract information from CSS code.

For now, it extracts class names and ids.

## Installation

Dependencies:

* node >=0.8.0
* npm >= 1.3.7

```bash
npm install extract-from-css
```

## Usage

```javascript
var extract = require('extract-from-css');
var code = '.list-item { background: red; } ' +
    '/* comment */ ' +
    '#main-header { background: black; } ' +
    '.list-item-title:hover { font-weight: bold}';
extract.extractClasses(code);
// [ 'list-item', 'list-item-title' ]
extract.extractIds(code);
// [ 'main-header' ]
```

Works with nested rules (inside media queries, supports...), complex selectors and escaped characters and unicode symbols (♠, ♥, ★...) in class names and ids. See tests.

## Tests

To run the tests with Jasmine:

```bash
npm install
npm test
```

To run the benchmark:

```bash
npm run benchmark
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

The MIT License (MIT)

Copyright (c) 2014 Rubén Norte

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.