<template>
  <div style="background-color: #f3f7f7;">
    <h1 class="text__main mt-5 mb-2 ml-4">ข้อมูลสมาชิก</h1>
    <v-tabs v-model="currentTab" color="#78CD6B" class="custom-active-tab tab__detail ml-3 pr-5 gray__tabs">
      <v-row no-gutters class="gray__tab">
        <v-tab v-for="(v, i) in typeTabs" :key="i" class="" @click="selectTab(v)">
          {{ v.text }}
          <v-chip class="ml-2" :color="currentTab === i ? '#78CD6B' : ''">
            <span :class="{ text__count: currentTab === i }">
              {{ v.count }}
            </span>
          </v-chip>
        </v-tab>
      </v-row>
    </v-tabs>
    <!-- <v-divider></v-divider> -->
    <v-row>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="filteredItems" :search="search" item-key="name" class="all__page elevation-1 pb-4"
          hide-default-footer :loading="isLoading" loading-text="กำลังโหลด..." no-data-text="ไม่พบข้อมูล" no-results-text="ไม่พบข้อมูล"
          :page.sync="currentPage" :items-per-page="10">
          <template #top>
            <v-row no-gutters class="row__baseline pt-6">
              <v-col cols="4" sm="4">
                <v-text-field v-model="search" height="40px" append-icon="mdi-magnify" color="#78CD6B"
                  placeholder="ค้นหา" dense class="ma-3" outlined clearable>
                </v-text-field>
                <!-- <img :src="require(`~/assets/admin/Search.svg`)" /> -->
              </v-col>

              <span class="text__search">ประเภทธุรกิจ :</span>
              <v-col cols="4" sm="2">
                <v-select v-model="TypeCompany" :items="itemsBusinessType" color="#78CD6B" dense placeholder="ทั้งหมด"
                  append-icon="mdi-chevron-down" class="ma-3" outlined></v-select>
              </v-col>
              <span class="text__search">วันที่อัปเดทข้อมูล :</span>
              <v-col cols="4" sm="2">
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                  transition="scale-transition" offset-y min-width="auto">
                  <template #activator="{ on, attrs }">
                    <v-text-field v-model="formattedDate" color="#78CD6B" height="40px" class="ma-3" readonly clearable
                      append-icon="mdi-calendar-multiselect" placeholder="วว/ดด/ปป" dense outlined v-bind="attrs"
                      @click:clear="getClearformattedDate()" v-on="on" @click:append="menu = true"></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable color="#78CD6B" locale="th-TH">
                    <v-spacer></v-spacer>
                    <!-- <v-btn text color="#03753A" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn color="#78CD6B" @click="$refs.menu.save(date)">
                      <span class="white__color"> OK </span>
                    </v-btn> -->
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row no-gutters class="text__member_all ml-4 mb-5">
              รายชื่อสมาชิกทั้งหมด {{ items.length || 0 }} รายการ
            </v-row>
          </template>

          <template #[`item.no`]="{ item }">
            <span class="text__main_pad">
              {{ items.indexOf(item) + 1 }}
            </span>
          </template>
          <template #[`item.telephone`]="{ item }">
            {{ formatTele(item.company_telephone) }}
          </template>
          <template #[`item.update_at`]="{ item }">
            {{ formatToBuddhistDate(item.update_at) }}
          </template>
          <template #[`item.status`]="{ item }">
            <v-chip small :color="chipColor(item.status_company)"><span :class="item.status_company === 'รอตรวจสอบ'
      ? 'text__orange'
      : item.status_company === 'member'
        ? 'text__green'
        : 'text__gray'
      " class="text__status">● {{ changeTextStatus(item.status_company) }}</span></v-chip>
          </template>

          <template #[`item.action`]="{ item }">
            <v-btn text @click="goProfile(item.id)">
              <!-- to="information/profile" -->
              <v-img width="24" contain :src="require('@/assets/info/doc.svg')"></v-img>
              <span class="action__link">รายละเอียด</span>
            </v-btn>
          </template>

          <template #footer>
            <v-divider class="mb-3"></v-divider>
            <div class="d-flex align-center">
              <v-spacer></v-spacer>
              <v-pagination v-if="!isLoading && items.length !== 0" v-model="currentPage" :length="countPage" :total-visible="5" circle
                color="#78CD6B"></v-pagination>
              <!-- <v-btn color="#78CD6B" icon text :disabled="currentPage <= 1" @click="currentPage--">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn v-if="currentPage >= 4 || allData === 0" text icon @click="currentPage = 1">
                <v-chip :text-color="currentPage === 1 ? '#78CD6B' : ''"
                  :color="currentPage === 1 ? '#F2FAF0' : 'rgba(242, 250, 240, 0.01)'">
                  1
                </v-chip>
              </v-btn>
              <v-btn v-if="currentPage >= 5" icon text> ... </v-btn>
              <v-btn v-for="(pageNumber, index) in filteredPageNumbers" :key="index" text icon
                @click="goToPage(pageNumber)">
                <v-chip :text-color="currentPage === pageNumber ? '#78CD6B' : ''"
                  :color="currentPage === pageNumber ? '#F2FAF0' : 'rgba(242, 250, 240, 0.01)'">
                  {{ pageNumber }}
                </v-chip>
              </v-btn>
              <v-btn v-if="currentPage < lastPage - 3" text icon> ... </v-btn>
              <v-btn v-if="currentPage < lastPage - 2" text icon :color="currentPage === lastPage ? '#78CD6B' : ''"
                @click="currentPage = lastPage">
                {{ lastPage }}
              </v-btn>
              <v-btn color="#78CD6B" icon text :disabled="currentPage >= lastPage" @click="currentPage++">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn> -->
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
// import { colors } from 'vuetify/lib'
function toBuddhistYear(year) {
  return year + 543
}

export default {
  middleware: 'auth',
  data() {
    return {
      statusCompany: '',
      TypeCompany: null,
      memberNo: '',

      allData: 0,
      tabPage: null,

      currentTab: 0,
      typeTabs: [
        {
          type: 'all',
          text: 'ทั้งหมด',
          count: 0,
        },
        {
          type: 'waiting',
          text: 'รอตรวจสอบ',
          count: 0,
        },
        {
          type: 'member',
          text: 'เป็นสมาชิก',
          count: 0,
        },
        {
          type: 'notmember',
          text: 'ไม่เป็นสมาชิก',
          count: 0,
        },
      ],
      countType: {},

      currentPage: 1,
      // lastPage: 20,
      maxVisiblePages: 5,

      search: '',
      date: null,
      menu: false,
      calories: '',
      itemsBusinessType: ['บริษัทจำกัด', 'บริษัทมหาชน'],
      items: [],

      isLoading: false,
      itemsPerPage: 10,
      countPage: 1,
      headers:
        [
          {
            text: 'ลำดับ',
            align: 'center',
            sortable: false,
            value: 'no',
            width: '60px',
          },
          {
            text: 'ชื่อบริษัท (ภาษาไทย)',
            value: 'company_name_th',
            sortable: false,
            width: '180px'
          },
          {
            text: 'ประเภทธุรกิจ',
            value: 'type_company',
            align: 'center',
            sortable: false,
            width: '145px',
          },
          {
            text: 'เบอร์โทรศัพท์',
            value: 'telephone',
            sortable: false,
            width: '120px',
          },
          {
            text: 'อีเมล',
            value: 'company_email',
            align: 'center',
            sortable: false,
          },
          {
            text: 'วันที่อัปเดตข้อมูล',
            value: 'update_at',
            align: 'center',
            sortable: false,
            width: '136px',
          },
          {
            text: 'สถานะ',
            value: 'status',
            align: 'center',
            sortable: false,
            width: '120px',
          },
          {
            text: 'จัดการ',
            value: 'action',
            align: 'center',
            sortable: false,
            width: '130px',
          },
        ],
      tempItems: []
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.allData.length / this.itemsPerPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.allData.slice(start, end);
    },
    visiblePageNumbers() {
      // Calculate visible page numbers based on totalPages (customize as needed)
      const pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
      return pages;
    },
    watchedValues() {
      return [this.currentPage, this.TypeCompany, this.statusCompany, this.menu]
    },

    formattedDate() {
      if (!this.date) return ''
      const d = new Date(this.date)
      const day = d.getDate().toString().padStart(2, '0')
      const month = (d.getMonth() + 1).toString().padStart(2, '0')
      const year = toBuddhistYear(d.getFullYear())
      return `${day}/${month}/${year}`
    },
    filteredPageNumbers() {
      return this.visiblePageNumbers.filter(pageNumber => pageNumber !== 1);
    },
    filteredItems() {
      let filtered = this.items;
      // Filter by search text
      if (this.search) {
        filtered = filtered.filter(item => {
          return (
            item.company_name_th.toLowerCase().includes(this.search.toLowerCase())
          );
        });
      }

      // Filter by selected date if available
      if (this.formattedDate) {
        filtered = filtered.filter(item => {
          return this.formatToBuddhistDate(item.update_at) === this.formattedDate;
        });
      }
      return filtered;
    },
  },
  watch: {
    // currentPage (val) {
    //   this.getDashboard ()
    // },
    // TypeCompany (val) {
    //   this.getDashboard ()
    // },
    // statusCompany (val) {
    //   this.getDashboard ()
    // },
    // date (val) {
    //   this.getDashboard ()
    // }
    watchedValues: {
      handler() {
        this.getDashboard()
      },
      deep: true,
    },
  },
  created() {
    this.getDashboard()
  },
  methods: {
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
    },
    updateA(index) {
      if (index === 0) {
        this.statusCompany = ''
      } else if (index === 1) {
        this.statusCompany = 'wait'
      } else if (index === 2) {
        this.statusCompany = 'member'
      } else {
        this.statusCompany = 'not_member'
      }
    },

    getClear() {
      this.search = ''
      this.getDashboard()
    },
    getClearformattedDate() {
      this.date = ''
      this.getDashboard()
    },
    goProfile(no) {
      this.$router.push(`/admin/profile/${no}`)
    },
    async getDashboard() {
      this.isLoading = true
      const res = await this.$axios.$get(`/api/admin/getAllCompanyDash`)
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.message === 'success') {
        this.tempItems = res.results
        this.items = res.results
        const size = this.items.length
        this.countPage = Math.ceil(size / this.itemsPerPage);
        this.typeTabs[0].count = size // จำนวนทั้งหมด
        // this.allData = res.number
        // this.lastPage = Math.ceil(this.allData / 10)
        // this.countType = res.dashboard
        this.isLoading = false
      }
    },
    setType(type) {
      if (type === 'all') {
        return 'ทั้งหมด'
      } else if (type === 'waiting') {
        return 'รอตรวจสอบ'
      } else if (type === 'member') {
        return 'เป็นสมาชิก'
      } else {
        return 'ไม่เป็นสมาชิก'
      }
    },
    setTypeColor(type) {
      if (type === 'all') {
        return 'ทั้งหมด'
      } else if (type === 'waiting') {
        return 'รอตรวจสอบ'
      } else if (type === 'member') {
        return 'เป็นสมาชิก'
      } else {
        return 'ไม่เป็นสมาชิก'
      }
    },
    formatTele(number) {
      // console.log('number', number);
      if (!number) {
        return '-'
      }
      if (number[0] === '(') {
        return number.slice(0, 5) + '-' + number.slice(5)
      }
      return number.slice(0, 3) + '-' + number.slice(3)
    },
    formatToBuddhistDate(isoDateString) {
      const date = new Date(isoDateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const buddhistYear = date.getFullYear() + 543;
      return `${day}/${month}/${buddhistYear}`;
    },
    chipColor(status) {
      if (status === 'waiting') {
        return '#FFF0D7'
      } else if (status === 'member') {
        return '#DDF1DD'
      } else {
        return '#EFF2F9'
      }
    },
    changeTextStatus(status) {
      if (status === 'waiting') {
        return 'รอตรวจสอบ'
      } else if (status === 'member') {
        return 'เป็นสมาชิก'
      } else {
        return 'ไม่เป็นสมาชิก'
      }
    },
    selectTab(data) {
      const type = data.type
      const allItem = this.tempItems
      switch(type) {
        case 'waiting':
          this.items = allItem.filter(item => item.status_company === 'waiting')
          break;
        case 'member':
          this.items = allItem.filter(item => item.status_company === 'member')
          break;
        case 'noMember':
          this.items = allItem.filter(item => item.status_company === 'noMember')
          break;
        case 'all':
          this.items = allItem
          break;
      }
    }
  },
}
</script>
<style scoped>
.bg {
  /* background-color: #E6E6E6; */
  /* z-index: -1; */
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-size: contain;
}

.v-slide-group__content {
  border-bottom: 2px solid rgba(230, 230, 230, 1);
}

.v-tabs-slider-wrapper {
  bottom: -2px !important;
}

.v-input__control .v-input__slot {
  border-radius: 8px;
}

.v-data-table {
  border-radius: 16px !important;
}

.row__baseline {
  display: flex;
  align-items: baseline;
}

.action__link {
  text-decoration: underline;
  color: #78cd6b;
  font-size: 14px;
  font-weight: 550;
  line-height: 24px;
  text-align: left;
}

.text__orange {
  color: #ff8800;
}

.text__green {
  color: #33a934;
}

.text__gray {
  color: #9eabbc;
}

.text__search {
  color: #636363;
  font-size: 16px;
}

.text__main {
  color: #333333;
  font-size: 32px;
  font-weight: 500;
  line-height: 48px;
}

.text__member_all {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.all__page {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 18px;
}

.v-text-field {
  max-height: auto !important;
}

.text__count {
  color: #ffff;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  text-align: left;
}

.v-data-table {
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
}

.text__status {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
}
</style>
<style>
/* .v-main__wrap {
  background-color: #f3f7f7;
} */

.gray__tabs .v-tabs-bar.v-item-group>* {
  background-color: #f3f7f7;
  /* border-bottom: 2px solid #989898; */
  /* outline: 4px solid red; */
  /* outline-offset: -2px; */
  /* margin-bottom: -2px; */
}

.custom-active-tab .v-tab--active {
  bottom: -2px;
  padding-bottom: 2px;
}

.gray__tab {
  border-bottom: 2px solid #e6e6e6;
}

/* .custom-active-tab .v-tab--active::after {
    bottom: -2px !important; /* เลื่อนเส้นลงล่าง 2px
  } */
/* .divider { border-right: 1px solid #b3d4fc } .divider:last-child  { border-right: 0 } */
/* Adjust the color of the headings in the table */
.theme--light.v-data-table>.v-data-table__wrapper>table>thead>tr>th {
  color: #989898;
  font-size: 14px;
}

.v-date-picker-table {
  height: 200px;
}
</style>