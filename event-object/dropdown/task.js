class Card {
    constructor() {
        this._value = document.querySelector('.dropdown__value');
        this._dropdown = document.querySelector('.dropdown');
        this._items = Array.from(document.querySelectorAll('.dropdown__item'));
        this._list = {
            element: document.querySelector('.dropdown__list'),
            toggle() {
                this.element.classList.toggle('dropdown__list_active');
            }
        };
    }
    subscribe() {
        this._dropdown.addEventListener('click', this.listClickEventHendler.bind(this));
        this._items.forEach(item => item.addEventListener('click', this.itemClickEventHendler.bind(this))); 
    }
    listClickEventHendler(event) {
        event.preventDefault();
        this._list.toggle();
    }
    itemClickEventHendler(event) {
        event.preventDefault();
        this._value.textContent = event.currentTarget.textContent.trim();
    }
}

let card = new Card();
card.subscribe();