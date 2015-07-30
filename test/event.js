var Event = require( '../dist/event.with-polyfill' );
var expect = require( 'chai' ).expect;

describe( 'Event', function () {

  var event, callbacks, hello, world;

  before( function () {
    event = new Event();
  });

  beforeEach( function () {
    callbacks = [];
  });

  describe( 'token', function () {
    it( 'should be private', function () {
      expect( event ).to.not.have.property( 'token' );
    });
  });

  describe( 'subs', function () {
    it( 'should be private', function () {
      expect( event ).to.not.have.property( 'subs' );
    });
  });

  describe( 'subscribe()', function () {
    it( 'should return unique tokens', function () {
      hello = event.subscribe( 'helloWorld', function () {
        callbacks.push( 'hello' );
      });

      world = event.subscribe( 'helloWorld', function () {
        callbacks.push( 'world' );
      });

      expect( hello ).to.not.equal( world );
    });
  });

  describe( 'publish()', function () {
    it( 'should fire subscriber callbacks', function () {
      event.publish( 'helloWorld' );
      expect( callbacks ).to.include.members([ 'hello', 'world' ]);
    });
  });

  describe( 'unsubscribe()', function () {
    it( 'should remove subscriber callbacks', function () {
      event.unsubscribe( hello );
      event.unsubscribe( world );

      event.publish( 'helloWorld' );

      expect( callbacks ).to.be.empty;
    });
  });

})
