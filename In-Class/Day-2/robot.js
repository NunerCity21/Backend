const EventEmitter = require('events');

class Robot extends EventEmitter {
    constructor(name) {
        super();
        this.name = name;
        this.isActive = false;  
        this.addListeners();
    }
    addListeners() {
        this.once('activate', function() {
            this.isActive = true;
        });
        this.on('speak', function(quote) {
            if (this.isActive) {
                console.log(`${this.name}: ${quote}`)
            }
        });
    }
}

const bender = new Robot("bender");
const asdf = new Robot("asdf");

bender.emit("speak", "Hello"); // Not True doesnt print
bender.emit("activate"); // Turns to ture so furture emit will print
bender.emit("speak", "asdf"); // Prints because true

asdf.emit("speak", "Hi");