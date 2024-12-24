<template>
  <v-container v-if="!overlay" class="container">
    <Loading :overlay="overlay" />
    <div>
      <v-img class="position-img" :src="require('~/assets/img/user/background.png')" />
      <div class="box-up">
        <div class="box-img">
          <v-img :src="require('~/assets/img/user/logoahpa.png')" />
        </div>
        <span class="header-text"> ยินดีต้อนรับเข้าสู่ </span>
        <span class="sub-header-text"> สมาคมธุรกิจเวชภัณฑ์สัตว์ </span>
      </div>
      <div class="content">
        <div class="detail-content">
          <div class="header-content">
            <span class="content-text" style="color: #333333">สมาชิกสมาคม</span>
            <span class="sub-content-text" style="color: #636363">กรุณาระบุข้อมูลสมาชิกเพื่อเข้าใช้งาน</span>
          </div>
          <div class="box-card header-box-card">
            <v-select v-model="prefix" :rules="[rules.select]" class="select-type" :items="selectPrefix" dense outlined
              background-color="white" color="rgba(120, 205, 107, 1)" placeholder="คำนำหน้า"
              style="border-radius: 8px;" />
            &nbsp;
            <v-text-field v-model="fullName" dense color="rgba(120, 205, 107, 1)" background-color="white" outlined
              :rules="[rules.thaiOnly]" placeholder="ระบุชื่อ - นามสกุล" style="border-radius: 8px;" />
          </div>

          <div>
            <span style="color: #333333;">เลขที่สมาชิก<span style="color: red;">*</span></span>
          </div>
          <div class="box-card">
            <v-select v-model="select" class="select-type" :items="selectType" dense outlined background-color="white"
              color="rgba(120, 205, 107, 1)" placeholder="ธวส(วส)" style="border-radius: 8px;" />
            &nbsp;
            <v-text-field v-model="member_no" dense color="rgba(120, 205, 107, 1)" background-color="white" outlined
              :rules="[customRules]" placeholder="ระบุเลขสมาชิก" style="border-radius: 8px;" />
          </div>
          <div class="button">
            <v-btn rounded class="style-btn" :disabled="member_no.length > 0 ? false : true"
              @click="sigup()">ยืนยัน</v-btn>
          </div>
          <div class="footer">
            <span class="footer-title">
              กรณีลืมข้อมูลสมาชิกสามารถติดต่อได้ที่
            </span>
            <span class="footer-sub">เบอร์โทร : 092-271-2050</span>
            <span class="footer-sub">อีเมล : ahpa@thaiahpa.com</span>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>
<script>
// import { mapActions } from 'vuex'
export default {
  layout: 'empty',
  data() {
    return {
      overlay: true,
      openFormMember: false,
      member_no: '',
      statusBtn: true,
      account_id: '',
      selectType: ['ธวส(ส)'],
      select: '',
      // ----- Rules -----
      rules: {
        pass: (value) =>
          value.length >= 5 || 'กรุณากรอกรหัสผ่านอย่างน้อย 5 ตัว',
        required: (value) => !!value || 'กรุณากรอกข้อมูล.',
        select: (value) => !!value || 'กรุณาเลือกข้อมูล',
        thaiOnly: (value) =>
          /^([ก-๙\s])+$/i.test(value) || 'กรุณากรอกเป็นภาษาไทยเท่านั้น',
        engOnly: (value) =>
          /^([A-Za-z])+$/.test(value) || 'กรุณากรอกเป็นภาษาอังกฤษเท่านั้น',
        numberOnly: (value) =>
          /^([0-9, ','])+$/.test(value) || 'กรุณากรอกเป็นตัวเลขเท่านั้น',
        emailRules: (value) =>
          /^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          'รูปแบบอีเมลไม่ถูกต้อง',
        numberLength: (value) =>
          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value) ||
          'กรุณากรอกจำนวนตัวเลขไม่เกิน 10 หลัก',
        numberHouseOnly: (value) =>
          /^(\d+\/\d+|\d+)$/.test(value) || 'กรุณากรอกเป็นตัวเลขเท่านั้น',
      },
      fullName: '',
      selectPrefix: ['นาย', 'นาง', 'นางสาว'],
      prefix: '',
      openDialogAlert: false
    }
  },
  computed: {
    customRules() {
      if (!this.statusBtn) {
        return 'เลขที่สมาชิกไม่ถูกต้องกรุณาระบุใหม่อีกครั้ง'
      } else {
        return true
      }
    }
  },
  mounted() {
    this.overlay = false
  },
  methods: {
    // ...mapActions('auth', ['setMemberNo', 'setMemberDetails', 'setTypeUser']),

    async sigup() {
      try {
        this.overlay = true
        this.account_id = localStorage.getItem('accountId')
        const userData = {
          prefix: this.prefix,
          fullName: this.fullName
        }
        const payload = { account_id: this.account_id, member_no: this.member_no, user: userData }
        const res = await this.$axios.$post('/api/user/checkMemberNoAndSetTobiz', payload)
        if (res.message === 'Login Success') {
          this.statusBtn = true
          localStorage.setItem('member_no', res.check_member[0].member_no)
          this.$store.commit('setMemberDetails', res.check_member[0])
          this.$store.commit('setTypeUser', res.check_member[0].type_user)
          await this.$swal({
            icon: 'success',
            title: 'เข้าสู่ระบบสำเร็จ',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.$router.push('/user/home')
          })
        } else if (res.message === 'Dont have this MemberNo in database') {
          await this.$swal({
            icon: 'error',
            title: 'ไม่พบข้อมูลของท่าน',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.location.reload();
          })
        }
      } catch (error) {
        const message = error.response?.data?.message;
        const alertTitle = message === 'Dont have this MemberNo in database' ? 'ไม่พบข้อมูลของท่าน' : 'ระบบขัดข้อง';
        
        await this.$swal({
          icon: 'error',
          title: alertTitle,
          showConfirmButton: false,
          timer: 1500
        });
        window.location.reload();
      }
    },
    nextPageMember() {
      this.$router.push('/user/mainMember')
    },
  },
}
</script>
<style scoped>
/* @media (max-width: 375px) { */
.container {
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

.header-text {
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
}

.sub-header-text {
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
}

.content {
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
}

.detail-content {
  background-color: rgba(242, 250, 240, 1);
  height: 90%;
  margin-top: 30px;
  margin-left: -4%;
  margin-right: -4%;
  border-top-left-radius: 15vw;
  border-top-right-radius: 15vw;
  padding-left: 25px;
  padding-right: 25px;
}

.header-content {
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  color: #989898;
  display: flex;
  flex-direction: column;
}

.content-text {
  font-size: 16px;
}

.sub-content-text {
  font-size: 14px;
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

.header-box-card {
  margin-top: 10px;
}

.box-card {
  display: flex;
}

.select-type {
  width: 110px;
  font-size: 14px;
  height: 40px;
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

/* external */
.button {
  width: 100%;
}

.style-btn {
  margin-top: 2vh;
  background-color: rgba(120, 205, 107, 1) !important;
  color: #fff;
  width: 100%;
}

.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5.5vh;
  margin-bottom: 3vh;
}

.footer-title {
  font-size: 3.5vw;
  font-weight: 400;
  color: rgba(99, 99, 99, 1);
}

.footer-sub {
  font-size: 3.5vw;
  font-weight: 400;
  color: rgba(152, 152, 152, 1);
}

/* } */
/* @media (min-width: 376px) and (max-width: 430px) {
  .container {
    position: relative;
    overflow: hidden;
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
  .button {
    width: 100%;
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
}
@media (min-width: 431px) {
  .container {
    position: relative;
    overflow: hidden;
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
} */
</style>