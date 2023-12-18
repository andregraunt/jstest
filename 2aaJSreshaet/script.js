function plus() {
	let num1, num2, tshuva
	num1 = document.getElementById('n1').value
	num1=parseFloat(num1)
	num2=document.getElementById('n2').value
	num2=parseFloat(num2)
	
	tshuva = num1 + num2
	document.getElementById('out').innerHTML = tshuva
}

function minus() {
	
	let num1, num2, tshuva
	num1 = document.getElementById('n1').value
	num1=parseFloat(num1)
	num2=document.getElementById('n2').value
	num2=parseFloat(num2)
	
	tshuva = num1-num2
	document.getElementById('out').innerHTML = tshuva
	
	
}