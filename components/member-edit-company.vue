<template>
  <div>
    <v-form ref="form" v-model="valid">
      <v-row align="center">
        <v-col cols="12" class="text-title">ข้อมูลบริษัท</v-col>
        <v-col cols="12" class="text-section pt-0 py-1"
          >ชื่อบริษัท(ภาษาไทย) <span class="sub-color">*</span></v-col
        >
        <v-col cols="12" class="py-0"
          ><v-text-field
            v-model="companyDetails.company_name_th"
            :rules="[rules.thaiOnly]"
            height="40"
            dense
            outlined
            required
          ></v-text-field
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1"
          >Company name <span class="sub-color">*</span></v-col
        >
        <v-col cols="12" class="py-0"
          ><v-text-field
            v-model="companyDetails.company_name_eng"
            :rules="[rules.engOnly]"
            height="40"
            dense
            outlined
            required
          ></v-text-field
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1"
          >เบอร์โทรศัพท์ <span class="sub-color">*</span></v-col
        >
        <v-col cols="12" class="py-0"
          ><v-text-field
            v-model="companyDetails.company_telephone"
            :rules="[rules.numberLength]"
            height="40"
            dense
            outlined
            required
          ></v-text-field
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1">เบอร์โทรสาร</v-col>
        <v-col cols="12" class="py-0"
          ><v-text-field
            v-model="companyDetails.company_fax"
            :rules="[rules.numberLength]"
            height="40"
            dense
            outlined
          ></v-text-field
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1">อีเมล</v-col>
        <v-col cols="12" class="py-0"
          ><v-text-field
            v-model="companyDetails.company_email"
            height="40"
            :rules="[rules.emailRules]"
            dense
            outlined
          ></v-text-field
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1">โลโก้บริษัท</v-col>
        <v-col
          v-show="companyDetails.company_logo ? false : true"
          class="pt-0"
          cols="12"
          ><v-btn
            color="rgba(120, 205, 107, 1)"
            width="100%"
            outlined
            rounded
            @click="uploadFiles()"
            ><v-icon>mdi-plus</v-icon>อัพโหลดรูป</v-btn
          ></v-col
        >
        <v-col
          v-show="companyDetails.company_logo ? true : false"
          class="pt-0"
          cols="12"
        >
          <div class="box-upload">
            <div class="items">
              <v-img
                width="32"
                height="80%"
                :src="require('@/assets/img/user/png.svg')"
              />
              <div>
                <div class="text-logo">โลโก้บริษัท.{{ companyDetails.fileType }}</div>
                <!-- <div class="text-size-png">
                  {{ (companyDetails.size / 1024).toFixed(2) }} KB / 600 KB
                </div> -->
              </div>
            </div>
            <div class="color-trash" @click="companyDetails.company_logo = ''">
              <v-img width="32" :src="require('@/assets/img/user/trash.svg')" />
            </div>
          </div>
        </v-col>
        <v-col cols="12" class="text-title">ที่อยู่บริษัท</v-col>
        <v-col cols="12" class="text-section pt-0 py-1">ที่อยู่ (ภาษาไทย)</v-col>
        <v-col cols="12" class="pt-0">
          <v-textarea
            v-model="companyDetails.company_address_th"
            height="80"
            outlined
            hide-details
          ></v-textarea>
        </v-col>
        <v-col cols="12" class="text-section pt-0 py-1">จังหวัด (ภาษาไทย)</v-col>
        <v-col cols="12" class="pt-0"
          ><v-select
            id="province"
            v-model="province"
            :items="itemsProvincesHouse"
            item-text="name_th"
            item-value="id"
            return-object
            dense
            outlined
            hide-details
            @change="apiGetDistrict(province.id, 'house')"
          ></v-select
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1">เขต/อำเภอ (ภาษาไทย)</v-col>
        <v-col cols="12" class="pt-0"
          ><v-select
            v-model="district"
            :items="itemsDistrictsHouse"
            item-text="name_th"
            item-value="code"
            height="40"
            return-object
            dense
            outlined
            hide-details
            @change="apiGetSubDistrict(district.code, 'house')"
          ></v-select
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1">แขวง/ตำบล (ภาษาไทย)</v-col>
        <v-col cols="12" class="pt-0"
          ><v-select
            v-model="subDistrict"
            :items="itemsSubDistrictsHouse"
            item-text="name_th"
            item-value="zip_code"
            return-object
            height="40"
            dense
            outlined
            hide-details
            @change="zipCode = subDistrict.zip_code"
          ></v-select
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1">รหัสไปรษณีย์</v-col>
        <v-col cols="12" class="pt-0"
          ><v-text-field
            v-model="zipCode"
            height="40"
            disabled
            dense
            outlined
            hide-details
          ></v-text-field
        ></v-col>
        <!-- address eng -->
        <v-col cols="12" class="text-title">Office Address</v-col>
        <v-col cols="12" class="text-section pt-0 py-1">Address</v-col>
        <v-col cols="12" class="pt-0">
          <v-textarea
            v-model="companyDetails.company_address_eng"
            height="80"
            outlined
            hide-details
          ></v-textarea>
        </v-col>
        <v-col cols="12" class="text-section pt-0 py-1">Province</v-col>
        <v-col cols="12" class="pt-0"
          ><v-select
            v-model="provinceEN"
            :items="itemsProvincesEN"
            item-text="name_en"
            item-value="id"
            height="40"
            dense
            outlined
            return-object
            hide-details
            @change="apiGetDistrict(provinceEN.id, 'EN')"
          ></v-select
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1">District / Area</v-col>
        <v-col cols="12" class="pt-0"
          ><v-select
            v-model="districtEN"
            :items="itemsDistrictsEN"
            item-text="name_en"
            item-value="code"
            height="40"
            dense
            outlined
            return-object
            hide-details
            @change="apiGetSubDistrict(districtEN.code, 'EN')"
          ></v-select
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1">Sub-district/ Sub-area</v-col>
        <v-col cols="12" class="pt-0"
          ><v-select
            v-model="subDistrictEN"
            :items="itemsSubDistrictsEN"
            item-text="name_en"
            item-value="zip_code"
            height="40"
            dense
            outlined
            return-object
            hide-details
            @change="zipCode = subDistrict.zip_code"
          ></v-select
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1">Postal Code</v-col>
        <v-col cols="12" class="pt-0"
          ><v-text-field 
            v-model="zipCode"
            height="40"
            disabled
            dense
            outlined
            hide-details
          ></v-text-field
        ></v-col>
        <!-- agent details -->

        <v-col cols="12" class="text-title">ข้อมูลผู้แทนในนามบริษัท</v-col>
        <!-- agent1 -->
        <v-col cols="12" class="text-section-agent">ผู้แทนที่ 1</v-col>
        <v-col cols="12" class="text-section pt-0 py-1"
          >คำนำหน้า <span class="sub-color">*</span></v-col
        >
        <v-col cols="12" class="py-0"
          ><v-select
            v-model="prefix_agent1_th"
            :items="prefixAll"
            item-text="title_th"
            item-value="title_th"
            height="40"
            dense
            outlined
            return-object
            :rules="[rules.required]"
            required
          ></v-select
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1"
          >ชื่อ - นามสกุล (ภาษาไทย) <span class="sub-color">*</span></v-col
        >
        <v-col cols="12" class="py-0"
          ><v-text-field
            v-model="agentDetail1.name_th"
            height="40"
            dense
            outlined
            :rules="[rules.thaiOnly]"
            required
          ></v-text-field
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1"
          >Name Title <span class="sub-color">*</span></v-col
        >
        <v-col cols="12" class="py-0"
          ><v-select
            v-model="prefix_agent1_th"
            :items="prefixAll"
            item-text="title_eng"
            item-value="title_th"
            height="40"
            dense
            outlined
            return-object
            :rules="[rules.required]"
            required
          ></v-select
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1"
          >First name - Last name <span class="sub-color">*</span></v-col
        >
        <v-col cols="12" class="py-0"
          ><v-text-field
            v-model="agentDetail1.name_eng"
            height="40"
            dense
            outlined
            :rules="[rules.engOnly]"
            required
          ></v-text-field
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1"
          >อีเมล <span class="sub-color">*</span></v-col
        >
        <v-col cols="12" class="py-0"
          ><v-text-field
            v-model="agentDetail1.email"
            height="40"
            dense
            outlined
            :rules="[rules.emailRules]"
            required
          ></v-text-field
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1">รูปผู้แทน</v-col>
        <v-col
          v-show="agentDetail1.pic_agent ? false : true"
          class="pt-0"
          cols="12"
          ><v-btn
            color="rgba(120, 205, 107, 1)"
            width="100%"
            outlined
            rounded
            @click="uploadFilesAgent1()"
            ><v-icon>mdi-plus</v-icon>อัพโหลดรูป</v-btn
          ></v-col
        >
        <v-col
          v-show="agentDetail1.pic_agent ? true : false"
          cols="12"
          class="pt-0"
        >
          <div class="box-upload">
            <div class="items">
              <v-img
                width="32"
                height="80%"
                :src="require('@/assets/img/user/png.svg')"
              />
              <div>
                <div class="text-logo">ผู้แทนที่1.jpg</div>
                <div class="text-size-png">
                  {{ (agentDetail1.size / 1024).toFixed(2) }} KB / 600 KB
                </div>
              </div>
            </div>
            <div class="color-trash">
              <v-img
                width="32"
                :src="require('@/assets/img/user/trash.svg')"
                @click="agentDetail1.pic_agent = ''"
              />
            </div>
          </div>
        </v-col>
        <!-- agent2 -->
        <v-col cols="12" class="text-section-agent">ผู้แทนที่ 2</v-col>
        <v-col cols="12" class="text-section pt-0 py-1"
          >คำนำหน้า <span class="sub-color">*</span></v-col
        >
        <v-col cols="12" class="py-0"
          ><v-select
            v-model="prefix_agent2_th"
            :items="prefixAll"
            item-text="title_th"
            item-value="title_th"
            height="40"
            return-object
            dense
            outlined
            :rules="[rules.select]"
            required
          ></v-select
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1"
          >ชื่อ - นามสกุล (ภาษาไทย) <span class="sub-color">*</span></v-col
        >
        <v-col cols="12" class="py-0"
          ><v-text-field
            v-model="agentDetail2.name_th"
            height="40"
            dense
            outlined
            :rules="[rules.thaiOnly]"
            required
          ></v-text-field
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1"
          >Name Title <span class="sub-color">*</span></v-col
        >
        <v-col cols="12" class="py-0"
          ><v-select
            v-model="prefix_agent2_th"
            :items="prefixAll"
            item-text="title_eng"
            item-value="title_th"
            height="40"
            return-object
            dense
            outlined
            :rules="[rules.select]"
            required
          ></v-select
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1"
          >First name - Last name <span class="sub-color">*</span></v-col
        >
        <v-col cols="12" class="py-0"
          ><v-text-field
            v-model="agentDetail2.name_eng"
            height="40"
            dense
            outlined
            :rules="[rules.engOnly]"
            required
          ></v-text-field
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1"
          >อีเมล <span class="sub-color">*</span></v-col
        >
        <v-col cols="12" class="py-0"
          ><v-text-field
            v-model="agentDetail2.email"
            height="40"
            dense
            outlined
            :rules="[rules.emailRules]"
            required
          ></v-text-field
        ></v-col>
        <v-col cols="12" class="text-section pt-0 py-1">รูปผู้แทน</v-col>
        <v-col
          v-show="agentDetail2.pic_agent ? false : true"
          class="pt-0"
          cols="12"
          ><v-btn
            color="rgba(120, 205, 107, 1)"
            width="100%"
            outlined
            rounded
            @click="uploadFilesAgent2()"
            ><v-icon>mdi-plus</v-icon>อัพโหลดรูป</v-btn
          ></v-col
        >
        <v-col
          v-show="agentDetail2.pic_agent ? true : false"
          cols="12"
          class="pt-0"
        >
          <div class="box-upload">
            <div class="items">
              <v-img
                width="32"
                height="80%"
                :src="require('@/assets/img/user/png.svg')"
              />
              <div>
                <div class="text-logo">ผู้แทนที่2.jpg</div>
                <!-- <div class="text-size-png">
                  {{ (agentDetail2.size / 1024).toFixed(2) }} KB / 600 KB
                </div> -->
              </div>
            </div>
            <div class="color-trash">
              <v-img
                width="32"
                :src="require('@/assets/img/user/trash.svg')"
                @click="agentDetail2.pic_agent = ''"
              />
            </div>
          </div>
        </v-col>
        <v-file-input
          id="company-logo"
          v-model="pathFiles.company"
          style="display: none"
          accept=".png, .jpeg, .jpg"
          outlined
          dense
          hide-input
        ></v-file-input>
        <v-file-input
          v-show="false"
          id="agent1"
          v-model="pathFiles.agent1"
          style="display: none"
          accept=".png, .jpeg, .jpg"
          outlined
          dense
          hide-input
        ></v-file-input>
        <v-file-input
          v-show="false"
          id="agent2"
          v-model="pathFiles.agent2"
          style="display: none"
          accept=".png, .jpeg, .jpg"
          outlined
          dense
          hide-input
        ></v-file-input>
      </v-row>
    </v-form>  
  </div>
  
</template>
<script>
export default {
  props: {
    company: {
      type: Array,
      default: null,
    },
    agent: {
      type: Array,
      default: null,
    },
    formIsValid: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valid: false,
      validRules: [(v) => !!v || 'กรุณากรอกข้อมูล'],
      companyDetails: {},
      agentDetail1: {},
      agentDetail2: {},
      itemsProvincesHouse: [],
      itemsDistrictsHouse: [],
      itemsSubDistrictsHouse: [],
      // eng
      itemsProvincesEN: [],
      itemsDistrictsEN: [],
      itemsSubDistrictsEN: [],
      zipCode: '',
      zipCodeEN: '',
      province: {},
      district: {},
      subDistrict: {},
      pathFiles: {
        company: null,
        agent1: null,
        agent2: null,
      },
      prefix_agent1_th: {},
      prefix_agent1_eng: {},
      prefix_agent2_th: {},
      prefix_agent2_eng: {},
      prefixAll: [
        {
          title_th: 'นาย',
          title_eng: 'Mr.',
        },
        {
          title_th: 'นาง',
          title_eng: 'Mrs.',
        },
        {
          title_th: 'นางสาว',
          title_eng: 'Miss',
        },
      ],
      provinceEN: {},
      districtEN: {},
      subDistrictEN: {},
      // ----- Rules ------
      rules: {
        pass: (value) =>
          value.length >= 5 || 'กรุณากรอกรหัสผ่านอย่างน้อย 5 ตัว',
        required: (value) => !!value || 'กรุณากรอกข้อมูล',
        select: (value) => !!value || 'กรุณาเลือกข้อมูล',
        thaiOnly: (value) =>
          /^([ก-๙\s])+$/i.test(value) || 'กรุณากรอกเป็นภาษาไทยเท่านั้น',
        engCompany: (value) =>
          /^([A-Za-z\s.,-])+$/i.test(value) ||
          'กรุณากรอกเป็นภาษาอังกฤษเท่านั้น',
        engOnly: (value) =>
          /^([A-Za-z\s])+$/i.test(value) || 'กรุณากรอกเป็นภาษาอังกฤษเท่านั้น',
        numberOnly: (value) =>
          /^([0-9, ','])+$/.test(value) || 'กรุณากรอกเป็นตัวเลขเท่านั้น',
        emailRules: (value) =>
          /^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          'รูปแบบอีเมลไม่ถูกต้อง',
        numberLength: (value) =>
          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value) ||
          'กรุณากรอกจำนวนตัวเลขไม่เกิน 10 หลัก',
        numberHouseOnly: (value) =>
          /^(\d+\/\d+|\d+)$/.test(value) || 'กรุณากรอกเป็นตัวเลขเท่านั้น',
      },
      overlay: true
    }
  },
  watch: {
    async company(newValue) {
      this.companyDetails = newValue[0]
      await this.provinceFilterUpdate(this.companyDetails.company_province_th, 'house')
      await this.districtFilterUpdate(this.companyDetails.company_district_th, 'house')
      await this.subDistrictFilterUpdate(this.companyDetails.company_sub_district_th, 'house')
      await this.provinceFilterUpdate(this.companyDetails.company_province_eng, 'EN')
      await this.districtFilterUpdate(this.companyDetails.company_district_eng, 'EN')
      await this.subDistrictFilterUpdate(this.companyDetails.company_sub_district_eng, 'EN')
      this.$refs.form.resetValidation()
    },
    agent(agentObj) {
      this.agentDetail1 = agentObj[0] || {
        name_th: '',
        name_eng: '',
        email: '',
      }
      this.agentDetail2 = agentObj[1] || {
        name_th: '',
        name_eng: '',
        email: '',
      }
      this.prefix_agent1_th = {
        title_th: agentObj[0]?.title_th,
        title_eng: agentObj[0]?.title_eng,
      }
      this.prefix_agent1_eng = {
        title_th: agentObj[0]?.title_th,
        title_eng: agentObj[0]?.title_eng,
      }
      this.prefix_agent2_th = {
        title_th: agentObj[1]?.title_th,
        title_eng: agentObj[1]?.title_eng,
      }
      this.prefix_agent2_eng = {
        title_th: agentObj[1]?.title_th,
        title_eng: agentObj[1]?.title_eng,
      }
    },
    pathFiles: {
      handler(newValue) {
        if (newValue.company) {
          this.companyDetails.company_logo = newValue.company
          this.companyDetails.size = newValue.company.size
        }
        if (newValue.agent1) {
          this.agentDetail1.pic_agent = newValue.agent1
          this.agentDetail1.size = newValue.agent1.size
        }
        if (newValue.agent2) {
          this.agentDetail2.pic_agent = newValue.agent2
          this.agentDetail2.size = newValue.agent2.size
        }
      },
      deep: true,
    },
    valid(val) {
      this.$emit("form1", val); // ส่งสถานะฟอร์มกลับไปยัง parent
      if (!val) {
        this.$refs.form.validate()
      }
    }
  },
  async mounted() {
    await this.apiGetProvince('house')
    await this.apiGetProvince('EN')
  },
  // updated () {
  //   this.dataSave()
  // },
  methods: {
    dataSave() {
      const dataSave = {
        detail_company: {
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
          company_province_eng: this.provinceEN.name_en,
          company_district_eng: this.districtEN.name_en,
          company_sub_district_eng: this.subDistrictEN.name_en,
          company_zip_code: this.zipCode,
          type_company: this.companyDetails.type_company,
        },
        files_logo_company: this.companyDetails.company_logo instanceof File ? this.companyDetails.company_logo : null,
        detail_agent: [
          {
            id: this.agentDetail1.id,
            title_th: this.prefix_agent1_th.title_th,
            title_eng: this.prefix_agent1_th.title_eng,
            name_th: this.agentDetail1.name_th,
            name_eng: this.agentDetail1.name_eng,
            email: this.agentDetail1.email,
            pic: this.agentDetail1.pic_agent instanceof File ? this.agentDetail1.pic_agent : null
          },
          {
            id: this.agentDetail2.id,
            title_th: this.prefix_agent2_th.title_th,
            title_eng: this.prefix_agent2_th.title_eng,
            name_th: this.agentDetail2.name_th,
            name_eng: this.agentDetail2.name_eng,
            email: this.agentDetail2.email,
            pic: this.agentDetail2.pic_agent instanceof File ? this.agentDetail2.pic_agent : null
          },
        ],
      }
      this.$emit('dataSave', dataSave)
    },
    uploadFiles() {
      document.getElementById('company-logo').click()
    },
    uploadFilesAgent1() {
      document.getElementById('agent1').click()
    },
    uploadFilesAgent2() {
      document.getElementById('agent2').click()
    },
    async provinceFilter (provinceName, type) {
      if (type === 'house') {
        this.zipCode = ''
        this.companyDetails.company_district_th = ''
        this.companyDetails.company_sub_district_th = ''
        this.$refs.formStep1.resetValidation()
      } else if (type === 'EN') {
        this.zipCodeEN = ''
        this.companyDetails.company_district_eng = ''
        this.companyDetails.company_sub_district_eng = ''
        this.$refs.formStep1.resetValidation()
      }
      let obj = {}
      if (provinceName && type === 'house') {
        obj = this.itemsProvincesHouse.find((v) => v.name_th === provinceName)
        this.province = {
          id: obj.id || '',
          name_th: obj.name_th || ''
        }
        await this.apiGetDistrict(this.province.id, type)
      } else if (provinceName && type === 'EN') {
        obj = this.itemsProvincesHouse.find((v) => v.name_eng === provinceName)
        this.provinceEN = {
          id: obj.id || '',
          name_en: obj.name_eng || ''
        }
        await this.apiGetDistrict(this.provinceEN.id, type)
      }
    },
    async districtFilter (districtName, type) {
      if (type === 'house') {
        this.zipCode = ''
        this.companyDetails.company_sub_district_th = ''
        this.$refs.formStep1.resetValidation()
      } else if (type === 'EN') {
        this.zipCode = ''
        this.companyDetails.company_sub_district_eng = ''
        this.$refs.formStep1.resetValidation()
      }
      let obj = {}
      if (districtName && type === 'house') {
        obj = this.itemsDistrictsHouse.find((v) => v.name_th === districtName)
        this.district = {
          code: obj.code || '',
          name_th: obj.name_th || ''
        }
        await this.apiGetSubDistrict(this.district.code, type)
      } else if (districtName && type === 'EN') {
        obj = this.itemsDistrictsEN.find((v) => v.name_en === districtName)
        this.districtEN = {
          code: obj.code || '',
          name_en: obj.name_en || ''
        }
        await this.apiGetSubDistrict(this.districtEN.code, type)
      }
    },
    subDistrictFilter (subDistrictName, type) {
      let obj = {}
      if (subDistrictName && type === 'house') {
        obj = this.itemsSubDistrictsHouse.find((v) => v.name_th === subDistrictName)
        this.subDistrict = {
          zip_code: obj.zip_code || '',
          name_th: obj.name_th || '',
          name_en: obj.name_en || ''
        }
      } else if (subDistrictName && type === 'EN') {
        obj = this.itemsSubDistrictsEN.find((v) => v.name_en === subDistrictName)
        this.subDistrictEN = {
          zip_code: obj.zip_code || '',
          name_th: obj.name_th || '',
          name_en: obj.name_en || ''
        }
      }
      if (type === 'house') {
        this.zipCode = this.subDistrict.zip_code
      } else if (type === 'EN') { 
        this.zipCodeEN = this.subDistrictEN.zip_code
      }
    },
    // ดึงข้อมูลจังหวัด
    async apiGetProvince (type) {
      const res = await this.$axios.get(`/api/location/getProvince`)
      .then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      if (res.status === 200 && type === 'house') {
        this.itemsProvincesHouse = res.data.results
      } else if (res.status === 200 && type === 'EN') {
        this.itemsProvincesEN = res.data.results
      }
    },
    // ดึงข้อมูลเขต
    async apiGetDistrict (provinceId, type) {
      const res = await this.$axios.get(`/api/location/getDistrict?province_code=${provinceId}`)
      .then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      if (res.status === 200 && type === 'house') {
        this.itemsDistrictsHouse = res.data.results
      } else if (res.status === 200 && type === 'EN') {
        this.itemsDistrictsEN = res.data.results
      }
    },
    // ดึงข้อมูลแขวง
    async apiGetSubDistrict (districtId, type) {
      const res = await this.$axios.get(`/api/location/getSubDistrict?district_code=${districtId}`)
      .then((response) => {
        return response
      }).catch((err) => {
        return err.response
      })
      if (res.status === 200 && type === 'house') {
        this.itemsSubDistrictsHouse = res.data.results
      } else if (res.status === 200 && type === 'EN') {
        this.itemsSubDistrictsEN = res.data.results
      }
    },
    async provinceFilterUpdate (provinceName, type) {
      let obj = {}
      if (provinceName && type === 'house') {
        obj = this.itemsProvincesHouse.find((v) => v.name_th === provinceName)
        this.province = {
          id: obj.id || '',
          name_th: obj.name_th || ''
        }
        await this.apiGetDistrict(this.province.id, type)
      } else if (provinceName && type === 'EN') {
        obj = this.itemsProvincesEN.find((v) => v.name_en === provinceName)
        this.provinceEN = {
          id: obj.id || '',
          name_en: obj.name_en || ''
        }
        await this.apiGetDistrict(this.provinceEN.id, type)
      }
    },
    async districtFilterUpdate (districtName, type) {
      let obj = {}
      if (districtName && type === 'house') {
        obj = this.itemsDistrictsHouse.find((v) => v.name_th === districtName)
        this.district = {
          code: obj.code || '',
          name_th: obj.name_th || ''
        }
        await this.apiGetSubDistrict(this.district.code, type)
      }
      if (districtName && type === 'EN') {
        obj = this.itemsDistrictsEN.find((v) => v.name_en === districtName)
        this.districtEN = {
          code: obj.code || '',
          name_en: obj.name_en || ''
        }
        await this.apiGetSubDistrict(this.districtEN.code, type)
      }
    },
    subDistrictFilterUpdate (subDistrictName, type) {
      let obj = {}
      if (subDistrictName && type === 'house') {
        obj = this.itemsSubDistrictsHouse.find((v) => v.name_th === subDistrictName)
        this.subDistrict = {
          zip_code: obj.zip_code || '',
          name_th: obj.name_th || ''
        }
      }
      if (subDistrictName && type === 'EN') {
        obj = this.itemsSubDistrictsEN.find((v) => v.name_en === subDistrictName)
        this.subDistrictEN = {
          zip_code: obj.zip_code || '',
          name_en: obj.name_en || ''
        }
      }
      this.zipCode = this.subDistrict.zip_code || this.subDistrictEN.zip_code
    }
  },
}
</script>
<style scoped>
.v-text-field .v-input__control {
  border-radius: 8px;
}
.box-upload {
  border: 1px dashed rgba(120, 205, 107, 1);
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
}
.items {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}
.text-logo {
  font-size: 14px;
  font-weight: 500;
  color: rgba(120, 205, 107, 1);
}
.text-size-png {
  font-size: 8px;
  font-weight: 400;
}
.text-title {
  font-size: 16px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}
.text-section {
  font-size: 16px;
  font-weight: 500;
  color: rgba(152, 152, 152, 1);
}
.text-section-agent {
  font-size: 16px;
  font-weight: 600;
  color: rgba(99, 99, 99, 1);
}
.color-trash {
  filter: brightness(0) saturate(100%) invert(52%) sepia(13%) saturate(346%)
    hue-rotate(179deg) brightness(91%) contrast(96%);
  width: 19px;
  height: 19px;
}
.sub-color {
  color: red;
}
</style>