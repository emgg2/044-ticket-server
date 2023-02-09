const Ticket = require ('./ticket');


class TicketList {
    constructor() {
        this.lastNumber         = 0; 
        this.pendingTickets     = [];
        this.assignedTickets    = [];
    }

    get nextNumber() {
        this.lastNumber++;
        return this.lastNumber;
    }

    // 
    // Return always the 13 last tickets. 3 will show on cards and 10 on history

    get last13() {
        return this.assignedTickets.slice (0,13);
    }    

    createTicket () {
        const newTicket = new Ticket ( this.nextNumber );
        this.pendingTickets.push ( newTicket );
        return newTicket;
    }

    setTicket ( agent, desk ) {
        if ( this.pendingTickets.length === 0) {
            return null;
        }
        const nextTicket = this.pendingTickets.shift();
        nextTicket.agent = agent;
        nextTicket.desk = desk;

        this.assignedTickets.unshift( newTicket );
        return nextTicket;
    }


}

module.exports = TicketList;
