class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.counter = document.querySelector('#counter');

    this.interval = null; 
    this.wordCount = 0;
    this.successCount = 0;
    this.sec = 0;

    this.reset();
    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    document.addEventListener('keydown', this.receiveSymbolEventHandler.bind(this));
  }

  receiveSymbolEventHandler(event) {
    event.preventDefault();
    let currentSymbol = this.currentSymbol.textContent.toLowerCase().trim();
    let symbol = event.key.toLowerCase().trim();
    
    if(currentSymbol === symbol) {
      this.successCount += 1;
      this.success();
    }
    else {
      this.fail();
    }
  }

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol !== null) {
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();
    this.renderWord(word);

    this.successCount = 0;
    clearInterval(this.interval);
    this.wordCount = word.length + 1;
    this.sec = this.wordCount;
    this.interval = setInterval(this.inverseCounter.bind(this, this.updateCounter), 1000); 
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;
    this.currentSymbol = this.wordElement.querySelector('.symbol_current');   
  }

  updateCounter(count) {
    let strNumber = count < 10 ? ('0' + count) : count;
    strNumber = `00:00:${strNumber}`;
    this.counter.textContent = strNumber;
  }

  inverseCounter(func) {
    if(this.sec <= 0) {
      if(this.successCount === this.wordCount) {
        this.success();
      }
      else {
        this.fail();
      }
      return;
    } 
    this.sec  = this.sec  - 1; 
    func.call(this, this.sec );   
  }
}

new Game(document.getElementById('game'))

