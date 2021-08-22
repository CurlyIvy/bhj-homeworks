let cookie = document.getElementById('cookie');
let clickCount = 0;
let isEvenClick  = false;
let lastClickTime = null;
cookie.onclick = function() {
    let currentTime = new Date();
    let counter = document.getElementById('clicker__counter');
    clickCount += 1;
    counter.textContent = clickCount;
    cookie.width = isEvenClick ? 200 : 300;
    isEvenClick = !isEvenClick;
    let averageClickTime = 0;
    if(lastClickTime !== null && lastClickTime < currentTime) {
        var difference = (((currentTime - lastClickTime) % 60000) / 1000);
        averageClickTime = (1 / difference).toFixed(2);
    }
    let speed = document.getElementById('clicker__speed');
    speed.textContent = averageClickTime;
    lastClickTime = currentTime;
};