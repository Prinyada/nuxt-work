<template>
    <div class="headers">
        <v-row>
            <v-stepper v-model="e1" alt-labels elevation="0" outlined non-linear color="rgba(120, 205, 107, 1)" >
                <v-stepper-header>
                
                    <v-stepper-step step="1" color="rgba(120, 205, 107, 1)">
                    ข้อมูลบริษัท
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="2" color="rgba(120, 205, 107, 1)">
                    ข้อมูลผลิตภัณฑ์
                    </v-stepper-step>
              
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <UserFormCompany :company="results.company" :agent="results.agent" @form1="formPage1" @dataSave="getDataform1"/>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <UserFormProducts :products="results.detail_type_product" @form2="formPage2" @dataSave="getDataform2"/>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-row>
        <v-row class="box-button" align="center">
            <v-btn v-if="e1 === 1" color="rgba(120, 205, 107, 1)" width="100%" height="40px" dark rounded @click="nextPage()">ถัดไป</v-btn>
            <v-col v-else>
                <v-btn outlined color="rgba(120, 205, 107, 1)" width="48%" height="40px" rounded @click="e1 = 1">ย้อนกลับ</v-btn>
                <v-btn dark color="rgba(120, 205, 107, 1)" width="48%" height="40px" rounded @click="record()">ถัดไป</v-btn>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
            e1: 1,
            results:{},
            statusPage1: false,
            statusPage2: false,
            detailCompanyAndProduct:{
                companyAndProduct:{
                    detail_company:{},
                    files_logo_company:null,
                    detail_type_product:[],
                },
                agent:{
                    member_no:{},
                    files_agent:null,
                    detail_agent:[],
                },
            },
            productsDetail:[]
        }
    },
    computed:{
        ...mapState('auth',['member_no'])
    },
    watch:{
        e1(){
            this.scrollup()
        }
    },
    created(){
        this.getDataInfo()
    },
    updated(){
        this.$emit('overlay',false)

    },
    methods:{
        async getDataInfo(){
            const res = await this.$axios({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
                url: `/api/user/getDetailCompanyByMemNo?member_no=${this.member_no}`,
            }).then((response) => {
            return response
            })
            .catch((err) => {
            return err.response
            })
            if(res.status === 200){
             this.results = res.data
            }
        },
        async apiUpdateDataCompanyAndProduct(){
            const formData = new FormData()
            formData.append('detail_company',JSON.stringify(this.detailCompanyAndProduct.companyAndProduct.detail_company))
            formData.append('detail_type_product',JSON.stringify(this.productsDetail))
            if(this.detailCompanyAndProduct.companyAndProduct.files_logo_company.size){
                formData.append('files_logo_company',this.detailCompanyAndProduct.companyAndProduct.files_logo_company)
            }

            const res = await this.$axios.post('/api/user/updateDetailCompanyAndProduct',formData,{ headers: { 'Content-Type': 'multipart/form-data'}})
            .then((response) => {
            return response
            })
            .catch((err) => {
            return err.response
            })
            if(res.status === 200){
                this.apiUpdateDataAgent()
            }
        },
        async apiUpdateDataAgent(){
            const formData = new FormData()
            formData.append('member_no',JSON.stringify({member_no:this.detailCompanyAndProduct.companyAndProduct.detail_company.member_no}))
            formData.append('detail_agent',JSON.stringify(this.detailCompanyAndProduct.agent.detail_agent))
            if(this.detailCompanyAndProduct.agent.detail_agent?.length > 0){
                for (const item of this.detailCompanyAndProduct.agent.detail_agent) {
                    if(item.pic?.size){
                        formData.append('files_agent',item.pic)
                    }
                }
            }
            const res = await this.$axios.post('/api/user/updateAgent',formData,{ headers: { 'Content-Type': 'multipart/form-data'}})
            .then((response) => {
            return response
            })
            .catch((err) => {
            return err.response
            })
            if(res.status === 200){
                this.$swal({
                    title: "อัพเดตสำเร็จ",
                    text: "ได้ทำการเปลี่ยนแปลงข้อมูลเรียบร้อย",
                    icon: "success"
                }).then((results) => {
                    if(results.isConfirmed){
                        this.$router.back()
                    }
                });
            }
        },
        formPage1(status){
            this.statusPage1 = status
        },
        formPage2(status){
            this.statusPage2 = status
        },
        getDataform1(obj){
            this.detailCompanyAndProduct = {
                companyAndProduct:{
                    detail_company: obj.detail_company,
                    files_logo_company: obj.files_logo_company,
                },
                agent:{
                    detail_agent:obj.detail_agent,
                    files_agent:{
                        agent1: obj.detail_agent[0].pic,
                        agent2: obj.detail_agent[1].pic
                    },
                    member_no:{
                        member_no: obj.detail_company.member_no
                    }
                }
            }
        },
        getDataform2(obj){
            this.productsDetail = obj
        },
        scrollup() {
            window.scrollTo(0, 0);
        },
        nextPage(){
            if(this.statusPage1){
                this.e1 = 2
            }
        },
        record(){
            if(this.statusPage2){
                this.apiUpdateDataCompanyAndProduct()
            }
        }

    }
}
</script>
<style scoped>
.headers{
    position: relative;
    z-index: 1;
    padding: 16px;
    padding-top: 40px;
}
.v-stepper{
    width: 100%;
    border-radius: 16px;
}

</style>
<style>
.v-stepper__label {
    display: block !important;
    
}
.v-stepper__step--active .v-stepper__label {
    color: rgba(120, 205, 107, 1) !important;
}
.v-stepper__header{
    box-shadow: none !important;
}
.v-stepper__step__step{
    height: 34px;
    min-width: 34px;
    width: 34px
}
.box-button{
    padding-top: 24px;
    padding-bottom: 0px;
}
.box-button .col{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0;
}
</style>