<template>
  <div class="headers">
    <Loading :overlay="overlay" />
    <div v-show="!overlay">
      <v-container>
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
        <v-row class="box-items">
          <v-col style="background-color: #fafafa; border-radius: 8px">
            <v-row
              v-for="(val, index) in listCommittee"
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
                      :src="
                        val.company_logo
                          ? 'data:image/png;base64,' + val.company_logo
                          : require('~/assets/img/user/building.svg')
                      "
                    />
                  </div>
                </v-col>
                <v-col cols="8">
                  <v-row>
                    <v-col class="py-0 pr-0">
                      <span>{{ val.position }}</span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="py-0 pr-0">
                      <span>{{ val.fullName }}</span>
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
</template>
<script>
export default {
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
        },
        {
          position: 'อุปนายกสมาคมฯ',
          fullName: 'น.สพ. สิวิชัย ตันติวัญญูพงศ์',
        },
        {
          position: 'เลขาธิกาสมาคมฯ',
          fullName: 'น.สพ. พิทยา สวนขวัญ',
        },
        {
          position: 'ฝ่ายวิชาการสมาคมฯ',
          fullName: 'น.สพ. ณรงค์ สุธัมนาถพงษ์',
        },
        {
          position: 'เหรัญญิกสมาคมฯ',
          fullName: 'สพ. ญ. อรุณโรจน์ นิลรัตนประเสริฐ',
        },
        {
          position: 'นายทะเบียนสมาคมฯ',
          fullName: 'คุณวิศิษฏ์สิริ สายสว่าง',
        },
        {
          position: 'Regulatory Affair (RA)',
          fullName: 'สพ. ญ. ศศิวิมล ตลุ่มมุข',
        },
        {
          position: 'ฝ่ายปฏิคมและจัดหารายได้สมาคมฯ',
          fullName: 'สพ. ญ. กมลวรรณ ณ ลำพูน',
        },
        {
          position: 'ประชาสัมพันธ์สมาคมฯ',
          fullName: 'คุณรัชพล กิจจานุกิจ',
        },
        {
          position: 'ที่ปรึกษาสมาคามฯ',
          fullName: 'น.สพ.ดร. วิรชาติ ชัยคำภา',
        },
        {
          position: 'ที่ปรึกษาสมาคมฯ',
          fullName: 'น.สพ. ชัชวาลย์ อรวรรณนุกุล',
        },
        {
          position: 'ที่ปรึกษาสมาคมฯ',
          fullName: 'ภก. นัคนันท์ ชิตอรุณ',
        },
        {
          position: 'ประชาสัมพันธ์สมาคมฯ',
          fullName: 'คุณชยานนท์ กฤตยาเชวง',
        },
        {
          position: 'ที่ปรึกษาสมาคามฯ',
          fullName: 'น.สพ. สุเมธ ทรัพย์ชูกุล',
        },
        {
          position: 'ที่ปรึกษาสมาคมฯ',
          fullName: 'น.สพ. เทียนชัย ไพฑูรย์วงศ์วิระ',
        },
        {
          position: 'ที่ปรึกษาสมาคมฯ',
          fullName: 'น.สพ. สมบัติ โรจน์อัศวเสถียร',
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
.headers {
  position: relative;
  z-index: 2;
  padding-top: 40px;
}
.container {
  border-radius: 16px;
  background-color: #fff !important;
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