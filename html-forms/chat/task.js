window.addEventListener('load', function() {
    const bot = new chatBot();
    const widget = new widgetControl(bot);
    widget.subscribe();
    widget.startMessagePool();
});

const KeyCode = { Enter: 13 };
const MessageType = { Client: 'message_client', Bot: '' };

class widgetControl {
    constructor(bot) {
        this.bot = bot;

        this.widget = document.querySelector('.chat-widget');
        this.side = document.querySelector('.chat-widget__side');
        this.input = document.getElementById('chat-widget__input');
        this.messages = document.querySelector( '.chat-widget__messages');
        this.messageContainer = document.querySelector('.chat-widget__messages-container');

        this.isAlive = false;
        this.isActive = false;
    }

    subscribe() {
        this.side.addEventListener('click', this.showSide.bind(this));
        this.input.addEventListener('keyup', this.sendMessage.bind(this));
    }

    showSide() {
        this.widget.classList.add('chat-widget_active');
        this.isActive = true;
    }

    hideSide() {
        if(this.widget.classList.contains('chat-widget_active')) {
            this.widget.classList.remove('chat-widget_active');
        }
        this.isActive = false;
    }

    sendMessage(evt) {
        evt.preventDefault();

        if (evt.keyCode !== KeyCode.Enter) {           
            return;
        }
        const message = evt.currentTarget.value;
        if(message === "") {
            return;
        }
        evt.currentTarget.value = "";

        const time = this.getCurrentTime();
        this.messages.innerHTML += this.createMessageTemplate(MessageType.Client, message, time);
        let answer = this.bot.getAnswer();
        this.messages.innerHTML += this.createMessageTemplate(MessageType.Bot, answer, time);
        this.isAlive = true;

        this.changeScrollPosition();
    }

    getCurrentTime() {
        const currentdate = new Date(); 
        let hours = ((currentdate.getHours() < 10) ? "0" : "") + currentdate.getHours();
        let minutes = ((currentdate.getMinutes() < 10) ? "0" : "") + currentdate.getMinutes();
        return `${hours}:${minutes}`;
    }

    changeScrollPosition() {
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }

    createMessageTemplate(type, message, time) {
        let template = `
        <div class="message ${type}">
            <div class="message__time">${time}</div>
            <div class="message__text">${message}</div>
        </div>
        `;
        return template;
    }

    startMessagePool() {
        this.timerId = setTimeout(this.pool.bind(this), 30000);
    }

    stopMessagePool() {
        if(this.timerId !== undefined) {
            clearTimeout(this.timerId);
        }
    }

    pool() {
        if(!this.isAlive && this.isActive) {
            const message = this.bot.getPingMessage();
            const time = this.getCurrentTime();
            this.messages.innerHTML += this.createMessageTemplate(MessageType.Bot, message, time);
            this.changeScrollPosition();
        }
        this.isAlive = false;
        this.timerId = setTimeout(this.pool.bind(this), 30000);
    }
}

class chatBot {
    constructor() {
        this.answers = [
            "Добрый день, досвиданья", 
            "Где ваша совесть?", 
            "Вы не купили не одного товара, что бы с нами разговаривать",
            "К сожалению все операторы сейчас заняты",
            "Нет",
            "Ваш вопрос более не актуален"
        ];
        this.pingMessages = [
            "Вы живы?",
            "С вами все в порядке?",
            "Могу я чем-то помочь?"
        ];
    }

    getAnswer() {
        let answer = this.answers.shift();
        this.answers.push(answer);
        return answer;
    }

    getPingMessage() {
        let message = this.pingMessages.shift();
        this.pingMessages.push(message);
        return message;
    } 
}

