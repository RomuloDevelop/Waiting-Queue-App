
const fs = require('fs');
const Ticket = require('./Ticket');

class TicketControl {
    constructor(){
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];
        let data = JSON.parse(fs.readFileSync('server/data/data.json'));
        if(data.today === this.today) {
            this.last = data.last;
            this.last4 = data.last4;
            this.tickets = data.tickets;
        } else {
            this.restartCount();
        }
    }

    next() {
        this.last += 1;
        const ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveFile();
        return this.getLastTicket();
    }

    getLastTicket(){
        return `Ticket ${this.last}`
    }

    getLast4Tickets(){
        return this.last4;
    }

    attendTicked(office){
        if(this.tickets.length === 0){
            return "There is no tickets";
        }
        let ticketNumber = this.tickets[0].number;
        this.tickets.shift();
        const ticket = new Ticket(ticketNumber, office);
        this.last4.unshift(ticket);
        if(this.last4.length > 4){
           this.last4.splice(-1,1);
        }
        console.log('Ultimos 4', this.last4);
        this.saveFile();
        return ticket;
    }

    restartCount() {
        this.last = 0;
        this.tickets = [];
        this.last4 = [];
        console.log('Se ha reiniciado el sistema');
        this.saveFile();
        return `Ticket ${this.last}`;
    }

    saveFile(){
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4,
        };
        jsonData = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json',jsonData);
    }

}


module.exports = TicketControl;