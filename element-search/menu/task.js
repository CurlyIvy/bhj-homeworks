let subMenuItems = Array.from(document.getElementsByClassName('menu_sub'));
let menuLinks = Array.from(document.getElementsByClassName('menu__link'));
menuLinks.forEach(item => item.onclick = () => {
    var menuItem = item.closest('.menu__item');
    var subMenuItem = menuItem.querySelector('.menu_sub');   
    if(subMenuItem != null) {
        subMenuItem.classList.toggle('menu_active');
        subMenuItems.forEach(item => {
            if(item != subMenuItem) {
                item.classList.remove('menu_active');
            }
        });
        return false;
    }
});