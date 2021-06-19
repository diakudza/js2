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

                    } else if (this.filteredGoods.length < 1){
                        console.log('not found')
                       this.noFound = true;
                      this.isVisibleGoods = true

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

<template>
	
</template>
<script>
	
</script>