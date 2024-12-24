<template>
    <div v-if="contactResults" class="headers">
        <Loading :overlay="overlay"/>
        <v-row v-show="!overlay" justify="center">
            <v-col cols="12" class="text-title">ที่อยู่</v-col>
            <v-col cols="12" class="text-sub">{{ contactResults.guild_address }}</v-col>
            <v-col cols="6" class="text-title">เบอร์โทร / แฟกซ์</v-col>
            <v-col cols="6" class="text-title">เบอร์โทรศัพท์</v-col>
            <v-col cols="6" class="text-sub">{{ contactResults.guild_fax }}</v-col>
            <v-col cols="6" class="text-sub">{{ contactResults.guild_telephone }}</v-col>
            <v-col cols="12" class="text-title">อีเมล</v-col>
            <v-col cols="12" class="text-sub">{{ contactResults.guild_email }}</v-col>
            <v-col cols="12" class="text-title">แผนที่</v-col>
            <v-col cols="12">
                <div class="box-image">
                    <v-img class="image" :src="'data:image/png;base64,'+ contactResults?.gps_guild" />
                </div>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            contactResults: [],
            overlay: true
        }
    },
    mounted() {
        this.apiGetDateContact()
    },
    updated(){
        this.$emit('getShow',true)
    },
    methods:{
        async apiGetDateContact(){
            this.overlay = true
            const res = await this.$axios.get(`/api/user/getContactGuild`)
            .then((response) => {
            return response
            })
            .catch((err) => {
            return err.response
            })
            if(res.status === 200){
                const results = res.data.result
                this.contactResults = results[0]
            this.overlay = false
            }
        }
    }
}
</script>
<style scoped>
.headers{
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 1;
    padding: 16px;
    padding-top: 40px;
    border-radius: 16px;
    background-color: #fff;
}
.box-image{
    position: relative;
    width: 100%;
    height: 200px;
    background-color: #fff;
    border: 1px solid rgba(230, 230, 230, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
}
.box-image .image{
    position: absolute;
    width: 98%;
    height: 98%;
}
.text-title{
    font-size: 14px;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
    padding-bottom: 4px !important;
    padding-top: 0px !important;
}   
.text-sub{
    font-size: 16px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    padding-top: 0px !important;
}
</style>