export default {
    name: 'basket',
    //props: ['basket','isVisibleCart'],
    data() {
        return {
            basketSum: 0,

        }
    },
    template: `<div class="basket">
        <h3>Корзина</h3><button class="basket-button__clean" @click="СleanBasket()">Очистить корзину &#128937;</button>
        <div class="basket-list">
         <basket-item v-for="goodEntity in basket" :goodProp="goodEntity" ></basket-item>
        </div>
        <p>Сумма вашего заказа: {{this.basketSum}} руб.</p>
        
    </div>
    `,
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
            this.basket.forEach(n => {
                this.basketSum += n.price
            })
        },

        async getCart() {
            const responce = await fetch(`${API_URL}/cartData`);
            if (responce.ok) {
                const cartItems = await responce.json();
                this.basket = cartItems;
                if (this.$root.$refs.basket.basket.length > 0) {
                    this.$root.isVisibleCart = true
                    this.basketTotal()
                    console.log('Basket:', this.basketSum)
                }
            } else {
                this.basketSum = 0;
                this.$root.isVisibleCart = false
                this.basketTotal()

            }
        },
    }
}
