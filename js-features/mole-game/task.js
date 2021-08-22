function updateLable(name, value) {
    let lable = document.getElementById(name);
    lable.textContent = value;
}

function Status(current, max) {
    this.current = current;
    this._cache = current;
    this.max = max;
    this.increase = () => this.current++;
    this.isDone = () => this.current >= this.max;
    this.reset = () => this.current = this._cache;
}

let sucsses = new Status(0, 10);
let fail = new Status(0, 5);

let holeElements = document.getElementsByClassName('hole-game');
let holes = holeElements[0].children;
for (let hole of holes) {
    hole.onclick = function() {
        if(hole.className.includes('hole_has-mole')) {
            sucsses.increase();            
            if(sucsses.isDone()) {
                sucsses.reset();
                fail.reset();
                updateLable('lost', fail.current);
            }
            updateLable('dead', sucsses.current);
        }
        else {
            fail.increase();           
            if(fail.isDone()) {
                sucsses.reset();
                fail.reset();
                updateLable('dead', sucsses.current);
            }
            updateLable('lost', fail.current);
        }
    };
}
