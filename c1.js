function sum(...args) {
    let sum = 0
    for(let arg of args) {
        sum += arg;}
    return console.log(sum)
};

sum(1,2,7);
sum(1,4);
sum(11);
sum(10,3,6,7,9);