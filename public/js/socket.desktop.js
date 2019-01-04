
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if( !searchParams.has('desktop') ){
    window.location = 'index.html';
    throw new Error('The desktop is required');
}

var desktop = searchParams.get('desktop');
var label = $('small');

console.log(desktop);
$('h1').text('Desktop ' + desktop);

$('button').on('click', function () {
   socket.emit(
       'attendTicket',
       {
        desktop : desktop
       },
       function (resp) {
           if( resp === "No more tickets" ){
               label.text(resp);
               alert(resp);
               return;
           }
           label.text("Ticket: " + resp.num);
       }
       );
});