
module.exports.promiseFib = function(number) {    
    return new Promise(function(resolve){
        setTimeout(function() {
            let retVal = fib(number);
        resolve(retVal);
        },0);        
    });
}

const fib = function(number) {
    if(number<=2) {
        return number;
    } else {
        return fib(number-1) + fib(number-2);
    }    
}

//console.log("Fibonacci of 42 is " + fib(42));