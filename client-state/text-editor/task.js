window.addEventListener('load', function() {
    let editor = document.querySelector('#editor');

    let cachedValue = localStorage.getItem('editor');
    if(cachedValue !== undefined) {
        editor.value = cachedValue;
    }

    editor.addEventListener('input', function(evr) {
        let value = evr.target.value.trim();
        if(value !== ''){
            localStorage.setItem('editor', value);
        }
    });

    let clear = document.querySelector('#clear');
    clear.addEventListener('click', function() {
        if(editor.value.trim() !== '') {
            editor.value = '';
            localStorage.removeItem('editor');
        }
    });
});