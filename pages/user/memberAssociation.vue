<template>
  <v-container class="container">
    <Loading :overlay="overlay" />
    <div v-show="!overlay">
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
            >สมาชิกสมาคม</v-row
          ></v-col
        >
        <v-col></v-col>
      </v-row>
    </div>
    <div v-show="!overlay" class="content">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="searchInput" dense class="search" height="40" solo rounded append-icon="mdi-magnify"
            placeholder="ค้นหาสมาชิกสมาคม" @keydown.enter="submit" @click:append="submit" @focus="show = true"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-title-count"
          >รายชื่อสมาชิกทั้งหมด ({{ tempCompany.length }} รายชื่อ)
        </v-col>
      </v-row>
      <v-row v-if="tempCompany.length > 0" class="box-items">
        <v-col>
          <v-row
            v-for="(val, index) in currentPosts"
            :key="index"
            class="box-card"
          >
            <v-col class="details-logo" cols="12">
              <div>
                <v-img
                  class="company-logo"
                  width="60"
                  height="60"
                  :src="
                    val.company_logo
                      ? `data:image/${val.fileType};base64,` + val.company_logo
                      : require('~/assets/img/user/building.svg')
                  "
                />
              </div>
              <div class="text-style">
                <div class="text-title-logo">{{ val.company_name_th }}</div>
                <div class="text-sub-logo">{{ val.company_name_eng }}</div>
              </div>
            </v-col>
            <v-col cols="12" class="box-tel">
              <div>
                <div class="tel-title">เบอร์โทรศัพท์</div>
                <div class="tel-number" v-if="val.company_telephone === null">-</div>
                <div class="tel-number" v-else>{{ val.company_telephone }}</div>
              </div>
              <div>
                <div class="tel-title">เบอร์โทรสาร</div>
                <div class="tel-number" v-if="val.company_fax === null">-</div>
                <div class="tel-number" v-else>{{ val.company_fax }}</div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="address-text-title">ที่อยู่บริษัท(ภาษาไทย)</div>
              <div class="address-sub-title" v-if="val.company_full_address_th === null">
                -
              </div>
              <div class="address-sub-title">
                {{ val.company_full_address_th }}
              </div>
            </v-col>
            <v-col cols="12">
              <div class="address-text-title">Office Address</div>
              <div class="address-sub-title" v-if="val.company_full_address_eng === null">
                -
              </div>
              <div class="address-sub-title">
                {{ val.company_full_address_eng }}
              </div>
            </v-col>
            <v-col cols="12">
              <v-row
                v-for="(agent, indexAgent) in val.agent"
                :key="indexAgent"
                class="agent"
              >
                <v-col cols="12" class="flex-items">
                  <div class="logo">
                    <div>ผู้แทนที่ {{ indexAgent + 1 }}</div>
                    <v-avatar size="48">
                      <v-img
                        :src="'data:image/png;base64,' + agent?.pic_agent"
                        size="85"
                      />
                    </v-avatar>
                  </div>
                  <div class="detail">
                    <div>
                      ชื่อ-นามสกุล (ภาษาไทย) :
                      <span>{{ agent.title_th + ' ' + agent.name_th }}</span>
                    </div>
                    <div>
                      First name - Last name :
                      <span>{{ agent.title_eng + ' ' + agent.name_eng }}</span>
                    </div>
                    <div>
                      อีเมล : <span>{{ agent.email }}</span>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <client-only>
            <v-pagination
              v-model="currentPage"
              :length="max_page"
              circle
              color="rgba(120, 205, 107, 1)"
            >
            </v-pagination>
          </client-only>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <img width="100" :src="require('@/assets/img/user/searchImg.png')"/>
          <p>ไม่พบข้อมูลสมาชิก</p>
        </v-col>
      </v-row>
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
      // new pagination
      currentPage: 1,
      perPage: 3,
      currentPosts: [],
      lastPostIndex: 0,
      firstPostIndex: 0,
      max_page: 0,
      searchInput: '',
      tempCompany: []
    }
  },
  watch: {
    currentPage() {
      this.postsPerPage(this.tempCompany)
    }
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
        .get(`/api/user/getDetailCompanyAll`)
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200) {
        this.companyAll = res.data.result
        this.tempCompany = this.companyAll
        this.postsPerPage(this.tempCompany)
        this.overlay = false
      }
    },
    // getPerPage() {
    //   this.currentPage = 1
    //   this.currentPosts = []
    //   this.lastPostIndex = 0
    //   this.firstPostIndex = 0
    //   this.postsPerPage(this.tempMedicalByTaxId)
    // },
    nextPage() {
      this.currentPage = this.currentPage + 1
      this.postsPerPage(this.tempCompany)
    },
    previousPage() {
      this.currentPage = this.currentPage - 1
      this.postsPerPage(this.tempCompany)
    },
    postsPerPage(data) {
      this.lastPostIndex = this.currentPage * this.perPage
      this.firstPostIndex = this.lastPostIndex - this.perPage
      this.currentPosts = data.slice(this.firstPostIndex, this.lastPostIndex)
      this.max_page =
        data.length % this.perPage === 0
          ? data.length / this.perPage
          : parseInt(data.length / this.perPage) + 1
    },
    submit() {
      if (this.searchInput === '') {
        this.currentPage = 1
        this.lastPostIndex = 0
        this.firstPostIndex = 0
        this.tempCompany = this.companyAll
        this.postsPerPage(this.companyAll)
      } else {
        const searchCompany = this.companyAll.filter(item => item.company_name_th.includes(this.searchInput))
        if (searchCompany.length > 0) {
          this.currentPage = 1
          this.lastPostIndex = 0
          this.firstPostIndex = 0
          this.tempCompany = searchCompany
          this.postsPerPage(this.tempCompany)
        } else {
          this.tempCompany = []
          this.currentPosts = []
        }  
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

.content {
  margin-top: 32px;
  position: relative;
  z-index: 1;
  padding: 16px;
  padding-top: 20px;
  background-color: #ffffff;
  border-radius: 16px;
}

.text-title-count {
  /* padding-top: 20px; */
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