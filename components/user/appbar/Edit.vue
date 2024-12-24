<template>
    <div>
        <v-img class="position-img" :src="require('~/assets/img/user/news-bg.svg')" />
        <v-row class="text-title" align="center">
            <v-col><v-icon class="icon-size" color="rgba(120, 205, 107, 1)" @click="$router.back()">mdi-chevron-left</v-icon></v-col>
            <v-col><v-row justify="center" class="news-title">ข้อมูลสมาชิก</v-row></v-col>
            <v-col></v-col>
        </v-row>
        <v-row class="text-sub-title" align="center">
            <v-col>อัปเดตข้อมูลเพื่อเข้าใช้งานระบบสมาคมธุรกิจเวชภัณฑ์สัตว์</v-col>
        </v-row>
    </div>
</template>
<script>
    export default {
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
   margin-bottom: -20px;
   z-index: 1;
   font-size: 20px;
   font-weight: 700;
   position: relative;

}
.text-sub-title{
   z-index: 1;
   font-size: 14px;
   font-weight: 400;
   position: relative;
   text-align: center;
   color: #fff;
   margin: 0px !important;
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