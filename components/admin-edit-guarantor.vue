<template>
  <div>
    <v-expansion-panels v-model="panel" v-if="!overlay" multiple>
      <v-expansion-panel v-if="!isEdit" class="px-6">
        <v-expansion-panel-header class="pa-0 panel__header">
          <h4>ข้อมูลบุคคลรับรอง</h4>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="v-expan-panel-warp-gu">
          <v-divider></v-divider>
          <template v-if="item.length === 0">
            <!-- <p style="margin-top: 16px;">ไม่มีข้อมูลผลิตภัณฑ์</p> -->
            <div style="margin-top: 10px;">
              <v-row>
                <v-col cols="12" align="center">
                  <v-img
                    contain
                    width="120"
                    :src="require('@/assets/img/user/operational-system.png')"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row class="center">
                <v-col cols="2" style="text-align: center"> </v-col>
                <v-col cols="8" style="text-align: center">
                  <span
                    style="
                      font-size: 15px;
                      font-weight: 600;
                      text-align: center;
                    "
                    >กำลังพัฒนาระบบ</span
                  >
                </v-col>
              </v-row>
            </div>
          </template>
          <template v-else>
            <div v-for="(v, i) in item" :key="i">
              <v-divider class="mb-4"></v-divider>

              <v-row no-gutters>
                <span class="text_bold mb-6">รายชื่อบุคคลที่ {{ i + 1 }}</span>
              </v-row>
              <v-row no-gutters>
                <v-col cols="4"
                  ><span class="gray__color">ชื่อ-นามสกุล (ภาษาไทย) : </span
                  >{{ v.certifier_name }}</v-col
                >
                <v-col cols="4"
                  ><span class="gray__color">ชื่อบริษัท : </span
                  >{{ v.certifier_company_name }}</v-col
                >
                <v-col cols="4"
                  ><span class="gray__color">เบอร์โทรศัพท์ : </span
                  >{{ v.certifier_telephone }}</v-col
                >
                <v-col cols="4" class="mt-6"
                  ><span class="gray__color">เบอร์โทรสาร : </span
                  >{{ v.certifier_fax }}</v-col
                >
                <v-col cols="8" class="mt-6 mb-6"
                  ><span class="gray__color">ที่อยู่ : </span
                  >{{ v.certifier_full_address }}</v-col
                >
              </v-row>
            </div>
          </template>
          
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel v-else class="px-6">
        <v-expansion-panel-header class="pa-0 panel__header">
          <v-row no-gutters align="center">
            <h4>ข้อมูลบุคคลรับรอง (สูงสุด3 ท่าน)</h4>
            <v-spacer></v-spacer>
            <!-- <v-btn
              v-if="itemTemp.length < 3"
              text
              color="#78CD6B"
              rounded
              @click="addGuarantor"
              ><v-icon>mdi-plus-circle-outline</v-icon>เพิ่มรายชื่อบุคคล</v-btn
            > -->
          </v-row>
        </v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content>
          <v-form
            v-if="itemTemp.length > 0"
            ref="form"
            v-model="valid"
            class="mt-4"
          >
            <div v-for="(item, index) in itemTemp" :key="index">
              <v-divider></v-divider>
              <v-row no-gutters align="center" class="mt-6"
                ><span class="weight__500"
                  >รายชื่อบุคคลที่ {{ index + 1 }}</span
                >
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="deleteItem(index)"
                  ><v-icon>mdi-trash-can</v-icon
                  ><span class="text__underline">ลบ</span></v-btn
                >
              </v-row>

              <v-row no-gutters>
                <v-col cols="4"
                  ><span class="gray__color">ชื่อ-นามสกุล (ภาษาไทย)</span
                  ><span class="red__color"> *</span>
                  <v-text-field
                    v-model="item.certifier_name"
                    background-color="white"
                    height="40"
                    dense
                    outlined
                    :rules="[rules.thaiOnly, rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="px-6"
                  ><span class="gray__color">ชื่อบริษัท</span>
                  <v-text-field
                    v-model="item.certifier_company_name"
                    background-color="white"
                    height="40"
                    dense
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="4"
                  ><span class="gray__color">เบอร์โทรศัพท์</span
                  ><span class="red__color"> *</span>
                  <v-text-field
                    v-model="item.certifier_telephone"
                    v-mask="'###-#######'"
                    background-color="white"
                    height="40"
                    dense
                    outlined
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="4"
                  ><span class="gray__color">เบอร์โทรสาร</span>
                  <v-text-field
                    v-model="item.certifier_fax"
                    v-mask="'###-###-####'"
                    background-color="white"
                    height="40"
                    dense
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="4" class="px-6"
                  ><span class="gray__color">ที่อยู่บริษัท</span>
                  <v-textarea
                    v-model="item.certifier_address"
                    background-color="white"
                    dense
                    outlined
                  ></v-textarea>
                </v-col>
                <v-col cols="4"
                  ><span class="gray__color">จังหวัด (ภาษาไทย)</span>
                  <v-select
                    v-model="item.certifier_province_th"
                    :items="provinceAll"
                    item-text="name_th"
                    background-color="white"
                    height="40"
                    append-icon="mdi-chevron-down"
                    dense
                    outlined
                    @change="selectProvince(index, item.certifier_province_th)"
                  ></v-select>
                </v-col>
                <v-col cols="4"
                  ><span class="gray__color">แขวง/ตำบล (ภาษาไทย)</span>
                  <v-select
                    v-model="item.certifier_district_th"
                    :items="districtAll"
                    background-color="white"
                    item-text="name_th"
                    height="40"
                    append-icon="mdi-chevron-down"
                    dense
                    outlined
                    @change="selectDistrict(index, item.certifier_district_th)"
                  ></v-select>
                </v-col>
                <v-col cols="4" class="px-6"
                  ><span class="gray__color">เขต/อำเภอ (ภาษาไทย)</span>
                  <v-select
                    v-model="item.certifier_sub_district_th"
                    :items="subDistrictAll"
                    item-text="name_th"
                    background-color="white"
                    height="40"
                    append-icon="mdi-chevron-down"
                    dense
                    outlined
                    @change="
                      selectSubDistrict(index, item.certifier_sub_district_th)
                    "
                  ></v-select>
                </v-col>
                <v-col cols="4"
                  ><span class="gray__color">รหัสไปรษณีย์</span>
                  <v-text-field
                    v-model="item.certifier_zip_code"
                    height="40"
                    outlined
                    dense
                    disabled
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- {{ subDistrict }}
                      {{ district }} -->
            </div>
          </v-form>
          <div v-else>
            <!-- <p class="mt-4">ไม่พบข้อมูลผู้รับรอง</p> -->
            <div style="margin-top: 10px;">
              <v-row>
                <v-col cols="12" align="center">
                  <v-img
                    contain
                    width="120"
                    :src="require('@/assets/img/user/operational-system.png')"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row class="center">
                <v-col cols="2" style="text-align: center"> </v-col>
                <v-col cols="8" style="text-align: center">
                  <span
                    style="
                      font-size: 15px;
                      font-weight: 600;
                      text-align: center;
                    "
                    >กำลังพัฒนาระบบ</span
                  >
                </v-col>
              </v-row>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-overlay :value="overlay" opacity="0.15">
      <v-progress-circular
        color="green"
        indeterminate
        size="40"
        class="circle"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>
   <script>
export default {
  props: {
    isEdit: { type: Boolean, default: null },
    certifier: { type: Array, default: null },
    itemProvince: { type: Array, default: null },
  },

  data() {
    return {
      valid: false,

      overlay: true,

      provinceAll: [],
      districtAll: [],
      subDistrictAll: [],
      zipCode: null,

      province: {},
      district: {},
      subDistrict: {},

      panel: [0, 1],
      item: [
        {
          fullname: 'มลิวัลย์ สวนหนองแวง',
          office: 'MALI GRADENT Co. ltd',
          number: '087-2554033',
          fax: '0-2211-1044',
          address: '123/2 ถนนเพชรบุรีตัดใหม่',
          province: 'กรุงเทพมหานคร',
          district: 'บางกะปิ',
          subDistrict: 'ห้วยขวาง',
          code: '10310',
        },
        {
          fullname: 'ปวร กีรติภารดร',
          office: 'PK Co. ltd',
          number: '094-2130096',
          fax: '0-222-0998',
          address: '196 ถนนเทศา',
          province: 'นครปฐม',
          district: 'เมืองนครปฐม',
          subDistrict: 'พระปฐมเจดีย์',
          code: '73000',
        },
      ],

      // ----- Rules -----
      rules: {
        pass: (value) =>
          value.length >= 5 || 'กรุณากรอกรหัสผ่านอย่างน้อย 5 ตัว',
        required: (value) => !!value || 'กรุณากรอกข้อมูล.',
        select: (value) => !!value || 'กรุณาเลือกข้อมูล',
        thaiOnly: (value) =>
          /^([ก-๙\s])+$/i.test(value) || 'กรุณากรอกเป็นภาษาไทยเท่านั้น',
        engOnly: (value) =>
          /^([A-Za-z])+$/.test(value) || 'กรุณากรอกเป็นภาษาอังกฤษเท่านั้น',
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
      itemTemp: [],
    }
  },

  computed: {},
  watch: {
    async certifier(val) {
      if (val) {
        this.item = val
        this.itemTemp = JSON.parse(JSON.stringify(val))
        await this.apiGetProvince()
        await this.provinceFilter(val[0]?.certifier_province_th || '')
        await this.districtFilter(val[0]?.certifier_district_th || '')
        await this.subDistrictFilter(
          val[0]?.certifier_sub_district_th || '',
          this.certifier.certifier_zip_code || ''
        )
        this.overlay = false
      }
    },

    isEdit(val) {
      this.itemTemp = JSON.parse(JSON.stringify(this.certifier))
    },

    valid(val) {
      this.$emit('valid-office', val)
    },
  },
  created() {
    this.itemTemp = this.item
  },

  methods: {
    provinceFilter(provinceName) {
      let obj = {}
      if (provinceName) {
        obj = this.provinceAll.find((v) => v.name_th === provinceName)
      }
      this.province = {
        id: obj.id || '',
        name_th: obj.name_th || '',
        name_en: obj.name_en || '',
      }
    },
    async districtFilter(districtName) {
      let obj = {}
      if (districtName) {
        await this.apiGetDistrict(this.province.id)
        obj = this.districtAll.find((v) => v.name_th === districtName)
      }
      this.district = {
        code: obj.code || '',
        name_th: obj.name_th || '',
        name_en: obj.name_en || '',
      }
    },
    async subDistrictFilter(subDistrictName, zipCode) {
      let obj = {}
      if (subDistrictName) {
        await this.apiGetSubDistrict(this.district.code)
        obj = this.subDistrictAll.find((v) => v.name_th === subDistrictName)
      }
      this.subDistrict = {
        zip_code: obj.zip_code || '',
        name_th: obj.name_th || '',
        name_en: obj.name_en || '',
      }
      this.zipCode = this.subDistrict.zip_code
    },
    // api จังหวัด
    async apiGetProvince() {
      const res = await this.$axios
        .get(`/api/location/getProvince`)
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200) {
        this.provinceAll = res.data.results
      }
    },
    // api แขวง
    async apiGetDistrict(provinceId) {
      const res = await this.$axios
        .get(`/api/location/getDistrict?province_code=${provinceId}`)
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200) {
        this.districtAll = res.data.results
      }
    },
    async apiGetSubDistrict(districtId) {
      if (districtId) {
        const res = await this.$axios
          .get(`/api/location/getSubDistrict?district_code=${districtId}`)
          .then((response) => {
            return response
          })
          .catch((err) => {
            return err.response
          })
        if (res.status === 200) {
          this.subDistrictAll = res.data.results
        }
      } else {
        this.subDistrictAll = []
      }
    },
    // เพิ่มข้อมูลใหม่
    addGuarantor() {
      this.panel = 1
      this.itemTemp.push({
        certifier_address: '',
        certifier_company_name: '',
        certifier_district_th: '',
        certifier_fax: '',
        certifier_full_address: '',
        certifier_index: '',
        certifier_name: '',
        certifier_province_th: '',
        certifier_sub_district_th: '',
        certifier_telephone: '',
        certifier_zip_code: '',
        member_no: this.member_no,
      })
    },
    deleteItem(index) {
      this.itemTemp.splice(index, 1)
    },
    async selectProvince(index, val) {
      this.provinceFilter(val)
      await this.apiGetDistrict(this.province.id)
      await this.apiGetSubDistrict()
      if (val) {
        this.itemTemp[index].certifier_province_th = val
        this.itemTemp[index].certifier_district_th = ''
        this.itemTemp[index].certifier_sub_district_th = ''
        this.itemTemp[index].certifier_zip_code = ''
      }
    },
    async selectDistrict(index, val) {
      let obj = {}
      obj = this.districtAll.find((v) => v.name_th === val)
      this.district = {
        code: obj.code || '',
        name_th: obj.name_th || '',
        name_en: obj.name_en || '',
      }
      await this.apiGetSubDistrict(this.district.code)
    },
    selectSubDistrict(index, val) {
      let obj = {}
      obj = this.subDistrictAll.find((v) => v.name_th === val)
      this.subDistrict = {
        zip_code: obj.zip_code || '',
        name_th: obj.name_th || '',
        name_en: obj.name_en || '',
      }
      this.itemTemp[index].certifier_zip_code = this.subDistrict.zip_code
    },
  },
}
</script>
   <style scoped>
.v-expansion-panel::before {
  box-shadow: none;
}
.text_bold {
  font-weight: 500;
}
.text__underline {
  text-decoration: underline;
  font-weight: bold;
}
</style>
<style>
.v-expan-panel-warp-gu .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>