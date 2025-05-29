// & Pullbutton animation
// & Fun Little Pullbutton animation

var pullButton = document.querySelector('.pull');
var pullButtonFlying = document.querySelector('.pull2');
pullButton.addEventListener('click', (e) => {
    pullButtonFlying.style.display= 'block'
    setTimeout(() => {
        pullButtonFlying.style.transition= '1s'
        pullButtonFlying.style.transform= 'translateY(100vh) scale(200%)'
    }, 300);
});
