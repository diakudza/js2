<template>
  <p>Hello</p>
</template>

<script>
import OtherComponent from './components'

export default {
  components: {
    OtherComponent
  },

  data (){
    return {
      greeting : "Hello"
    }
  }
}
</script>