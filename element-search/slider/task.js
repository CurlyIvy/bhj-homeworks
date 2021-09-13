class Slider {
    initialize() {
        this.items = Array.from(document.getElementsByClassName('slider__item'));
        this._dots = Array.from(document.getElementsByClassName('slider__dot'));
        this._prev = document.querySelector('.slider__arrow_prev');
        this._next = document.querySelector('.slider__arrow_next');

        this._current = {
            element: null,
            index: 0, 
            toggle(newElement) {
                this.element.classList.remove('slider__item_active');
                this.element = newElement;
                this.element.classList.add('slider__item_active');
            },
            increase() {
                this.index++;
            },
            decrease(){
                this.index--;
            }        
        };
        this._current.element = document.querySelector('.slider__item_active');
        let index = this.items.findIndex(item => item === this._current.element);
        this._current.index = index < 0 ? 0 : index;
    }

    subscribe() {
        this._prev.onclick = this.navigateToPrev.bind(this);
        this._next.onclick = this.navigateToNext.bind(this);
        this._dots.forEach((item, index) => item.onclick = this.changeDot.bind(this, index));
    }

    navigateToPrev() {
        if(this._current.index > 0) {
            this._current.decrease();
        }
        else {
            this._current.index = this.items.length - 1;            
        }
        this._current.toggle(this.items[this._current.index]);
    }

    navigateToNext() {
        if(this._current.index < this.items.length - 1) {
            this._current.increase();
        }
        else {
            this._current.index = 0;            
        }
        this._current.toggle(this.items[this._current.index]);
    }
    
    changeDot(index) {
        this._current.index = index;
        this._current.toggle(this.items[this._current.index]);
    }
}

let slider = new Slider();
slider.initialize();
slider.subscribe();