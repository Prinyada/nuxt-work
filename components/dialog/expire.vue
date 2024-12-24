<template>
    <v-container>
        <v-overlay :value="overlay">
               <v-row align="center" justify="center" >
                    <v-card light width="85%" height="auto" rounded="xxl" class="box-notify">
                        <div class="icon-close" @click="overlay=false">
                            <v-icon>mdi-close</v-icon>
                        </div>
                        <v-card-title>
                        <v-row justify="center" class="logo-notify">
                            <div>
                                <v-img :src="require('~/assets/img/user/notify.svg')" />
                            </div>
                        </v-row>
                        <v-row justify="center" class="text-title">
                            <div>ไม่สามารถขึ้นทะเบียนอาหารสัตว์ได้</div>
                            <div>เนื่องจากการเป็นสมาชิกของคุณหมดอายุ</div>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-row justify="center">
                            <div>กรุณาต่ออายุสมาชิก</div>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                            <v-btn rounded outlined color="rgba(120, 205, 107, 1)" @click="overlay=false">ยกเลิก</v-btn>    
                            <v-btn rounded color="rgba(120, 205, 107, 1)" dark>ต่ออายุสมาชิก</v-btn>
                    </v-card-actions>
                    </v-card>
               </v-row>
        </v-overlay>
    </v-container>
</template>
<script>
export default {
    data(){
        return {
            overlay: true
        }
    }
    ,
    methods:{
      
    }
    
}
</script>
<style scoped>
.box-notify{
    position: relative;
}
.text-title{
    margin-top: 36px;
    font-size: 16px;
    font-weight: 700;
}
.v-card__text .row div{
    margin-top: 14px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(152, 152, 152, 1);
}
.v-card__actions{
    margin-top: 20px;
    margin-bottom: 10px;
    justify-content: space-around;
}
.v-btn{
    width: 45%;
}
.logo-notify{
    margin-top: 26px;
}
.icon-close{
    position: absolute;
    right: 12px;
    top: 12px;
    background-color: rgba(242, 242, 242, 1);
    border-radius: 100%;
}
</style>