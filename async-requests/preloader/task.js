let getRequestData = {
    Type: 'GET',
    Url: 'https://netology-slow-rest.herokuapp.com'
};

window.addEventListener('load', function() {
    const card = new Card();
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function() {
        if(xhr.readyState === xhr.DONE && xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            let valute = data.response.Valute;
            let valutes = Object.keys(valute).map((key) => valute[key]);
            valutes.forEach(item => card.addItem(item.CharCode, item.Value));
            card.setLoaderState(false);
        }
        else if(xhr.readyState === xhr.HEADERS_RECEIVED) {
            card.setLoaderState(true);
        }
    });
    xhr.open(getRequestData.Type, getRequestData.Url);
    xhr.send();
});

class Card {
    constructor() {
        this.items = document.querySelector('#items');
        this.loader = document.querySelector('#loader');
    }

    addItem(code, vlaue) {
        let item = document.createElement('div');
        item.classList.add('item');

        let codeItem = document.createElement('div');
        codeItem.classList.add('item__code');
        codeItem.innerText = code;
        item.appendChild(codeItem);

        let valueItem = document.createElement('div');
        valueItem.classList.add('item__value');
        valueItem.innerText = vlaue;
        item.appendChild(valueItem);

        let currencyItem = document.createElement('div');
        currencyItem.classList.add('item__currency');
        currencyItem.innerText = 'руб.';
        item.appendChild(currencyItem);

        this.items.appendChild(item);
    }

    setLoaderState(isActive) {
        let activeClassName = 'loader_active';
        if(isActive && !loader.classList.contains(activeClassName)) {
            loader.classList.add(activeClassName);
        }
        else if(!isActive && loader.classList.contains(activeClassName)) {
            loader.classList.remove(activeClassName);
        }
    }
}