<template>
    <div class="headers">
        <Loading :overlay="overlay"/>
        <div v-show="!overlay">
         <v-container>
            <v-row>
                <v-col cols="12" class="text-title-count">รายชื่อสมาชิกทั้งหมด ({{ companyCount }} รายชื่อ) </v-col>
            </v-row>
            <v-row class="box-items">
                <v-col>
                    <v-row v-for="(val,index) in companyAll" :key="index" class="box-card">
                        <v-col class="details-logo" cols="12">
                            <div><v-img class="company-logo" width="60" height="60" :src="val.company_logo ?'data:image/png;base64,'+ val.company_logo : require('~/assets/img/user/building.svg')" /></div>
                            <div class="text-style">
                                <div class="text-title-logo">{{ val.company_name_th }}</div>
                                <div class="text-sub-logo">{{ val.company_name_eng }}</div>
                            </div>
                        </v-col>
                        <v-col cols="12" class="box-tel">
                            <div>
                                <div class="tel-title">เบอร์โทรศัพท์</div>
                                <div class="tel-number">{{ val.company_telephone}}</div>
                            </div>
                            <div>
                                <div class="tel-title">เบอร์โทรสาร</div>
                                <div class="tel-number">{{ val.company_fax }}</div>
                            </div>
                        </v-col>
                        <v-col cols="12">
                            <div class="address-text-title">ที่อยู่บริษัท(ภาษาไทย)</div>
                            <div class="address-sub-title">{{ val.company_full_address_th }}</div>
                        </v-col>
                        <v-col cols="12">
                            <div class="address-text-title">Office Address</div>
                            <div class="address-sub-title">{{ val.company_full_address_eng }}</div>
                        </v-col>
                        <v-col cols="12">
                            <v-row v-for="(agent,indexAgent) in val.agent" :key="indexAgent" class="agent">
                                <v-col cols="12" class="flex-items">
                                    <div class="logo">
                                <div>ผู้แทนที่ {{ indexAgent + 1 }}</div>
                                <v-avatar size="48">
                                    <v-img :src="'data:image/png;base64,'+ agent?.pic_agent" size="85"/>
                                </v-avatar>
                                    </div>
                                <div class="detail">
                                    <div>ชื่อ-นามสกุล (ภาษาไทย) : <span>{{ agent.title_th + ' ' + agent.name_th }}</span></div>
                                    <div>First name - Last name : <span>{{ agent.title_eng + ' ' + agent.name_eng }}</span></div>
                                    <div>อีเมล : <span>{{ agent.email }}</span></div>
                                </div>
                        </v-col>
                    </v-row>
                </v-col>
                    </v-row>
                </v-col>
                    <v-col>
                        <client-only>
                            <v-pagination
                            v-model="page"
                            :length="paginationLength"
                            circle
                            color="rgba(120, 205, 107, 1)">
                            </v-pagination>
                        </client-only>
                    </v-col>
            </v-row>
         </v-container>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            overlay: true,
            companyAll:{},
            page: 1,
            paginationLength:0,
            companyCount:0
        }
    },
    watch:{
        page:{
            handler(){
                this.getApiDataCompany()
            },
            deep:true
        }
    },
    mounted(){
        window.scrollTo(0, 0);
        this.getApiDataCompany()
    },
    updated(){
        this.$emit('getShow',true)
    },
    methods:{
        async getApiDataCompany(){
            this.overlay = true
            const res = await this.$axios.get(`/api/user/getDetailCompanyAll?limit=3&page=${this.page}`)
            .then((response) => {
            return response
            })
            .catch((err) => {
            return err.response
            })
            if(res.status === 200){
                this.companyAll = res.data.result
                this.companyCount = res.data.count_company
                this.paginationLength = Math.ceil(res.data.count_company / 3)
                this.overlay = false
            }
        },
    }
}
</script>
<style scoped>
.headers{
    position: relative;
    z-index: 2;
    padding-top: 40px;
    
} 
.container{
    border-radius: 16px;
    background-color: #fff !important;
}
.text-title-count{
    padding-top: 24px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(152, 152, 152, 1);
}
.box-items{
    padding: 16px;
}
.box-card{
    background-color: rgba(250, 250, 250, 1);
    border-radius: 8px;
    margin-bottom: 16px;
}
.details-logo{
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 12px;
    border-radius: 8px;
}
.company-logo{
    border-radius: 50%;
}
.text-style{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.box-tel{
    display: flex;
    gap: 24%;
    flex-direction: row;
    justify-content: flex-start;
}
.tel-title{
    font-size: 14px;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
    margin-bottom: 8px;
}
.tel-number{
    font-size: 14px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
}
.address-text-title{
    font-size: 14px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 8px;
}
.address-sub-title{
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
.agent .flex-items .logo{
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    white-space: nowrap;
}
.agent .flex-items .detail{
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
}
.agent .flex-items .detail span{
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
}
.detail div{
    display: flex;
    flex-direction: column;
}
.text-title-logo{
    font-size: 16px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
}
.text-sub-logo{
    font-size: 16px;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
}

</style>