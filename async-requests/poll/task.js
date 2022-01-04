let pollGetRequestData = {
    Type: 'GET',
    Url: 'https://netology-slow-rest.herokuapp.com/poll.php'
};
let pollPostRequestData = {
    Type: 'POST',
    Url: 'https://netology-slow-rest.herokuapp.com/poll.php'
};

window.addEventListener('load', function() {
    const pollControl = new PollControl();
    const requestWrapper = new RequestWrapper()

    requestWrapper.send(pollGetRequestData, null, null, function(response) {
        let id = response.id;
        let data = response.data;
        pollControl.setItems(id, data.title, data.answers, sendData);
    });

    function sendData(id, index) {
        let headers = [ 
            { key: 'Content-type', value: 'application/x-www-form-urlencoded' } 
        ];
        let data = `vote=${id}&answer=${index}`;
        requestWrapper.send(pollPostRequestData, headers, data, function(response) {
            let data = response.stat;
            pollControl.saveResult(data);
        });
    }
});

class RequestWrapper {
    constructor() {
        this._xhr = new XMLHttpRequest();
    }

    send(connectionOption, headers, data, callback) {
        this._xhr.open(connectionOption.Type, connectionOption.Url);
        headers?.forEach(item => {
            this._xhr.setRequestHeader(item.key, item.value);
        });
        this._xhr.onload = this.invokeCallback.bind(this, callback);
        if(data !== null) {
            this._xhr.send(data);
        }
        else {
            this._xhr.send();
        }
    }

    invokeCallback(callback) {
        if (this._xhr.status !== 200) {
            return;
        }
        let response = JSON.parse(this._xhr.responseText); 
        callback(response);
    }
}

class PollControl {
    constructor() {
        this.title = document.querySelector('#poll__title');
        this.answers = document.querySelector('#poll__answers');
        this.initializeModalWindow();
    }

    setItems(id, titelText, answerItems, callback) {
        this.title.innerText = titelText;

        for(let index = 0; index < answerItems.length; index += 1) {
            let answer = document.createElement('button');
            answer.classList.add('poll__answer');
            answer.style.marginLeft = "2px";
            answer.innerText = answerItems[index];
            answer.addEventListener('click', this.displayModalWindow.bind(this));
            answer.addEventListener('click', callback.bind(this, id, index));
            this.answers.appendChild(answer);
        }
    }

    saveResult(results) {
        this.results = results;
    }

    displayResult() {
        this.answers.innerHTML = '';

        let resultsContainer = document.createElement('div');
        for(let index = 0; index < this.results.length; index += 1) {
            let paragraph = document.createElement('p');
            let strData = `${this.results[index].answer}: ${this.results[index].votes}`;
            paragraph.innerText = strData;
            resultsContainer.appendChild(paragraph);
        }

        this.answers.appendChild(resultsContainer);
    }

    initializeModalWindow() {
        this.modal = document.querySelector('#modal_window');
        this.modalCloseBtn = document.querySelector('.modal_window__close');
        this.modalCloseBtn.addEventListener('click', this.closeModalWindow.bind(this));
    }

    displayModalWindow() {
        this.modal.style.display = "block";
    }

    closeModalWindow() {
        this.modal.style.display = "none";
        if(this.results !== undefined) {
            this.displayResult();
        }
    }
}