const EventEmitter = require('events');

class Plant extends EventEmitter {
    constructor(name) {
        super();
        this.name = name;
        this.size = 0;
        this.hasBeenPlanted = false;
    }

    addListeners() {
        this.once('plantSeed', () => {
            this.size = 1;
            this.hasBeenPlanted = true;
            console.log("The plant has been planted and the new size is 1.");
        });
        this.on('water', () => {
            if (this.hasBeenPlanted === true) {
                this.size += 1;
                console.log(`Water: The plants new size is: ${this.size}`);
            }
        });
        this.on('bugAttack', () => {
            if (this.hasBeenPlanted === true) {
                this.size -= 1;
                console.log(`Bug Attack: The plants new size is: ${this.size}`);
            }
        });
        this.on('harvest', () => {
            if (this.hasBeenPlanted === true) {
                // Remove all listeners
                console.log("The plant has been harvested.");
                this.removeAllListeners();
            } else if (this.hasBeenPlanted === false) {
                console.log("The seed is not planted yet.")
            }
        });
        this.on('error', () => {
            console.log("An Error Has Occured.");
        })
    }
}

const Seed = new Plant("Seed");
Seed.addListeners();
Seed.emit("plantSeed");
Seed.emit("water")
Seed.emit("bugAttack");
Seed.emit("water");
Seed.emit("water");
Seed.emit("water");
Seed.emit("harvest");