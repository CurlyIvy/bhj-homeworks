let loginRequestOption = {
    Method: 'POST',
    Url: 'https://netology-slow-rest.herokuapp.com/auth.php'
};

window.addEventListener('load', function() {
    let login = document.querySelector('#signin__btn');
    login.addEventListener('click', function(evt) {
        evt.preventDefault();

        let form = document.querySelector('#signin__form'); 
        let name = form.querySelector('[name="login"]').value?.trim();
        let password = form.querySelector('[name="password"]').value?.trim();
        if(name === undefined || password === undefined) { 
            return;
        }

        let formData = new FormData(form);
        let xhr = new XMLHttpRequest();
        xhr.open(loginRequestOption.Method, loginRequestOption.Url);
        xhr.addEventListener('load', function() {
            if (xhr.status !== 200) {
                return;
            }

            let response = JSON.parse(xhr.responseText);
            if(!response.success) {
                let welcome = document.querySelector('#message');
                welcome.innerText = "Неверный логин/пароль";
                welcome.classList.add('message_error');
                return;
            }

            localStorage.setItem('userId', response.user_id);
            let user_id = document.querySelector('#user_id');
            user_id.innerText = response.user_id;
            let welcome = document.querySelector('#message');
            welcome.classList.add('message_active');
            let signin = document.querySelector('#signin');
            signin.style.display = 'none';
        });
        xhr.send(formData);
        form.querySelector('[name="password"]').value = '';
    });

    let userId = localStorage.getItem('userId');
    if(userId != undefined) {
        let user_id = document.querySelector('#user_id');
        user_id.innerText = userId;
        let welcome = document.querySelector('#message');
        welcome.classList.add('message_active');
        let signin = document.querySelector('#signin');
        signin.style.display = 'none';
    }
});