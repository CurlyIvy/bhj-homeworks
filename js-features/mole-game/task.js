function updateLable(name, value) {
    let lable = document.getElementById(name);
    lable.textContent = value;
}

function Status(current, max) {
    this.current = current;
    this._cache = current;
    this.max = max;     
}
Status.prototype.increase = function() {
    this.current++;
}
Status.prototype.isDone = function() {
    this.current >= this.max;
}
Status.prototype.reset = function() {
    this.current = this._cache; 
}
Status.prototype.finish = function() {
    throw new Error('not impl');
}

function Sucsses(current, max) { 
    Status.call(this, current, max);
}
Sucsses.prototype = Object.create(Status.prototype);
Sucsses.prototype.constructor = Sucsses;
Sucsses.prototype.finish = function(func) {
    if(this.isDone()) {
        func();
    }
}

function Hole() {
    this.lostLable = document.getElementById('lost');
    this.deadLable = document.getElementById('dead');
}
Hole.prototype.process = function(sucsses, fail) {
    fail.increase();           
    if(fail.isDone()) {
        sucsses.reset();
        fail.reset();
        this.deadLable = sucsses.current;
    }
    this.lostLable = fail.current;
}

function ActiveHole() { 
    Hole.call(this);
}
ActiveHole.prototype = Object.create(Hole.prototype);
ActiveHole.prototype.constructor = ActiveHole;
ActiveHole.prototype.process = function(sucsses, fail) {
    sucsses.increase();            
    if(sucsses.isDone()) {
        sucsses.reset();
        fail.reset();
        this.lostLable = fail.current;
    }
    this.deadLable = sucsses.current;
}

let sucsses = new Status(0, 10);
let fail = new Status(0, 5);

let htmlHoleElements = document.getElementsByClassName('hole-game');
let holeElements = htmlHoleElements[0].children;
for (let holeElement of holeElements) {
    //let hole = new 
    holeElement.onclick = function() {
        /*if(hole.className.includes('hole_has-mole')) {
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
        }*/
    };
}

/*class aaa {
    create() {
        isActive() {
            return el.className.includes('hole_has-mole');
        }
    }
}*/

class Status {
    constructor(current, max) {
        this.current = current;
        this._cache = current;
        this.max = max;   
    }
}
class Hole {
    constructor(el) {
        this.el = el;
        this.lostLable = document.getElementById('lost');
        this.deadLable = document.getElementById('dead');
        this.state = new Status(0, 5);
    }
    increase() {
        this.state.current += 1;
    } 
    check() {
        return this.state.current >= this.state.max;
    }
    reset() {
        this.state.current = this.state._cache;
    }
}
class ActiveHole extends Hole {
    constructor(el) {
        super(el);
        this.state = new Status(0, 10);
    }
}

class StatusManager {
    constructor() {
        this.states = {
            none: function(){},
            sucsses: function(){},
            fail: function(){}
        };
        this.state = new this.states.none(this);
    }
    increase(hole) {
        this.state.increase(hole);
    }  
    check(hole) {
        this.state.check(hole);
    }
    reset() {
        this.state.reset();
    }
}


let manager = new StatusManager();
let htmlHoleElements = document.getElementsByClassName('hole-game');
let holeElements = htmlHoleElements[0].children;
for (let holeElement of holeElements) {
    holeElement.onclick = function() {
        manager.manualChangeState();
    };
}

