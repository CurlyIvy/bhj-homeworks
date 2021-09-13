let modalMain = document.getElementById('modal_main');
let modalSuccess = document.getElementById('modal_success');
modalMain.classList.add('modal_active');

let closeElements = Array.from(document.getElementsByClassName('modal__close_times'));
closeElements.forEach(item => item.onclick = () => { 
    modalMain.classList.remove('modal_active');
    modalSuccess.classList.remove('modal_active');  
});

let showSuccessElements = Array.from(document.getElementsByClassName('show-success'));
showSuccessElements.forEach(item => item.onclick = () => { 
    modalMain.classList.remove('modal_active');
    modalSuccess.classList.add('modal_active'); 
});
