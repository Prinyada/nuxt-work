<template>
    <div>
        <v-img class="position-img" :src="require('~/assets/img/user/news-bg.svg')" />
        <v-row class="text-title" align="center">
            <v-col><v-icon class="icon-size" color="rgba(120, 205, 107, 1)" @click="$router.back()">mdi-chevron-left</v-icon></v-col>
            <v-col><v-row justify="center" class="news-title">{{ title_page }}</v-row></v-col>
            <v-col></v-col>
        </v-row>
    </div>
</template>
<script>
import { mapState } from 'vuex'
    export default {
        computed:{
            ...mapState('home',['title_page'])
        }
    }
</script>
<style scoped>
.position-img{
    z-index: 0;
    position:absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: auto;
}
.text-title{
   margin-top: 42px;
   z-index: 1;
   font-size: 20px;
   font-weight: 700;
   position: relative;
   white-space: nowrap;
}
.icon-size {
   font-size: 32px !important;
   background-color: #fff;
   border-radius: 100%;
}
.news-title{
   color: #fff;
}
</style>