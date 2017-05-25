if ( Meteor.isClient ) {
	Meteor.startup(function () {  
		// Use Meteor.startup to render the component after the page is ready
		ReactDOM.render( <InsertForm />, document.getElementById("render-target") );
	});
}

if( Meteor.isServer ) {
	Future = Npm.require( 'fibers/future' );
}