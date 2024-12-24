<template lang="">
  <v-container>
    <v-text-field v-model="sharedToken" label="token" />
    <v-btn @click="setToPage('user/')">
      เข้าสู่ระบบ
    </v-btn>
  </v-container>
</template>
<script>
export default {
  layout: 'blank',
  data () {
    return {
      sharedToken: ''
    }
  },
  mounted () {
    localStorage.removeItem('accessTokenApha')
    localStorage.removeItem('accountId')
  },
  methods: {
    setToPage (to) {
      if (to) {
        this.$router.push(`/redirect/?sharedToken=${this.sharedToken}&topage=${to}`)
      } else {
        this.$router.push(`/redirect/?sharedToken=${this.sharedToken}`)
      }
    }
  }
}
</script>
