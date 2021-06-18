const API_URL = "http://localhost:3000";

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
    data() {
        return {
            isbig : false,
            img: ''
        }

    },

    template: `
    <div class="goods-item" >
        <showbig v-if="isbig" :src="this.img"></showbig>
        <div class="goods-item__left">
            <img class="goods-item__img" :src="goodProp.img" @click="showBig">
            <button class="goods-list__button" @click="addToCart" v-bind:idAtt=goodProp.id_product>Добавить в корзину</button>
        </div>
               
        <div class="flex-column">
            <h3>{{goodProp.product_name}}</h3>
            <p>{{goodProp.info}}</p>
            <p>{{goodProp.price}} руб.</p>
        </div>
    </div>`,
    methods: {
         async addToCart() {
            const response = await fetch(`${API_URL}/addToCart`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify(this.goodProp)
            });


             this.$root.$refs.basket.getCart()
        },
        showBig() {
             this.isbig = true
             this.img = event.target.attributes.src.value
             console.log(event.target.attributes.src.value)
        },
        hideBig() {
            this.isbig = false
            console.log("hide")
            this.$root.getProducts()
        }
    }
})

Vue.component('showbig',{
    props: ['src'],
    template: `
    <div class="showbig" @click="this.$parent.hideBig">
        <div class="showbig_block">
        <img :src="src" >
        </div>                
    </div>`,
})

Vue.component('basket',{
    //props: ['basket','isVisibleCart'],
    data() {
        return {
            basketSum : 0,

        }
    },
    template: `
    <div class="basket">
        <h3>Корзина</h3><button class="basket-button__clean" @click="СleanBasket()">Очистить корзину &#128937;</button>
        <div class="basket-list">
         <basket-item v-for="goodEntity in basket" :goodProp="goodEntity" ></basket-item>
        </div>
        <p>Сумма вашего заказа: {{this.basketSum}} руб.</p>
        
    </div>`,
    methods: {
          async СleanBasket() {
            this.basket = []
            this.basketSum = 0
            this.$root.isVisibleCart = false
            const response = await fetch(`${API_URL}/cleanCart`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
            });
        },
        basketTotal() {
            this.basketSum = 0
            this.basket.forEach(n =>  {this.basketSum += n.price })
        },

        async getCart() {
            const responce = await fetch(`${API_URL}/cartData`);
            if (responce.ok) {
                const cartItems = await responce.json();
                this.basket = cartItems;
                if(this.$root.$refs.basket.basket.length > 0 ){
                    this.$root.isVisibleCart= true
                    this.basketTotal()
                    console.log('Basket:',this.basketSum)
                }
            } else {
                this.basketSum = 0;
                this.$root.isVisibleCart = false
                this.basketTotal()

            }
        },
    }
})

Vue.component('basket-item',{
    props: ['goodProp'],
    template: `
    <div class="basket-item">
        <img class="basket-item__img" :src="goodProp.img">
        <h3>{{goodProp.product_name}}</h3>
        <button class="basket-button" @click="RemoveFromBasket" v-bind:idAtt=goodProp.id_product>&#128937;</button>
   </div>`,
    methods: {
        async RemoveFromBasket() {
            this.$root.$refs.basket.basket = []
            this.$root.$refs.basket.basketSum = 0
            this.$root.isVisibleCart = false
            const response = await fetch(`${API_URL}/removeBasketItem`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(this.goodProp)

            });
            console.log(this.goodProp)
            this.$root.$refs.basket.getCart()
        },

    }
})

Vue.component('findBar',{
    props: ['value'],
    template: `
    <div>
        <div class="findbar">
            <input type="text" class="goods-search" v-bind:value="searchLine" v-on:keydown.enter="FilterGoods" v-on:input="$emit('input', $event.target.value)"/>
            <button class="clear-button" type="button" @click="ClearFilterGoods" title="Очистить">&#128937;</button>
            <button class="search-button" type="button" @click="FilterGoods"  title="Найти">&#128270;</button>
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
    },

    methods: {
        async getProducts() {
            try {
                const responce = await fetch(`${API_URL}/catalogData`);
                if (responce.ok) {
                    const catalogItems = await responce.json();
                    this.goods = catalogItems;
                    this.filteredGoods = catalogItems;

                } else {
                    this.netError = true
                    console.log("CONNECT ERROR !")
                }
            }
            catch (e) {
                    this.netError=true
                    console.log('Ошибка соединения с сервером!!')
                    console.log(e)
                }

        },
        FilterGoods() {

            if (this.searchLine !== '') {
                this.filteredGoods = []
                this.goods.forEach( good => {

                if (this.searchLine.toLowerCase() === good.product_name.toLowerCase()) {
                    this.filteredGoods.push(good)
                    this.noFound = false;
                    console.log('фильтер ' + this.filteredGoods)
                    console.log('Есть ' + this.searchLine)
                    return

                } else {
                    this.noFound = true;
                    this.isVisibleGoods = true
                    return
                }
            })

        }},

        ClearFilterGoods() {
            this.searchLine = ''
            this.isVisibleGoods = true
            this.filteredGoods = this.goods
            this.noFound = false

        },


        },

    async mounted() {
            await this.getProducts()
            await this.$refs.basket.getCart()
            }
});