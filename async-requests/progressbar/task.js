window.addEventListener('load', function() {
    let progress = document.querySelector('#progress');
    let form = document.querySelector('#form');

    form.addEventListener('submit', function(evt) {
        evt.preventDefault();
        let formData = new FormData(form);
        let xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', function(evt) {
            if(evt.lengthComputable) {
                let percentComplete = parseInt((evt.loaded / evt.total) * 100);
                progress.value = percentComplete;
            }           
        });

        xhr.open("POST", "https://netology-slow-rest.herokuapp.com/upload.php");
        xhr.send(formData);
    });
});