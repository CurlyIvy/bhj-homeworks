window.addEventListener('load', function() {
    let data = {
        activeClassName: 'rotator__case_active',
        rotators: document.querySelectorAll('.rotator__case'),
        currentIndex: 0, 
        previousIndex: 0
    };
    setInterval(changeActiveElement, 1000, data);
});
    
function changeActiveElement(data) {
    if(data.previousIndex >= 0) {
        toggleClass(data.rotators, data.previousIndex, data.activeClassName);
    }
    toggleClass(data.rotators, data.currentIndex, data.activeClassName);
    data.previousIndex = data.currentIndex;
    data.currentIndex = (data.rotators.length - 1 > data.currentIndex) ? (data.currentIndex + 1) : 0;
}

function toggleClass(rotators, index, className) {
    let item = rotators[index];
    item.classList.toggle(className);
}