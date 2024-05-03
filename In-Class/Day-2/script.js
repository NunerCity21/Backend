class House {
    //Properties and functions for how to construct a house
}

const myHouse = new House();

// -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.name = 'Rectangle'
    }
    getArea() {
        return this.height * this.width;
    }
    setHeight(height) {
        this.height = height;
    }
    setWidth(width) {
        this.width = width;
    }
}

class Square extends Rectangle {
    constructor(length) {
        super(length, length);
        this.name= "square";
    }
}

const myRect = new Rectangle(3,4);
console.log(myRect.getArea());

const mySquare = new Square(3,3);
console.log(mySquare.getArea());

// -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

