# bbcode-to-react - fork

This repository is a fork of the __original__ [https://github.com/JimLiu/bbcode-to-react](JimLiu/bbcode-to-react) by Junmin Liu. 
The fork has been updated to provide compatibility with React 18 and aims for 'some' maintenance.

bbcode-to-react is a versatile utility that allows you to convert raw BBCode into React elements seamlessly.

## Updates

06-02-2023 - __Font size mapping__ - _Some bb codes contains size=large parameter, which were not supported._
A props system was created to allow future quick|small customization to specific needs on tags.

```js
parser.setProps({
  fontSizes: {
    "small": "0.8em",
    "medium": "1em",
    "large": "1.2em",
  }
})
```

## Installation

Install `bbcode-to-react` and __peer dependencies__ via NPM

```sh
npm install --save bbcode-to-react react
```

Import `bbcode-to-react`, example:

```js
import React from 'react';
import parser from 'bbcode-to-react';
import { renderToString } from 'react-dom/server';

const Example = (props) => {
  return (
    <p>{parser.toReact('[b]strong[/b]')}</p>
  );
}

// render: <p><strong>strong</strong></p>
console.log(renderToString(<Example />));


```

## Add new tag example

```js
import React from 'react';
import parser, { Tag } from 'bbcode-to-react';

class YoutubeTag extends Tag {
  toReact() {
    // using this.getContent(true) to get it's inner raw text.
    const attributes = {
      src: this.getContent(true),
      width: this.params.width || 420,
      height: this.params.height || 315,
    };
    return (
      <iframe
        {...attributes}
        frameBorder="0"
        allowFullScreen
      />
    );
  }
}

class BoldTag extends Tag {
  toReact() {
    // using this.getComponents() to get children components.
    return (
      <b>{this.getComponents()}</b>
    );
  }
}

parser.registerTag('youtube', YoutubeTag); // add new tag
parser.registerTag('b', BoldTag); // replace exists tag

const Example = (props) => {
  return (
    <p>{parser.toReact('[youtube width="400"]https://www.youtube.com/embed/AB6RjNeDII0[/youtube]')}</p>
  );
}

```

## Development

Install dependencies:

```sh
npm install
```

Run examples at [http://localhost:8080/](http://localhost:8080/) with webpack dev server:

```sh
npm start
```

Run tests & coverage report:

```sh
npm test
```

Watch tests:

```sh
npm run test-watch
```

# Credits

* **bbcodejs:** `bbcode-to-react` uses the parser from [bbcodejs](https://github.com/vishnevskiy/bbcodejs), so much of the credit is due there.
* **reactstrap:** `bbcode-to-react` uses the webpack config and publish scripts from [reactstrap](https://github.com/reactstrap/reactstrap).



