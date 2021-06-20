export default {
    name:'no-found',
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
}