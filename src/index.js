function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const incomeArr = expr.match(/\d+|\+|\-|\*|\/|\(|\)/g),
        arrNumbers =[],
        arrSigns =[];

    const checkBrackets = (arr) => {
		let counter = 0;
		arr.forEach((item) => {
			if(item == '(') counter++;
			if(item == ')') counter--;
		})
		if (counter == 0) return true;
		else return false;
    }
    
    if(!checkBrackets(incomeArr)) throw new Error("ExpressionError: Brackets must be paired");
    const priorities = {
		'+':1,
		'-':1,
		'*':2,
		'/':2,
    }
    
    const countNumbers = (num1, num2, operator) => {
		if (num1 == 0 && operator == '/') throw new Error("TypeError: Division by zero.")
		
		switch(operator){
			case '+': return (+num2 + +num1);
			break;
			case '-': return (num2 - num1);
			break;
			case '*': return (num2 * num1);
			break;
			case '/': return (num2 / num1);
			break;
		}	
    }
    
    for(var i = 0; i < incomeArr.length; i++){
	   
        if( !isNaN(incomeArr[i]) ) arrNumbers.push(incomeArr[i]);
	   
	    else if(incomeArr[i] == '(') arrSigns.push(incomeArr[i]);
	   
	    else{
	   
			if(arrSigns.length == 0 || priorities[incomeArr[i]] > priorities[arrSigns[arrSigns.length-1]]) arrSigns.push(incomeArr[i]);
			
            else if(arrSigns[arrSigns.length-1] == '(')  incomeArr[i] == ')' ? arrSigns.pop() : arrSigns.push(incomeArr[i]);
			 
            else if(incomeArr[i] == ')') {
                arrNumbers.push(countNumbers(arrNumbers.pop(), arrNumbers.pop(), arrSigns.pop()));
				i--;
            }  
			else{
                arrNumbers.push(countNumbers(arrNumbers.pop(), arrNumbers.pop(), arrSigns.pop()));
                i--;
            }
        }
    }


    if(arrNumbers.length > 1){
		arrNumbers.forEach(item => {
			arrNumbers.push(countNumbers(arrNumbers.pop(), arrNumbers.pop(), arrSigns.pop()));
		});  
    }

    if(arrNumbers.length == 1) return parseFloat(arrNumbers[0]);
    else throw new ExpressionError('ExpressionError: Brackets must be paired');


}

module.exports = {
    expressionCalculator
}