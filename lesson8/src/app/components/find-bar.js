export default Vue.component('find-bar',{
    props: ['value'],
    template: `
    <div>
        <div class="findbar">
            <input type="text" class="goods-search" v-bind:value="value" v-on:keydown.enter="FilterGoods" v-on:input="$emit('input', $event.target.value)"/>
            <button class="clear-button" type="button" @click="ClearFilterGoods" title="Очистить">&#128937;</button>
            <button class="search-button" type="button" @click="FilterGoods"  title="Найти">&#128270;</button>
        </div>
    </div>
    `,
    methods: {
            ClearFilterGoods: function () {
                this.$root.ClearFilterGoods();
            },
            FilterGoods: function () {
                this.$root.FilterGoods();
            }
        }

})

