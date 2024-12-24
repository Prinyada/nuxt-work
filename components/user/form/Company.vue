<template>
    <v-form v-model="valid">
        <v-row align="center">
            <v-col cols="12" class="text-title">ข้อมูลบริษัท</v-col>
            <v-col cols="12" class="text-section">ชื่อบริษัท(ภาษาไทย) <span class="sub-color">*</span></v-col>
            <v-col cols="12" class="pt-0"><v-text-field v-model="companyDetails.company_name_th" :rules="validRules" height="40" hide-details dense outlined required></v-text-field></v-col>
            <v-col cols="12" class="text-section">Company name <span class="sub-color">*</span></v-col>
            <v-col cols="12" class="pt-0"><v-text-field v-model="companyDetails.company_name_eng" :rules="validRules" height="40" hide-details dense outlined required></v-text-field></v-col>
            <v-col cols="12" class="text-section">เบอร์โทรศัพท์ <span class="sub-color">*</span></v-col>
            <v-col cols="12" class="pt-0"><v-text-field v-model="companyDetails.company_telephone" :rules="validRules" height="40" hide-details dense outlined required></v-text-field></v-col>
            <v-col cols="12" class="text-section">เบอร์โทรสาร</v-col> 
            <v-col cols="12" class="pt-0"><v-text-field  v-model="companyDetails.company_fax" :rules="validRules" height="40" hide-details dense outlined required></v-text-field></v-col>
            <v-col cols="12" class="text-section">อีเมล</v-col>
            <v-col cols="12" class="pt-0"><v-text-field v-model="companyDetails.company_email" height="40" hide-details dense outlined></v-text-field></v-col>
            <v-col cols="12" class="text-section">โลโก้บริษัทนะ</v-col>
            <v-col v-show="companyDetails.company_logo ? false : true" class="pt-0" cols="12"><v-btn color="rgba(120, 205, 107, 1)" width="100%" outlined rounded @click="uploadFiles()"><v-icon>mdi-plus</v-icon>อัพโหลดรูป</v-btn></v-col>
            <v-col v-show="companyDetails.company_logo ? true : false" class="pt-0" cols="12">
                <div class="box-upload">
                    <div class="items">
                        <v-img width="32" height="80%" :src="require('~/assets/img/user/png.svg')" />
                        <div>
                            <div class="text-logo">โลโก้บริษัท.jpg</div>
                            <div class="text-size-png">{{ (companyDetails.size / 1024).toFixed(2) }} KB / 600 KB</div>
                        </div>
                    </div>
                    <div class="color-trash" @click="companyDetails.company_logo = ''"><v-img width="32" :src="require('~/assets/img/user/trash.svg')" /></div>
                </div>
            </v-col>
            <v-col cols="12" class="text-title">ที่อยู่บริษัท</v-col>
            <v-col cols="12" class="text-section">ที่อยู่ (ภาษาไทย)</v-col>
            <v-col cols="12" class="pt-0">
                <v-textarea v-model="companyDetails.company_address_th" height="80" outlined hide-details></v-textarea>
            </v-col>
            <v-col cols="12" class="text-section">จังหวัด (ภาษาไทย)</v-col>
            <v-col cols="12" class="pt-0"><v-select id="province" v-model="province" :items="provinceAll" item-text="name_th" item-value="id" return-object hide-details dense outlined @change="apiGetDistrict(province.id)" ></v-select></v-col>
            <v-col cols="12" class="text-section">เขต/อำเภอ (ภาษาไทย)</v-col>
            <v-col cols="12" class="pt-0"><v-select v-model="district" :items="districtAll" item-text="name_th" item-value="code" height="40" return-object hide-details dense outlined @change="apiGetSubDistrict(district.code)"></v-select></v-col>
            <v-col cols="12" class="text-section">แขวง/ตำบล (ภาษาไทย)</v-col>
            <v-col cols="12" class="pt-0"><v-select v-model="subDistrict" :items="subDistrictAll" item-text="name_th"  item-value="zip_code" return-object height="40" hide-details dense outlined @change="zipCode = subDistrict.zip_code"></v-select></v-col>
            <v-col cols="12" class="text-section">รหัสไปรษณีย์</v-col>
            <v-col cols="12" class="pt-0"><v-text-field v-model="zipCode" height="40" disabled hide-details dense outlined></v-text-field></v-col>
            <!-- address eng -->
            <v-col cols="12" class="text-title">Office Address</v-col>
            <v-col cols="12" class="text-section">Address</v-col>
            <v-col cols="12" class="pt-0">
                <v-textarea v-model="companyDetails.company_address_eng" height="80" outlined hide-details></v-textarea>
            </v-col>
            <v-col cols="12" class="text-section">Province</v-col>
            <v-col cols="12" class="pt-0"><v-select v-model="province" :items="provinceAll" item-text="name_en" item-value="id" height="40" hide-details dense outlined return-object  @change="apiGetDistrict(province.id)"></v-select></v-col>
            <v-col cols="12" class="text-section">District / Area</v-col>
            <v-col cols="12" class="pt-0"><v-select v-model="district" :items="districtAll" item-text="name_en" item-value="code" height="40" hide-details dense outlined return-object @change="apiGetSubDistrict(district.code)"></v-select></v-col>
            <v-col cols="12" class="text-section">Sub-district/ Sub-area</v-col>
            <v-col cols="12" class="pt-0"><v-select v-model="subDistrict" :items="subDistrictAll" item-text="name_en"  item-value="zip_code" height="40" hide-details dense outlined return-object @change="zipCode = subDistrict.zip_code"></v-select></v-col>
            <v-col cols="12" class="text-section">Postal Code</v-col>
            <v-col cols="12" class="pt-0"><v-text-field v-model="zipCode" height="40" disabled hide-details dense outlined></v-text-field></v-col>
            <!-- agent details -->
            
            <v-col cols="12" class="text-title">ข้อมูลผู้แทนในนามบริษัท</v-col>
            <!-- agent1 -->
            <v-col cols="12" class="text-section-agent">ผู้แทนที่ 1</v-col>
            <v-col cols="12" class="text-section">คำนำหน้า <span class="sub-color">*</span></v-col>
            <v-col cols="12" class="pt-0"><v-select v-model="prefix_agent1_th" :items="prefixAll" item-text="title_th" item-value="title_th" height="40" hide-details dense outlined return-object :rules="validRules" required></v-select></v-col>
            <v-col cols="12" class="text-section">ชื่อ - นามสกุล (ภาษาไทย) <span class="sub-color">*</span></v-col>
            <v-col cols="12" class="pt-0"><v-text-field v-model="agentDetail1.name_th" height="40" hide-details dense outlined :rules="validRules" required></v-text-field></v-col>
            <v-col cols="12" class="text-section">Name Title <span class="sub-color">*</span></v-col>
            <v-col cols="12" class="pt-0"><v-select v-model="prefix_agent1_th" :items="prefixAll" item-text="title_eng" item-value="title_th" height="40" hide-details dense outlined return-object :rules="validRules" required></v-select></v-col>
            <v-col cols="12" class="text-section">First name - Last name <span class="sub-color">*</span></v-col>
            <v-col cols="12" class="pt-0"><v-text-field v-model="agentDetail1.name_eng"  height="40" hide-details dense outlined :rules="validRules" required></v-text-field></v-col>
            <v-col cols="12" class="text-section">อีเมล <span class="sub-color">*</span></v-col>
            <v-col cols="12" class="pt-0"><v-text-field v-model="agentDetail1.email"  height="40" hide-details dense outlined :rules="validRules" required></v-text-field></v-col>
            <v-col cols="12" class="text-section">รูปผู้แทน</v-col>
            <v-col v-show="agentDetail1.pic_agent ? false : true" class="pt-0" cols="12"><v-btn color="rgba(120, 205, 107, 1)" width="100%" outlined rounded @click="uploadFilesAgent1()"><v-icon>mdi-plus</v-icon>อัพโหลดรูป</v-btn></v-col>
            <v-col  v-show="agentDetail1.pic_agent ? true : false" cols="12" class="pt-0">
                <div class="box-upload">
                    <div class="items">
                        <v-img width="32" height="80%" :src="require('~/assets/img/user/png.svg')" />
                        <div>
                            <div class="text-logo">ผู้แทนที่1.jpg</div>
                            <div class="text-size-png">{{ (agentDetail1.size / 1024).toFixed(2) }} KB / 600 KB</div>
                        </div>
                    </div>
                    <div class="color-trash"><v-img width="32" :src="require('~/assets/img/user/trash.svg')" @click="agentDetail1.pic_agent = ''"/></div>
                </div>
            </v-col>
            <!-- agent2 -->
            <v-col cols="12" class="text-section-agent">ผู้แทนที่ 2</v-col>
            <v-col cols="12" class="text-section">คำนำหน้า <span class="sub-color">*</span></v-col>
            <v-col cols="12" class="pt-0"><v-select v-model="prefix_agent2_th" :items="prefixAll" item-text="title_th" item-value="title_th" height="40" return-object hide-details dense outlined :rules="validRules" required></v-select></v-col>
            <v-col cols="12" class="text-section">ชื่อ - นามสกุล (ภาษาไทย) <span class="sub-color">*</span></v-col>
            <v-col cols="12" class="pt-0"><v-text-field v-model="agentDetail2.name_th" height="40" hide-details dense outlined :rules="validRules" required></v-text-field></v-col>
            <v-col cols="12" class="text-section">Name Title <span class="sub-color">*</span></v-col>
            <v-col cols="12" class="pt-0"><v-select v-model="prefix_agent2_th" :items="prefixAll" item-text="title_eng" item-value="title_th" height="40" return-object hide-details dense outlined :rules="validRules" required></v-select></v-col>
            <v-col cols="12" class="text-section">First name - Last name <span class="sub-color">*</span></v-col>
            <v-col cols="12" class="pt-0"><v-text-field v-model="agentDetail2.name_eng"  height="40" hide-details dense outlined :rules="validRules" required></v-text-field></v-col>
            <v-col cols="12" class="text-section">อีเมล <span class="sub-color">*</span></v-col>
            <v-col cols="12" class="pt-0"><v-text-field v-model="agentDetail2.email"  height="40" hide-details dense outlined :rules="validRules" required></v-text-field></v-col>
            <v-col cols="12" class="text-section">รูปผู้แทน</v-col>
            <v-col  v-show="agentDetail2.pic_agent ? false : true" class="pt-0" cols="12"><v-btn color="rgba(120, 205, 107, 1)" width="100%" outlined rounded @click="uploadFilesAgent2()"><v-icon>mdi-plus</v-icon>อัพโหลดรูป</v-btn></v-col>
            <v-col  v-show="agentDetail2.pic_agent ? true : false" cols="12" class="pt-0">
                <div class="box-upload">
                    <div class="items">
                        <v-img width="32" height="80%" :src="require('~/assets/img/user/png.svg')" />
                        <div>
                            <div class="text-logo">ผู้แทนที่2.jpg</div>
                            <div class="text-size-png">{{ (agentDetail2.size / 1024).toFixed(2) }} KB / 600 KB</div>
                        </div>
                    </div>
                    <div class="color-trash"><v-img width="32" :src="require('~/assets/img/user/trash.svg')" @click="agentDetail2.pic_agent = ''" /></div>
                </div>
            </v-col>   
            <v-file-input
            v-show="false"
            id="company-logo"
            v-model="pathFiles.company"
            label="File input"
            outlined
            dense
            hide-input
            ></v-file-input>
            <v-file-input
            v-show="false"
            id="agent1"
            v-model="pathFiles.agent1"
            label="File input"
            outlined
            dense
            hide-input
            ></v-file-input>
            <v-file-input
            v-show="false"
            id="agent2"
            v-model="pathFiles.agent2"
            label="File input"
            outlined
            dense
            hide-input
            ></v-file-input>
        </v-row> 
    </v-form>
    </template>
<script>
export default {
    props:{
        company: {
            type: Array,
            default: null
        },
        agent:{
            type: Array,
            default: null
        },
    },
    data(){
        return {
            valid: false,
            validRules: [
                v => !!v || 'กรุณากรอกข้อมูล',
            ],
            companyDetails:{},
            agentDetail1:{},
            agentDetail2:{},
            provinceAll:[],
            districtAll:[],
            subDistrictAll:[],
            zipCode:'',
            province:{},
            district:{},
            subDistrict:{},
            pathFiles:{
                company:null,
                agent1: null,
                agent2: null,
            },
            prefix_agent1_th:{},
            prefix_agent1_eng:{},
            prefix_agent2_th:{},
            prefix_agent2_eng:{},
            prefixAll:[
                {
                    title_th:'นาย',
                    title_eng:'Mr.'
                },
                {
                    title_th:'นาง',
                    title_eng:'Mrs.'
                },
                {
                    title_th:'นางสาว',
                    title_eng:'Miss'
                }
            ],

        }
    },
    watch:{
        async company(newValue){
            this.companyDetails = newValue[0]
            this.provinceFilter(this.companyDetails.company_province_th)
            await this.districtFilter(this.companyDetails.company_district_th)
            this.subDistrictFilter(this.companyDetails.company_sub_district_th,this.companyDetails.company_zip_code)
        },
        agent(agentObj){
            this.agentDetail1 = agentObj[0] || {name_th: '', name_eng: '',email: ''}
            this.agentDetail2 = agentObj[1] || {name_th: '', name_eng: '',email: ''}
            this.prefix_agent1_th = {title_th: agentObj[0]?.title_th, title_eng: agentObj[0]?.title_eng}
            this.prefix_agent1_eng = {title_th: agentObj[0]?.title_th, title_eng: agentObj[0]?.title_eng}
            this.prefix_agent2_th = {title_th: agentObj[1]?.title_th, title_eng: agentObj[1]?.title_eng}
            this.prefix_agent2_eng = {title_th: agentObj[1]?.title_th, title_eng: agentObj[1]?.title_eng}
        },
        pathFiles :{
            handler(newValue){
                if(newValue.company){
                    this.companyDetails.company_logo = newValue.company
                    this.companyDetails.size = newValue.company.size
                }
                if(newValue.agent1){
                    this.agentDetail1.pic_agent = newValue.agent1
                    this.agentDetail1.size = newValue.agent1.size
                }
                if(newValue.agent2){
                    this.agentDetail2.pic_agent = newValue.agent2
                    this.agentDetail2.size = newValue.agent2.size
                }
            },
            deep:true
        },

        valid(newValue){
            this.$emit('form1',newValue)
        }    
    },
    mounted(){
        this.apiGetProvince()
    },
    updated(){
        this.dataSave()
    },
    methods:{
    dataSave(){
        const dataSave = {
            detail_company :{
                member_no: this.companyDetails.member_no,
                company_name_th: this.companyDetails.company_name_th,
                company_name_eng: this.companyDetails.company_name_eng,
                company_telephone: this.companyDetails.company_telephone,
                company_fax: this.companyDetails.company_fax,
                company_email: this.companyDetails.company_email,
                company_address_th: this.companyDetails.company_address_th,
                company_address_eng: this.companyDetails.company_address_eng,
                company_province_th: this.province.name_th,
                company_district_th: this.district.name_th,
                company_sub_district_th: this.subDistrict.name_th,
                company_province_eng: this.province.name_en,
                company_district_eng: this.district.name_en,
                company_sub_district_eng: this.subDistrict.name_en,
                company_zip_code: this.zipCode,
                type_company: this.companyDetails.type_company
            },
            files_logo_company : this.companyDetails.company_logo,
            detail_agent: [
                {
                    title_th: this.prefix_agent1_th.title_th,
                    title_eng: this.prefix_agent1_th.title_eng,
                    name_th: this.agentDetail1.name_th,
                    name_eng: this.agentDetail1.name_eng,
                    email: this.agentDetail1.email,
                    pic: this.agentDetail1.pic_agent,
                    update: this.agentDetail1.pic_agent?.size ? 'yes' : 'no'
                },
                {
                    title_th: this.prefix_agent2_th.title_th,
                    title_eng: this.prefix_agent2_th.title_eng,
                    name_th: this.agentDetail2.name_th,
                    name_eng: this.agentDetail2.name_eng,
                    email: this.agentDetail2.email,
                    pic: this.agentDetail2.pic_agent,
                    update: this.agentDetail2.pic_agent?.size ? 'yes' : 'no'
                }
            ]
        }
        this.$emit('dataSave',dataSave)
    },
    uploadFiles () {
        document.getElementById('company-logo').click()
    },
    uploadFilesAgent1 () {
        document.getElementById('agent1').click()
    },
    uploadFilesAgent2 () {
        document.getElementById('agent2').click()
    },

    provinceFilter(provinceName){
        let obj = {}
        if(provinceName){
           obj = this.provinceAll.find(v => v.name_th === provinceName)
        }
        this.province = {
            id:obj.id || '',
            name_th: obj.name_th || '',
            name_en: obj.name_en || '',
        }
    },
    async districtFilter(districtName){
        let obj = {}
        if(districtName){
            await this.apiGetDistrict(this.province.id)
            obj = this.districtAll.find(v => v.name_th === districtName)
        }
        this.district = {
            code: obj.code || '',
            name_th: obj.name_th || '',
            name_en: obj.name_en || '',
        }
    },
    async subDistrictFilter(subDistrictName,zipCode){
        let obj = {}
        if(subDistrictName){
            await this.apiGetSubDistrict(this.district.code)
            obj = this.subDistrictAll.find(v => v.name_th === subDistrictName)
        }
        this.subDistrict = {
            zip_code: zipCode || '',
            name_th: obj.name_th || '',
            name_en: obj.name_en || '',
        }
        this.zipCode = this.subDistrict.zip_code
    },
  
    async apiGetProvince(){
        const res = await this.$axios.get(`/api/location/getProvince`)
            .then((response) => {
            return response
            })
            .catch((err) => {
            return err.response
            })
            if(res.status === 200){
                this.provinceAll = res.data.results
            }
    },
    async apiGetDistrict(provinceId){
        this.zipCode = ''
        this.subDistrict = ''
        const res = await this.$axios.get(`/api/location/getDistrict?province_code=${provinceId}`)
            .then((response) => {
            return response
            })
            .catch((err) => {
            return err.response
            })
            if(res.status === 200){
                this.districtAll = res.data.results
            }
    },
    async apiGetSubDistrict(districtId){
        this.zipCode = ''
        const res = await this.$axios.get(`/api/location/getSubDistrict?district_code=${districtId}`)
            .then((response) => {
            return response
            })
            .catch((err) => {
            return err.response
            })
            if(res.status === 200){
                this.subDistrictAll = res.data.results
            }
    },
    }
}
</script>
<style scoped>
.v-text-field .v-input__control{
    border-radius: 8px;
}
.box-upload{
    border: 1px dashed rgba(120, 205, 107, 1);
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
}
.items{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
}
.text-logo{
    font-size: 14px;
    font-weight: 500;
    color: rgba(120, 205, 107, 1);
}
.text-size-png{
    font-size: 8px;
    font-weight: 400;
}
.text-title{
    font-size: 16px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
}
.text-section{
    font-size: 16px;
    font-weight: 500;
    color: rgba(152, 152, 152, 1)
}
.text-section-agent{
    font-size: 16px;
    font-weight: 600;
    color: rgba(99, 99, 99, 1)
}
.color-trash{
    filter: brightness(0) saturate(100%) invert(52%) sepia(13%) saturate(346%) hue-rotate(179deg) brightness(91%) contrast(96%);
    width: 19px;
    height: 19px;
}
.sub-color{
    color: red;
}
</style>