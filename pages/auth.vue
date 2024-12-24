<template>
    <div />
</template>

<script>
// import axios from 'axios'
import { mapActions } from 'vuex'
export default {
    layout: 'blank',
    data() {
        return {
            sharedToken: '',
            bypass: 'false',
            account_id: ''
        }
    },
    async mounted() {
        localStorage.removeItem('accessTokenApha')
        localStorage.removeItem('accountId')
        const token = this.$route.query.token
        try {
            if (token) {
                this.$loadStart()
                this.$axios.setToken(this.sharedToken, 'Bearer')
                const res = await this.$axios.$post('/api/auth/login_one', { share_token: token })
                localStorage.setItem('accessTokenApha', res.result.access_token)
                localStorage.setItem('accountId', res.result.account_id)
                if (res.result.account_id) {
                    console.log('go to home')
                    this.$router.push('/user/home')
                } else {
                    this.$swal({
                        title: 'ระบบขัดข้อง',
                        text: 'ไม่สามารถเข้าสู่ระบบได้',
                        icon: 'error'
                    })
                }
                await this.$axios.setToken(token, 'Bearer')
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
        ...mapActions('auth', ['setLogout'])
    },
}
</script>