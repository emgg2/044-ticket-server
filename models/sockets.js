
const TicketList = require('./ticket-list');

class Sockets {

    constructor( io ) {
        this.io = io; 

        // Crrear la instancia de ticketsList
        this.ticketList = new TicketList();
        
        this.socketEvents();

    }

    socketEvents( ) {
        // On Connection
        
    this.io.on('connection', ( socket ) => {

      console.log("cliente conectado");

      socket.on('get_new_ticket', (data, callback) => {
        const newTicket = this.ticketList.createTicket();
        callback(newTicket);
      });

      socket.on('set-ticket-to-user', ({ agent, desk }, callback) => {

            const yourTicket = this.ticketList.setTicket( agent, desk );
            callback( yourTicket );
            this.io.emit('ticket-assined', this.ticketList.last13 );
      });
   
   
    });

    }
}

module.exports = Sockets;