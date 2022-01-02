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
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function() {
        if(xhr.readyState === xhr.DONE && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            let id = response.id;
            let data = response.data;
            pollControl.setItems(id, data.title, data.answers, sendData);
        }
    });
    xhr.open(pollGetRequestData.Type, pollGetRequestData.Url);
    xhr.send();

    function sendData(id, index) {
        const xhr = new XMLHttpRequest;
        xhr.addEventListener('readystatechange', function() {
            if(xhr.readyState === xhr.DONE && xhr.status === 200) {
                let response = JSON.parse(xhr.responseText); 
                let data = response.stat;
                pollControl.saveResult(data);
            }
        });
        xhr.open(pollPostRequestData.Type, pollPostRequestData.Url);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(`vote=${id}&answer=${index}`);
    }
});

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