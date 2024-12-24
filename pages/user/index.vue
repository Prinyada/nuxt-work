<template>
  <v-container v-if="!overlay" class="container-home">
    <Loading :overlay="overlay" />
    <div>
      <v-img class="position-img" :src="require('~/assets/img/user/background.png')" />
      <div class="box-up">
        <div class="box-img">
          <v-img :src="require('~/assets/img/user/logoahpa.svg')" />
        </div>
        <div style="color: #ffffff; font-size: 24px; font-weight: 700">
          ยินดีต้อนรับเข้าสู่
        </div>
        <div style="color: #ffffff; font-size: 20px; font-weight: 700">
          สมาคมธุรกิจเวชภัณฑ์สัตว์
        </div>
      </div>
      <div style="
          top: 50%;
          left: 0;
          right: 0;
          position: absolute;
          z-index: 1;
          width: 100%;
          min-height: 50vh;
          background-color: rgba(242, 250, 240, 1);
          border-top-left-radius: 13vw;
          border-top-right-radius: 13vw;
        ">
        <div style="
            background-color: rgba(242, 250, 240, 1);
            height: 90%;
            margin-top: 40px;
            margin-left: -4%;
            margin-right: -4%;
            border-top-left-radius: 15vw;
            border-top-right-radius: 15vw;
          ">
          <div style="
              text-align: center;
              font-size: 16px;
              font-weight: 400;
              color: #989898;
            ">
            เลือกประเภทสมาชิก
          </div>
          <div class="box-card">
            <div class="menber" @click="nextPageMember">
              <div class="image-size">
                <v-img :src="require('~/assets/img/user/member.svg')" />
              </div>
              <div>
                <div class="text-title">สมาชิกสมาคม</div>
                <div class="sub-title">ผู้ที่เป็นสมาชิกสมาคม</div>
              </div>
            </div>
            <div class="menber">
              <div class="image-size">
                <v-img :src="require('~/assets/img/user/member.svg')" />
              </div>
              <div>
                <div class="text-title">บุคคลทั่วไป</div>
                <div class="sub-title">ผู้ที่ยังไม่เป็นสมาชิก</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>
<script>
export default {
  layout: 'empty',
  data() {
    return {
      overlay: true,
      openFormMember: false,
      number_no: '',
      statusBtn: true,
      account_id: '',
    }
  },
  mounted() {
    this.overlay = false
  },
  methods: {
    nextPageMember() {
      this.$router.push('/user/mainMember')
    },
  },
}
</script>
<style scoped>
.container-home {
  position: relative;
  overflow-x: hidden;
  z-index: 0;
  background: linear-gradient(#82d17e, #5ac254);
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
}

.position-img {
  z-index: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 70vw;
}

.box-up {
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  z-index: 1;
  width: 100%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.box-img {
  max-width: 35vw;
  padding-bottom: 16px;
}

.box-card {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-top: 34px;
}

.menber {
  width: 85%;
  height: auto;
  max-height: 150px;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0px 2px 6px -4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.image-size {
  width: 22.5vw;
  margin: 6vw;
  max-width: 92px;
}

.text-title {
  font-size: 20px;
  font-weight: 700;
  color: rgba(51, 51, 51, 1);
}

.sub-title {
  font-size: 16px;
  font-weight: 400;
  color: rgba(152, 152, 152, 1);
}
</style>