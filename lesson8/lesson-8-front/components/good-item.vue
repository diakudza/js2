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

<template>
	
</template>
<script>
	
</script>