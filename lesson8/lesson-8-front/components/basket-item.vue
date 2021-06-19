Vue.component('basket-item',{
    props: ['goodProp'],
    template: `
    `,
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


<template>
	<div class="basket-item">
        <img class="basket-item__img" :src="goodProp.img">
        <h3>{{goodProp.product_name}}</h3>
        <button class="basket-button" @click="RemoveFromBasket" v-bind:idAtt=goodProp.id_product>&#128937;</button>
   </div>
</template>
<script>
	
</script>