<template>
  <v-container class="container">
    <div class="content">
      <v-img
        class="background-info"
        :src="require('~/assets/img/user/news-bg.svg')"
      />
      <v-row class="content-header">
        <v-col cols="2">
          <v-icon
            style="
              font-size: 32px !important;
              background-color: #fff;
              border-radius: 100%;
            "
            color="rgba(120, 205, 107, 1)"
            @click="$router.back()"
          >
            mdi-chevron-left
          </v-icon>
        </v-col>
        <v-col cols="10" class="display-text-header">
          <span style="color: #ffffff">ข้อมูลสมาชิก</span>
        </v-col>
      </v-row>
    </div>
    <div class="headers">
      <Loading :overlay="overlay" />
      <div v-show="!overlay">
        <v-row justify="center" class="member-detail">
          <v-avatar size="100">
            <v-img v-if="company.company_logo" :src="`data:image/${company.fileType};base64,`+ company.company_logo" size="100"/>
            <v-img v-else :src="require('@/assets/info/logo-office-data.svg')" size="100" contain/>
          </v-avatar>
          <v-col cols="12">
            <v-row justify="center" class="member-sub">
              <v-chip>{{
                company.status_company === "member"
                  ? 'เป็นสมาชิก'
                  : 'ไม่เป็นสมาชิก'
              }}</v-chip>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row class="member-sub-image">
              <v-col cols="12"
                >เลขที่สมาชิก : <span>{{ company.member_no }}</span></v-col
              >
              <v-col cols="12"
                >ประเภทสมาชิก : <span>{{ company.type_member }}</span></v-col
              >
              <v-col cols="12"
                >วันหมดอายุสมาชิก :
                <span>{{ company.expire_member }}</span></v-col
              >
              <v-col cols="12"><v-divider></v-divider></v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row class="details">
              <v-col cols="12" class="text-title">ข้อมูลบริษัท</v-col>
              <v-col cols="12"
                >ชื่อบริษัท (ภาษาไทย) :
                <span v-if="company.company_name_th === null">-</span>
                <span v-else>{{ company.company_name_th }}</span>
              </v-col>
              <v-col cols="12"
                >Company name :
                <span v-if="company.company_name_eng === null">-</span>
                <span v-else>{{ company.company_name_eng }}</span>
              </v-col>
              <v-col cols="12"
                >เบอร์โทรศัพท์ :
                <span v-if="company.company_telephone === null">-</span>
                <span v-else>{{ company.company_telephone }}</span></v-col
              >
              <v-col cols="12"
                >เบอร์โทรสาร : 
                <span v-if="company.company_fax === null">-</span>
                <span v-else>{{ company.company_fax }}</span></v-col
              >
              <v-col cols="12"
                >อีเมล : 
                <span v-if="company.company_email === null">-</span>
                <span v-else>{{ company.company_email }}</span></v-col
              >
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row class="details">
              <v-col cols="12"
                >ที่อยู่บริษัท (ภาษาไทย)</v-col
              >
              <v-col cols="12">
                <span v-if="company.company_full_address_th === null">
                  {{ company.company_address_th }} 
                  {{ company.company_province_th === 'กรุงเทพมหานคร' ? 'แขวง' : 'ตำบล' }}{{ company.company_sub_district_th }} 
                  {{ company.company_province_th === 'กรุงเทพมหานคร' ? 'เขต' : 'อำเภอ' }}{{ company.company_district_th }} 
                  {{ company.company_province_th === 'กรุงเทพมหานคร' ? '' : 'จ.' }}{{ company.company_province_th }} 
                  {{ company.company_zip_code }}
                </span>
                <span v-else>{{ company.company_full_address_th }}</span>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row class="details">
              <v-col cols="12">Office Address</v-col>
              <v-col cols="12">
                <span v-if="company.company_full_address_eng === null">
                  {{ company.company_address_eng }} {{ company.company_sub_district_eng }} {{ company.company_district_eng }} {{ company.company_province_eng }} 
                  {{ company.company_zip_code }}
                </span>
                <span v-else>{{ company.company_full_address_eng }}</span>
              </v-col>
              <v-col cols="12"><v-divider></v-divider></v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row class="title-agent">
              <v-col cols="12">ข้อมูลผู้แทนในนามบริษัท</v-col>
            </v-row>
          </v-col>
          <v-col v-if="agent.length === 0" cols="12">
            <span>ไม่พบข้อมูลผู้แทนบริษัท</span>
          </v-col>
          <v-col v-else cols="12">
            <v-row v-for="(item, index) in agent" :key="index" class="agent">
              <v-col cols="12" class="flex-items">
                <div class="logo">
                  <div>ผู้แทนที่ {{ index + 1 }}</div>
                  <v-avatar size="48">
                    <v-img v-if="item.pic_agent === null"
                      :src="require('@/assets/img/user/Non-profile.png')"
                      size="85"
                    />
                    <v-img v-else
                      :src="`data:image/${item.fileType};base64,` + item.pic_agent"
                      size="85"
                    />
                  </v-avatar>
                </div>
                <div class="detail">
                  <div class="sub-detail">
                    ชื่อ-นามสกุล (ภาษาไทย) :&nbsp;
                    <span>{{ item.title_th + ' ' + item.name_th }}</span>
                  </div>
                  <div class="sub-detail">
                    First name - Last name :&nbsp;
                    <span>{{
                      item.title_eng + '.' + ' ' + item.name_eng
                    }}</span>
                  </div>
                  <div class="sub-email">
                    อีเมล :&nbsp;
                    <span>{{ item.email }}</span>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12"><v-divider></v-divider></v-col>
          <v-col cols="12">
            <v-row class="drug-title">
              <v-col cols="12">ข้อมูลผลิตภัณฑ์</v-col>
            </v-row>
          </v-col>
          <v-col v-if="listDrug.length === 0" cols="12">
            <span>ไม่มีข้อมูลผลิตภัณฑ์</span>
          </v-col>
          <v-col v-else>
            <v-row
              v-for="(val, index) in listDrug"
              :key="index"
              dense
            >
              <v-col cols="12">
                <v-row>
                  <v-col cols="12" class="pb-0">
                    <span class="text-main-product">
                      {{ val.type_product_name }}
                    </span>
                  </v-col>
                </v-row>
                <v-row class="content-product">
                  <template v-if="val.length === 0">
                    <v-col cols="12" class="text-center">
                      <div class="no-product">ไม่มีข้อมูลผลิตภัณฑ์</div>
                    </v-col>
                  </template>
                  <template v-else>
                    <v-col
                      v-for="(subItem, index) in val.product"
                      :key="index"
                      cols="12"
                      class="list-item"
                    >
                      <div class="list-index">
                        <div style="font-weight: 600">
                          รายการที่ {{ index + 1 }}
                        </div>
                      </div>
                      <div class="detail-product">
                        <div class="detail-name-product">
                          ชื่อสินค้า&nbsp;:&nbsp;
                          <span style="font-weight: 600">{{
                            subItem.product_name
                          }}</span>
                        </div>
                        <div class="detail-country-product">
                          ผู้ผลิต/ประเทศ&nbsp;:&nbsp;
                          <span style="font-weight: 600">{{
                            subItem.product_country
                          }}</span>
                        </div>
                        <div class="detail-ref-product">
                          เลขทะเบียนยา/อาหารสัตว์ :&nbsp;
                          <span style="font-weight: 600">{{
                            subItem.product_no
                          }}</span>
                        </div>
                      </div>
                    </v-col>
                  </template>
                </v-row>
              </v-col>
            </v-row>  
          </v-col>
          
        </v-row>
        <v-row v-if="type_user === 'agent' ? true : false">
          <v-col cols="12" class="btn-size">
            <v-btn
              color="rgba(120, 205, 107, 1)"
              rounded
              dark
              @click="edit_details()"
              >อัปเดตข้อมูล</v-btn
            >
          </v-col>
        </v-row>
      </div>
    </div>
  </v-container>
</template>
<script>
// import { mapState } from 'vuex'
export default {
  layout: 'empty',
  data() {
    return {
      company: {},
      agent: [],
      overlay: true,
      listDrug: [],
      // mock data
      companyRep: [
        {
          fullNameRepTh: 'นาย วินัย สุนทร',
          fullNameRepEng: 'Mr. vinai sunthon',
          emailRep: 'vinai.s@gmail.com',
          imgRep: require('~/assets/img/user/man1.png'),
        },
        {
          fullNameRepTh: 'นางสาว วิภาดา ศรีศร',
          fullNameRepEng: 'Ms. wipada srison',
          emailRep: 'wipada.wp@gmail.com',
          imgRep: require('~/assets/img/user/woman1.png'),
        },
      ],
      animalFeed: [
        {
          nameFeed: 'ยาสำเร็จรูปอาหาร A',
          countryFeed: 'ประเทศไทย',
          refFeed: '0102661244',
        },
        {
          nameFeed: 'ยาสำเร็จรูปอาหาร B',
          countryFeed: 'ประเทศไทย',
          refFeed: '0102661099',
        },
      ],
      animalBio: [
        {
          nameBio: 'ชีวภัณฑ์ AA',
          countryBio: 'ประเทศไทย',
          refBio: '0102661200',
        },
      ],
      animalVitamin: [
        // {
        //   nameVitamin: 'วิตามิน BB',
        //   countryVitamin: 'ประเทศไทย',
        //   refVitamin: '0102661300',
        // },
      ],
      member_no: '',
      type_user: ''
    }
  },
  computed: {
    // ...mapState('auth', ['type_user']),
  },
  mounted() {
    this.member_no = localStorage.getItem('member_no')
    this.type_user = this.$store.state.type_user
    this.apiGetDataCompany()
  },
  updated() {
    this.$emit('getShow', true)
  },
  methods: {
    async apiGetDataCompany() {
      this.overlay = true
      const res = await this.$axios
        .get(`/api/user/getDetailCompanyByMemNo?member_no=${this.member_no}`)
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200) {
        const data = res.data
        this.company = data.company[0]
        this.agent = [...data.agent]
        this.listDrug = [...data.detail_type_product]
        this.overlay = false
      }
    },
    edit_details() {
      this.$router.push('/user/menu/info-edit')
    },
  },
}
</script>
<style scoped>
@media (max-width: 375px) {
  .container {
    padding-top: 5%;
    background-color: rgba(242, 250, 240, 1);
    position: relative;
    overflow: hidden;
    z-index: 0;
    width: 100%;
    height: 100%;
    font-size: 14px;
  }
  .background-info {
    z-index: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: auto;
  }
  .content-header {
    margin-top: 42px;
    z-index: 1;
    font-size: 20px;
    font-weight: 700;
    position: relative;
    white-space: nowrap;
    align-items: center;
  }
  .display-text-header {
    display: flex;
    padding-left: 20vw;
  }

  .headers {
    margin-top: 32px;
    position: relative;
    z-index: 1;
    padding: 16px;
    padding-top: 40px;
  }

  .member-detail {
    margin-top: -40px;
    padding-top: 30px;
    padding-bottom: 30px;
    border-radius: 16px;
    background-color: #FFFFFF;

  }

  .member-detail > .v-avatar {
    border: 2px solid rgba(200, 235, 194, 1);
  }

  .v-chip {
    font-size: 14px !important;
    font-weight: 400 !important;
    color: rgba(82, 196, 26, 1);
    background-color: rgba(238, 249, 232, 1) !important;
  }

  .member-sub {
    margin-top: 0px !important;
  }

  .member-sub-image {
    margin-top: 8px;
  }

  .member-sub-image .col {
    padding-top: 0px !important;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
  }

  .member-sub-image .col span {
    font-weight: 600 !important;
    color: rgba(51, 51, 51, 1) !important;
  }

  .text-main-product {
    font-size: 14px;
    font-weight: 600;
    color: #636363;
  }

  .content-product {
    padding: 8px;
  }

  .no-product {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FAFAFA;
    border-radius: 8px;
    height: 100px;
    padding: 16px;
  }

  .list-item {
    background: #FAFAFA;
    border-radius: 8px;
    margin-bottom: 5px;
    display: flex;
    padding: 10px;
  }

  .list-index {
    margin-right: 5px;
  }

  .detail-name-product {
    margin-bottom: 5px;
  }

  .detail-country-product {
    margin-bottom: 5px;
  }

  .detail-ref-product {
    display: flex;
    flex-direction: column;
  }

  .details .text-title {
    font-weight: 600 !important;
    color: rgba(51, 51, 51, 1) !important;
  }

  .details .col {
    padding-top: 0px !important;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
  }

  .details .col span {
    font-weight: 600 !important;
    color: rgba(51, 51, 51, 1) !important;
  }

  .sub-detail {
    display: flex;
    flex-direction: column;
  }

  .title-agent {
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }

  .title-agent .col {
    padding-top: 0px;
  }

  .agent .flex-items {
    display: flex;
    gap: 16px;
    flex-direction: row;
  }

  .agent .flex-items .logo {
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    white-space: nowrap;
  }

  .agent .flex-items .detail {
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
  }

  .agent .flex-items .detail span {
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }

  /* drug */
  .drug-title {
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }

  .drug-sub {
    font-weight: 600;
    color: rgba(99, 99, 99, 1);
    padding-bottom: 0px;
  }

  .drug .flex-non-items {
    display: flex;
    gap: 8px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: 80px;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
  }

  .drug .flex-items {
    display: flex;
    gap: 8px;
    /* flex-direction: row; */
  }

  .drug .flex-items .logo {
    /* font-weight: 600; */
    color: rgba(51, 51, 51, 1);
    /* white-space: nowrap; */
  }

  .drug .flex-items .detail {
    /* font-weight: 400; */
    /* color: rgba(152, 152, 152, 1); */
    /* white-space: normal; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  }

  .drug .flex-items .detail div {
    white-space: nowrap;
  }

  .drug .flex-items .detail span {
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }

  .drug-background {
    /* background-color: rgba(250, 250, 250, 1); */
    background-color: rgba(250, 250, 250, 1);
    border-radius: 8px;
  }

  .btn-size {
    padding-top: 18px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .btn-size .v-btn {
    width: 100%;
  }
}
@media (min-width: 376px) and (max-width: 430px) {

  .container {
    padding-top: 5%;
    background-color: rgba(242, 250, 240, 1);
    position: relative;
    overflow: hidden;
    z-index: 0;
    width: 100%;
    height: 100%;
    font-size: 14px;
  }
  .background-info {
    z-index: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: auto;
  }
  .content-header {
    margin-top: 42px;
    z-index: 1;
    font-size: 20px;
    font-weight: 700;
    position: relative;
    white-space: nowrap;
    align-items: center;
  }
  .display-text-header {
    display: flex;
    padding-left: 20vw;
  }

  .headers {
    margin-top: 32px;
    position: relative;
    z-index: 1;
    padding: 16px;
    padding-top: 40px;
  }

  .member-detail {
    margin-top: -40px;
    padding-top: 30px;
    padding-bottom: 30px;
    border-radius: 16px;
    background-color: #FFFFFF;

  }

  .member-detail > .v-avatar {
    border: 2px solid rgba(200, 235, 194, 1);
  }

  .v-chip {
    font-size: 14px !important;
    font-weight: 400 !important;
    color: rgba(82, 196, 26, 1);
    background-color: rgba(238, 249, 232, 1) !important;
  }

  .member-sub {
    margin-top: 0px !important;
  }

  .member-sub-image {
    margin-top: 8px;
  }

  .member-sub-image .col {
    padding-top: 0px !important;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
  }

  .member-sub-image .col span {
    font-weight: 600 !important;
    color: rgba(51, 51, 51, 1) !important;
  }

  .text-main-product {
    font-size: 14px;
    font-weight: 600;
    color: #636363;
  }

  .content-product {
    padding: 8px;
  }

  .no-product {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FAFAFA;
    border-radius: 8px;
    height: 100px;
    padding: 16px;
  }

  .list-item {
    background: #FAFAFA;
    border-radius: 8px;
    margin-bottom: 5px;
    display: flex;
    padding: 10px;
  }

  .list-index {
    margin-right: 5px;
  }

  .detail-name-product {
    margin-bottom: 5px;
  }

  .detail-country-product {
    margin-bottom: 5px;
  }

  .detail-ref-product {
    display: flex;
  }

  .details .text-title {
    font-weight: 600 !important;
    color: rgba(51, 51, 51, 1) !important;
  }

  .details .col {
    padding-top: 0px !important;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
  }

  .details .col span {
    font-weight: 600 !important;
    color: rgba(51, 51, 51, 1) !important;
  }

  .sub-detail {
    display: flex;
    flex-direction: column;
  }

  .sub-email {
    display: flex;
  }

  .title-agent {
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }

  .title-agent .col {
    padding-top: 0px;
  }

  .agent .flex-items {
    display: flex;
    gap: 16px;
    flex-direction: row;
  }

  .agent .flex-items .logo {
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    white-space: nowrap;
  }

  .agent .flex-items .detail {
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
  }

  .agent .flex-items .detail span {
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }

  /* drug */
  .drug-title {
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }

  .drug-sub {
    font-weight: 600;
    color: rgba(99, 99, 99, 1);
    padding-bottom: 0px;
  }

  .drug .flex-non-items {
    display: flex;
    gap: 8px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: 80px;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
  }

  .drug .flex-items {
    display: flex;
    gap: 8px;
    /* flex-direction: row; */
  }

  .drug .flex-items .logo {
    /* font-weight: 600; */
    color: rgba(51, 51, 51, 1);
    /* white-space: nowrap; */
  }

  .drug .flex-items .detail {
    /* font-weight: 400; */
    /* color: rgba(152, 152, 152, 1); */
    /* white-space: normal; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  }

  .drug .flex-items .detail div {
    white-space: nowrap;
  }

  .drug .flex-items .detail span {
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }

  .drug-background {
    /* background-color: rgba(250, 250, 250, 1); */
    background-color: rgba(250, 250, 250, 1);
    border-radius: 8px;
  }

  .btn-size {
    padding-top: 18px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .btn-size .v-btn {
    width: 100%;
  }
}
@media (min-width: 431px) {
  .container {
    padding-top: 5%;
    background-color: rgba(242, 250, 240, 1);
    position: relative;
    overflow: hidden;
    z-index: 0;
    width: 100%;
    height: 100%;
    font-size: 14px;
  }
  .background-info {
    z-index: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: auto;
  }
  .content-header {
    margin-top: 42px;
    z-index: 1;
    font-size: 20px;
    font-weight: 700;
    position: relative;
    white-space: nowrap;
    align-items: center;
  }
  .display-text-header {
    display: flex;
    padding-left: 20vw;
  }

  .headers {
    margin-top: 32px;
    position: relative;
    z-index: 1;
    padding: 16px;
    padding-top: 40px;
  }

  .member-detail {
    margin-top: -40px;
    padding-top: 30px;
    padding-bottom: 30px;
    border-radius: 16px;
    background-color: #FFFFFF;

  }

  .member-detail > .v-avatar {
    border: 2px solid rgba(200, 235, 194, 1);
  }

  .v-chip {
    font-size: 14px !important;
    font-weight: 400 !important;
    color: rgba(82, 196, 26, 1);
    background-color: rgba(238, 249, 232, 1) !important;
  }

  .member-sub {
    margin-top: 0px !important;
  }

  .member-sub-image {
    margin-top: 8px;
  }

  .member-sub-image .col {
    padding-top: 0px !important;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
  }

  .member-sub-image .col span {
    font-weight: 600 !important;
    color: rgba(51, 51, 51, 1) !important;
  }

  .text-main-product {
    font-size: 14px;
    font-weight: 600;
    color: #636363;
  }

  .content-product {
    padding: 8px;
  }

  .no-product {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FAFAFA;
    border-radius: 8px;
    height: 100px;
    padding: 16px;
  }

  .list-item {
    background: #FAFAFA;
    border-radius: 8px;
    margin-bottom: 5px;
    display: flex;
    padding: 10px;
  }

  .list-index {
    margin-right: 5px;
  }

  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .detail-product {
    display: flex;
  }

  .detail-name-product {
    margin-bottom: 5px;
  }

  .detail-country-product {
    margin-bottom: 5px;
  }

  .detail-ref-product {
    display: flex;
  }

  .details .text-title {
    font-weight: 600 !important;
    color: rgba(51, 51, 51, 1) !important;
  }

  .details .col {
    padding-top: 0px !important;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
  }

  .details .col span {
    font-weight: 600 !important;
    color: rgba(51, 51, 51, 1) !important;
  }

  .sub-detail {
    display: flex;
  }

  .sub-email {
    display: flex;
  }

  .title-agent {
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }

  .title-agent .col {
    padding-top: 0px;
  }

  .agent .flex-items {
    display: flex;
    gap: 16px;
    flex-direction: row;
  }

  .agent .flex-items .logo {
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    white-space: nowrap;
  }

  .agent .flex-items .detail {
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
  }

  .agent .flex-items .detail span {
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }

  /* drug */
  .drug-title {
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }

  .drug-sub {
    font-weight: 600;
    color: rgba(99, 99, 99, 1);
    padding-bottom: 0px;
  }

  .drug .flex-non-items {
    display: flex;
    gap: 8px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: 80px;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
  }

  .drug .flex-items {
    display: flex;
    gap: 8px;
    /* flex-direction: row; */
  }

  .drug .flex-items .logo {
    /* font-weight: 600; */
    color: rgba(51, 51, 51, 1);
    /* white-space: nowrap; */
  }

  .drug .flex-items .detail {
    /* font-weight: 400; */
    /* color: rgba(152, 152, 152, 1); */
    /* white-space: normal; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  }

  .drug .flex-items .detail div {
    white-space: nowrap;
  }

  .drug .flex-items .detail span {
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }

  .drug-background {
    /* background-color: rgba(250, 250, 250, 1); */
    background-color: rgba(250, 250, 250, 1);
    border-radius: 8px;
  }

  .btn-size {
    padding-top: 18px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .btn-size .v-btn {
    width: 100%;
  }
}
</style>
