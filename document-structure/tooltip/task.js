window.addEventListener('load', function() {
    let tiltoop = new Tiltoop();
    let elements = document.querySelectorAll('.has-tooltip');
    elements.forEach(item => item.addEventListener('click', function(evt) {
        evt.preventDefault();

        if(evt.target === tiltoop.parent && tiltoop.isActive) {
            tiltoop.deactivate();
            return;
        }

        let text = evt.target.getAttribute('title');
        tiltoop.text = text;
        tiltoop.parent = evt.target;
        tiltoop.activate();
        tiltoop.setPosition();
        evt.target.appendChild(tiltoop.element);
    }));
});

class Tiltoop {
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('tooltip');
        this.parent = null;
        this._text = '';
        this.isActive = false;
    }

    get text() {
        return this._text;
    }

    set text(value) {
        this._text = value;
        this.element.innerText = this._text;
    }

    activate() {
        if(!this.element.classList.contains('tooltip_active')) {
            this.element.classList.add('tooltip_active');
            this.isActive = true;
        }
        return this.isActive;
    }

    deactivate() {
        if(this.element.classList.contains('tooltip_active')) {
            this.element.classList.remove('tooltip_active');
            this.isActive = false;
        }
        return this.isActive;
    }

    setPosition() {
        try {
            if(!this.isActive) {
                return;
            }

            let parentPositionInfo = this.parent.getBoundingClientRect();
            let top = parentPositionInfo.top + pageYOffset;
            let left = parentPositionInfo.left + pageXOffset;
    
            var elementPositionInfo = this.element.getBoundingClientRect();
            var height = elementPositionInfo.height;
    
            let elementStyleInfo = window.getComputedStyle(this.element);
            let paddingTop = elementStyleInfo.paddingTop.replace('px', '');
            let paddingBottom = elementStyleInfo.paddingBottom.replace('px', '');  
            let padding = Number(paddingTop) + Number(paddingBottom);     
            height = height - padding;
    
            this.element.style.top = (top + height) + 'px';
            this.element.style.left = (left) + 'px';
        }
        catch(error) {
            console.log(`При попытке установить позицию элемента произошла ошибка ${error}`);
        }
    }
}