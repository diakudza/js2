import goodItem from './good-item.js';

// export default {
//     components: {
//         goodItem
//     }
// }

export default Vue.component('goods-list',{
    props: ['goods'],
    components: {
        'good-item': goodItem,
    },
    template: `
    <div class="goods" >
        <h3>Список товаров</h3>
        <div class="goods-list">
            <goods-item v-for="goodEntity in goods" :goodProp="goodEntity" v-bind:key="goodEntity.id_product"></goods-item>
        </div>
    </div>
    `
})

