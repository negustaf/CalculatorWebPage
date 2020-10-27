/*Get the Top Display Area and create initial current value to an empty string*/
var display = document.getElementById('ans');
/*Create global variables to add key clicks to*/
var current = '';
var currentArr = '';
/*Create global length variable*/
var len = current.length;
/*create global variable for previous calcs*/
var previous = [];
var currentCalc = '';

/*When you click a digit it is added to the display and current string value; add current string value as html to the display; update the current array */
document.getElementById('one').onclick = function(){current += this.value; display.innerHTML = current;currentArr = current.split(' ');}
document.getElementById('two').onclick = function(){current += this.value; display.innerHTML = current;currentArr = current.split(' ');}
document.getElementById('three').onclick = function(){current += this.value; display.innerHTML = current;currentArr = current.split(' ');}
document.getElementById('four').onclick = function(){current += this.value; display.innerHTML = current;currentArr = current.split(' ');}
document.getElementById('five').onclick = function(){current += this.value; display.innerHTML = current;currentArr = current.split(' ');}
document.getElementById('six').onclick = function(){current += this.value; display.innerHTML = current;currentArr = current.split(' ');}
document.getElementById('seven').onclick = function(){current += this.value; display.innerHTML = current;currentArr = current.split(' ');}
document.getElementById('eight').onclick = function(){current += this.value; display.innerHTML = current;currentArr = current.split(' ');}
document.getElementById('nine').onclick = function(){current += this.value; display.innerHTML = current;currentArr = current.split(' ');}
document.getElementById('zero').onclick = function(){current += this.value; display.innerHTML = current;currentArr = current.split(' ');}

/*When you click a operator: current is empty than display 'error'
if another operator precedes it, replace that operator with current operator,
 else add operator to end of 'current' and display.*/
document.getElementById('multiply').onclick = function(){
	len = currentArr.length;
	if (current == ''){  //if current hasn't had a digit entered than display an error and add nothing to current
		display.innerHTML = 'ERROR';
	}else if (currentArr[len-1] == ''){ //When splitting a string that ends with  a space (like our operator ' * '), the last item in the array will be an empty string
		currentArr.splice(-2,2,'*', ''); //here I used splice to remove last two array items and replaced them with current operator and another empty string
		current = currentArr.join(' '); //then join the array to update the current string
		display.innerHTML = current //and update the dispay to the current string

	}else{ //if current isn't empty or end with empty string (operator) then just add the new operator
		current += this.value; display.innerHTML = current;currentArr = current.split(' '); len = currentArr.length;
	}
}
document.getElementById('divide').onclick = function(){
	len = currentArr.length;
	if (current == ''){
		display.innerHTML = 'ERROR';
	}else if (currentArr[len-1] == ''){
		currentArr.splice(-2,2,'/', '')
		current = currentArr.join(' ');
		display.innerHTML = current

	}else{
		current += this.value; display.innerHTML = current;currentArr = current.split(' '); len = currentArr.length;
	}
}
document.getElementById('plus').onclick = function(){
	len = currentArr.length;
	if (current == ''){
		display.innerHTML = 'ERROR';
	}else if (currentArr[len-1] == ''){
		currentArr.splice(-2,2,'+', '')
		current = currentArr.join(' ');
		display.innerHTML = current

	}else{
		current += this.value; display.innerHTML = current;currentArr = current.split(' '); len = currentArr.length;
	}
}
document.getElementById('minus').onclick = function(){
	len = currentArr.length;
	if (current == ''){
		display.innerHTML = 'ERROR';
	}else if (currentArr[len-1] == ''){
		currentArr.splice(-2,2,'-', '')
		current = currentArr.join(' ');
		display.innerHTML = current;

	}else{
		current += this.value; display.innerHTML = current;currentArr = current.split(' '); len = currentArr.length;
	}
}


/*Pressing clear will set current back to empty string and set display to current*/
document.getElementById('buttonclear').onclick = function(){
	current = ''; display.innerHTML = current;
}

/*Pressing eqaul button: error if  current is empty string, error if divide by zero, else run multiDivide function */
document.getElementById('equal').onclick = function(){
	var len = currentArr.length;
	//var divByZ = [currentArr.slice(-2, len)];
		if (currentArr[len-1] == ''){ //if current ends with an operator then 'error'
			display.innerHTML = 'ERROR';
			current = '';
			currentArr = [];
		}else if (currentArr[len-2] == '/' && currentArr[len-1] == '0'){
			display.innerHTML = 'ERROR';
			current = '';
		}else if (currentArr == ''){ //prevents additional presses of equal button
		}else{
			document.getElementById('operations').innerHTML = '<p>' + current + '</p>'; //add to Order of Ops
			currentCalc = current; //saves the current string for adding to last 5 calculations div
			multiDivide(current); //starts calculation functions
			current = ''; //clears current string to prepare for next entry
			currentArr = '';
		}
}

/*here are the 2 functions needed to compute the calculations*/
function multiDivide (current){ //handles the multiplication and division left to right
	var currentArr = current.split(' ');
	var len = currentArr.length;
	var i = 1;
	while (i <= len){
		if (currentArr[i] === '*' || currentArr[i] === '/'){//when it finds the first * or / from left to right
			a = currentArr[i-1]; //number before the operator
			op = currentArr[i]; //this is the location of the * or /
			b = currentArr[i+1];//number after the operator
				if (op == '*'){
					firstOp = a * b;//multiplying strings already in interger format converts them to numbers
					currentArr.splice(i-1, 3, firstOp);//remove the first 3 array items, and replace with the single value of the firstOp
					current = currentArr.join(' ')//update current string
					document.getElementById('operations').innerHTML += '<p>' + current + '</p>';//add a line to operations div

				}else{
					firstOp = a / b;//dividing strings already in interger format converts them to numbers
					currentArr.splice(i-1, 3, firstOp);
					current = currentArr.join(' ')
					document.getElementById('operations').innerHTML += '<p>' + current + '</p>';

				}
		}else{
			i++
		}
	}
	addSubtract(current) //Call addSubtract function. current will now only contain addition and subtraction and is passed to  the addSubtract function this way.
}

function addSubtract (current){//handles addition and subtraction.
	var currentArr = current.split(' ');//make a new updated array
	var len = currentArr.length;
	var i = 1;
	while (i < len){
		if (currentArr[i] === '+' || currentArr[i] === '-'){
			a = currentArr[i-1];
			op = currentArr[i];
			b = currentArr[i+1];
				if (op == '+'){
					firstOp = +a + +b;//the left leading '+' turns the string (in integer format) into a number.
					currentArr.splice(i-1, 3, firstOp); //this removes the first 3 in the array and replaces them with the single value of current firstOp
					len = currentArr.length //update length
					current = currentArr.join(' ')//update the current string
					document.getElementById('operations').innerHTML += '<p>' + current + '</p>';//log a line in the operations div

				}else{
					firstOp = a - b; //
					currentArr.splice(i-1, 3, firstOp);
					len = currentArr.length
					current = currentArr.join(' ')
					document.getElementById('operations').innerHTML += '<p>' + current + '</p>';
				}
		}else{
			i++
		}
	}
	display.innerHTML = current;
	last5calcs(currentCalc, current);
}

/*previous calculation function*/
function last5calcs(currentCalc, current){ //passing in the stored current calculation and the current string that has been solved
	var last5 = document.getElementById('last5')
	last5.innerHTML= '';
	previous.unshift(currentCalc + ' = ' + current);
	var i = 0
	while (i < 5){
		if (previous[i] == undefined){
			i++
		}else{
			last5.innerHTML += '<p>' + previous[i] + '</p>';
			i++
		}
	}
}
