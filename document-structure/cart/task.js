window.addEventListener('load', function() {
    let cartElement = document.querySelector('.cart');
    let cart = new Cart(cartElement);
    let productElements = Array.from(document.querySelectorAll('.product'));
    let products = [];
    for(let index = 0; index < productElements.length; index += 1) {
        products.push(new Product(productElements[index], cart, productFactory));
    }
});

class Product {
    constructor(product, cart, factory) {
        this.product = product;
        this.cart = cart;
        this.factory = factory;

        this.id = this.product.dataset.id;
        this.img = this.product.querySelector('.product__image');
        this.productsControl = this.product.querySelector('.product__quantity-controls');
        this.quantityValue = this.productsControl.querySelector('.product__quantity-value');

        this.subscribe();
    }

    subscribe() {
        this.decreaseBtn = this.product.querySelector('.product__quantity-control_dec');
        this.decreaseBtn.addEventListener('click', this.decreaseCount.bind(this));
    
        this.increaseBtn = this.product.querySelector('.product__quantity-control_inc');
        this.increaseBtn.addEventListener('click', this.increaseCount.bind(this));
    
        this.createBtn = this.product.querySelector('.product__add');
        this.createBtn.addEventListener('click', this.createProductToCart.bind(this));
    }

    decreaseCount(evt) {
        evt.preventDefault();

        let countText = this.quantityValue.innerText;
        let count = Number(countText) - 1;
        if(count <= 0) {
            return;
        }
        this.quantityValue.innerText = count;
    }

    increaseCount(evt) {
        evt.preventDefault();
    
        let countText = this.quantityValue.innerText;
        let count = Number(countText) + 1;
        if(count <= 0) {            
            return;
        }
        this.quantityValue.innerText = count;
    }

    createProductToCart(evt) {
        evt.preventDefault();

        let imgClone = this.img.cloneNode(false);
        let count = this.quantityValue.innerText;
        if(count <= 0) {
            console.log('Количество не может быть меньше или равно нулю');
            return;
        }
        let productToCart = this.factory(this.id, imgClone, count);
        this.cart.addProduct(productToCart);
    }
}

class Cart {
    constructor(cart) {
        this.cart = cart;
        this.products = this.cart.querySelector('.cart__products');
        this.setState(false);
    }

    addProduct(productToCart) {
        let id = productToCart.dataset.id;
        let isExist = false;
        let productElements = this.products.querySelectorAll('.cart__product');
        productElements.forEach(item =>  {
            if(item.dataset.id === id) {
                isExist = true;
                let countControl = item.querySelector('.cart__product-count');
                let itemCount = countControl.innerText;
                let count = productToCart.querySelector('.cart__product-count').innerText;
                let totalCount = Number(itemCount) + Number(count);
                if(totalCount > 0) {
                    countControl.innerText = totalCount;
                }
                else {
                    item.remove();
                    this.setState(false);
                }
            }
        });

        if(!isExist) {
            let removeControl = this.createRemoveControl();
            productToCart.appendChild(removeControl);
            this.products.appendChild(productToCart);
            this.setState(true);
        }
    }

    createRemoveControl() {
        let removeLink = document.createElement('a');
        removeLink.setAttribute('href', '#');
        removeLink.classList.add('product__remove');
        removeLink.innerHTML = '&times;';
        removeLink.addEventListener('click', this.removeProductEventHendler.bind(this));
        return removeLink;
    }

    removeProductEventHendler(evt) {
        evt.preventDefault();
        let link = evt.target;
        let task = link.closest('.cart__product');
        task?.remove();
        this.setState(false);
    }

    setState(state) {
        if(state) {
            this.cart.style.display = 'block';
        }
        else {
            let productElements = this.products.querySelectorAll('.cart__product');
            if(productElements.length === 0) {
                this.cart.style.display = 'none';
            }                  
        }
    }
}

function productFactory(id, cloneImg, count) {
    let product = document.createElement('div');
    product.classList.add('cart__product');
    product.dataset.id = id;

    cloneImg.className = 'cart__product-image';
    product.appendChild(cloneImg);

    let countControl = document.createElement('div');
    countControl.classList.add('cart__product-count');
    countControl.innerText = count;
    product.appendChild(countControl);

    return product;
}