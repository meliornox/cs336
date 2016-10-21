/*
* Author: LoganVP
* For exercise 7.2
*/
$( "a" ).addClass( "test" );

//sends alert to browser

//Makes link dissapear
$( "a" ).click(function( event ) {
  event.preventDefault();
  $( this ).hide( "slow" );

  //Adds a paragraph to the dom.
  $( "body" ).html( "<p>no data yet...</p>")
});

$( function() {
    $( ".widget input[type=submit], .widget a, .widget button" ).button();
    $( "button, input, a" ).click( function( event ) {
      event.preventDefault();
        $( "body" ).html( "<p>no data yet...</p>")
    } );
  } );
