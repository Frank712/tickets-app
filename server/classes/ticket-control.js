const fs = require('fs');

class Ticket {
    constructor(num, desktop){
        this.num = num;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor(){
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last_4 = [];

        let data = require('../data/data.json');
        if( data.today === this.today  ){
            this.last = data.last;
            this.tickets = data.tickets;
            this.last_4 = data.last_4;
        } else {
            this.resetCount();
        }
    }

    nextTicket(){
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.saveDataHistory();
        return `Ticket ${this.last}`;
    }

    getCurrentStatus(){
        return `Ticket ${this.last}`;
    }

    getLastFour(){
        return this.last_4;
    }

    attendTicket( desktop ){
        if( this.tickets.length === 0 ){
            return 'No more tickets';
        }
        let numTicket = this.tickets[0].num;
        this.tickets.shift();

        let attend = new Ticket(numTicket, desktop);
        this.last_4.unshift( attend );

        if( this.last_4.length > 4 ){
            this.last_4.splice(-1, 1);
        }

        console.log("last_4 = ", this.last_4);
        this.saveDataHistory();
        return attend;
    }

    resetCount (){
        this.last = 0;
        this.tickets = [];
        this.last_4 = [];
        this.saveDataHistory();
        console.log('The system has been reset!');
    }

    saveDataHistory(){
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last_4: this.last_4
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
};