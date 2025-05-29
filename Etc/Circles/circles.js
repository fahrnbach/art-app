var circle1 = document.querySelector('.circle1');
var circleD = circle1.getBoundingClientRect();

window.addEventListener('mousemove', function (e) {
    let x = e.clientY - circleD.width / 2
    let y = e.clientX - circleD.height / 2
    console.log(circleD)

    circle1.style.setProperty('--xPos', `${x}px`)
    circle1.style.setProperty('--yPos', `${y}px`)
})