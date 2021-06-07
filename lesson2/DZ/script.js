class GoodsItem {
    constructor(title, info, price, img = 'no_image.jpg') {
        this.title = title;
        this.price = price;
        this.info = info;
        this.img = img;
    }
    render() {
        return `<div class="goods-item"><div class="goods-item-subtext"><h3>${this.title}</h3><p>${this.info}</p><p>${this.price} руб.</p></div><img src="img/${this.img}"/></div>`;

    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: "Кофе", info: "Кофе растворимый Nescafe Classic гранулированный, пакет, 150г", price: 200, img: "it0.webp" },
            { title: "Кофе", info: "Кофе в капсулах Nescafe Dolce Gusto Americano, 48 капс.", price: 900, img: "it1.webp" },
            { title: "Конфеты", info: "Набор конфет Raffaello Весенняя серия, 150г белый", price: 200, img: "it2.webp" },
            { title: "Приправа", info: "Knorr Приправа универсальная Деликат, 200г", price: 45, img: "it3.webp" },
            { title: "Конфитюр", info: "Конфитюр Zuegg экстра Ежевика, банка 320г", price: 145, img: "it4.webp" },
            { title: "Масло", info: "Filippo Berio масло оливковое Extra Virgin, стеклянная бутылка 1 л.", price: 569, img: "it5.webp" },
            { title: "Кетчуп", info: "Кетчуп Heinz BBQ для курицы с карри 350г", price: 60, img: "it6.webp" },
            { title: "Чипсы", info: "Чипсы Dr. Korner кукурузно-рисовые С оливковым маслом и розмарином 50г", price: 28, img: "dr-corner.jpg" },
            { title: "Чипсы", info: "Чипсы Lays Из печи, лисички в сметане, 85 г.", price: 55 } //img: "lays.jpg"
        ];
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
            const goodItem = new GoodsItem(good.title, good.info, good.price, good.img);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;

    }
}
/** Класс для корзины с методами */
class Basket {
    totalSum() {

    }
    cleanBasket(){

    }
}

/** Класс для елементов корзины */
class BasketItem {
    constructor(good) {
        this.good = '';
        this.count = '';
    }
    addItem (){

    }
    removeItem() {

    }
}

const init = () => {
    const list = new GoodsList();
    list.fetchGoods();
    list.render();
    list.totalSum();
}

window.onload = init