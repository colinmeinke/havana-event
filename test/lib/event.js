/* global describe before beforeEach it */

import Event from '../../dist/event.with-polyfill';
import chai from 'chai';

const expect = chai.expect;

describe( 'Event', () => {
  let event, callbacks, hello, world;

  before(() => {
    event = new Event();
  });

  beforeEach(() => {
    callbacks = [];
  });

  describe( 'token', () => {
    it( 'should be private', () => {
      expect( event ).to.not.have.property( 'token' );
    });
  });

  describe( 'subs', () => {
    it( 'should be private', () => {
      expect( event ).to.not.have.property( 'subs' );
    });
  });

  describe( 'subscribe()', () => {
    it( 'should return unique tokens', () => {
      hello = event.subscribe( 'helloWorld', () => {
        callbacks.push( 'hello' );
      });

      world = event.subscribe( 'helloWorld', () => {
        callbacks.push( 'world' );
      });

      expect( hello ).to.not.equal( world );
    });
  });

  describe( 'publish()', () => {
    it( 'should fire subscriber callbacks', () => {
      event.publish( 'helloWorld' );
      expect( callbacks ).to.include.members([ 'hello', 'world' ]);
    });
  });

  describe( 'unsubscribe()', () => {
    it( 'should remove subscriber callbacks', () => {
      event.unsubscribe( hello );
      event.unsubscribe( world );

      event.publish( 'helloWorld' );

      expect( callbacks.length ).to.equal( 0 );
    });
  });
});
