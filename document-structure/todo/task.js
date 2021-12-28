window.addEventListener('load', function() {
    let form = document.getElementById('tasks__form');
    form.addEventListener('submit', function(evt) {
        evt.preventDefault();

        let textElement = document.getElementById('task__input');
        let text = textElement.value.trim();
        if (text === '') {
            console.log('Пустая задача');
            return;
        }
        textElement.value = '';
        let task = taskFactory(text);        

        let list = document.getElementById('tasks__list');
        list.appendChild(task);
    });
});

function taskFactory(text) {
    let task = document.createElement('div');
    task.classList.add('task');

    let titel = document.createElement('div');
    titel.classList.add('task__title');
    titel.innerText = text;
    task.appendChild(titel);

    let removeLink = document.createElement('a');
    removeLink.setAttribute('href', '#');
    removeLink.classList.add('task__remove');
    removeLink.innerHTML = '&times;';
    removeLink.addEventListener('click', function(evt) {
        evt.preventDefault();
        let link = evt.target;
        let task = link.closest('.task');
        task?.remove();
    });
    task.appendChild(removeLink);

    return task;
}