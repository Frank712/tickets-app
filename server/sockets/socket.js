const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

let ticket = new TicketControl();

io.on('connection', (client) => {
    console.log('User connected!');
    client.emit('currentStatus', {
        current: ticket.getCurrentStatus(),
        last_4: ticket.getLastFour()
    });

    client.on('next_ticket', ( data, callback )=>{
        let next = ticket.nextTicket();
        console.log('The next ticker is: ', next);
        callback(next);
    });

    client.on('attendTicket', (data, callback) =>{
        if( !data.desktop ){
            return callback({
                err: true,
                message: 'The desktop is required'
            });
        }
        let attend = ticket.attendTicket( data.desktop );
        client.broadcast.emit('currentStatus', {
            last_4: ticket.getLastFour()
        });
        callback(attend);

    });
});