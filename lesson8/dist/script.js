(()=>{"use strict";Vue.component("basket-item",{props:["goodProp"],template:'\n    <div class="basket-item">\n        <img class="basket-item__img" :src="goodProp.img">\n        <h3>{{goodProp.product_name}}</h3>\n        <button class="basket-button" @click="RemoveFromBasket" v-bind:idAtt=goodProp.id_product>&#128937;</button>\n   </div>\n    ',methods:{async RemoveFromBasket(){this.$root.$refs.basket.basket=[],this.$root.$refs.basket.basketSum=0,this.$root.isVisibleCart=!1,await fetch("http://localhost:3000/removeBasketItem",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(this.goodProp)}),console.log(this.goodProp),this.$root.$refs.basket.getCart()}}});const t="http://localhost:3000",o=(Vue.component("basket",{data:()=>({basketSum:0}),template:'<div class="basket">\n        <h3>Корзина</h3><button class="basket-button__clean" @click="СleanBasket()">Очистить корзину &#128937;</button>\n        <div class="basket-list">\n         <basket-item v-for="goodEntity in basket" :goodProp="goodEntity" ></basket-item>\n        </div>\n        <p>Сумма вашего заказа: {{this.basketSum}} руб.</p>\n        \n    </div>\n    ',methods:{async СleanBasket(){this.basket=[],this.basketSum=0,this.$root.isVisibleCart=!1,await fetch(`${t}/cleanCart`,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json;charset=utf-8"}})},basketTotal(){this.basketSum=0,this.basket.forEach((t=>{this.basketSum+=t.price}))},async getCart(){const o=await fetch(`${t}/cartData`);if(o.ok){const t=await o.json();this.basket=t,this.$root.$refs.basket.basket.length>0&&(this.$root.isVisibleCart=!0,this.basketTotal(),console.log("Basket:",this.basketSum))}else this.basketSum=0,this.$root.isVisibleCart=!1,this.basketTotal()}}}),Vue.component("goods-item",{props:["goodProp"],data:()=>({isbig:!1,img:""}),template:'\n    <div class="goods-item" >\n        <showbig v-if="isbig" :src="this.img"></showbig>\n        <div class="goods-item__left">\n            <img class="goods-item__img" :src="goodProp.img" @click="showBig">\n            <button class="goods-list__button" @click="addToCart" v-bind:idAtt=goodProp.id_product>Добавить в корзину</button>\n        </div>\n               \n        <div class="flex-column">\n            <h3>{{goodProp.product_name}}</h3>\n            <p>{{goodProp.info}}</p>\n            <p>{{goodProp.price}} руб.</p>\n        </div>\n    </div>',methods:{async addToCart(){await fetch("http://localhost:3000/addToCart",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(this.goodProp)}),this.$root.$refs.basket.getCart()},showBig(){this.isbig=!0,this.img=event.target.attributes.src.value,console.log(event.target.attributes.src.value)},hideBig(){this.isbig=!1,console.log("hide"),this.$root.getProducts()}}}));Vue.component("goods-list",{props:["goods"],components:{"good-item":o},template:'\n    <div class="goods" >\n        <h3>Список товаров</h3>\n        <div class="goods-list">\n            <goods-item v-for="goodEntity in goods" :goodProp="goodEntity" v-bind:key="goodEntity.id_product"></goods-item>\n        </div>\n    </div>\n    '}),Vue.component("find-bar",{props:["value"],template:'\n    <div>\n        <div class="findbar">\n            <input type="text" class="goods-search" v-bind:value="value" v-on:keydown.enter="FilterGoods" v-on:input="$emit(\'input\', $event.target.value)"/>\n            <button class="clear-button" type="button" @click="ClearFilterGoods" title="Очистить">&#128937;</button>\n            <button class="search-button" type="button" @click="FilterGoods"  title="Найти">&#128270;</button>\n        </div>\n    </div>\n    ',methods:{ClearFilterGoods:function(){this.$root.ClearFilterGoods()},FilterGoods:function(){this.$root.FilterGoods()}}}),Vue.component("net-error",{template:'\n    <div class="back">\n        <div class="noFound">\n            <h3>Ошибка соединения!!!</h3><br>\n            <p>Не могу получить данные с сервера!</p>\n        </div>\n    </div>\n'}),Vue.component("no-found",{template:'\n    <div class="back">\n        <div class="noFound">\n            <h3>Нет ничего похожего</h3>\n            <button type="button" class="cart-button" @click="ClearFilterGoods()" title="Очистить">Закрыть</button>\n        </div>\n    </div>',methods:{ClearFilterGoods:function(){this.$root.ClearFilterGoods()}}}),Vue.component("showbig",{props:["src"],template:'\n    <div class="showbig" @click="this.$parent.hideBig">\n        <div class="showbig_block">\n        <img :src="src" >\n        </div>                \n    </div>'}),new Vue({el:"#app",data:{goods:[],filteredGoods:[],searchLine:"",isVisibleCart:!1,isVisibleGoods:!0,noFound:!1,netError:!1},methods:{async getProducts(){try{const t=await fetch("http://localhost:3000/catalogData");if(t.ok){const o=await t.json();this.goods=o,this.filteredGoods=o}else this.netError=!0,console.log("CONNECT ERROR !")}catch(t){this.netError=!0,console.log("Ошибка соединения с сервером!!"),console.log(t)}},FilterGoods(){""!==this.searchLine&&(this.filteredGoods=[],this.goods.forEach((t=>{this.searchLine.toLowerCase()===t.product_name.toLowerCase()?(this.filteredGoods.push(t),this.noFound=!1):this.filteredGoods.length<1&&(console.log("not found"),this.noFound=!0,this.isVisibleGoods=!0)})))},ClearFilterGoods(){this.searchLine="",this.isVisibleGoods=!0,this.filteredGoods=this.goods,this.noFound=!1}},async mounted(){await this.getProducts(),await this.$refs.basket.getCart()}})})();