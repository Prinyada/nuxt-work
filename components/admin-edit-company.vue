<template>
  <div>
    <v-expansion-panels v-model="panel" multiple class="">
      <!-- ยังไม่แก้ไข -->
      <v-expansion-panel v-if="!isEdit" elevation="0" class="pa-0 px-6">
        <v-expansion-panel-header class="pa-0 panel__header">
          <h4>ข้อมูลบริษัท</h4>
        </v-expansion-panel-header>
        <v-expansion-panel-content elevation="0">
          <v-divider></v-divider>
          <v-row no-gutters class="mt-4">
            <v-col v-if="!imageItem" style="display: flex; align-items: center" cols="auto" class="pa-0">
              <span class="gray__color">โลโก้บริษัท : </span>
              <v-img class="ml-4" :src="require('@/assets/info/logo-office-data.svg')" height="60" contain></v-img>
            </v-col>
            <v-col v-else style="display: flex; align-items: center" class="pa-0">
              <span class="gray__color">โลโก้บริษัท : </span>
              <v-img class="ml-4 img__border"
                :src="`data:image/${itemCompany.fileType};base64,` + itemCompany.company_logo" max-width="60"
                height="60" cover></v-img>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col md="4" class="pl-0">
              <span class="gray__color">ชื่อบริษัท (ภาษาไทย) : </span>{{ itemCompany.company_name_th }}
            </v-col>
            <v-col cols="4"><span class="gray__color">Company name : </span>{{ itemCompany.company_name_eng }}</v-col>
            <v-col cols="4"><span class="gray__color">ประเภทธุรกิจ : </span>{{ itemCompany.type_company }}</v-col>
            <v-col cols="4" class="pl-0"><span class="gray__color">เบอร์โทรศัพท์ : </span>{{
      itemCompany.company_telephone }}</v-col>
            <v-col cols="4"><span class="gray__color">เบอร์โทรสาร : </span>{{ itemCompany.company_fax }}</v-col>
            <v-col cols="4"><span class="gray__color">อีเมล : </span>{{ itemCompany.company_email }}</v-col>
            <v-col cols="6" class="pl-0"><span class="gray__color">ที่อยู่บริษัท(ภาษาไทย) : </span>{{
      itemCompany.company_full_address_th }}</v-col>
            <v-col cols="6"><span class="gray__color">Office Address : </span>{{ itemCompany.company_full_address_eng
              }}</v-col>
          </v-row>
          <v-col cols="12" class="pl-0">
            <h4>ข้อมูลผู้แทนในนามบริษัท</h4>
          </v-col>
          <v-divider></v-divider>
          <template v-if="itemAgent[0]?.agent_id === null && itemAgent[1]?.agent_id === null
      ">
            <p style="margin-top: 16px">ไม่พบข้อมูลผู้แทนในนามบริษัท</p>
          </template>
          <template v-else>
            <v-row v-for="(v, i) in itemAgent" :key="i" no-gutters>
              <v-col cols="12" class="px-0">ผู้แทนที่ {{ i + 1 }}</v-col>
              <div cols="3" class="px-0 pt-4 pr-4">
                <v-row no-gutters>
                  <span class="gray__color">รูปผู้แทน : </span>
                  <!-- <v-col cols="auto" class="pa-0 ml-4"><v-img :src="v.img" height="48" contain></v-img></v-col> -->
                  <v-img class="ml-2 img__border" :src="'data:image/png;base64,' + v.pic_agent" max-width="48"
                    height="48" cover></v-img>
                  <!-- <v-img class="ml-2 img__border" :src="'data:image/png;base64,' + imageItem" max-width="48" height="48" cover></v-img> -->
                </v-row>
              </div>
              <v-col cols="9">
                <v-row no-gutters>
                  <v-col cols="" class="pa-0"><span class="gray__color">ชื่อ-นามสกุล (ภาษาไทย) : </span>{{ v.title_th }}
                    {{ v.name_th }}</v-col>
                  <v-col cols="6" class="pa-0"><span class="gray__color">First name - Last name : </span>{{ v.title_eng
                    }} {{ v.name_eng }}</v-col>
                  <v-col cols="6" class="pa-0 mt-6"><span class="gray__color">อีเมล : </span>{{ v.email }}</v-col>
                </v-row>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- แก้ไข -->
      <v-expansion-panel v-else class="gray__background pa-0 px-6">
        <v-expansion-panel-header class="pa-0 panel__header">
          <h4>ข้อมูลบริษัท</h4>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-divider></v-divider>
          <v-row no-gutters class="d-flex mt-6" justify="center">
            <span class="gray__color">โลโก้บริษัท</span>
          </v-row>
          <!-- อัปโหลดของใหม่ กับ แสดงของเดิม -->
          <v-row v-if="isFile(itemCompanyTemp.company_logo) ||
      !(itemCompanyTemp.company_logo === null)
      " no-gutters class="d-flex" justify="center">
            <div class="ml-2 pa-2" style="
                border-radius: 6px;
                border: 1px dashed #e6e6e6;
                height: 112px;
                width: 112px;
              ">
              <v-img
                :src="showFileLogo ? showFileLogo : `data:image/${itemCompanyTemp.fileType};base64,` + itemCompanyTemp.company_logo"
                height="96" class="pa-2 img__border__edit" width="96" cover></v-img>
              <v-btn text icon height="28" width="28" class="pa-2 img__border__edit"
                style="position: relative; left: 85px; bottom: 115px" @click="deleteFileLogo"><v-icon size="16"
                  color="red">mdi-delete</v-icon></v-btn>
            </div>
          </v-row>
          <v-row v-else no-gutters class="d-flex mt-4" justify="center">
            <div class="img__border__edit__dashed mr-1 pa-2">
              <v-img :src="require('@/assets/info/logo-office-data.svg')" cover height="88" width="88"
                class="img__border__edit"></v-img>
              <v-btn text icon height="28" width="28" class="icon__btn"
                style="position: relative; left: 85px; bottom: 115px" @click="triggerFileLogoInput"><v-icon
                  size="16">mdi-pencil-outline</v-icon></v-btn>
            </div>
            <!-- {{ file }} -->
          </v-row>
          <v-file-input id="company_logo" accept="image/*" label="Upload your file" class="d-none"
            @change="handleFileLogoChange" />

          <!-- <v-btn text icon max-height="28" max-width="28" class="icon__btn position__btn" @click="triggerFileInput"><v-icon size="16">mdi-pencil-outline</v-icon></v-btn> -->
          <v-row no-gutters>
            <v-col cols="4" class="pl-0">
              <span class="gray__color">ชื่อบริษัท (ภาษาไทย)</span><span class="red__color"> *</span>
              <v-text-field v-model="itemCompanyTemp.company_name_th" color="#78CD6B" background-color="white" outlined
                dense height="40" :rules="[rules.required, rules.thaiOnly]">
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <span class="gray__color">Company name</span><span class="red__color"> *</span>

              <v-text-field v-model="itemCompanyTemp.company_name_eng" color="#78CD6B" background-color="white" outlined
                dense height="40" :rules="[rules.engCompany, rules.required]">
              </v-text-field>
            </v-col>
            <v-col cols="4" class="pr-0"><span class="gray__color">ประเภทธุรกิจ</span>
              <!-- {{ typeTemp }} -->
              <v-text-field v-model="itemCompanyTemp.type_company" color="#78CD6B" background-color="white" outlined
                dense height="40" />
            </v-col>
            <v-col cols="4" class="pl-0"><span class="gray__color">เบอร์โทรศัพท์</span><span class="red__color">
                *</span>
              <v-text-field v-model="itemCompanyTemp.company_telephone" color="#78CD6B" background-color="white"
                outlined dense height="40" :rules="[rules.required]">
              </v-text-field>
            </v-col>
            <v-col cols="4"><span class="gray__color">เบอร์โทรสาร</span>

              <v-text-field v-model="itemCompanyTemp.company_fax" color="#78CD6B" background-color="white" outlined
                dense height="40">
              </v-text-field>
            </v-col>
            <v-col cols="4" class="pr-0"><span class="gray__color">อีเมล</span>
              <v-text-field v-model="itemCompanyTemp.company_email" color="#78CD6B" background-color="white" outlined
                dense height="40" :rules="itemCompanyTemp.company_email ? [rules.emailRules] : []">
              </v-text-field>
            </v-col>
            <h4>ที่อยู่บริษัท (ภาษาไทย)</h4>
            <v-col cols="12" class="px-0"><span class="gray__color">ที่อยู่ (ภาษาไทย)</span>
              <v-textarea v-model="itemCompanyTemp.company_address_th" background-color="white" outlined dense>
              </v-textarea>
            </v-col>
            <v-col cols="4" class="pl-0">
              <span class="gray__color pl-0">จังหวัด (ภาษาไทย)</span>
              <v-select v-model="itemCompanyTemp.company_province_th" color="#78CD6B" :items="itemProvinces"
                item-text="name_th" background-color="white" append-icon="mdi-chevron-down" outlined dense @change="
      provinceFilter(itemCompanyTemp.company_province_th, 'house')
      ">
              </v-select>
            </v-col>
            <v-col cols="4">
              <span class="gray__color">เขต/อำเภอ (ภาษาไทย)</span>
              <v-select v-model="itemCompanyTemp.company_district_th" color="#78CD6B" :items="itemDistrict"
                background-color="white" item-text="name_th" append-icon="mdi-chevron-down" outlined dense @change="
      districtFilter(itemCompanyTemp.company_district_th, 'house')
      ">
              </v-select>
            </v-col>
            <v-col cols="4" class="pr-0">
              <span class="gray__color">แขวง/ตำบล (ภาษาไทย)</span>
              <v-select v-model="itemCompanyTemp.company_sub_district_th" color="#78CD6B" item-text="name_th"
                :items="itemSubDistrict" background-color="white" append-icon="mdi-chevron-down" outlined dense @change="
      subDistrictFilter(
        itemCompanyTemp.company_sub_district_th,
        'house'
      )
      ">
              </v-select>
            </v-col>
            <v-col cols="4" class="pl-0">
              <span class="gray__color pl-0">รหัสไปรษณีย์</span>
              <v-text-field v-model="itemCompanyTemp.company_zip_code" color="#78CD6B" height="40" filled disabled
                outlined dense>
              </v-text-field>
            </v-col>
            <v-col cols="12" class="px-0">
              <h4>Office Address</h4>
              <span class="gray__color">Address</span>
              <v-textarea v-model="itemCompanyTemp.company_address_eng" background-color="white" outlined dense>
              </v-textarea>
            </v-col>
            <v-col cols="4" class="pl-0"><span class="gray__color">Province</span>
              <v-select v-model="itemCompanyTemp.company_province_eng" background-color="white"
                :items="itemsProvincesEN" height="40" item-text="name_en" outlined dense @change="
      provinceFilter(itemCompanyTemp.company_province_eng, 'EN')
      ">
              </v-select>
            </v-col>
            <v-col cols="4"><span class="gray__color">District / Area</span>
              <v-select v-model="itemCompanyTemp.company_district_eng" background-color="white"
                :items="itemsDistrictsEN" height="40" item-text="name_en" dense outlined @change="
      districtFilter(itemCompanyTemp.company_district_eng, 'EN')
      ">
              </v-select>
            </v-col>
            <v-col cols="4" class="pr-0"><span class="gray__color">Sub-district/Sub-area</span>
              <v-select v-model="itemCompanyTemp.company_sub_district_eng" background-color="white"
                :items="itemSubDistrictsEN" height="40" item-text="name_en" outlined dense @change="
      subDistrictFilter(
        itemCompanyTemp.company_sub_district_eng,
        'EN'
      )
      ">
              </v-select>
            </v-col>
            <v-col cols="4" class="pl-0"><span class="gray__color">Postal Code</span>
              <v-text-field v-model="subDistrictEN.zip_code" color="#78CD6B" height="40" outlined dense disabled filled>
              </v-text-field>
            </v-col>
          </v-row>
          <h4>ข้อมูลผู้แทนในนามบริษัท</h4>
          <div v-for="(v, i) in itemAgentTemp" :key="i">
            <v-divider></v-divider>
            <v-row style="margin-top: 5px">
              <v-col>
                <span>ผู้แทนที่ {{ i + 1 }}</span>
              </v-col>
            </v-row>
            <v-row style="margin-top: 0px">
              <v-col style="display: flex; align-items: center">
                <v-col cols="2">
                  <v-row style="display: flex">
                    <span class="gray__color">รูปผู้แทน</span>
                    <!-- อัปโหลดใหม่ กับ แสดงของเดิม -->
                    <template v-if="isFile(v.pic_agent) || !(v.pic_agent === null)">
                      <div class="ml-2 pa-2" style="
                          border-radius: 6px;
                          border: 1px dashed #e6e6e6;
                          height: 72px;
                          width: 72px;
                        ">
                        <v-img height="56" class="pa-2 img__border__edit" width="56" cover
                          :src="i === 0 ? showFileAgent1 : showFileAgent2" />
                        <v-btn text icon max-height="28" max-width="28" class="icon__btn"
                          style="position: relative; left: 50px; bottom: 75px" @click="deleteFileUpload(i)"><v-icon
                            size="16" color="red">mdi-delete</v-icon></v-btn>
                      </div>
                    </template>
                    <!-- ไม่มีของเดิม รออัปโหลดใหม่ -->
                    <template v-else>
                      <div class="ml-2 pa-2" style="
                          border-radius: 6px;
                          border: 1px dashed #e6e6e6;
                          height: 72px;
                          width: 72px;
                        ">
                        <v-img height="56" class="pa-2 img__border__edit" width="56" cover
                          :src="require('~/assets/img/user/Non-profile.png')"></v-img>
                        <v-btn text icon max-height="28" max-width="28" class="icon__btn"
                          style="position: relative; left: 50px; bottom: 75px" @click="triggerFileInput(i)"><v-icon
                            size="16">mdi-pencil-outline</v-icon></v-btn>
                      </div>
                    </template>
                  </v-row>
                </v-col>
                <v-col cols="10" style="display: flex">
                  <v-row>
                    <v-col>
                      <span class="gray__color">คำนำหน้า</span><span class="red__color"> *</span>
                      <v-select v-model="v.title_th" color="#78CD6B" background-color="white"
                        :items="['นาย', 'นาง', 'นางสาว']" append-icon="mdi-chevron-down" outlined dense
                        placeholder="กรุณาระบุคำนำหน้า" :rules="[rules.select]" />
                    </v-col>
                    <v-col>
                      <span class="gray__color">ชื่อ-นามสกุล (ภาษาไทย)</span><span class="red__color"> *</span>
                      <v-text-field v-model="v.name_th" color="#78CD6B" background-color="white" height="40" outlined
                        dense placeholder="กรุณาระบุชื่อ-นามสกุล" :rules="[rules.thaiOnly, rules.required]" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-col>
            </v-row>
            <v-row style="margin-top: 0px">
              <v-col style="display: flex">
                <v-col cols="4">
                  <span class="gray__color">Name title</span><span class="red__color"> *</span>
                  <v-select v-model="v.title_eng" color="#78CD6B" background-color="white" :items="['Mr', 'Ms', 'Miss']"
                    append-icon="mdi-chevron-down" outlined dense placeholder="กรุณาระบุคำนำหน้า(ภาษาอังกฤษ)"
                    :rules="[rules.select]" />
                </v-col>
                <v-col cols="4">
                  <span class="gray__color">First name - Last name</span><span class="red__color"> *</span>
                  <v-text-field v-model="v.name_eng" color="#78CD6B" background-color="white" height="40" outlined dense
                    placeholder="กรุณาระบุชื่อ-นามสกุล(ภาษาอังกฤษ)" :rules="[rules.engOnly]" />
                </v-col>
                <v-col cols="4">
                  <span class="gray__color">อีเมล</span><span class="red__color"> *</span>
                  <v-text-field v-model="v.email" color="#78CD6B" background-color="white" height="40" outlined dense
                    placeholder="กรุณาระบุอีเมล" :rules="[rules.emailRules]" />
                </v-col>
              </v-col>
            </v-row>
          </div>
          <v-file-input id="agent1" @change="handleFileAgent_1_Upload" style="display: none" accept=".png, .jpeg, .jpg"
            outlined dense hide-input></v-file-input>
          <v-file-input id="agent2" @change="handleFileAgent_2_Upload" style="display: none" accept=".png, .jpeg, .jpg"
            outlined dense hide-input></v-file-input>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-overlay :value="overlay" opacity="0.15">
      <v-progress-circular color="green" indeterminate size="40" class="circle"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
// import VueTheMask from 'vue-the-mask';

export default {
  // directives: {
  //     mask: VueTheMask.directive,
  // },
  props: {
    isEdit: { type: Boolean, default: null },
    company: { type: Object, default: null },
    agent: { type: Array, default: null },
  },

  data() {
    return {
      file: null,
      file2: null,
      imagePreview: null,

      overlay: true,

      itemProvinces: [],
      itemDistrict: [],
      itemSubDistrict: [],
      // eng
      itemsProvincesEN: [],
      itemsDistrictsEN: [],
      itemSubDistrictsEN: [],
      zipCode: '',
      zipCodeEN: '',

      province: {},
      district: {},
      subDistrict: {},
      provinceEN: {},
      districtEN: {},
      subDistrictEN: {},

      panel: [0, 1],
      item: {
        logo: require('@/assets/info/logo-office-data.svg'),
        nameTh: 'บริษัท เมโทร จำกัด',
        nameEng: 'Metro Co., Ltd.',
        type: 'บริษัทจำกัด',
        number: '091-2206745',
        tax: '02-819-3010',
        email: 'Metro_Co@gmail.com',
        addressTh:
          '123/2 ถนนเพชรบุรีตัดใหม่ แขวง/ตำบล ห้วยขวาง เขต/อำเภอ บางกะปิ จังหวัด กรุงเทพมหานคร 10310',
        addressEng:
          '123/2 New Phetchaburi Road, Huai Khwang Sub-district, Bang Kapi District, Bangkok Province 10310',
        delegate: [
          {
            img: require('@/assets/info/man-data.svg'),
            prefixTh: 'นาย',
            nameTh: 'วินัย สุนทร',
            prefixEng: 'Mr.',
            nameEng: 'vinai sunthon',
            email: 'vinai.s@gmail.com',
          },
          {
            img: require('@/assets/info/woman-data.svg'),
            prefixTh: 'นางสาว',
            nameTh: 'วิภาดา ศรีศร',
            prefixEng: 'Ms.',
            nameEng: 'wipada srison',
            email: 'wipada.wp@gmail.com',
          },
        ],
      },
      logoTemp: null,
      nameThTemp: null,
      nameEngTemp: null,
      typeTemp: null,
      numberTemp: null,
      taxTemp: null,
      emailTemp: null,
      addressThTemp: null,
      addressEngTemp: null,

      itemTemp: [],

      itemCompany: {},
      itemCompanyTemp: {},
      itemAgent: [],
      itemAgentTemp: [],

      // ----- Rules ------
      rules: {
        pass: (value) =>
          value.length >= 5 || 'กรุณากรอกรหัสผ่านอย่างน้อย 5 ตัว',
        required: (value) => !!value || 'กรุณากรอกข้อมูล.',
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

      imageUrl: null,
      agentDetail1: {
        agent_id: null,
        title_th: '',
        title_eng: '',
        name_th: '',
        name_eng: '',
        email: '',
        pic_agent: null,
        nameFile: '',
      },
      agentDetail2: {
        agent_id: null,
        title_th: '',
        title_eng: '',
        name_th: '',
        name_eng: '',
        email: '',
        pic_agent: null,
        nameFile: '',
      },
      showFileAgent1: null,
      showFileAgent2: null,
      showFileLogo: null,
    }
  },
  computed: {
    company_province_th() {
      // console.log('1', this.company.company_province_th);
      return this.company.company_province_th
    },
    imageItem() {
      // console.log(this.company.company_logo);
      return this.company.company_logo
    },
  },
  watch: {
    company: {
      handler(newValue) {
        this.itemCompany = newValue
        this.itemCompanyTemp = JSON.parse(JSON.stringify(newValue))
      },
      deep: true,
    },
    isEdit(val) {
      this.itemCompanyTemp = JSON.parse(JSON.stringify(this.company))
    },
    agent: {
      handler(newValue) {
        if (newValue.length === 0) {
          for (let i = 0; i < 2; i++) {
            const temp = {
              agent_id: null,
              title_th: '',
              title_eng: '',
              name_th: '',
              name_eng: '',
              email: '',
              pic_agent: null,
              nameFile: '',
            }
            this.itemAgent.push(temp)
            this.itemAgentTemp.push(temp)
          }
        } else {
          this.itemAgent = newValue
          this.itemAgentTemp = newValue
        }
        this.sendDataToParent()
        this.overlay = false
      },
      deep: true,
    },
  },
  async mounted() {
    await this.apiGetProvince('house')
    await this.apiGetProvince('EN')
    await this.provinceFilterUpdate(
      this.itemCompanyTemp.company_province_th,
      'house'
    )
    await this.districtFilterUpdate(
      this.itemCompanyTemp.company_district_th,
      'house'
    )
    await this.subDistrictFilterUpdate(
      this.itemCompanyTemp.company_sub_district_th,
      'house'
    )
    await this.provinceFilterUpdate(
      this.itemCompanyTemp.company_province_eng,
      'EN'
    )
    await this.districtFilterUpdate(
      this.itemCompanyTemp.company_district_eng,
      'EN'
    )
    await this.subDistrictFilterUpdate(
      this.itemCompanyTemp.company_sub_district_eng,
      'EN'
    )
  },
  methods: {
    previewImage(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imagePreview = e.target.result
      }
      reader.readAsDataURL(file)
      // console.log('imagePreview :', this.imagePreview)
    },

    async provinceFilter(provinceName, type) {
      if (type === 'house') {
        this.itemCompanyTemp.company_zip_code = ''
        this.itemCompanyTemp.company_district_th = ''
        this.itemCompanyTemp.company_sub_district_th = ''
      } else if (type === 'EN') {
        this.subDistrictEN.zip_code = ''
        this.itemCompanyTemp.company_district_eng = ''
        this.itemCompanyTemp.company_sub_district_eng = ''
      }
      let obj = {}
      if (provinceName && type === 'house') {
        obj = this.itemProvinces.find((v) => v.name_th === provinceName)
        this.province = {
          id: obj.id || '',
          name_th: obj.name_th || '',
        }
        await this.apiGetDistrict(this.province.id, type)
      } else if (provinceName && type === 'EN') {
        obj = this.itemsProvincesEN.find((v) => v.name_en === provinceName)
        this.provinceEN = {
          id: obj.id || '',
          name_en: obj.name_eng || '',
        }
        await this.apiGetDistrict(this.provinceEN.id, type)
      }
    },
    async districtFilter(districtName, type) {
      if (type === 'house') {
        this.itemCompanyTemp.company_zip_code = ''
        this.itemCompanyTemp.company_sub_district_th = ''
      } else if (type === 'EN') {
        this.subDistrictEN.zip_code = ''
        this.itemCompanyTemp.company_sub_district_eng = ''
      }
      let obj = {}
      if (districtName && type === 'house') {
        obj = this.itemDistrict.find((v) => v.name_th === districtName)
        this.district = {
          code: obj.code || '',
          name_th: obj.name_th || '',
        }
        await this.apiGetSubDistrict(this.district.code, type)
      } else if (districtName && type === 'EN') {
        obj = this.itemsDistrictsEN.find((v) => v.name_en === districtName)
        this.districtEN = {
          code: obj.code || '',
          name_en: obj.name_en || '',
        }
        await this.apiGetSubDistrict(this.districtEN.code, type)
      }
    },
    subDistrictFilter(subDistrictName, type) {
      let obj = {}
      if (subDistrictName && type === 'house') {
        obj = this.itemSubDistrict.find((v) => v.name_th === subDistrictName)
        this.subDistrict = {
          zip_code: obj.zip_code || '',
          name_th: obj.name_th || '',
          name_en: obj.name_en || '',
        }
      } else if (subDistrictName && type === 'EN') {
        obj = this.itemSubDistrictsEN.find((v) => v.name_en === subDistrictName)
        this.subDistrictEN = {
          zip_code: obj.zip_code || '',
          name_th: obj.name_th || '',
          name_en: obj.name_en || '',
        }
      }
      if (type === 'house') {
        this.itemCompanyTemp.company_zip_code = this.subDistrict.zip_code
      }
    },
    // ดึงข้อมูลจังหวัด
    async apiGetProvince(type) {
      const res = await this.$axios
        .get(`/api/location/getProvince`)
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200 && type === 'house') {
        this.itemProvinces = res.data.results
      } else if (res.status === 200 && type === 'EN') {
        this.itemsProvincesEN = res.data.results
      }
    },
    // ดึงข้อมูลเขต
    async apiGetDistrict(provinceId, type) {
      const res = await this.$axios
        .get(`/api/location/getDistrict?province_code=${provinceId}`)
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200 && type === 'house') {
        this.itemDistrict = res.data.results
      } else if (res.status === 200 && type === 'EN') {
        this.itemsDistrictsEN = res.data.results
      }
    },
    // ดึงข้อมูลแขวง
    async apiGetSubDistrict(districtId, type) {
      const res = await this.$axios
        .get(`/api/location/getSubDistrict?district_code=${districtId}`)
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200 && type === 'house') {
        this.itemSubDistrict = res.data.results
      } else if (res.status === 200 && type === 'EN') {
        this.itemSubDistrictsEN = res.data.results
      }
    },
    async provinceFilterUpdate(provinceName, type) {
      let obj = {}
      if (provinceName && type === 'house') {
        obj = this.itemProvinces.find((v) => v.name_th === provinceName)
        this.province = {
          id: obj.id || '',
          name_th: obj.name_th || '',
        }
        await this.apiGetDistrict(this.province.id, type)
      } else if (provinceName && type === 'EN') {
        obj = this.itemsProvincesEN.find((v) => v.name_en === provinceName)
        this.provinceEN = {
          id: obj.id || '',
          name_en: obj.name_en || '',
        }
        await this.apiGetDistrict(this.provinceEN.id, type)
      }
    },
    async districtFilterUpdate(districtName, type) {
      let obj = {}
      if (districtName && type === 'house') {
        obj = this.itemDistrict.find((v) => v.name_th === districtName)
        this.district = {
          code: obj.code || '',
          name_th: obj.name_th || '',
        }
        await this.apiGetSubDistrict(this.district.code, type)
      }
      if (districtName && type === 'EN') {
        obj = this.itemsDistrictsEN.find((v) => v.name_en === districtName)
        this.districtEN = {
          code: obj.code || '',
          name_en: obj.name_en || '',
        }
        await this.apiGetSubDistrict(this.districtEN.code, type)
      }
    },
    subDistrictFilterUpdate(subDistrictName, type) {
      let obj = {}
      if (subDistrictName && type === 'house') {
        obj = this.itemSubDistrict.find((v) => v.name_th === subDistrictName)
        this.subDistrict = {
          zip_code: obj.zip_code || '',
          name_th: obj.name_th || '',
        }
      }
      if (subDistrictName && type === 'EN') {
        obj = this.itemSubDistrictsEN.find((v) => v.name_en === subDistrictName)
        this.subDistrictEN = {
          zip_code: obj.zip_code || '',
          name_en: obj.name_en || '',
        }
      }
      this.zipCode = this.subDistrict.zip_code
      this.zipCodeEN = this.subDistrictEN.zip_code
    },
    triggerFileLogoInput() {
      document.getElementById('company_logo').click()
    },
    triggerFileInput(index) {
      if (index === 0) {
        document.getElementById('agent1').click()
      } else {
        document.getElementById('agent2').click()
      }
      // this.$refs.fileInput.$el.querySelector('input').click()
    },
    deleteFileUpload(index) {
      if (index === 0) {
        this.showFileAgent1 = null
      } else {
        this.showFileAgent2 = null
      }
      this.itemAgentTemp[index].pic_agent = null
    },
    deleteFileLogo() {
      this.itemCompanyTemp.company_logo = null
    },
    sendDataToParent() {
      const dataToSend = {
        updatedCompany: this.itemCompanyTemp,
        updatedAgent: this.itemAgentTemp,
      }
      // Emit the data to the parent
      this.$emit('data-from-child', dataToSend)
    },
    handleFileAgent_1_Upload(event) {
      const file = event
      if (file.size > 2097152) {
        this.$swal({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: `ขนาดไฟล์เกิน 2 MB`,
          confirmButtonText: 'ปิด',
          confirmButtonColor: 'rgba(0, 90, 170, 1)',
        })
      } else {
        this.itemAgentTemp[0].pic_agent = file
        if (
          this.itemAgentTemp[0].pic_agent &&
          this.itemAgentTemp[0].pic_agent.type.startsWith('image/')
        ) {
          // Create a URL for the uploaded image and assign it to imageUrl
          this.showFileAgent1 = URL.createObjectURL(
            this.itemAgentTemp[0].pic_agent
          )
        }
      }
    },
    handleFileAgent_2_Upload(event) {
      const file = event
      if (file.size > 2097152) {
        this.$swal({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: `ขนาดไฟล์เกิน 2 MB`,
          confirmButtonText: 'ปิด',
          confirmButtonColor: 'rgba(0, 90, 170, 1)',
        })
      } else {
        this.itemAgentTemp[1].pic_agent = file
        if (
          this.itemAgentTemp[1].pic_agent &&
          this.itemAgentTemp[1].pic_agent.type.startsWith('image/')
        ) {
          // Create a URL for the uploaded image and assign it to imageUrl
          this.showFileAgent2 = URL.createObjectURL(
            this.itemAgentTemp[1].pic_agent
          )
        }
      }
    },
    handleFileLogoChange(event) {
      const file = event
      if (file.size > 2097152) {
        this.$swal({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: `ขนาดไฟล์เกิน 2 MB`,
          confirmButtonText: 'ปิด',
          confirmButtonColor: 'rgba(0, 90, 170, 1)',
        })
      } else {
        this.itemCompanyTemp.company_logo = file
        if (
          this.itemCompanyTemp.company_logo &&
          this.itemCompanyTemp.company_logo.type.startsWith('image/')
        ) {
          // Create a URL for the uploaded image and assign it to imageUrl
          this.showFileLogo = URL.createObjectURL(
            this.itemCompanyTemp.company_logo
          )
        }
      }
    },
    isFile(value) {
      return value instanceof File || value instanceof Blob
    },
  },
}
</script>
<style scoped>
@media (max-width: 375px) {}

@media (min-width: 376px) and (max-width: 430px) {}

@media (min-width: 431px) {}

.position__btn {
  position: relative;
  left: 80px;
  bottom: 110px;
}

.v-expansion-panel::before {
  box-shadow: none;
}

.row.no-gutters>.col,
.row.no-gutters>[class*='col-'] {
  padding: 12px;
}

/* .v-text-field--outlined >>> fieldset {
    border-color: #989898;
  } */
.img__border {
  border: 2px solid #c8ebc2;
  border-radius: 30px;
}

.img__border__edit {
  border-radius: 8px;
  /* border: 1px solid; */
  /* border-width: 10px; */
}

.img__border__edit__dashed {
  border-radius: 6px;
  border: 1px dashed #e6e6e6;
  max-height: 105px;
}

.icon__btn {
  background-color: white;
  box-shadow: 0px 2px 4px -4px rgba(0, 0, 0, 0.2),
    0px 0px 1px 0px rgba(0, 0, 0, 0.3);
}
</style>
<style>
.gray__background {
  background-color: #fafafa;
}

.darkgray__background {
  background-color: #f3f5f7;
}

.weight__500 {
  font-weight: bold;
  font-size: 16px;
}

.black__color {
  color: #333333;
}

.expansion-panel__container {
  background-color: rgba(255, 0, 0, 1) !important;
}
</style>
