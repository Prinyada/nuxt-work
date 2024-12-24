<template>
   <v-container class="container">
      <Loading :overlay="overlay" />
      <div v-show="!overlay">
         <UserAppbarApp />
         <v-row justify="center" class="card-special">
            <v-col cols="12">
               <div class="box-card">
                  <v-carousel v-model="model" cycle height="auto" hide-delimiters :show-arrows="false"
                     @change="changeSlide()">
                     <v-carousel-item v-for="(slide, i) in news_details_special" :key="i">
                        <div style="height: 140px;">
                           <img :src="`data:image/${slide.fileType};base64,${slide.title_pic}`"
                           style="width: 100%; height: 100%;object-fit: cover;border-radius: 6px;" class="card-image" />
                        </div>
                        <!-- <v-img class="card-image" :src="'data:image/png;base64,' + (slide.title_pic)" height="140px" /> -->
                        <div class="card-title">{{ slide.title_name }}</div>
                        <div class="date-items"><v-img :src="require('~/assets/img/user/date.svg')" />
                           <span class="text">{{ formatDate(slide.create) }}</span>
                        </div>
                     </v-carousel-item>
                  </v-carousel>
               </div>
            </v-col>
         </v-row>
         <v-row align="center">
            <v-col class="list-items">
               <div v-for="(slide, i) in news_details_special" :key="i"
                  :style="{ backgroundColor: listBtn === i ? 'rgba(120, 205, 107, 1)' : 'rgba(230, 230, 230, 1)' }"
                  @click="listBtn = i">
               </div>
            </v-col>
         </v-row>
         <v-row>
            <v-col class="news-detail">ข่าวสารทั้งหมด ({{ news_details_news.length }} รายการ)</v-col>
         </v-row>
         <v-row>
            <v-col>
               <v-text-field v-model="searchInput" dense class="search" height="40" outlined rounded append-icon="mdi-magnify"
          placeholder="ค้นหาข่าวสาร" background-color="white" @keydown.enter="submit" @click:append="submit"></v-text-field>
               <!-- <v-text-field v-model="search" outlined dense class="search" height="40" rounded append-icon="mdi-magnify"
                  background-color="white" placeholder="ค้นหาข่าวสาร" hide-details @change="searchNews"></v-text-field> -->
            </v-col>
         </v-row>
         <v-row dense>
            <template v-if="currentPosts.length > 0">
               <v-col v-for="(val, index) in currentPosts" :key="index" class="box-items" cols="12">
                  <div class="news-card">
                     <div class="item-img">
                        <img
                           :src="`data:image/${val.fileType};base64,${val.title_pic}`"
                           class="size-image" />
                        <!-- <v-img :src="'data:image/png;base64,' + (val?.title_pic)" /> -->
                     </div>
                     <div class="item-text">
                        <div class="news-text-title">{{ val?.title_name }}</div>
                        <div class="news-text">{{ text_ellipsis(val.detail) }}</div>
                        <div class="news-footer">
                           <div class="date-items"><v-img :src="require('~/assets/img/user/date.svg')" width="16" /><span
                                 class="text">{{ formatDate(val?.create) }}</span></div>
                           <div class="read" @click="details(val.ids)">
                              <div>อ่านต่อ</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </v-col>
            </template>
            <template v-else>
               <v-col class="display-search">
                  <img :src="require('~/assets/admin/searchImg.png')" width="150" height="auto"/>
                  <span class="mt-4">ไม่พบข้อมูลข่าวสาร</span>
               </v-col>
            </template>
         </v-row>
      </div>
      <v-row v-show="!overlay" class="position-pagination">
         <v-pagination v-model="currentPage" :length="allPagePagination" circle color="#78CD6B"></v-pagination>
      </v-row>
   </v-container>
</template>
<script>

export default {
   layout: 'empty',
   data() {
      return {
         model: 0,
         listBtn: 0,
         overlay: true,
         page: 1,
         news_details_news: {},
         news_details_special: {},
         url: '',
         base64ImagesSpecial: {},
         base64ImagesNews: {},
         // pagination
         currentPage: 1,
         perPage: 3,
         currentPosts: [],
         lastPostIndex: 0,
         firstPostIndex: 0,
         allPagePagination: 1,
         searchInput: ''
      }
   },

   watch: {
      listBtn: {
         handler(nVal) {
            this.model = nVal
         },
         deep: true
      },
      currentPage(val) {
         this.postsPerPage(this.news_details_news)
      }
   },

   mounted() {
      this.apiGetNews()
   },
   updated() {
   },
   methods: {
      changeSlide() {
         this.listBtn = this.model
      },
      async apiGetNews() {
         if (this.$route.query.type === 'news') {
            this.url = 'getAllNews'
         }
         if (this.$route.query.type === 'activities') {
            this.url = 'getAllEvents'
         }
         const res = await this.$axios.get(`/api/user/${this.url}`)
         .then((response) => {
            return response
         })
         .catch((err) => {
            return err.response
         })
         if (res.status === 200) {
            this.news_details_news = res.data.news || res.data.events
            this.news_details_special = res.data.special_new || res.data.special_event
            this.postsPerPage(this.news_details_news)
            this.allPagePagination = Math.ceil(this.news_details_news.length / 3)
            this.overlay = false
         }
      },
      details(val) {
         this.$router.push(`/user/news/details?title=${this.$route.query.type}&no=${val}`)
      },
      formatDate(date) {
         const monthDefault = this.$dateFns.format(date, 'MM')
         const day = this.$dateFns.format(date, 'dd')
         const year = this.$dateFns.format(date, 'yyyy')
         this.month = ''
         this.months_th_mini = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",]
         if (monthDefault.split("")[0] === '0') {
            this.month = this.months_th_mini[parseInt(monthDefault.split("")[1]) - 1]

         } else {
            this.month = this.months_th_mini[monthDefault - 1]
         }
         const fullDate = day + " " + this.month + " " + year
         return fullDate
      },
      text_ellipsis(val) {
         const text = val.substring(0, 115) + '...'
         return text
      },
      postsPerPage(data) {
         this.lastPostIndex = this.currentPage * this.perPage
         this.firstPostIndex = this.lastPostIndex - this.perPage
         this.currentPosts = data.slice(this.firstPostIndex, this.lastPostIndex)
         this.max_page = data.length % this.perPage === 0 ? data.length / this.perPage : parseInt(data.length / this.perPage) + 1
      },
      submit () {
         if(this.searchInput) {
            const tempSearch = this.news_details_news.filter(item => item.title_name.includes(this.searchInput));
            if (tempSearch.length > 0) {
               this.postsPerPage(tempSearch)
            } else {
               this.currentPosts = []
            }
         } else {
            this.postsPerPage(this.news_details_news)
         }
      }
   }
}

</script>
<style scoped>
.display-search {
   display: flex;
   flex-direction: column;
   text-align: center;
   align-items: center;
   margin-bottom: 10px;
   background-color: #FFFFFF;
   border-radius: 8px;
}
@media (max-width: 375px) {
   .container {
      padding-top: 5%;
      background-color: rgba(242, 250, 240, 1);
      position: relative;
      overflow: hidden;
      z-index: 0;
      width: 100%;
      height: 100%;
   }

   .card-special {
      position: relative;
   }

   .position-img {
      z-index: -1;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      height: auto;
   }

   .text-title {
      margin-top: 42px;
      z-index: 1;
      font-size: 20px;
      font-weight: 700;
   }

   .news-title {
      color: #fff;
   }

   .box-card {
      background-color: #fff;
      padding: 12px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 12px;
   }

   .card-image {
      width: 100%;
      border-radius: 8px;
   }

   .date-items {
      width: 16px;
      display: flex;
      flex-direction: row;
      white-space: nowrap;
      align-items: center;
      margin-top: 12px;
   }

   .date-items span {
      font-size: 10px;
      font-weight: 400;
      color: rgba(152, 152, 152, 1);
      margin-left: 8px;
   }

   .card-title {
      font-size: 14px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 12px;
   }

   .list-items {
      display: flex;
      justify-content: center;
      gap: 12px;
   }

   .list-items div {
      background-color: rgba(230, 230, 230, 1);
      width: 12px;
      height: 12px;
      border-radius: 12px;
   }

   .news-detail {
      font-size: 16px;
      font-weight: 500;
      color: rgba(152, 152, 152, 1);
   }

   .text-details {
      font-size: 14px;
      font-weight: 500;
      color: rgba(120, 205, 107, 1);
      text-align: end;
   }

   .text-details i.v-icon.v-icon {
      color: rgba(120, 205, 107, 1);
   }

   .box-items {
      border-radius: 8px;
      display: flex;
      justify-content: center;
      gap: 8px;
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

   .news-text-title {
      font-size: 14px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
   }

   .news-text {
      color: rgba(152, 152, 152, 1);
      font-size: 12px;
      font-weight: 400;
   }

   .news-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
   }

   .read div {
      font-size: 12px;
      font-weight: 500;
      color: rgba(120, 205, 107, 1);
      text-decoration: underline;
   }

   .icon-size {
      font-size: 32px !important;
      background-color: #fff;
      border-radius: 100%;
   }

   .position-pagination {
      margin: 0;
      width: 100%;
      padding: 0;
      bottom: 20px;
      left: 0;
      justify-content: center;
   }

   .search .v-input__control .v-input__slot {
      background-color: #fff !important;
      border: 1px solid rgba(230, 230, 230, 1);
   }

   .search .v-icon {
      color: rgba(196, 196, 196, 1) !important;
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
   }

   .card-special {
      position: relative;
   }

   .position-img {
      z-index: -1;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      height: auto;
   }

   .text-title {
      margin-top: 42px;
      z-index: 1;
      font-size: 20px;
      font-weight: 700;
   }

   .news-title {
      color: #fff;
   }

   .box-card {
      background-color: #fff;
      padding: 12px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 12px;
   }

   .card-image {
      width: 100%;
      border-radius: 8px;
   }

   .date-items {
      width: 16px;
      display: flex;
      flex-direction: row;
      white-space: nowrap;
      align-items: center;
      margin-top: 12px;
   }

   .date-items span {
      font-size: 10px;
      font-weight: 400;
      color: rgba(152, 152, 152, 1);
      margin-left: 8px;
   }

   .card-title {
      font-size: 14px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 12px;
   }

   .list-items {
      display: flex;
      justify-content: center;
      gap: 12px;
   }

   .list-items div {
      background-color: rgba(230, 230, 230, 1);
      width: 12px;
      height: 12px;
      border-radius: 12px;
   }

   .news-detail {
      font-size: 16px;
      font-weight: 500;
      color: rgba(152, 152, 152, 1);
   }

   .text-details {
      font-size: 14px;
      font-weight: 500;
      color: rgba(120, 205, 107, 1);
      text-align: end;
   }

   .text-details i.v-icon.v-icon {
      color: rgba(120, 205, 107, 1);
   }

   .box-items {
      border-radius: 8px;
      display: flex;
      justify-content: center;
      gap: 8px;
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

   .news-text-title {
      font-size: 14px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
   }

   .news-text {
      color: rgba(152, 152, 152, 1);
      font-size: 12px;
      font-weight: 400;
   }

   .news-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
   }

   .read div {
      font-size: 12px;
      font-weight: 500;
      color: rgba(120, 205, 107, 1);
      text-decoration: underline;
   }

   .icon-size {
      font-size: 32px !important;
      background-color: #fff;
      border-radius: 100%;
   }

   .position-pagination {
      margin: 0;
      width: 100%;
      padding: 0;
      bottom: 20px;
      left: 0;
      justify-content: center;
   }

   .search .v-input__control .v-input__slot {
      background-color: #fff !important;
      border: 1px solid rgba(230, 230, 230, 1);
   }

   .search .v-icon {
      color: rgba(196, 196, 196, 1) !important;
   }
}

@media (min-width: 431px) {
   .card-image {
      width: 100%;
      border-radius: 8px;
   }

   .container {
      padding-top: 5%;
      background-color: rgba(242, 250, 240, 1);
      position: relative;
      overflow: hidden;
      z-index: 0;
      width: 100%;
      height: 100%;
   }

   .card-special {
      position: relative;
   }

   .position-img {
      z-index: -1;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      height: auto;
   }

   .text-title {
      margin-top: 42px;
      z-index: 1;
      font-size: 20px;
      font-weight: 700;
   }

   .news-title {
      color: #fff;
   }

   .box-card {
      background-color: #fff;
      padding: 12px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 12px;
   }

   .card-image {
      width: 100%;
      border-radius: 8px;
   }

   .date-items {
      width: 16px;
      display: flex;
      flex-direction: row;
      white-space: nowrap;
      align-items: center;
      margin-top: 12px;
   }

   .date-items span {
      font-size: 10px;
      font-weight: 400;
      color: rgba(152, 152, 152, 1);
      margin-left: 8px;
   }

   .card-title {
      font-size: 14px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 12px;
   }

   .list-items {
      display: flex;
      justify-content: center;
      gap: 12px;
   }

   .list-items div {
      background-color: rgba(230, 230, 230, 1);
      width: 12px;
      height: 12px;
      border-radius: 12px;
   }

   .news-detail {
      font-size: 16px;
      font-weight: 500;
      color: rgba(152, 152, 152, 1);
   }

   .text-details {
      font-size: 14px;
      font-weight: 500;
      color: rgba(120, 205, 107, 1);
      text-align: end;
   }

   .text-details i.v-icon.v-icon {
      color: rgba(120, 205, 107, 1);
   }

   .box-items {
      border-radius: 8px;
      display: flex;
      justify-content: center;
      gap: 8px;
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

   .news-text-title {
      font-size: 14px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
   }

   .news-text {
      color: rgba(152, 152, 152, 1);
      font-size: 12px;
      font-weight: 400;
   }

   .news-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
   }

   .read div {
      font-size: 12px;
      font-weight: 500;
      color: rgba(120, 205, 107, 1);
      text-decoration: underline;
   }

   .icon-size {
      font-size: 32px !important;
      background-color: #fff;
      border-radius: 100%;
   }

   .position-pagination {
      margin: 0;
      width: 100%;
      padding: 0;
      bottom: 20px;
      left: 0;
      justify-content: center;
   }

   .search .v-input__control .v-input__slot {
      background-color: #fff !important;
      border: 1px solid rgba(230, 230, 230, 1);
   }

   .search .v-icon {
      color: rgba(196, 196, 196, 1) !important;
   }
}
</style>