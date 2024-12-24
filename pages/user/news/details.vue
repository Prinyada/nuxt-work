<template>
    <v-container>
        <loading :overlay="overlay" />
        <div v-show="!overlay">
            <UserAppbarApp />
            <v-row v-if="data_detail" justify="center">
                <v-col cols="12">
                    <div class="box-details">
                        <v-col cols="12" class="text-title">{{ data_detail?.title_name }}</v-col>
                        <v-col cols="12" class="text-sub">{{ data_detail?.detail }}</v-col>
                        <v-col v-if="data_detail?.title_pic" cols="12" class="disabled-padding-top">
                            <v-img class="items" :src="`data:image/${data_detail?.fileType};base64,` + data_detail?.title_pic" />
                        </v-col>
                        <v-col v-for="(val, index) in pic" :key="index" cols="12" class="disabled-padding-top">
                            <v-img class="items" :src="`data:image/${val.fileType};base64,` + val.pic" />
                        </v-col>
                        <v-row v-if="data_detail?.link" justify="center" class="foodter">
                            <div @click="goLink(data_detail?.link)">แหล่งที่มา : 
                                <span>{{ data_detail?.title_link }}</span>
                            </div>
                        </v-row>
                    </div>
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
            data_detail: {},
            pic: []
        }
    },
    mounted() {
        this.apiGetNews()
    },
    methods: {
        async apiGetNews() {
            this.overlay = true
            let url = ''
            if (this.$route.query.title === 'news') {
                url = 'getDetailtNew?ids='
            }
            if (this.$route.query.title === 'activities') {
                url = 'getDetailtEvent?ids='
            }
            const res = await this.$axios.get(`/api/user/${url + this.$route.query.no}`)
                .then((response) => {
                    return response
                })
                .catch((err) => {
                    return err.response
                })
            if (res.status === 200) {
                this.data_detail = res.data.new || res.data.event
                this.pic = res.data.all_detail_pic
                this.overlay = false
            }
        },
        goLink(target) {
            window.location.href = target
        }
    }

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

.position-img {
    z-index: -1;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: auto;
}

.text-title {
    margin-top: px;
    z-index: 1;
    font-size: 20px;
    font-weight: 700;
}

.icon-size {
    font-size: 32px !important;
    background-color: #fff;
    border-radius: 100%;
}

.news-title {
    color: #fff;
}

.box-details {
    position: relative;
    z-index: 1;
    background-color: #fff;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
}

.text-title {
    font-size: 16px;
    font-weight: 700;
    color: rgba(51, 51, 51, 1);
}

.text-sub {
    text-indent: 10vw;
    font-size: 14px;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
}
.item-img {
    width: 200px;
    height: 120px;
    border-radius: 6px;
    overflow: hidden;
}
.items {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
}

.disabled-padding-top {
    padding-top: 0px !important;
}

.foodter {
    margin: 24px;
}

.foodter div {
    color: rgba(152, 152, 152, 1);
    font-size: 14px;
    font-weight: 400;
}

.foodter div span {
    color: rgba(6, 97, 249, 1);
    font-size: 14px;
    font-weight: 400;
    text-decoration: underline;
}

@media only screen and (min-width: 600px) {
    .text-sub {
        text-indent: 40px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(152, 152, 152, 1);
    }
}
</style>