let sdvig = 0
let test = document.getElementById('test')

function movi() {
	test.style.marginLeft = sdvig + 'px'
	sdvig = sdvig + 3
	
}

let timer= setInterval(movi, 40)

document.getElementById('stop').onclick = function () {
	
	//onclick = function () {
	clearInterval(timer)
	
	//test.style.marginRigth = sdvig - 'px'
	//sdvig = sdvig - 3
}
 
const myir = {
	gorod: 'jerusalem',
	populyaziya: 'million'
	
}
console.log({myir})

console.log(innerWidth)
