<template>
    <div class="headers">
        <Loading :overlay="overlay"/>
        <div v-show="!overlay">
            <v-row justify="center" class="member-image">
                <v-avatar size="100">
                    <v-img :src="'data:image/png;base64,'+company.company_logo" size="85"/>
                </v-avatar>
                <v-col cols="12">
                    <v-row justify="center" class="member-sub">
                        <v-chip>{{ company.status_company === 'member' ? 'เป็นสมาชิก' : 'ไม่เป็นสมาชิก' }}</v-chip>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-row class="member-sub-image">
                        <v-col cols="12">เลขที่สมาชิก : <span>{{ company.member_no }}</span></v-col>
                        <v-col cols="12">ประเภทสมาชิก : <span>{{ company.type_member }}</span></v-col>
                        <v-col cols="12">วันหมดอายุสมาชิก : <span>{{ company.expire_member }}</span></v-col>
                        <v-col cols="12"><v-divider></v-divider></v-col>
                    </v-row> 
                </v-col>
                <v-col cols="12">
                    <v-row class="details">
                        <v-col cols="12" class="text-title">ข้อมูลบริษัท</v-col>
                        <v-col cols="12">ชื่อบริษัท (ภาษาไทย) : <span>{{ company.company_name_th }}</span></v-col>
                        <v-col cols="12">Company name : <span>{{ company.company_name_eng }}</span></v-col>
                        <v-col cols="12">เบอร์โทรศัพท์ : <span>{{ company.company_telephone }}</span></v-col>
                        <v-col cols="12">เบอร์โทรสาร : <span>{{ company.company_fax }}</span></v-col>
                        <v-col cols="12">อีเมล : <span>{{ company.company_email }}</span></v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-row class="details">
                        <v-col cols="12" class="text-title">ที่อยู่บริษัท (ภาษาไทย)</v-col>
                        <v-col cols="12">
                            {{ company.company_full_address_th }}
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-row class="details">
                        <v-col cols="12" class="text-title">Office Address</v-col>
                        <v-col cols="12">
                            {{ company.company_full_address_eng }}
                        </v-col>
                        <v-col cols="12"><v-divider></v-divider></v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-row class="title-agent">
                        <v-col cols="12">ข้อมูลผู้แทนในนามบริษัท</v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-row v-for="(val,index) in agent" :key="index" class="agent">
                        <v-col cols="12" class="flex-items">
                            <div class="logo">
                                <div>ผู้แทนที่ {{ index + 1 }}</div>
                                <v-avatar size="48">
                                    <v-img :src="'data:image/png;base64,'+val.pic_agent" size="85"/>
                                </v-avatar>
                            </div>
                            <div class="detail">
                                <div>ชื่อ-นามสกุล (ภาษาไทย) : <span>{{ val.title_th + ' ' + val.name_th }}</span></div>
                                <div>First name - Last name : <span>{{ val.title_eng + ' ' + val.name_eng }}</span></div>
                                <div>อีเมล : <span>{{ val.email }}</span></div>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12"><v-divider></v-divider></v-col>
                <v-col cols="12">
                    <v-row class="drug-title">
                        <v-col cols="12">ข้อมูลผลิตภัณฑ์</v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-row v-for="(val,index) in listDrug" :key="index" class="drug" dense>
                        <v-col class="drug-sub">{{ val.type_product_name }}</v-col>
                        <v-row v-if="val.product">
                            <v-col v-for="(detail , indexDetail) in val.product" :key="indexDetail" cols="12">
                                <div class="drug-background">
                                    <v-col class="flex-items">
                                        <div class="logo">
                                            <div>รายการที่ {{ indexDetail + 1 }}</div>
                                        </div>
                                        <div class="detail">
                                            <div>ชื่อสินค้า : <span>{{ detail.product_name }}</span></div>
                                            <div>ผู้ผลิต/ประเทศ : <span>{{ detail.product_country }}</span></div>
                                            <div>เลขทะเบียนยา/อาหารสัตว์ : <span>{{ detail.product_no }}</span></div>
                                        </div>
                                    </v-col>
                                </div>
                            </v-col>
                        </v-row>
                            <v-col v-else cols="12">
                                <div class="drug-background">
                                    <v-col class="flex-non-items">
                                       <div class="non-items">
                                            <div>ไม่มีข้อมูลผลิตภัณฑ์</div>
                                       </div>
                                    </v-col>
                                </div>
                            </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row v-if="type_user === 'agent'? true : false">
                <v-col cols="12" class="btn-size">
                    <v-btn color="rgba(120, 205, 107, 1)" rounded dark @click="edit_details()">อัปเดตข้อมูล</v-btn>
                </v-col>
            </v-row>
        </div>
    </div>
</template> 
<script>
import { mapState } from 'vuex'
export default {
    data(){
        return {
            company:{},
            agent:[],
            overlay: true,
            listDrug:[]
        }
    },
    computed:{
        ...mapState('auth',['type_user'])
    },
    mounted(){
        this.member_no = localStorage.getItem('member_no')
        this.apiGetDataCompany()
    },
    updated(){
        this.$emit('getShow',true)
        
    },
    methods:{
        async apiGetDataCompany(){
            this.overlay = true
            const res = await this.$axios.get(`/api/user/getDetailCompanyByMemNo?member_no=${this.member_no}`)
            .then((response) => {
            return response
            })
            .catch((err) => {
            return err.response
            })
            if(res.status === 200){
                const data = res.data
                this.company = data.company[0]
                this.agent = [...data.agent]
                this.listDrug = [...data.detail_type_product]
                this.overlay = false
            }
        },
        edit_details(){
            this.$router.push('/user/menu/info-edit')
        }
    }
}
</script>
<style scoped>
.headers{
    margin-top: 32px;
    position: relative;
    z-index: 1;
    padding: 16px;
    padding-top: 40px;
}
.member-image{
    margin-top: -40px;
    padding-top: 40px;
    border-radius: 16px;
    background-color: #fff;
}
.member-image > .v-avatar{
    border: 2px solid rgba(200, 235, 194, 1);
}
.v-chip{
    font-size: 14px !important;
    font-weight: 400 !important;
    color: rgba(82, 196, 26, 1);
    background-color: rgba(238, 249, 232, 1) !important;
}
.member-sub {
    margin-top: 0px !important;
}
.member-sub-image {
    margin-top: 8px;
}
.member-sub-image .col {
    padding-top: 0px !important;
    font-size: 16px;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
}
.member-sub-image .col span{
    font-weight: 600 !important;
    color: rgba(51, 51, 51, 1) !important;
}

.details .text-title{
    font-size: 16px !important;
    font-weight: 600 !important;
    color: rgba(51, 51, 51, 1) !important;
}
.details .col {
    padding-top: 0px !important;
    font-size: 16px;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
}
.details .col span{
    font-weight: 600 !important;
    color: rgba(51, 51, 51, 1) !important;
}
.title-agent {
    font-size: 16px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
}
.title-agent .col {
    padding-top: 0px;
}
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
/* drug */
.drug-title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
}
.drug-sub{
    font-size: 14px;
    font-weight: 600;
    color: rgba(99, 99, 99, 1);
    padding-bottom: 0px;
}
.drug .flex-non-items {
    display: flex;
    gap: 8px;
    font-size: 14px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: 80px;
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
}
.drug .flex-items {
    display: flex;
    gap: 8px;
    font-size: 14px;
    flex-direction: row;
}
.drug .flex-items .logo{
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    white-space: nowrap;
}
.drug .flex-items .detail{
    font-weight: 400;
    color: rgba(152, 152, 152, 1);
    white-space: normal;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
}
.drug .flex-items .detail div{
    white-space: nowrap;
}
.drug .flex-items .detail span{
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
}
.drug-background{
    /* background-color: rgba(250, 250, 250, 1); */
    background-color: rgba(250, 250, 250, 1);
    border-radius: 8px;
}
.btn-size {
    padding-top: 18px;
    padding-left: 0px;
    padding-right: 0px;
}
.btn-size .v-btn{
    width: 100%;
}

</style>