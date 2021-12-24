window.addEventListener('load', function() {
    let interests = document.querySelectorAll('.interest');
    interests.forEach(item => item.addEventListener('change', function(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        let childs = findAllChild(evt.currentTarget);
        childs?.forEach(item => item.checked = evt.target.checked);
       
        let tree = [];
        findAllParents(evt.currentTarget, tree);
        tree.forEach(item => { 
            let node = getNode(item);
            let childs = Array.from(findAllChild(item));
            if(childs?.every(item => item.checked)) {
                node.indeterminate = false;
                node.checked = true;
            }
            else if(childs?.some(item => item.checked)) {
                node.indeterminate = true;
            }
            else {
                node.indeterminate = false;
                node.checked = false;
            }
        });
    }));
});

function getNode(element) {
    let item = element.querySelector('label input.interest__check');
    return item;
}

function findAllParents(element, tree) {
    let group = element.closest('.interests');
    if(group === null) {
        return;
    }

    let parent = group.closest('.interest');
    if(parent === null) {
        return; 
    }

    tree.push(parent);
    findAllParents(parent, tree);
}

function findAllChild(element) {
    let subElement = element.querySelector('ul.interests');
    if(subElement === null) {
        return null;
    }

    let childs = subElement.querySelectorAll('ul.interests input.interest__check');
    return childs;
}