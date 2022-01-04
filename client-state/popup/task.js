let modalWindowState = {
    Active: '0',
    Inactive: '1'
};

window.addEventListener('load', function() {
    let cookieApi = new CookieApi();
    let modal = document.getElementById('subscribe-modal');
    if(cookieApi.getCookie('modalState') !== modalWindowState.Inactive) {
        modal.classList.add('modal_active');
    }

    let close = document.querySelector('.modal__close');
    close.addEventListener('click', function() {
        modal.classList.remove('modal_active');
        cookieApi.setCookie('modalState', modalWindowState.Inactive);
    });
});

class CookieApi {
    getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    setCookie(name, value, props) {
        props = props || {};
        var exp = props.expires;
        if (typeof exp == "number" && exp) {
            var d = new Date();
            d.setTime(d.getTime() + exp*1000);
            exp = props.expires = d;
        }

        if(exp && exp.toUTCString) { 
            props.expires = exp.toUTCString() 
        }

        value = encodeURIComponent(value);
        var updatedCookie = name + "=" + value;

        for(var propName in props) {
            updatedCookie += "; " + propName;
            var propValue = props[propName];
            if(propValue !== true) { 
                updatedCookie += "=" + propValue; 
            }
        }

        document.cookie = updatedCookie;
    }

    deleteCookie(name) {
        setCookie(name, null, { expires: -1 });
    }
}