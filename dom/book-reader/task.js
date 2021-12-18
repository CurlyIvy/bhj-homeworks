window.addEventListener('load', function() {
    let book = document.getElementById('book');

    let fsPanel = document.querySelector('.book__control_font-size');
    let fsControls = Array.from(fsPanel.getElementsByTagName('a'));
    fsControls.forEach(item => item.addEventListener('click', changeTextSize.bind(item, book, fsControls)));

    let colorPanel = document.querySelector('.book__control_color');
    let colorControls = Array.from(colorPanel.getElementsByTagName('a'));
    colorControls.forEach(item => item.addEventListener('click', changeTextColor.bind(item, book, colorControls)));

    let backgroundPanel = document.querySelector('.book__control_background');
    let backgroundControls = Array.from(backgroundPanel.getElementsByTagName('a'));
    backgroundControls.forEach(item => item.addEventListener('click', changeBackground.bind(item, book, backgroundControls)));
});

function changeTextSize(book, controls, event) {
    event.preventDefault();

    controls.forEach(item => item.classList.remove('font-size_active'));
    this.classList.toggle('font-size_active');

    let bookTextSize = book.dataset.size;
    if(bookTextSize !== undefined) {
        book.classList.remove(bookTextSize);
    }
    let currentTextSize = this.dataset.size;
    if(currentTextSize !== undefined) {
        let className = 'book_fs-' + currentTextSize;
        book.dataset.size = className;
        book.classList.add(className);
    }
}

function changeTextColor(book, controls, event) {
    event.preventDefault();

    controls.forEach(item => item.classList.remove('color_active'));
    this.classList.toggle('color_active');

    let bookTextColor = book.dataset.textColor;
    if(bookTextColor !== undefined) {
        book.classList.remove(bookTextColor);
    }
    let currentTextColor = this.dataset.textColor;
    if(currentTextColor !== undefined) {
        let className = 'book_color-' + currentTextColor;
        book.dataset.textColor = className;
        book.classList.add(className);
    }
}

function changeBackground(book, controls, event) {
    event.preventDefault();

    controls.forEach(item => item.classList.remove('color_active'));
    this.classList.toggle('color_active');

    let backgroundColor = book.dataset.backgroundColor;
    if(backgroundColor !== undefined) {
        book.classList.remove(backgroundColor);
    }
    let currentBackgroundColor = this.dataset.bgColor;
    if(currentBackgroundColor !== undefined) {
        let className = 'book_bg-' + currentBackgroundColor;
        book.dataset.backgroundColor = className;
        book.classList.add(className);
    }
}