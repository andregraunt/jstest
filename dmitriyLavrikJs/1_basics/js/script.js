/*
    свойства
    события
    методы
*/

var text = document.querySelector('#text');

function print_object(obj){
    var res = '<ul>';
    
    for(i in obj)
        res += '<li><b>' + i + '</b>: ' + obj[i] + '</li>';
        
    res += '</ul>';
    document.write(res);
}


print_object(text.style);  

text.onclick = function(){
    text.innerHTML = 'ура!';
    text.className = 'test';
    text.style.color = '#f00';
    text.style.fontSize = '30px';
}