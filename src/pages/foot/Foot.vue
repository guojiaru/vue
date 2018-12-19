<template>
  <div>
    <Head></Head>
    <router-link tag="span" to="/n1" class="city-name">{{ city }}</router-link>
    <Foot></Foot>
  </div>
</template>
<script>
import Head from 'components/common/Head'
import Foot from 'components/common/Foot'
import { mapState } from 'vuex'
export default {
  components: {
    Head,
    Foot
  },
    computed: {
    ...mapState(['city'])
  },
}
</script>