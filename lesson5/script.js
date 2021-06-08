const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: false,
        isVisibleGoods: false,
        noFound: false,
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
                alert("Ошибка при соединении с сервером");
            }
        },
        FilterGoods() {
            if (this.searchLine != '') {
                if (this.goods.find(n => n.product_name == this.searchLine)) {
                    this.filteredGoods = []
                    this.filteredGoods.push(this.goods.find(n => n.product_name == this.searchLine))
                    //console.log(this.filteredGoods)
                    this.isVisibleGoods = false
                    this.noFound = false;
                    //console.log('Есть ' + this.searchLine)

                } else {
                    this.noFound = true;
                }

            } else {
                return
            }
        },

    
    ClearFilterGoods() {
        this.searchLine = ''
        this.isVisibleGoods = true
        this.filteredGoods = []
        this.noFound = false;

    },
},
async mounted() {
    await this.getProducts()

}
});