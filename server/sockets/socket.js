const { io } = require('../server');
const TicketControl = require('../classes/TicketControl');

io.on('connection', (client) => {

    console.log('User connected');
    const ticket = new TicketControl();

    client.emit('actualState',{
        ticket: ticket.getLastTicket(),
        last4: ticket.getLast4Tickets()
    });

    client.on('disconnect', () => {
        console.log('User disconnected');
    });

    client.on('nextTicket', (data, cb) => {
        ticket.next();
        cb(`Next Ticket: ${ticket.last}`);
    });

    client.on('attendTicket', (data, cb) => {
        if(!data.office) {
            return cb({
                ok: false,
                message: "The office is required"
            });
        }

        let attendTicket = ticket.attendTicked(data.office);
        client.broadcast.emit('actualState',{
            ticket: ticket.getLastTicket(),
            last4: ticket.getLast4Tickets()
        });
        cb({
            ok: true,
            ticked: (attendTicket.number)?attendTicket.number:attendTicket
        });
    });
});