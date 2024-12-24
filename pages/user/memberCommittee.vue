<template>
  <v-container class="container">
    <div>
      <v-img
        style="
          z-index: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: 100%;
          height: auto;
        "
        :src="require('~/assets/img/user/news-bg.svg')"
      />
      <v-row
        style="
          margin-top: 42px;
          z-index: 1;
          font-size: 20px;
          font-weight: 700;
          position: relative;
          white-space: nowrap;
        "
        align="center"
      >
        <v-col
          ><v-icon
            style="
              font-size: 32px !important;
              background-color: #fff;
              border-radius: 100%;
            "
            color="rgba(120, 205, 107, 1)"
            @click="$router.back()"
            >mdi-chevron-left</v-icon
          ></v-col
        >
        <v-col
          ><v-row justify="center" style="color: #ffffff"
            >คณะกรรมการ</v-row
          ></v-col
        >
        <v-col></v-col>
      </v-row>
    </div>
    <div class="headers">
      <Loading :overlay="overlay" />
      <div v-show="!overlay">
        <v-container style="background-color: #ffffff; border-radius: 16px">
          <v-row>
            <v-col
              cols="12"
              class="text-title-count"
              style="display: block; text-align: center"
            >
              <span style="font-weight: 700; color: #333333"
                >คณะกรรมการสมาคมธุรกิจเวชภัณฑ์สัตว์</span
              >
              <br />
              <span style="font-weight: 700; color: #333333"
                >วาระปี 2567-2568</span
              >
            </v-col>
          </v-row>
          <v-row style="display: flex; flex-direction: column; align-items: center;">
            <v-col class="details-logo" cols="4">
              <div>
                <v-img
                  class="company-logo"
                  width="120"
                  height="120"
                  :src="listCommittee[0].image"
                />
              </div>
            </v-col>
            <v-col cols="8" style="padding-left: 0px; display: flex; flex-direction: column; align-items: center;">
              <v-row>
                <v-col class="py-0">
                  <span
                    style="font-weight: 400; font-size: 14px; color: #989898"
                    >{{ listCommittee[0].position }}</span
                  >
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0 pr-0">
                  <span
                    style="font-weight: 600; font-size: 16px; color: #333333"
                    >{{ listCommittee[0].fullName }}</span
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="box-items">
            <v-col style="background-color: #fafafa; border-radius: 8px">
              <v-row
                v-for="(item, index) in listCommittee"
                :key="index"
                style="display: flex; align-items: center"
              >
                <template v-if="index > 0">
                  <v-col class="details-logo" cols="4">
                    <div>
                      <v-img
                        class="company-logo"
                        width="60"
                        height="60"
                        :src="item.image"
                      />
                    </div>
                  </v-col>
                  <v-col cols="8" class="pl-0">
                    <v-row>
                      <v-col class="py-0">
                        <span
                          style="
                            font-weight: 400;
                            font-size: 14px;
                            color: #989898;
                          "
                          >{{ item.position }}</span
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="py-0 pr-0">
                        <span
                          style="
                            font-weight: 600;
                            font-size: 16px;
                            color: #333333;
                          "
                          >{{ item.fullName }}</span
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </template>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
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
      companyAll: {},
      page: 1,
      paginationLength: 0,
      companyCount: 0,
      listCommittee: [
        {
          position: 'นายกสมาคมฯ',
          fullName: 'น.สพ. ไพรวัน สีพั่ว',
          image: require('~/assets/img/user/committee1.png'),
        },
        {
          position: 'อุปนายกสมาคมฯ',
          fullName: 'น.สพ. สิวิชัย ตันติวัญญูพงศ์',
          image: require('~/assets/img/user/committee2.png'),
        },
        {
          position: 'เลขาธิกาสมาคมฯ',
          fullName: 'น.สพ. พิทยา สวนขวัญ',
          image: require('~/assets/img/user/committee3.png'),
        },
        {
          position: 'ฝ่ายวิชาการสมาคมฯ',
          fullName: 'น.สพ. ณรงค์ สุธัมนาถพงษ์',
          image: require('~/assets/img/user/committee4.png'),
        },
        {
          position: 'เหรัญญิกสมาคมฯ',
          fullName: 'สพ. ญ. อรุณโรจน์ นิลรัตนประเสริฐ',
          image: require('~/assets/img/user/committee5.png'),
        },
        {
          position: 'นายทะเบียนสมาคมฯ',
          fullName: 'คุณวิศิษฏ์สิริ สายสว่าง',
          image: require('~/assets/img/user/committee6.png'),
        },
        {
          position: 'Regulatory Affair (RA)',
          fullName: 'สพ. ญ. ศศิวิมล ตลุ่มมุข',
          image: require('~/assets/img/user/committee7.png'),
        },
        {
          position: 'ฝ่ายปฏิคมและจัดหารายได้สมาคมฯ',
          fullName: 'สพ. ญ. กมลวรรณ ณ ลำพูน',
          image: require('~/assets/img/user/committee8.png'),
        },
        {
          position: 'ประชาสัมพันธ์สมาคมฯ',
          fullName: 'คุณรัชพล กิจจานุกิจ',
          image: require('~/assets/img/user/committee9.png'),
        },
        {
          position: 'ที่ปรึกษาสมาคามฯ',
          fullName: 'น.สพ.ดร. วิรชาติ ชัยคำภา',
          image: require('~/assets/img/user/committee10.png'),
        },
        {
          position: 'ที่ปรึกษาสมาคมฯ',
          fullName: 'น.สพ. ชัชวาลย์ อรวรรณนุกุล',
          image: require('~/assets/img/user/committee11.png'),
        },
        {
          position: 'ที่ปรึกษาสมาคมฯ',
          fullName: 'ภก. นัคนันท์ ชิตอรุณ',
          image: require('~/assets/img/user/committee12.png'),
        },
        {
          position: 'ประชาสัมพันธ์สมาคมฯ',
          fullName: 'คุณชยานนท์ กฤตยาเชวง',
          image: require('~/assets/img/user/committee13.png'),
        },
        {
          position: 'ที่ปรึกษาสมาคามฯ',
          fullName: 'น.สพ. สุเมธ ทรัพย์ชูกุล',
          image: require('~/assets/img/user/committee14.png'),
        },
        {
          position: 'ที่ปรึกษาสมาคมฯ',
          fullName: 'น.สพ. เทียนชัย ไพฑูรย์วงศ์วิระ',
          image: require('~/assets/img/user/committee15.png'),
        },
        {
          position: 'ที่ปรึกษาสมาคมฯ',
          fullName: 'น.สพ. สมบัติ โรจน์อัศวเสถียร',
          image: require('~/assets/img/user/committee16.png'),
        },
      ],
    }
  },
  watch: {
    page: {
      handler() {
        this.getApiDataCompany()
      },
      deep: true,
    },
  },
  mounted() {
    window.scrollTo(0, 0)
    this.getApiDataCompany()
  },
  updated() {
    this.$emit('getShow', true)
  },
  methods: {
    async getApiDataCompany() {
      this.overlay = true
      const res = await this.$axios
        .get(`/api/user/getDetailCompanyAll?limit=3&page=${this.page}`)
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200) {
        this.companyAll = res.data.result
        this.companyCount = res.data.count_company
        this.paginationLength = Math.ceil(res.data.count_company / 3)
        this.overlay = false
      }
    },
  },
}
</script>
  <style scoped>
.container {
  padding-top: 5%;
  background-color: rgba(242, 250, 240, 1);
  position: relative;
  overflow: hidden;
  z-index: 0;
  width: 100%;
  height: 100%;
}
.headers {
  position: relative;
  z-index: 2;
  padding-top: 40px;
}
.text-title-count {
  padding-top: 24px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(152, 152, 152, 1);
}
.box-items {
  padding: 16px;
}
.box-card {
  background-color: rgba(250, 250, 250, 1);
  border-radius: 8px;
  margin-bottom: 16px;
}
.details-logo {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 12px;
  border-radius: 8px;
  justify-content: center;
}
.company-logo {
  border-radius: 50%;
}
.text-style {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.box-tel {
  display: flex;
  gap: 24%;
  flex-direction: row;
  justify-content: flex-start;
}
.tel-title {
  font-size: 14px;
  font-weight: 400;
  color: rgba(152, 152, 152, 1);
  margin-bottom: 8px;
}
.tel-number {
  font-size: 14px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}
.address-text-title {
  font-size: 14px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 8px;
}
.address-sub-title {
  font-size: 14px;
  font-weight: 400;
  color: rgba(99, 99, 99, 1);
}
/* agent */
.agent .flex-items {
  display: flex;
  gap: 16px;
  font-size: 14px;
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
.detail div {
  display: flex;
  flex-direction: column;
}
.text-title-logo {
  font-size: 16px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}
.text-sub-logo {
  font-size: 16px;
  font-weight: 400;
  color: rgba(152, 152, 152, 1);
}
</style>