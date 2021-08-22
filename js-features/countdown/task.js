function downloadObj() {
    //location.assign('test.obj');
    window.location.href = 'test.obj';
}

function inverseCounter(func, ms, tickCount) {
    let interval = setInterval(inverseCounterPrivate, ms); 
    function inverseCounterPrivate () {        
        if(tickCount <= 0) {
            clearInterval(interval);
            downloadObj();
            return;
        } 
        tickCount = tickCount - 1; 
        func(tickCount);           
    };
    return interval;
}

function updateTimerCounter(count) {
    let timer = document.getElementById('timer');
    timer.textContent = convertNumberToSecondsTimeFormat(count);
}

function convertNumberToSecondsTimeFormat(number) {
    if(typeof number !== 'number') {
        throw 'Время отсчета должно быть числом';
    }
    if(number > 60 || number < 0) {
        throw 'Не правильно установлено время отсчета';
    }
    let strNumber = number < 10 ? ('0' + number) : number;
    return `00:00:${strNumber}`;
}

let counterTimer = inverseCounter(updateTimerCounter, 1000, 60);

