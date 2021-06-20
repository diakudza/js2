export default{
    name:'showbig',
    props: ['src'],
    template: `
    <div class="showbig" @click="this.$parent.hideBig">
        <div class="showbig_block">
        <img :src="src" >
        </div>                
    </div>`,
}
