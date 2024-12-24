<template>
    <v-app>
      <v-main>
      <!-- <v-container> -->
        <Nuxt />
      <!-- </v-container> -->
    </v-main>
    </v-app>
</template>

<script>
export default {
  data () {
    return {
      token: '',
      accountId: ''
    }
  },
  computed: {

  },
  mounted () {
    // this.token = localStorage.getItem('accessTokenApha')
    // this.accountId = localStorage.getItem('accountId')
    // if (!this.token || this.accountId === null) {
    //   this.$router.push('/admin');
    // }
  }
}
</script>

