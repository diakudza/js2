const API_URL = "http://localhost:3000";

Vue.component("goods-list", {
  props: ["goods"],
  template: `
    <div class="goods-list">
      <goods-item v-for="goodEntity in goods" :goodProp="goodEntity"></goods-item>
    </div>
  `,
});

Vue.component("goods-item", {
  props: ["goodProp"],
  methods: {
    async addToCart() {
      const response = await fetch(`${API_URL}/addToCart`, {
        method: 'POST', 
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(this.goodProp) 
      });
    },
  },
  template: `
    <div class="goods-item" @click=addToCart>
      <h3>{{goodProp.product_name}}</h3>
      <p>{{goodProp.price}}</p>
    </div>
  `,
});

const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    busketGoods: [],
    searchLine: "",
  },

  methods: {
    async getProducts() {
      const responce = await fetch(`${API_URL}/catalogData`);
      if (responce.ok) {
        const catalogItems = await responce.json();
        this.goods = catalogItems;
        this.filteredGoods = catalogItems;
      } else {
        alert("Ошибка при соединении с сервером");
      }
    },
  },

  async mounted() {
    await this.getProducts();
  },
});
