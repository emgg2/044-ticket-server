const BandList = require('./band-list');


class Sockets {

    constructor( io ) {
        this.io = io; 
        this.bandList = new BandList();
        this.socketEvents();

    }

    socketEvents( ) {
        // On Connection
        
    this.io.on('connection', ( socket ) => {

      console.log("cliente conectado");

      // Emitir al cliente conectado todas las bandas actuales
      socket.emit( 'current-bands', this.bandList.getBands() );

      // vote for a band
      socket.on( 'vote-a-band', (id) => {
        this.bandList.increaseVotes( id );
        this.io.emit( 'current-bands', this.bandList.getBands() )
      })
   
   
    });

    }
}

module.exports = Sockets;