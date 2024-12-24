<template>
    <v-container>
        <v-row>
            <!-- <v-col cols="6" align-self="center" class="text-title-news">การค้นหาล่าสุด</v-col>
            <v-col cols="6" class="button-btn"><v-chip color="rgba(120, 205, 107, 1)"><v-img :src="require('~/assets/img/user/trash.svg')" /></v-chip></v-col> -->
            <v-col cols="12">
                <v-chip v-show="showNews && searchInput !== ''">ข่าวสาร</v-chip>
                <v-chip v-show="showEvents && searchInput !== ''">กิจกรรม</v-chip>
            </v-col>
        </v-row>
        <template v-if="searchInput === ''">
            <v-row>
                <v-col>
                    <div class="display-search">
                        <v-icon x-large>mdi-text-box-search-outline</v-icon>
                        <span class="mt-4">ค้นหาข่าวสารและกิจกรรมสมาคม</span>
                    </div>
                </v-col>
            </v-row>
        </template>
        <template v-else>
            <v-row v-if="showNews">
                <v-col cols="6">
                    <div class="text-title-news">ข่าวสาร</div>
                </v-col>
                <v-col cols="6" class="text-details">
                    <div @click="AllNews('news')">ดูทั้งหมด <v-icon>mdi-chevron-right</v-icon></div>
                </v-col>
                <template v-if="dataInfoNews.news.length === 0">
                    <div class="display-search">
                        <img :src="require('~/assets/admin/searchImg.png')" width="150" height="auto"/>
                        <span class="mt-4">ไม่พบข้อมูลข่าวสาร</span>
                    </div>
                </template>
                <template v-else>
                    <v-col v-for="(val, index) in dataInfoNews.news" :key="index" class="box-items" cols="12">
                        <div class="news-card">
                            <div class="item-img"><v-img :src="'data:image/png;base64,' + val.title_pic" /></div>
                            <div class="item-text">
                                <div class="news-title">{{ val.title_name }}</div>
                                <div class="news-text">{{ text_ellipsis(val.detail) }}</div>
                                <div class="news-footer">
                                    <div class="date-items"><v-img :src="require('~/assets/img/user/date.svg')"
                                            width="16" /><span class="text">{{ formatDate(val.create) }}</span></div>
                                    <div class="read" @click="details('news', val.ids)">
                                        <div>อ่านต่อ</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-col>
                </template>
                
            </v-row>
            <v-row v-if="showEvents">
                <v-col cols="6">
                    <div class="text-title-news">กิจกรรมสมาคม</div>
                </v-col>
                <v-col cols="6" class="text-details">
                    <div @click="AllNews('activities')">ดูทั้งหมด <v-icon>mdi-chevron-right</v-icon></div>
                </v-col>
                <template v-if="dataInfoNews.events.length === 0">
                    <v-col>
                        <div class="display-search">
                            <img :src="require('~/assets/admin/searchImg.png')" width="150" height="auto"/>
                            <span class="mt-4">ไม่พบข้อมูลกิจกรรม</span>
                        </div>
                    </v-col>
                </template>
                <template v-else>
                    <v-col v-for="(val, index) in dataInfoNews.events" :key="index" class="box-items" cols="12">
                        <div class="news-card">
                            <div class="item-img"><v-img :src="'data:image/png;base64,' + val.title_pic" /></div>
                            <div class="item-text">
                                <div class="news-title">{{ val.title_name }}</div>
                                <div class="news-text">{{ text_ellipsis(val.detail) }}</div>
                                <div class="news-footer">
                                    <div class="date-items"><v-img :src="require('~/assets/img/user/date.svg')"
                                            width="16" /><span class="text">{{ formatDate(val.create) }}</span></div>
                                    <div class="read" @click="details('activities', val.ids)">
                                        <div>อ่านต่อ</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-col>
                </template>
            </v-row>
            <v-row v-if="!showEvents && !showNews">
                <v-col>
                    <div class="display-search">
                        <img :src="require('~/assets/admin/searchImg.png')" width="150" height="auto"/>
                        <span class="mt-4">ไม่พบข้อมูลข่าวสารและกิจกรรม</span>
                    </div>
                </v-col>
            </v-row>
        </template>
    </v-container>
</template>
<script>


export default {
    props: {
        searchInput: {
            type: String,
            default: ''
        },
        searchEnter: {
            type: Boolean,
            default: false
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dataInfoNews: {},
            showNews: false,
            showEvents: false
        }
    },
    watch: {
        searchEnter (val) {
            this.apiGetNewsAndEvent()
        },
        dataInfoNews: {
            handler(nVal) {
                if (nVal.news.length > 0) {
                    this.showNews = true
                } else {
                    this.showNews = false
                }
                if (nVal.events.length > 0) {
                    this.showEvents = true
                } else {
                    this.showEvents = false
                }
            },
            deep: true
        },
        searchInput(val) {
            if (val === '') {
                this.showNews = false
                this.showEvents = false
            }
        },
        show(val) {
            if(!val) {
                this.showNews = false
                this.showEvents = false
            }
        }
    },
    methods: {
        async apiGetNewsAndEvent() {
            const res = await this.$axios({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `/api/user/getSearchNewAndEvent?search_text=${this.searchInput}`,
            }).then((response) => {
                return response
            })
                .catch((err) => {
                    return err.response
                })
            if (res.status === 200) {
                const data = res.data
                this.dataInfoNews = data
            }
        },
        AllNews(val) {
            this.$router.push('/user/news?type=' + val)
        },
        text_ellipsis(val) {
            const text = val.substring(0, 115) + '...'
            return text
        },
        details(val, newsId) {
            this.$router.push('/user/news/no=' + newsId)
            this.setPage(val)
            this.getNewsId(newsId)
            this.getApiNewsDetails()
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
        }
    }
}
</script>
<style scoped>
.container {
    background-color: rgba(255, 255, 255, 1) !important;
    border-radius: 16px;
}

.button-btn {
    display: flex;
    justify-content: flex-end;
}

.text-title-news {
    font-size: 16px;
    font-weight: 700;
    color: rgba(51, 51, 51, 1);
}

.text-details {
    font-size: 14px;
    font-weight: 500;
    color: rgba(120, 205, 107, 1);
    text-align: end;
}

.text-details i.v-icon.v-icon {
    color: rgba(120, 205, 107, 1) !important;
}

.box-items {
    border-radius: 8px;
    display: flex;
    justify-content: center;
    gap: 8px;
    padding-left: 12px;
    padding-right: 12px;
}

.item-img .v-image {
    max-width: 120px;
    height: 100%;
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
.display-search {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
}
</style>