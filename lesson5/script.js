const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class GoodsItem {
    constructor(product_name, price, id) {
        this.product_name = product_name;
        this.price = price;
        this.id = id;
    }
    render() {
        return `<div class="goods-item" itemId=${this.id}><h3>${this.product_name}</h3><p>${this.price}</p><button id="${this.id}" onclick="bask.addItem(${this.id})">В корзину</button></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    async fetchGoods() {
        const responce = await fetch(`${API_URL}/catalogData.json`);
        if (responce.ok) {
            const catalogItems = await responce.json();
            this.goods = catalogItems;
        } else {
            alert("Ошибка при соединении с сервером");
        }
    }

    /** метод подсчета всей стоимости в листе товаров */
    totalSum() {
        let total = 0;
        this.goods.forEach(good => {
            total += good.price;
        });
        let span = document.createElement('span');
        span.innerHTML = total + ' руб.';
        document.querySelector('main').appendChild(span);
        return total;
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price, good.id_product, good.img);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
        //document.querySelectorAll('.goods-list button').forEach(btn => addEventListener('click', (e) => { bask.addItem(e.target.id) }));// похоже изза этого срабатывает 2 раза метод, заменил инлайново в кнопке в методе render()
    }
}
/** Класс для корзины с методами */
class Basket {
    constructor(good) {
        this.good = [];
        this.sum = 0;
    }
    goodsCount () { return this.good.length}

    totalSum() {
        this.sum = 0
        this.good.forEach(goodItem => {this.sum += goodItem.price})
        return this.sum
    }

    showBasket(){
        document.getElementById('listOfCart').innerHTML=''
        this.good.forEach(item => { document.getElementById('listOfCart').innerHTML += `<div class="basketCart"><p>${item.product_name}</p><br><button idAtt="${item.id_product}">&#215;</button></div> `}) //onclick='bask.removeBasketCart(${this.parentNode})'
        document.querySelectorAll('#listOfCart button').forEach(btn => addEventListener('click', (event) => {this.removeBasketCart(event.target.getAttribute('idAtt'))},false)) // {bask.removeBasketCart(event)} ВОТ тут не могу никак событие словить. Как обратиться правильно к кнопке?
    }

    addItem (item) {

        for (let n in list.goods){
            if (list.goods[n].id_product == item){
                this.good.push(list.goods[n])
                document.querySelector('.cart-button').innerHTML = bask.goodsCount();
            }
        }
        this.showBasket()
        document.querySelector('main span').innerHTML = `сумма вашего заказа: ${this.totalSum()}`
    }

    removeBasketCart (event) {
        //console.log(event.target.id);
        //removeBasketCart.stopPropagation()
        document.querySelectorAll('#listOfCart').map()
        event.target.parentNode.remove()
        this.cleanBasket(event.target.id)
    }

    cleanBasket(id='all'){
        if (id !== 'all'){
            for (let n in this.good){
                if (this.good[n].id_product == id){
                    this.good.splice(list.goods[n],1)

                }
            }
        }else {
            this.good = [];
        }
    }
}

/** Класс для елементов корзины */
class BasketItem {

    removeItem() {

    }
}
const bask = new Basket();//опять пришлось вынести выше функции, а от не виделась в кнопке (там где eventlistener)..
const list = new GoodsList();//..почему внутри init они не работают? Как тогда к ним обращаться, что б безопасно было?
const init = async () => {
    //document.querySelector('#head button').addEventListener('click',bask.showBasket.bind(bask)) // только через бинд смог вызвать.
    //document.querySelectorAll('#head .cart-button button').addEventListener('click',bask.removeBasketCart().bind(bask))
    
    await list.fetchGoods();
    list.render();
    list.totalSum();

}

window.onload = init