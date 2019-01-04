var socket = io();
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblDesktop1 = $('#lblDesktop1');
var lblDesktop2 = $('#lblDesktop2');
var lblDesktop3 = $('#lblDesktop3');
var lblDesktop4 = $('#lblDesktop4');

var tickets = [ lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var desktops = [ lblDesktop1, lblDesktop2, lblDesktop3, lblDesktop4 ];

socket.on('currentStatus', function (data) {
    console.log(data);
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    renderHTML(data.last_4);
});

function renderHTML( last_4 ) {
    for (var i=0; i<=last_4.length-1; i++ ){
        tickets[i].text('Ticket: ' + last_4[i].num);
        desktops[i].text('Desktop: ' + last_4[i].desktop);
    }
}
