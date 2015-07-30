# Havana event

[![Build Status](https://travis-ci.org/colinmeinke/havana-event.svg?branch=master)](https://travis-ci.org/colinmeinke/havana-event)

A simple publish/subscribe pattern.

## How to install

```
npm install havana-event
```

## How to use

At it's most basic:

```javascript
import Event from 'havana-event';

const event = new Event();

event.subscribe( 'createWorld', () => {
  console.log( 'hello world' );
});

event.publish( 'createWorld' );
```

A slightly more complex example:

```javascript
import Event from 'havana-event';

const event = new Event();

const token = event.subscribe( 'personBorn', data => {
  console.log( `hello ${data.name}` );
});

event.publish( 'personBorn', {
  'name': 'Colin'
});

event.unsubscribe( token );
```

## ES2015+

Havana event is written using ES2015+ syntax.

However, by default this module will use an ES5
compatible file that has been compiled using
[Babel](https://babeljs.io).

Havana event currently requires the 
[Babel polyfill](https://babeljs.io/docs/usage/polyfill).
In the `dist` directory there are two files, the default
`event.js` and `event.with-polyfill.js` that includes
the Babel browser polyfill.
