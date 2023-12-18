document.querySelector('.start ').addEventListener('click', start);
const inside = document.querySelector('.inside');

function start () {
    inside.classList.add('variant-1');
    setTimeout(function(){
        alert('You win!!!! 150%');
        inside.classList.remove('variant-1');
    }, 4000);
}