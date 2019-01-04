// Commando for create the connection

var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Connecting to server');
});

socket.on('disconnect', function () {
    console.log("Disconnecting to server");
});

socket.on('currentStatus', function (data) {
   label.text(data.current);
});

$('button').on('click', function () {
    socket.emit('next_ticket', null, function (nextTicket) {
        label.text(nextTicket);
    });
});