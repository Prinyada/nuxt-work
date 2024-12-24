<template>
  <div />
</template>

<script>
// import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  name: 'RedirectPage',
  layout: 'blank',
  data () {
    return {
      sharedToken: '',
      bypass: 'false',
      account_id: ''
    }
  },
  async mounted () {
    localStorage.removeItem('accessTokenApha')
    localStorage.removeItem('accountId')
    const topage = this.$route.query.topage
    const byPass = this.$route.query.byPass
    if (!this.$route.query.sharedToken) {
      return
    }
    if (this.$route.query.bypass) {
      this.bypass = this.$route.query.bypass
    }
    try {
      if (this.$route.query.sharedToken) {
        this.$loadStart()
        this.sharedToken = this.$route.query.sharedToken
        this.$axios.setToken(this.sharedToken, 'Bearer')
        const res = await this.$axios.$post('/api/auth/login_one', { share_token: this.sharedToken })
        localStorage.setItem('accessTokenApha', res.result.access_token)
        localStorage.setItem('accountId', res.result.account_id)
        const user = await this.$axios.$post('/api/user/checkUser', { account_id: res.result.account_id })
        // const user = await this.$axios.$post('/user/checkUser', { account_id: '26928641664877' })
        if (!user) {
          this.$router.push('/testRedirect');
          return;
        }
        await this.$axios.setToken(this.token, 'Bearer')
      this.$loadEnd()
      }
      if (this.$route.query.byPass) {
        this.$router.push(`/${byPass}`)
        return
      } else {
        this.$router.push('/')
      }
      if (this.$route.query.topage) {
        this.$router.push(`/${topage}`)
      } else {
        this.$router.push('/')
      }
      this.$loadEnd()
    } catch (error) {
      this.$loadEnd()
      if (error.response?.data?.code === 'EXPIREDTOKEN') {
        this.$swal({
          icon: 'error',
          title: 'error',
          text: error.response?.data?.message,
          confirmButtonText: 'ปิด',
          confirmButtonColor: 'rgba(0, 90, 170, 1)'
        })
      } else if (error.response?.data.message === 'not allow') {
        await this.$swal({
          icon: 'info',
          title: 'ขออภัย',
          text: error.response?.data?.cause,
          confirmButtonText: 'ปิด',
          confirmButtonColor: 'rgba(0, 90, 170, 1)'
        })
        this.setLogout()
      } else if (error.response.data.message === 'No data user') {
        await this.$swal({
          icon: 'error',
          title: 'ไม่พบข้อมูลผู้ใช้งาน',
          text: 'กรุณาติดต่อเจ้าหน้าที่',
          confirmButtonText: 'ปิด',
          confirmButtonColor: 'rgba(0, 90, 170, 1)'
        })
        this.$router.push('/testRedirect');
      } else {
        await this.$swal({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณาติดต่อเจ้าหน้าที่',
          confirmButtonText: 'ปิด',
          confirmButtonColor: 'rgba(0, 90, 170, 1)'
        })
      }
    }
  },
  methods: {
    ...mapActions('auth',['setLogout'])
  },
}
</script>
