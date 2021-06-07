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

    goodsCount() {
        document.querySelector('.cart-button').innerHTML = this.good.length;
    }

    totalSum() {
        this.sum = 0
        this.good.forEach(goodItem => {
            this.sum += goodItem.price
        })
        document.querySelector('main span').innerHTML = `сумма вашего заказа: ${this.sum}`
        //return this.sum
    }

    showBasket() {
        document.getElementById('listOfCart').innerHTML = ''
        this.good.forEach(item => {
            document.getElementById('listOfCart').innerHTML += `<div class="basketCart"><p>${item.product_name}</p><br><button idAtt="${item.id_product}">&#215;</button></div> `
        }) //onclick='bask.removeBasketCart(${this.parentNode})'
        document.querySelectorAll('#listOfCart button').forEach(btn => addEventListener('click', (event) => {
            this.removeBasketCart(event)
        }, true)) // Как обратиться правильно к кнопке? Event вешается не только на кнопки. что я в селекторе ищу, но и на карточки с товаром в блок .good-list
        this.totalSum()
        this.goodsCount()
    }

    addItem(item) {

        for (let n in list.goods) {
            if (list.goods[n].id_product == item) {
                this.good.push(list.goods[n])

            }
        }
        this.showBasket()

    }

    removeBasketCart(event) {

        if (event !== undefined) {
            if (event.target.parentNode.classList[0] !== 'goods-list' ) {
                event.target.parentNode.remove()
                this.cleanBasket(event.target.getAttribute('idAtt'))
            }
        }

        this.showBasket()
    }

    cleanBasket(id = 'all') {
        if (id !== 'all') {
            for (let n in this.good) {
                if (this.good[n].id_product == id) {
                    this.good.splice(list.goods[n], 1)

                }
            }
        } else {
            this.good = [];
        }
        this.showBasket()
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

    await list.fetchGoods();
    list.render();
    list.totalSum();

}

window.onload = init