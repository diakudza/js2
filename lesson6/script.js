const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

Vue.component('goods-list',{
    props: ['goods'],
    template: `
    <div class="goods" >
        <h3>Список товаров</h3>
        <div class="goods-list">
            <goods-item v-for="goodEntity in goods" :goodProp="goodEntity" v-bind:key="goodEntity.id_product"></goods-item>
        </div>
    </div>`
})

Vue.component('goods-item',{
    props: ['goodProp'],
    template: `
    <div class="goods-item">
        <img class="goods-item__img">
        <div class="flex-column">
            <h3>{{goodProp.product_name}}</h3>
            <p>{{goodProp.price}} руб.</p>
            <button class="goods-list__button" @click="AddToBasket()" v-bind:idAtt=goodProp.id_product>&#128722;</button>
        </div>
    </div>`,
    methods: {
        AddToBasket: function () {
            this.$root.AddToBasket();
        }
    }
})

Vue.component('basket',{
    props: ['basket','basketSum'],
    template: `
    <div class="basket">
        <h3>Корзина</h3><button class="basket-button__clean" @click="СleanBasket()">Очистить корзину &#128937;</button>
        <div class="basket-list">
         <basket-item v-for="goodEntity in basket" :goodProp="goodEntity" ></basket-item>
        </div>
        <p>Сумма вашего заказа: {{basketSum}} руб.</p>
        
    </div>`,
    methods: {
        СleanBasket: function () {
            this.$root.СleanBasket();
        }
    }
})

Vue.component('basket-item',{
    props: ['goodProp'],
    template: `
    <div class="basket-item">
        <img class="basket-item__img">
        <h3>{{goodProp.product_name}}</h3>
        <button class="basket-button" @click="RemoveFromBasket()" v-bind:idAtt=goodProp.id_product>&#128937;</button>
            
    </div>`,
    methods: {
        RemoveFromBasket: function () {
            this.$root.RemoveFromBasket();
        }
    }
})

Vue.component('findBar',{
    props: ['value'],
    template: `
    <div>
        <div class="findbar">
            <input type="text" class="goods-search" v-bind:value="searchLine" v-on:input="$emit('input', $event.target.value)"/>
            <button class="clear-button" type="button" @click="ClearFilterGoods()" title="Очистить">&#128937;</button>
            <button class="search-button" type="button" @click="FilterGoods()" title="Найти">&#128270;</button>
        </div>
    </div>`,
    methods: {
        ClearFilterGoods: function () {
            this.$root.ClearFilterGoods();
        },
        FilterGoods: function () {
            this.$root.FilterGoods();
        }
    }
})

Vue.component('no-found',{
    template: `
    <div class="back">
        <div class="noFound">
            <h3>Нет ничего похожего</h3>
            <button type="button" class="cart-button" @click="ClearFilterGoods()" title="Очистить">Закрыть</button>
        </div>
    </div>`,
    methods: {
        ClearFilterGoods: function () {
            this.$root.ClearFilterGoods();
        }
    }
})

Vue.component('net-error',{
    template: `
    <div class="back">
        <div class="noFound">
            <h3>Ошибка соединения!!!</h3><br>
            <p>Не могу получить данные с сервера!</p>
        </div>
    </div>
`
})




const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: false,
        isVisibleGoods: true,
        noFound: false,
        netError: false,
        basketSum: 0,
        basket: [],
    },

    methods: {
        async getProducts() {
            const responce = await fetch(`${API_URL}/catalogData.json`);
            if (responce.ok) {
                const catalogItems = await responce.json();
                this.goods = catalogItems;
                this.filteredGoods = catalogItems;
            } else {
                this.netError = true
            }
        },
        FilterGoods() {
            if (this.searchLine != '') {
                if (this.goods.find(n => n.product_name == this.searchLine)) {
                    this.filteredGoods = []
                    this.filteredGoods.push(this.goods.find(n => n.product_name == this.searchLine))
                    this.noFound = false;
                    //console.log('Есть ' + this.searchLine)

                } else {
                    this.noFound = true;
                    this.isVisibleGoods = true
                }

            } else {
                return
            }
        },
        AddToBasket() {
            this.basket.push(this.goods.find(n => n.id_product == event.target.attributes.idatt.value))
            //console.log(event.target)

            this.isVisibleCart = true
            this.basketSum += this.goods.find(n => n.id_product == event.target.attributes.idatt.value).price
            console.log(this.basket)
            console.log(this.basketSum)
        },

        RemoveFromBasket() {
            this.basket.splice(this.basket.find(n => n.id_product == event.target.attributes.idatt.value),1)
            this.basketSum -= this.goods.find(n => n.id_product == event.target.attributes.idatt.value).price
            console.log('basketSum ',this.basketSum)
            console.log('basket ',this.basket)
            if(this.basket.length == 0) {
                this.isVisibleCart = false
                this.basketSum = 0
                console.log('basketSum ',this.basketSum)

            }
        },

        ClearFilterGoods() {
            this.searchLine = ''
            this.isVisibleGoods = true
            this.filteredGoods = this.goods
            this.noFound = false

        },
        СleanBasket(){
            this.basket = []
            this.basketSum = 0
            this.isVisibleCart = false
        }
},
async mounted() {
    await this.getProducts()

}
});