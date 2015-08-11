# Havana event

[![NPM version](https://badge.fury.io/js/havana-event.svg)](http://badge.fury.io/js/havana-event)
[![Build Status](https://travis-ci.org/colinmeinke/havana-event.svg?branch=master)](https://travis-ci.org/colinmeinke/havana-event)
[![Dependency status](https://david-dm.org/colinmeinke/havana-event.svg)](https://david-dm.org/colinmeinke/havana-event.svg)

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

In the `dist` directory there are four files, the default
is `event.server.js`. The default when using a client-side
bundler that supports the
[browser field](https://gist.github.com/defunctzombie/4339901)
spec is `event.browser.js`.

Havana event currently requires the 
[Babel polyfill](https://babeljs.io/docs/usage/polyfill).
You are expected to supply this yourself. However, as a
courtesy you will also find `event.server.with-polyfill.js`
and `event.browser.with-polyfill.js` in the `dist`
directory.
