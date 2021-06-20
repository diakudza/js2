export default {
    name:'goods-list',
    props: ['goods'],
    template: `
    <div class="goods" >
        <h3>Список товаров</h3>
        <div class="goods-list">
            <goods-item v-for="goodEntity in goods" :goodProp="goodEntity" v-bind:key="goodEntity.id_product"></goods-item>
        </div>
    </div>
    `
}
