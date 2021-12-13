class TabItem {
    constructor(tab, content) {
        this.tab = tab;
        this.content = content;
    }
    toggle() {
        this.tab.classList.toggle('tab_active');
        this.content.classList.toggle('tab__content_active');
    }
}

class Page {
    constructor() {
        this._currentItem = {};
        this.items = [];
        this._tabs = Array.from(document.querySelectorAll('.tab'));
        this._tabsContent = Array.from(document.querySelectorAll('.tab__content'));
    }
    initialize() {
        if(this._tabs.length != this._tabsContent.length) {
            throw new Error('Количество вкладок не соответствует количеству контента');
        }
        this._tabs.forEach((element, index) => { 
            let tabItem = new TabItem(element, this._tabsContent[index]);
            this.subscribe(tabItem);
            this.items.push(tabItem); 
        });
        this._currentItem = this.items[0];
    }
    subscribe(item) {
        item.tab.addEventListener('click', this.tabItemEventHendler.bind(this, item));
    }
    tabItemEventHendler(item, event) {
        event.preventDefault();
        this._currentItem.toggle();
        item.toggle();
        this._currentItem = item;
    }
}

let page = new Page();
page.initialize();