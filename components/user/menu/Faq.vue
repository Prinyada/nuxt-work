<template>
    <div class="headers">
        <Loading :overlay="overlay"/>
        <v-row v-show="!overlay" justify="center">
            <v-col>
                <v-expansion-panels accordion>
                    <v-expansion-panel v-for="(item,i) in question" :key="i">
                        <v-expansion-panel-header>
                            <div class="text-title">
                                {{ item.ask }}
                            </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div class="text-sub">คำตอบ : <span>{{ item.answer }}</span></div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
    </div> 
</template>
<script>
export default {
    data(){
        return {
            question:[],
            overlay: true
        }
    },
    mounted(){
        this.apiGetNews()
    },
    updated(){
        this.$emit('getShow',true)
    },
    methods:{
        async apiGetNews(){
            this.overlay = true
            const res = await this.$axios('/api/user/getQuestionGuild')
            .then((response) => {
            return response
            })
            .catch((err) => {
            return err.response
            })
            if(res.status === 200){
                const data = res.data.result
                this.question = [...data]
                this.overlay = false
            }
        },
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
    border-radius: 16px;
    background-color: #fff;
}
.v-expansion-panel::before{
    box-shadow: none !important;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
}

.v-expansion-panel:nth-last-child(1){
    border-bottom: 1px solid rgb(206, 206, 206);
}
.v-expansion-panel-header{
    align-items: flex-start;
    padding: 24px 0px !important;
    background-color: #fff !important;
}

.text-title{
    font-size: 16px;
    font-weight: 600;
    color: rgba(120, 205, 107, 1);
}
.text-sub{
    font-size: 16px;
    font-weight: 400;
    color: rgba(99, 99, 99, 1);
}
.text-sub span{
    color: rgba(51, 51, 51, 1);
}
</style>
<style>
.v-expansion-panel--active > .v-expansion-panel-header--active .v-expansion-panel-header__icon:not(.v-expansion-panel-header__icon--disable-rotate) .v-icon{
    color: rgba(120, 205, 107, 1) !important;
}
.v-expansion-panel-content__wrap {
    padding: 0 0px 16px !important;
}
</style>