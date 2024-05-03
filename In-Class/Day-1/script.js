let control = process.argv[2].toLowerCase();
console.log(control);

if (control === 'even') {
    for (let i = 1; i < 11; i++) {
        console.log (i, ": counting: ", i * 2);
    }
} else if (control === 'odd') {
    for (let i = 1; i < 11; i++) {
        console.log (i, ": counting: ", i * 2 - 1);
    }
}



console.log("Hellow MTECH");

let input = process.argv
let count