module.exports.addTwoNumber= function(req,res) {
    const firstNum = parseInt(req.params.firstNum);
    var secondNum = 0;
    if(req.query && req.query.secondNum){
        secondNum = parseInt(req.query.secondNum);
    }
    
    var totalNum = firstNum + secondNum;

    console.log("GET Add two number ", firstNum,"and ",secondNum);
    res.status(200).send("Total " + firstNum + " + " + secondNum + " = " + totalNum);
}