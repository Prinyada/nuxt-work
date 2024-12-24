<template>
  <div class="page d-flex">
    <span class="bg"></span>
    <v-form ref="form" v-model="valid" class="login">
      <v-card class="" elevation="0">
        <v-col cols="12" class="d-flex justify-center mb-2">
          <h1 class="main__color">เข้าสู่ระบบ</h1>
        </v-col>
        <v-col class="grey-color d-flex justify-center mb-5">
          Animal Health Products Association
        </v-col>

        <!-- {{ userName }} {{ passWord }} -->
        ชื่อผู้ใช้
        <v-text-field
          v-model="userName"
          :rules="Rules"
          dense
          class="mb-4"
          height="40"
          outlined
          color="#78CD6B"
          placeholder="กรอกชื่อผู้ใช้"
          hide-details
        ></v-text-field>

        รหัสผ่าน
        <v-text-field
          v-model="passWord"
          :rules="Rules"
          color="#78CD6B"
          height="40"
          dense
          outlined
          placeholder="กรอกรหัสผ่าน"
          :type="visible ? 'text' : 'password'"
          :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
          hide-details
          class="mb-6"
          @click:append="visible = !visible"
        ></v-text-field>
        <v-btn
          block
          color="#78CD6B"
          rounded
          class="white__color"
          :disabled="!valid"
          @click="getLogin"
          ><span :class="valid ? 'white__color' : ''">เข้าสู่ระบบ</span></v-btn
        >
      </v-card>
    </v-form>
  </div>
</template>
<script>
import Swal from 'sweetalert2'

export default {
  layout: 'empty',
  data() {
    return {
      userName: null,
      passWord: null,

      visible: false,
      valid: false,
      Rules: [(v) => !!v || 'Name is required'],
    }
  },
  mounted() {
    this.$store.dispatch('logout')
  },
  methods: {
    async getLogin() {
      const res = await this.$axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        url: `/api/auth/login_admin`,
        data: {
          username: this.userName,
          password: this.passWord,
        },
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200 && res.data.message === 'success') {
        await this.$store.dispatch('login', res.data.results)
        this.$router.push('/admin/information')
      } else {
        Swal.fire({
          title: 'ไม่สามารถเข้าสู่ระบบได้',
          text: 'กรุณาตรวจสอบชื่อผู้ใช้ และรหัสผ่านอีกครั้ง',
          icon: 'error',
        })
      }
    },
    getLoginUnauth() {
      this.$router.push('/admin/information')
    },
  },
}
</script>
<style scoped>
.page {
  justify-content: end;
  align-items: center;
  background-color: #FFFFFF;
}
.bg {
  /* background-image: require('@/assets/login/BG.svg'); */
  background-image: url('~assets/login/BG.svg');
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  /* background-size: cover; */
  background-size: contain;
}

.login {
  width: 30%;
  min-width: 219px;
  padding: 40px;
  padding-right: 80px;
  margin-top: 15%;
}
.col {
  padding: 0;
  margin: 0;
}
</style>
<style>
.v-text-field--outlined fieldset {
  border: #e6e6e6 1px solid;
  /* color: #78CD6B; */
}
.main__color {
  color: #78cd6b;
  font-weight: 700;
}
.grey-color {
  color: #989898;
}
.white__color {
  color: white;
}
</style>
