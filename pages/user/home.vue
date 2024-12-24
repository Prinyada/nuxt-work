<template>
  <v-container class="container-home">
    <v-overlay :value="overlay" opacity="0.15">
      <v-progress-circular
        color="green"
        indeterminate
        size="40"
        class="circle"
      ></v-progress-circular>
    </v-overlay>
    <div v-if="!overlay">
      <v-img v-show="!show" class="position-img" :src="require('~/assets/img/user/background-home.png')" />
      <div v-show="!show" class="headers">
        <div>
          <div class="text-title">ยินดีต้อนรับ</div>
          <div class="text-last-title">
            {{ member_details.company_name_th }}
          </div>
          <div class="sub-title">
            เลขที่สมาชิก : ธสว(ส){{ member_details.member_no }}
          </div>
        </div>
        <div>
          <v-badge color="" avatar offset-x="25" offset-y="25" bottom>
            <template #badge>
              <v-img :src="member_details.status_company === 'member' ? icon_status.member : icon_status.unMember"></v-img>
            </template>
            <v-avatar size="85">
              <v-img v-if="member_details.company_logo" :src="`data:image/${member_details.fileType};base64,`+ member_details.company_logo" size="85"/>
              <v-img v-else :src="require('@/assets/info/logo-office-data.svg')" size="85" contain/>
            </v-avatar>
          </v-badge>
        </div>
      </div>
      <UserAppbarSearch v-show="show" @show="getValue" />
      <div class="input-animation">
        <v-text-field v-model="searchInput" dense class="search" height="40" solo rounded append-icon="mdi-magnify"
          placeholder="ค้นหาข่าวสารและกิจกรรมสมาคม" @keydown.enter="submit" @click:append="submit" @focus="show = true"></v-text-field>
      </div>
      <v-row v-show="!show" class="box-card">
        <v-col cols="3" v-for="(item, index) in menuHome" :key="index" class="display-menu"
          @click="formMenu(item.route)">
          <div class="card">
            <v-img class="image-menu" :src="item.icon" />
          </div>
          <span class="text-menu">{{ item.nameIcon }}</span>
        </v-col>
      </v-row>
      <v-row v-show="!show">
        <v-col cols="6">
          <div class="text-title-news">ข่าวสาร</div>
        </v-col>
        <v-col v-if="specialNews.news.length !== 0" cols="6" class="text-details">
          <div @click="AllNews('news')">
            ดูทั้งหมด <v-icon>mdi-chevron-right</v-icon>
          </div>
        </v-col>
        <v-col v-for="(val, index) in specialNews.news" :key="index" class="box-items" cols="12">
          <div class="news-card">
            <div class="item-img">
              <img :src="`data:image/${val.fileType};base64,${val.title_pic}`"
              style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px;" />
            </div>
            <div class="item-text">
              <div class="news-title">{{ val.title_name }}</div>
              <div class="news-text">{{ text_ellipsis(val.detail) }}</div>
              <div class="news-footer">
                <div class="date-items">
                  <v-img :src="require('~/assets/img/user/date.svg')" width="16" /><span class="text">{{
      formatDate(val.create) }}</span>
                </div>
                <div class="read" @click="details('news', val.ids)">
                  <div>อ่านต่อ</div>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row v-show="!show">
        <v-col cols="6">
          <div class="text-title-news">กิจกรรมสมาคม</div>
        </v-col>
        <v-col v-if="specialNews.event.length !== 0" cols="6" class="text-details">
          <div @click="AllNews('activities')">
            ดูทั้งหมด <v-icon>mdi-chevron-right</v-icon>
          </div>
        </v-col>
        <template v-if="specialNews.event.length === 0">
          <v-col cols="12">
            <div class="news-card">
              <span>ไม่พบกิจกรรมสมาคม</span>
            </div>
          </v-col>
        </template>
        <template v-else>
          <v-col v-for="(item, index) in specialNews.event" :key="index" class="box-items" cols="12">
            <div class="news-card">
              <div class="item-img">
                <img :src="`data:image/${item.fileType};base64,${item.title_pic}`" class="size-image"/>
              </div>
              <div class="item-text">
                <div class="news-title">{{ item.title_name }}</div>
                <div class="news-text">{{ text_ellipsis(item.detail) }}</div>
                <div class="news-footer">
                  <div class="date-items">
                    <v-img :src="require('~/assets/img/user/date.svg')" width="16" /><span class="text">{{
        formatDate(item.create) }}</span>
                  </div>
                  <div class="read" @click="details('activities', item.ids)">
                    <div>อ่านต่อ</div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </template>
      </v-row>
      <UserMenuSearch v-show="show" :search-input="searchInput" :search-enter="!searchEnter"/>
      <!-- <DialogExpire /> -->
      <v-dialog v-model="openDialogAlert" persistent width="500px">
        <v-card height="auto" style="padding: 20px 20px; border-radius: 16px;">
          <v-row no-gutters>
            <v-col class="text-right">
              <v-icon @click="openDialogAlert = false">mdi-close</v-icon>
            </v-col>
            <v-col align="center" cols="12">
              <v-img contain width="120" :src="require(`@/assets/img/user/operational-system.png`)"></v-img>
              <div class="mt-3" style="font-size: 18px; font-weight: 500;">
                <p class="mb-0">กำลังพัฒนาระบบ</p>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  layout: 'empty',
  data() {
    return {
      show: false,
      overlay: true,
      dataInfoCompany: {},
      searchInput: '',
      searchEnter: false,
      icon_status: {
        member: require('~/assets/img/user/status-logo-member.svg'),
        unMember: require('~/assets/img/user/status-logo-unMember.svg'),
      },
      member_details: {},
      getImage: '',
      menuHome: [
        {
          icon: require('~/assets/img/user/user.png'),
          nameIcon: 'ข้อมูลสมาชิก',
          route: 'memberInfo',
        },
        {
          icon: require('~/assets/img/user/bag.png'),
          nameIcon: 'ขึ้นทะเบียนอาหารสัตว์',
          route: '',
        },
        {
          icon: require('~/assets/img/user/drug.svg'),
          nameIcon: 'ขึ้นทะเบียนยาสัตว์',
          route: '',
        },
        {
          icon: require('~/assets/img/user/people.svg'),
          nameIcon: 'สมาชิกสมาคม',
          route: 'memberAssociation',
        },
        {
          icon: require('~/assets/img/user/briefcase.png'),
          nameIcon: 'คณะกรรมการ',
          route: 'memberCommittee',
        },
        {
          icon: require('~/assets/img/user/mail.svg'),
          nameIcon: 'ติดต่อสมาคม',
          route: 'contact',
        },
        {
          icon: require('~/assets/img/user/chat.svg'),
          nameIcon: 'คำถามที่พบบ่อย',
          route: 'faq',
        },
      ],
      newsData: [
        {
          headerNews:
            'สมศักดิ์ฟาร์ม มั่นใจเลี้ยงหมูกับซีพีเอฟ อาชีpopmartpopmart',
          detailNews:
            'อาชีพยั่งยืนจากชาวนาที่ต้องทนกรำแดดตากฝนเพื่อเปลี่ยนผืนนากว่า 70 ไร่ เป็นท้องทุ่งที่เต็มไปด้วยรวงข้าวสีทองแต่อาชีพ อาชีพยั่งยืนจากชาวนาที่ต้องทนกรำแดดตากฝนเพื่อเปลี่ยนผืนนากว่า 70 ไร่ เป็นท้องทุ่งที่เต็มไปด้วยรวงข้าวสีทองแต่อาชีพ',
          dateNews: '12 ก.พ. 2567',
          detailNewsMore: '',
          imgNews: require('~/assets/img/user/new1.png'),
        },
        {
          headerNews:
            'สมศักดิ์ฟาร์ม มั่นใจเลี้ยงหมูกับซีพีเอฟ อาชีpopmartpopmart',
          detailNews:
            'อาชีพยั่งยืนจากชาวนาที่ต้องทนกรำแดดตากฝนเพื่อเปลี่ยนผืนนากว่า 70 ไร่ เป็นท้องทุ่งที่เต็มไปด้วยรวงข้าวสีทองแต่อาชีพ อาชีพยั่งยืนจากชาวนาที่ต้องทนกรำแดดตากฝนเพื่อเปลี่ยนผืนนากว่า 70 ไร่ เป็นท้องทุ่งที่เต็มไปด้วยรวงข้าวสีทองแต่อาชีพ',
          dateNews: '12 ก.พ. 2567',
          detailNewsMore: '',
          imgNews: require('~/assets/img/user/new2.png'),
        },
        {
          headerNews:
            'สมศักดิ์ฟาร์ม มั่นใจเลี้ยงหมูกับซีพีเอฟ อาชีpopmartpopmart',
          detailNews:
            'อาชีพยั่งยืนจากชาวนาที่ต้องทนกรำแดดตากฝนเพื่อเปลี่ยนผืนนากว่า 70 ไร่ เป็นท้องทุ่งที่เต็มไปด้วยรวงข้าวสีทองแต่อาชีพ อาชีพยั่งยืนจากชาวนาที่ต้องทนกรำแดดตากฝนเพื่อเปลี่ยนผืนนากว่า 70 ไร่ เป็นท้องทุ่งที่เต็มไปด้วยรวงข้าวสีทองแต่อาชีพ',
          dateNews: '12 ก.พ. 2567',
          detailNewsMore: '',
          imgNews: require('~/assets/img/user/new3.png'),
        },
      ],
      specialNews: {},
      loadImg: '',
      base64Images: {},
      base64ImagesEvent: {},
      logoBase64: '',
      openDialogAlert: false
    }
  },
  watch: {
    show(val) {
      if(!val) {
        this.searchInput = ''
      }
    }
  },
  computed: {
    // ...mapState('auth', ['member_no']),
    // ...mapState('home', ['specialNews']),
  },
  async mounted() {
    this.account_id = localStorage.getItem('accountId')
    await this.loadData()
    this.getApiSpecialNews()
    this.getApiCompany()
    // this.getStore()
  },
  // updated() {
  //   window.scrollTo(0, 0)
  //   this.overlay = false
  // },
  methods: {
    ...mapActions(['getTitlePage']),
    async loadData () {
      const res = await this.$axios.$post('/api/user/getDataMemberByAcc', { account_id: this.account_id })
      this.member_no = res.check_member[0]?.member_no
      localStorage.setItem('member_no', res.check_member[0].member_no)
      this.$store.commit('setMemberDetails', res.check_member[0])
      this.$store.commit('setTypeUser', res.check_member[0].type_user)
    },
    async getApiSpecialNews() {
      this.overlay = true
      const res = await this.$axios.$get('/api/user/getSpecialNewAndEvent')
      if (res.message === 'success') {
        this.$store.commit('setSpecialNews', res)
        this.specialNews = res
      }
      this.overlay = false
    },
    async getApiCompany() {
      const res = await this.$axios
        .get(`/api/user/getDetailCompanyByMemNo?member_no=${this.member_no}`)
        // const res = await this.$axios.get(`/api/user/checkMemberNo?member_no=${this.number_no}&account_id=2222222222`)
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200) {
        this.member_details = res.data.company[0]
      }
    },
    submit(event) {
      event.preventDefault()
      this.searchEnter = !this.searchEnter
    },
    AllNews(val) {
      this.getTitlePage(val)
      this.$router.push('/user/news?type=' + val)
    },
    details(val, newsId) {
      this.getTitlePage(val)
      this.$router.push(`/user/news/details?title=${val}&no=${newsId}`)
      // this.getApiNewsDetails()
    },
    formMenu(val) {
      if (val !== '') {
        this.getTitlePage(val)
        this.$router.push('/user/' + val)
      } else {
        this.openDialogAlert = true
      }
    },
    getValue(value) {
      this.show = value
    },
    text_ellipsis(val) {
      const text = val.substring(0, 115) + '...'
      return text
    },
    formatDate(date) {
      const monthDefault = this.$dateFns.format(date, 'MM')
      const day = this.$dateFns.format(date, 'dd')
      const year = parseInt(this.$dateFns.format(date, 'yyyy'))
      this.month = ''
      this.months_th_mini = [
        'ม.ค.',
        'ก.พ.',
        'มี.ค.',
        'เม.ย.',
        'พ.ค.',
        'มิ.ย.',
        'ก.ค.',
        'ส.ค.',
        'ก.ย.',
        'ต.ค.',
        'พ.ย.',
        'ธ.ค.',
      ]
      if (monthDefault.split('')[0] === '0') {
        this.month =
          this.months_th_mini[parseInt(monthDefault.split('')[1]) - 1]
      } else {
        this.month = this.months_th_mini[monthDefault - 1]
      }
      const yearBud = year + 543
      const fullDate = day + ' ' + this.month + ' ' + yearBud
      return fullDate
    },
    // getStore() {
    //   this.getImage = ''
    //   if (this.member_details.company_logo) {
    //     this.getImage = `data:image/png;base64,${this.member_details.company_logo}`
    //   } else {
    //     this.getImage = require('~/assets/img/user/company-logo.svg')
    //   }
    // },
  },
}
</script>
<style scoped>
@media (max-width: 375px) {
  .container-home {
    padding-top: 5%;
    background-color: rgba(242, 250, 240, 1);
    position: relative;
    overflow: hidden;
    z-index: 0;
    width: 100%;
    height: 100%;
  }

  .position-img {
    z-index: -1;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: auto;
  }

  .headers {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text-title {
    color: rgba(154, 154, 154, 1);
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
  }

  .text-last-title {
    color: rgba(51, 51, 51, 1);
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
  }

  .sub-title {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 199, 0, 1);
    color: rgba(255, 255, 255, 1);
    padding: 5px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    margin-top: 8px;
  }

  .v-avatar {
    border: 2px solid rgba(200, 235, 194, 1);
  }

  .search {
    margin-top: 32px;
  }

  .box-card {
    display: flex;
    font-size: 12px;
    font-weight: 600;
    color: rgba(152, 152, 152, 1);
  }

  .card {
    box-shadow: 0px 4px 16px -4px #00000014;
    box-shadow: 0px 0px 1px 0px #0000001f;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 16px;
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }

  .text-padding {
    padding-top: 16px;
  }

  .text-title-news {
    font-size: 20px;
    font-weight: 700;
    color: rgba(51, 51, 51, 1);
  }

  .text-details {
    font-size: 14px;
    font-weight: 500;
    color: rgba(120, 205, 107, 1);
    text-align: end;
  }

  .box-items {
    border-radius: 8px;
    display: flex;
    justify-content: center;
    gap: 8px;
    padding-left: 12px;
    padding-right: 12px;
  }

  .item-img {
    width: 200px;
    height: 120px;
    border-radius: 6px;
    overflow: hidden;
  }

  .size-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }

  .item-text {
    font-size: 14px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .news-text {
    color: rgba(152, 152, 152, 1);
    font-size: 12px;
    font-weight: 400;
  }

  .news-title {
    font-size: 14px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .news-card {
    background-color: #fff;
    padding: 8px;
    display: inline-flex;
    border-radius: 8px;
    gap: 8px;
    width: 100%;
    box-shadow: 0px 2px 4px -4px rgba(0, 0, 0, 0.06);
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.12);
  }

  .date-items {
    width: 16px;
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    align-items: center;
  }

  .date-items span {
    font-size: 10px;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
    margin-left: 8px;
  }

  .read div {
    font-size: 12px;
    font-weight: 500;
    color: rgba(120, 205, 107, 1);
    text-decoration: underline;
  }

  .news-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .v-application .primary {
    background-color: none !important;
    border-color: none !important;
  }

  .v-text-field .v-input__control .v-input__slot {
    min-height: auto !important;
    display: flex !important;
    align-items: center !important;
  }

  .text-details div .v-icon {
    color: rgba(120, 205, 107, 1) !important;
  }

  .search .v-icon {
    color: rgba(120, 205, 107, 1) !important;
  }

  .input-animation .v-input--is-focused .v-input__slot {
    animation-duration: 0.5s;
    animation-name: test555;
    bottom: 100px;
  }

  /* เพิ่มเติม */
  .display-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .image-menu {
    max-height: 30px;
    max-width: 30px;
  }

  .text-menu {
    font-size: 12px;
    display: block;
    white-space: normal;
    word-break: break-word;
  }

  @keyframes test555 {
    0% {
      left: 0px;
      bottom: 0px;
    }

    100% {
      left: 0px;
      bottom: 100px;
    }
  }
}

@media (min-width: 376px) and (max-width: 430px) {
  .container-home {
    padding-top: 5%;
    background-color: rgba(242, 250, 240, 1);
    position: relative;
    overflow: hidden;
    z-index: 0;
    width: 100%;
    height: 100%;
  }

  .position-img {
    z-index: -1;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: auto;
  }

  .headers {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text-title {
    color: rgba(154, 154, 154, 1);
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
  }

  .text-last-title {
    color: rgba(51, 51, 51, 1);
    font-size: 20px;
    font-weight: 700;
    line-height: 36px;
  }

  .sub-title {
    display: inline-block;
    background-color: rgba(255, 199, 0, 1);
    color: rgba(255, 255, 255, 1);
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    margin-top: 8px;
  }

  .v-avatar {
    border: 2px solid rgba(200, 235, 194, 1);
  }

  .search {
    margin-top: 32px;
  }

  .box-card {
    display: flex;
    font-size: 12px;
    white-space: nowrap;
    font-weight: 600;
    color: rgba(152, 152, 152, 1);
  }

  .card {
    box-shadow: 0px 4px 16px -4px #00000014;
    box-shadow: 0px 0px 1px 0px #0000001f;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 16px;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }

  .text-padding {
    padding-top: 16px;
  }

  .text-title-news {
    font-size: 20px;
    font-weight: 700;
    color: rgba(51, 51, 51, 1);
  }

  .text-details {
    font-size: 14px;
    font-weight: 500;
    color: rgba(120, 205, 107, 1);
    text-align: end;
  }

  .box-items {
    border-radius: 8px;
    display: flex;
    justify-content: center;
    gap: 8px;
    padding-left: 12px;
    padding-right: 12px;
  }

  .item-img {
    width: 200px;
    height: 120px;
    border-radius: 6px;
    overflow: hidden;
  }
  
  .size-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }

  .item-text {
    font-size: 14px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .news-text {
    color: rgba(152, 152, 152, 1);
    font-size: 12px;
    font-weight: 400;
  }

  .news-title {
    font-size: 14px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .news-card {
    background-color: #fff;
    padding: 8px;
    display: inline-flex;
    border-radius: 8px;
    gap: 8px;
    width: 100%;
    box-shadow: 0px 2px 4px -4px rgba(0, 0, 0, 0.06);
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.12);
  }

  .date-items {
    width: 16px;
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    align-items: center;
  }

  .date-items span {
    font-size: 10px;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
    margin-left: 8px;
  }

  .read div {
    font-size: 12px;
    font-weight: 500;
    color: rgba(120, 205, 107, 1);
    text-decoration: underline;
  }

  .news-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .v-application .primary {
    background-color: none !important;
    border-color: none !important;
  }

  .v-text-field .v-input__control .v-input__slot {
    min-height: auto !important;
    display: flex !important;
    align-items: center !important;
  }

  .text-details div .v-icon {
    color: rgba(120, 205, 107, 1) !important;
  }

  .search .v-icon {
    color: rgba(120, 205, 107, 1) !important;
  }

  .input-animation .v-input--is-focused .v-input__slot {
    animation-duration: 0.5s;
    animation-name: test555;
    bottom: 100px;
  }

  /* เพิ่มเติม */
  .display-menu {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }

  .image-menu {
    max-height: 36px;
    max-width: 36px;
  }

  .text-menu {
    font-size: 12px;
    display: block;
    white-space: normal;
    word-break: break-word;
  }

  @keyframes test555 {
    0% {
      left: 0px;
      bottom: 0px;
    }

    100% {
      left: 0px;
      bottom: 100px;
    }
  }
}

@media (min-width: 431px) {
  .container-home {
    padding-top: 5%;
    background-color: rgba(242, 250, 240, 1);
    position: relative;
    overflow: hidden;
    z-index: 0;
    width: 100%;
    height: 100%;
  }

  .position-img {
    z-index: -1;
    position: absolute;
    right: 0;
    top: -50px;
    width: 100%;
    /* ความกว้างเต็มจอ */
    height: auto;
  }

  .headers {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text-title {
    color: rgba(154, 154, 154, 1);
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
  }

  .text-last-title {
    color: rgba(51, 51, 51, 1);
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
  }

  .sub-title {
    display: inline-block;
    background-color: rgba(255, 199, 0, 1);
    color: rgba(255, 255, 255, 1);
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 600;
    line-height: 18px;
    margin-top: 8px;
  }

  .v-avatar {
    border: 2px solid rgba(200, 235, 194, 1);
  }

  .search {
    margin-top: 32px;
  }

  .box-card {
    display: flex;
    font-size: 12px;
    white-space: nowrap;
    font-weight: 600;
    color: rgba(152, 152, 152, 1);
  }

  .card {
    box-shadow: 0px 4px 16px -4px #00000014;
    box-shadow: 0px 0px 1px 0px #0000001f;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 16px;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }

  .text-padding {
    padding-top: 16px;
  }

  .text-title-news {
    font-size: 20px;
    font-weight: 700;
    color: rgba(51, 51, 51, 1);
  }

  .text-details {
    font-size: 14px;
    font-weight: 500;
    color: rgba(120, 205, 107, 1);
    text-align: end;
  }

  .box-items {
    border-radius: 8px;
    display: flex;
    justify-content: center;
    gap: 8px;
    padding-left: 12px;
    padding-right: 12px;
  }

  .item-img {
    width: 200px;
    height: 120px;
    border-radius: 6px;
    overflow: hidden;
  }
  
  .size-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }

  .item-text {
    font-size: 14px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .news-text {
    color: rgba(152, 152, 152, 1);
    font-size: 12px;
    font-weight: 400;
  }

  .news-title {
    font-size: 14px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .news-card {
    background-color: #fff;
    padding: 8px;
    display: inline-flex;
    border-radius: 8px;
    gap: 8px;
    width: 100%;
    box-shadow: 0px 2px 4px -4px rgba(0, 0, 0, 0.06);
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.12);
  }

  .date-items {
    width: 16px;
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    align-items: center;
  }

  .date-items span {
    font-size: 10px;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
    margin-left: 8px;
  }

  .read div {
    font-size: 12px;
    font-weight: 500;
    color: rgba(120, 205, 107, 1);
    text-decoration: underline;
  }

  .news-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .v-application .primary {
    background-color: none !important;
    border-color: none !important;
  }

  .v-text-field .v-input__control .v-input__slot {
    min-height: auto !important;
    display: flex !important;
    align-items: center !important;
  }

  .text-details div .v-icon {
    color: rgba(120, 205, 107, 1) !important;
  }

  .search .v-icon {
    color: rgba(120, 205, 107, 1) !important;
  }

  .input-animation .v-input--is-focused .v-input__slot {
    animation-duration: 0.5s;
    animation-name: test555;
    bottom: 100px;
  }

  /* เพิ่มเติม */
  .display-menu {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }

  .image-menu {
    max-height: 36px;
    max-width: 36px;
  }

  .text-menu {
    font-size: 14px;
    display: block;
    white-space: normal;
    word-break: break-word;
  }

  @keyframes test555 {
    0% {
      left: 0px;
      bottom: 0px;
    }

    100% {
      left: 0px;
      bottom: 100px;
    }
  }
}
</style>
