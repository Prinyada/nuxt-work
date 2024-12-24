<template>
  <div>
    <Loading :overlay="overlay" />
    <v-container v-if="!overlay" class="container">
      <div class="content">
        <v-img class="background-info" :src="require('~/assets/img/user/news-bg.svg')" />
        <v-row class="content-header">
          <v-col cols="2">
            <v-icon style="
                  font-size: 32px !important;
                  background-color: #fff;
                  border-radius: 100%;
                " color="rgba(120, 205, 107, 1)" @click="$router.back()">
              mdi-chevron-left
            </v-icon>
          </v-col>
          <v-col cols="10" class="display-text-header">
            <span style="color: #ffffff">ข้อมูลสมาชิก</span>
          </v-col>
          <v-col class="display-subtext-header">
            <span style="color: #ffffff">อัปเดตข้อมูลเพื่อเข้าใช้งานระบบสมาคมธุรกิจเวชภัณฑ์สัตว์</span>
          </v-col>
        </v-row>
      </div>
      <div class="headers-stepper">
        <v-row>
          <v-stepper v-if="!overlay" v-model="e1" alt-labels elevation="0" outlined non-linear
            color="rgba(120, 205, 107, 1)">
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
                <v-form ref="form">
                  <v-row align="center">
                    <v-col cols="12" class="text-title-edit">ข้อมูลบริษัท</v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">ชื่อบริษัท(ภาษาไทย) <span
                        class="sub-color">*</span></v-col>
                    <v-col cols="12" class="py-0"><v-text-field v-model="companyDetails.company_name_th"
                        :rules="[rules.thaiCompany]" height="40" dense outlined required></v-text-field></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">Company name <span
                        class="sub-color">*</span></v-col>
                    <v-col cols="12" class="py-0"><v-text-field v-model="companyDetails.company_name_eng"
                        :rules="[rules.engCompany]" height="40" dense outlined required></v-text-field></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">เบอร์โทรศัพท์ <span
                        class="sub-color">*</span></v-col>
                    <v-col cols="12" class="py-0"><v-text-field v-model="companyDetails.company_telephone"
                        :rules="[rules.required]" height="40" dense outlined required></v-text-field></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">เบอร์โทรสาร</v-col>
                    <v-col cols="12" class="py-0"><v-text-field v-model="companyDetails.company_fax"
                        :rules="[rules.required]" height="40" dense outlined></v-text-field></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">อีเมล</v-col>
                    <v-col cols="12" class="py-0"><v-text-field v-model="companyDetails.company_email" height="40"
                        :rules="[rules.emailCompany]" dense outlined></v-text-field></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">โลโก้บริษัท</v-col>
                    <v-col v-if="companyDetails.company_logo === null" class="pt-0" cols="12"><v-btn
                        color="rgba(120, 205, 107, 1)" width="100%" outlined rounded
                        @click="uploadFiles()"><v-icon>mdi-plus</v-icon>อัพโหลดรูป</v-btn></v-col>
                    <v-col v-else class="pt-0" cols="12">
                      <!-- อัปไฟล์ใหม่ -->
                      <div v-if="showFileLogo !== null" class="box-upload">
                        <div class="items">
                          <v-img width="32" height="80%" :src="require('@/assets/img/user/png.svg')" />
                          <div>
                            <div class="text-logo">{{ showFileLogo.name }}</div>
                            <div class="text-size-png">
                              {{ (showFileLogo.size / 1024).toFixed(2) }} KB / 600 KB
                            </div>
                          </div>
                        </div>
                        <div class="color-trash" @click="companyDetails.company_logo = null">
                          <v-img width="32" :src="require('@/assets/img/user/trash.svg')" />
                        </div>
                      </div>
                      <!-- แสดงของเดิมที่มีอยู่ -->
                      <div v-else class="box-upload">
                        <div class="items">
                          <v-img width="32" height="80%" :src="require('@/assets/img/user/png.svg')" />
                          <div>
                            <div class="text-logo">{{ companyDetails.nameFile }}</div>
                            <!-- <div class="text-size-png">
                              {{ (showFileLogo.size / 1024).toFixed(2) }} KB / 600 KB
                            </div> -->
                          </div>
                        </div>
                        <div class="color-trash" @click="companyDetails.company_logo = null">
                          <v-img width="32" :src="require('@/assets/img/user/trash.svg')" />
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" class="text-title-edit">ที่อยู่บริษัท</v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">ที่อยู่ (ภาษาไทย)</v-col>
                    <v-col cols="12" class="pt-0">
                      <v-textarea v-model="companyDetails.company_address_th" height="80" outlined
                        hide-details></v-textarea>
                    </v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">จังหวัด (ภาษาไทย)</v-col>
                    <v-col cols="12" class="pt-0"><v-select id="province" v-model="companyDetails.company_province_th"
                        :items="itemsProvincesHouse" item-text="name_th" dense outlined hide-details
                        @change="provinceFilter(companyDetails.company_province_th, 'house')"></v-select></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">เขต/อำเภอ (ภาษาไทย)</v-col>
                    <v-col cols="12" class="pt-0"><v-select v-model="companyDetails.company_district_th"
                        :items="itemsDistrictsHouse" item-text="name_th" height="40" dense outlined hide-details
                        @change="districtFilter(companyDetails.company_district_th, 'house')"></v-select></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">แขวง/ตำบล (ภาษาไทย)</v-col>
                    <v-col cols="12" class="pt-0"><v-select v-model="companyDetails.company_sub_district_th"
                        :items="itemsSubDistrictsHouse" item-text="name_th" height="40" dense outlined hide-details
                        @change="subDistrictFilter(companyDetails.company_sub_district_th, 'house')"></v-select></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">รหัสไปรษณีย์</v-col>
                    <v-col cols="12" class="pt-0"><v-text-field v-model="zipCode" height="40" disabled dense outlined
                        hide-details></v-text-field></v-col>
                    <!-- address eng -->
                    <v-col cols="12" class="text-title-edit">Office Address</v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">Address</v-col>
                    <v-col cols="12" class="pt-0">
                      <v-textarea v-model="companyDetails.company_address_eng" height="80" outlined
                        hide-details></v-textarea>
                    </v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">Province</v-col>
                    <v-col cols="12" class="pt-0"><v-select v-model="companyDetails.company_province_eng"
                        :items="itemsProvincesEN" item-text="name_en" height="40" dense outlined hide-details
                        @change="apiGetDistrict(provinceEN.id, 'EN')"></v-select></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">District / Area</v-col>
                    <v-col cols="12" class="pt-0"><v-select v-model="companyDetails.company_district_eng"
                        :items="itemsDistrictsEN" item-text="name_en" height="40" dense outlined hide-details
                        @change="apiGetSubDistrict(districtEN.code, 'EN')"></v-select></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">Sub-district/ Sub-area</v-col>
                    <v-col cols="12" class="pt-0"><v-select v-model="companyDetails.company_sub_district_eng"
                        :items="itemsSubDistrictsEN" item-text="name_en" height="40" dense outlined hide-details
                        @change="zipCode = subDistrictEN.zip_code"></v-select></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">Postal Code</v-col>
                    <v-col cols="12" class="pt-0"><v-text-field v-model="zipCode" height="40" disabled dense outlined
                        hide-details></v-text-field></v-col>
                    <!-- agent details -->

                    <v-col cols="12" class="text-title-edit">ข้อมูลผู้แทนในนามบริษัท</v-col>
                    <!-- agent1 -->
                    <v-col cols="12" class="text-section-agent">ผู้แทนที่ 1</v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">คำนำหน้า <span class="sub-color">*</span></v-col>
                    <v-col cols="12" class="py-0"><v-select v-model="agentDetail1.title_th" :items="prefixAll"
                        item-text="title_th" item-value="title_th" height="40" dense outlined
                        placeholder="กรุณาเลือกคำนำหน้า" :rules="[rules.select]" required></v-select></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">ชื่อ - นามสกุล (ภาษาไทย) <span
                        class="sub-color">*</span></v-col>
                    <v-col cols="12" class="py-0"><v-text-field v-model="agentDetail1.name_th" height="40" dense
                        outlined placeholder="กรุณาระบุชื่อ - นามสกุล" :rules="[rules.thaiOnly]"
                        required></v-text-field></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">Name Title <span class="sub-color">*</span></v-col>
                    <v-col cols="12" class="py-0"><v-select v-model="agentDetail1.title_eng" :items="prefixAll"
                        item-text="title_eng" item-value="title_eng" height="40" dense outlined
                        placeholder="กรุณาเลือกคำนำหน้า (ภาษาอังกฤษ)" :rules="[rules.required]"
                        required></v-select></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">First name - Last name <span
                        class="sub-color">*</span></v-col>
                    <v-col cols="12" class="py-0"><v-text-field v-model="agentDetail1.name_eng" height="40" dense
                        outlined placeholder="กรุณาระบุชื่อ - นามสกุล (ภาษาอังกฤษ)" :rules="[rules.engOnly]"
                        required></v-text-field></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">อีเมล <span class="sub-color">*</span></v-col>
                    <v-col cols="12" class="py-0"><v-text-field v-model="agentDetail1.email" height="40" dense outlined
                        placeholder="กรุณาระบุอีเมล" :rules="[rules.emailRules]" required></v-text-field></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">รูปผู้แทน</v-col>
                    <v-col v-if="agentDetail1.pic_agent === null" class="pt-0" cols="12"><v-btn
                        color="rgba(120, 205, 107, 1)" width="100%" outlined rounded
                        @click="uploadFilesAgent1()"><v-icon>mdi-plus</v-icon>อัพโหลดรูป</v-btn></v-col>
                    <v-col v-else cols="12" class="pt-0">
                      <div v-if="showFileAgent1 !== null" class="box-upload">
                        <div class="items">
                          <v-img width="32" height="80%" :src="require('@/assets/img/user/png.svg')" />
                          <div>
                            <div class="text-logo">{{ showFileAgent1.name }}</div>
                            <div class="text-size-png">
                              {{ (showFileAgent1.size / 1024).toFixed(2) }} KB / 600 KB
                            </div>
                          </div>
                        </div>
                        <div class="color-trash">
                          <v-img width="32" :src="require('@/assets/img/user/trash.svg')"
                            @click="agentDetail1.pic_agent = null" />
                        </div>
                      </div>
                      <!-- แสดงของเดิมที่มีอยู่ -->
                      <div v-else class="box-upload">
                        <div class="items">
                          <v-img width="32" height="80%" :src="require('@/assets/img/user/png.svg')" />
                          <div>
                            <div class="text-logo">{{ agentDetail1.nameFile }}</div>
                            <!-- <div class="text-size-png">
                              {{ (showFileLogo.size / 1024).toFixed(2) }} KB / 600 KB
                            </div> -->
                          </div>
                        </div>
                        <div class="color-trash" @click="agentDetail1.pic_agent = null">
                          <v-img width="32" :src="require('@/assets/img/user/trash.svg')" />
                        </div>
                      </div>
                    </v-col>
                    <!-- agent2 -->
                    <v-col cols="12" class="text-section-agent">ผู้แทนที่ 2</v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">คำนำหน้า <span class="sub-color">*</span></v-col>
                    <v-col cols="12" class="py-0"><v-select v-model="agentDetail2.title_th" :items="prefixAll"
                        item-text="title_th" item-value="title_th" height="40" dense outlined
                        placeholder="กรุณาเลือกคำนำหน้า" :rules="[rules.select]" required></v-select></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">ชื่อ - นามสกุล (ภาษาไทย) <span
                        class="sub-color">*</span></v-col>
                    <v-col cols="12" class="py-0"><v-text-field v-model="agentDetail2.name_th" height="40" dense
                        outlined placeholder="กรุณาระบุชื่อ - นามสกุล" :rules="[rules.thaiOnly]"
                        required></v-text-field></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">Name Title <span class="sub-color">*</span></v-col>
                    <v-col cols="12" class="py-0"><v-select v-model="agentDetail2.title_eng" :items="prefixAll"
                        item-text="title_eng" item-value="title_eng" height="40" dense outlined
                        placeholder="กรุณาเลือกคำนำหน้า (ภาษาอังกฤษ)" :rules="[rules.select]"
                        required></v-select></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">First name - Last name <span
                        class="sub-color">*</span></v-col>
                    <v-col cols="12" class="py-0"><v-text-field v-model="agentDetail2.name_eng" height="40" dense
                        outlined placeholder="กรุณาระบุชื่อ - นามสกุล (ภาษาอังกฤษ)" :rules="[rules.engOnly]"
                        required></v-text-field></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">อีเมล <span class="sub-color">*</span></v-col>
                    <v-col cols="12" class="py-0"><v-text-field v-model="agentDetail2.email" height="40" dense outlined
                        placeholder="กรุณาระบุอีเมล" :rules="[rules.emailRules]" required></v-text-field></v-col>
                    <v-col cols="12" class="text-section pt-0 py-1">รูปผู้แทน</v-col>
                    <v-col v-if="agentDetail2.pic_agent === null" class="pt-0" cols="12"><v-btn
                        color="rgba(120, 205, 107, 1)" width="100%" outlined rounded
                        @click="uploadFilesAgent2()"><v-icon>mdi-plus</v-icon>อัพโหลดรูป</v-btn></v-col>
                    <v-col v-else cols="12" class="pt-0">
                      <div v-if="showFileAgent2 !== null" class="box-upload">
                        <div class="items">
                          <v-img width="32" height="80%" :src="require('@/assets/img/user/png.svg')" />
                          <div>
                            <div class="text-logo">{{ showFileAgent2.name }}</div>
                            <div class="text-size-png">
                              {{ (showFileAgent2.size / 1024).toFixed(2) }} KB / 600 KB
                            </div>
                          </div>
                        </div>
                        <div class="color-trash">
                          <v-img width="32" :src="require('@/assets/img/user/trash.svg')"
                            @click="agentDetail2.pic_agent = null" />
                        </div>
                      </div>
                      <!-- แสดงของเดิมที่มีอยู่ -->
                      <div v-else class="box-upload">
                        <div class="items">
                          <v-img width="32" height="80%" :src="require('@/assets/img/user/png.svg')" />
                          <div>
                            <div class="text-logo">{{  agentDetail2.nameFile }}</div>
                            <!-- <div class="text-size-png">
                              {{ (showFileLogo.size / 1024).toFixed(2) }} KB / 600 KB
                            </div> -->
                          </div>
                        </div>
                        <div class="color-trash" @click="agentDetail2.pic_agent = null">
                          <v-img width="32" :src="require('@/assets/img/user/trash.svg')" />
                        </div>
                      </div>
                    </v-col>
                    <!-- เลือกไฟล์ที่จะอัปโหลด -->
                    <v-file-input id="company_logo" @change="handleFileLogoUpload" style="display: none"
                      accept=".png, .jpeg, .jpg" outlined dense hide-input></v-file-input>
                    <v-file-input id="agent1" @change="handleFileAgent_1_Upload" style="display: none"
                      accept=".png, .jpeg, .jpg" outlined dense hide-input></v-file-input>
                    <v-file-input id="agent2" @change="handleFileAgent_2_Upload" style="display: none"
                      accept=".png, .jpeg, .jpg" outlined dense hide-input></v-file-input>
                  </v-row>
                </v-form>
              </v-stepper-content>

              <v-stepper-content step="2" class="edit-products-content">
                <v-form ref="form2">
                  <v-row class="member-edit-container">
                    <v-col class="title-products" cols="12">
                      <span class="text-title">ข้อมูลผลิตภัณฑ์</span>
                      <div class="add-product" @click="addTypeProduct()">
                        <v-icon color="rgba(120, 205, 107, 1)">mdi-plus-circle-outline</v-icon>
                        <span class="add-title">เพิ่มประเภทผลิตภัณฑ์</span>
                      </div>
                    </v-col>
                    <v-col v-for="(productsType, typeIndex) in productsDetails" :key="typeIndex" class="product-detail">
                      <span v-if="!productsType.createNew" cols="12" class="product-detail-header">{{
      productsType.type_product_name }}</span>
                      <v-col v-if="productsType.createNew" cols="12" class="add-product-detail">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px">
                          <span>ชื่อผลิตภัณฑ์ประเภท</span>
                          <div v-if="typeIndex > 0" class="delete-product" @click="deleteMainProduct(typeIndex)">
                            <v-icon color="#757D8A">mdi-trash-can</v-icon>
                            <span class="text-trash">ลบ</span>
                          </div>
                        </div>
                        <v-text-field v-model="productsType.type_product_name" hide-details dense outlined
                          background-color="white" placeholder="ระบุประเภทผลิตภัณฑ์" />
                      </v-col>
                      <v-col v-for="(product, index) in productsType.product" :key="index" class="type-products">
                        <v-col class="title-products" cols="12">
                          <span class="text-title">รายการที่ {{ index + 1 }}</span>
                          <div v-if="index > 0" class="delete-product" @click="deleteProduct(typeIndex, index)">
                            <v-icon color="#757D8A">mdi-trash-can</v-icon>
                            <span class="text-trash">ลบ</span>
                          </div>
                        </v-col>
                        <v-col cols="12" class="pt-0">
                          <span cols="12" class="text-section">ชื่อสินค้า</span>
                          <v-text-field v-model="product.product_name" hide-details dense outlined background-color="white" placeholder="ระบุชื่อสินค้า" />
                        </v-col>
                        <v-col cols="12" class="pt-0">
                          <span cols="12" class="text-section">ผู้ผลิต/ประเทศ</span>
                          <v-text-field v-model="product.product_country" hide-details dense outlined
                            background-color="white" placeholder="ระบุผู้ผลิต/ประเทศ" />
                        </v-col>
                        <v-col cols="12" class="pt-0">
                          <span cols="12" class="text-section">เลขทะเบียนยา/อาหารสัตว์</span>
                          <v-text-field v-model="product.product_no" hide-details dense outlined background-color="white" placeholder="ระบุเลขทะเบียนยา/อาหารสัตว์" />
                        </v-col>
                      </v-col>
                      <v-col cols="12">
                        <v-btn color="rgba(120, 205, 107, 1)" outlined width="100%" rounded
                          @click="addProduct(typeIndex)">
                          <v-icon>mdi-plus</v-icon>
                          เพิ่มรายการ
                        </v-btn>
                      </v-col>
                    </v-col>
                  </v-row>
                </v-form>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-row>
        <v-row class="box-button" align="center">
          <v-btn v-if="e1 === 1" color="rgba(120, 205, 107, 1)" width="100%" height="40px" dark rounded
            @click="nextPage()">ถัดไป</v-btn>
          <v-col v-else>
            <v-btn outlined color="rgba(120, 205, 107, 1)" width="48%" height="40px" rounded
              @click="e1 = 1">ย้อนกลับ</v-btn>
            <v-btn dark color="rgba(120, 205, 107, 1)" width="48%" height="40px" rounded @click="record()">
              บันทึก
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <DialogAlert :statusDialog="statusDialog" @goBack="goBack"/>
  </div>
</template>
<script>
export default {
  layout: 'empty',
  data() {
    return {
      overlay: true,
      e1: 1,
      results: {},
      statusPage1: false,
      statusPage2: false,
      detailCompanyAndProduct: {
        companyAndProduct: {
          detail_company: {},
          files_logo_company: null,
          detail_type_product: [],
        },
        agent: {
          member_no: {},
          files_agent: null,
          detail_agent: [],
        },
      },
      productsDetail: [],
      member_no: '',
      formIsValid: false,
      // ----- Rules ------
      rules: {
        pass: (value) =>
          value.length >= 5 || 'กรุณากรอกรหัสผ่านอย่างน้อย 5 ตัว',
        required: (value) => !!value || 'กรุณากรอกข้อมูล',
        select: (value) => !!value || 'กรุณาเลือกข้อมูล',
        thaiOnly: (value) =>
          /^([ก-๙\s])+$/i.test(value) || 'กรุณากรอกเป็นภาษาไทยเท่านั้น',
        thaiCompany: (value) =>
          /^([ก-๙\s()])+$/i.test(value) || 'กรุณากรอกเป็นภาษาไทยเท่านั้น',
        engCompany: (value) =>
          /^([A-Za-z\s.,()-])+$/i.test(value) ||
          'กรุณากรอกเป็นภาษาอังกฤษเท่านั้น',
        engOnly: (value) =>
          /^([A-Za-z\s])+$/i.test(value) || 'กรุณากรอกเป็นภาษาอังกฤษเท่านั้น',
        numberOnly: (value) =>
          /^([0-9, ','])+$/.test(value) || 'กรุณากรอกเป็นตัวเลขเท่านั้น',
        emailCompany: (value) => {
          if (!value) return true;
          return /.+@.+\..+/.test(value) || 'รูปแบบอีเมลไม่ถูกต้อง';
        },
        emailRules: (value) =>
          /^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          'รูปแบบอีเมลไม่ถูกต้อง',
        numberLength: (value) =>
          /^\d{1,10}$/.test(value) || 'กรุณากรอกตัวเลขไม่เกิน 10 หลัก',
        numberHouseOnly: (value) =>
          /^(\d+\/\d+|\d+)$/.test(value) || 'กรุณากรอกเป็นตัวเลขเท่านั้น',
      },
      companyDetails: {
        company_id: '',
        company_name_th: '',
        company_name_eng: '',
        company_telephone: '',
        company_fax: '',
        company_email: '',
        company_logo: null,
        fileType: '',
        company_full_address_th: '',
        company_address_th: '',
        company_province_th: '',
        company_sub_district_th: '',
        company_district_th: '',
        company_full_address_eng: '',
        company_address_eng: '',
        company_province_eng: '',
        company_sub_district_eng: '',
        company_district_eng: '',
        company_zip_code: ''
      },
      agentDetail1: {
        agent_id: null,
        title_th: '',
        title_eng: '',
        name_th: '',
        name_eng: '',
        email: '',
        pic_agent: null,
        nameFile: ''
      },
      agentDetail2: {
        agent_id: null,
        title_th: '',
        title_eng: '',
        name_th: '',
        name_eng: '',
        email: '',
        pic_agent: null,
        nameFile: ''
      },
      showFileLogo: null,
      showFileAgent1: null,
      showFileAgent2: null,
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
      provinceEN: {},
      districtEN: {},
      subDistrictEN: {},
      valid: false,
      prefix_agent2_eng: '',
      prefixAll: [
        {
          title_th: 'นาย',
          title_eng: 'Mr',
        },
        {
          title_th: 'นาง',
          title_eng: 'Mrs',
        },
        {
          title_th: 'นางสาว',
          title_eng: 'Miss',
        },
      ],
      productsDetails: [],
      clickFileLogo: false,
      clickFileAgent1: false,
      clickFileAgent2: false,
      statusDialog: false
    }
  },
  computed: {
  },
  watch: {
    e1() {
      this.scrollup()
    },
  },
  async mounted() {
    this.member_no = localStorage.getItem('member_no')
    await this.getDataInfo()
    await this.apiGetProvince('house')
    await this.apiGetProvince('EN')
    await this.provinceFilterUpdate(this.companyDetails.company_province_th, 'house')
    await this.districtFilterUpdate(this.companyDetails.company_district_th, 'house')
    await this.subDistrictFilterUpdate(this.companyDetails.company_sub_district_th, 'house')
    await this.provinceFilterUpdate(this.companyDetails.company_province_eng, 'EN')
    await this.districtFilterUpdate(this.companyDetails.company_district_eng, 'EN')
    await this.subDistrictFilterUpdate(this.companyDetails.company_sub_district_eng, 'EN')
    this.overlay = false
  },
  methods: {
    async getDataInfo() {
      try {
        const res = await this.$axios({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          url: `/api/user/getDetailCompanyByMemNo?member_no=${this.member_no}`,
        })
        if (res.status === 200) {
          this.results = res.data
          this.companyDetails = res.data.company[0]
          const tempProductDetails = res.data.detail_type_product
          this.agentDetail1 = res.data.agent[0] || res.data.agent
          this.agentDetail2 = res.data.agent[1] || res.data.agent
          if (res.data.agent.length === 0) {
            this.agentDetail1 = {
              agent_id: null,
              title_th: '',
              title_eng: '',
              name_th: '',
              name_eng: '',
              email: '',
              pic_agent: null,
              nameFile: ''
            }
            this.agentDetail2 = {
              agent_id: null,
              title_th: '',
              title_eng: '',
              name_th: '',
              name_eng: '',
              email: '',
              pic_agent: null,
              nameFile: ''
            }
          }
          if (res.data.detail_type_product.length === 0) {
            this.productsDetails.push({
              type_product_id: '',
              type_product_name: '',
              product: [
                {
                  product_no: '',
                  product_number: '',
                  product_name: '',
                  product_country: '',
                },
              ],
              createNew: true
            })
          } else {
            tempProductDetails.forEach(item => {
              const temp = {
                type_product_id: item.type_product_id,
                type_product_name: item.type_product_name,
                product: item.product
              }
              this.productsDetails.push(temp)
            })
          }
        }
      } catch (err) {
        console.error(err.response)
      } finally {
        this.overlay = false
      }
    },
    async apiUpdateDataCompanyAndProduct() {
      const formData = new FormData()
      formData.append(
        'detail_company',
        JSON.stringify(
          this.detailCompanyAndProduct.companyAndProduct.detail_company
        )
      )
      formData.append(
        'logo_company', this.detailCompanyAndProduct.companyAndProduct.files_logo_company
      )
      formData.append(
        'detail_type_product',
        JSON.stringify(this.productsDetails)
      )
      const res = await this.$axios
        .post('/api/user/updateDetailCompanyAndProduct', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200) {
        this.apiUpdateDataAgent()
      }
    },
    async apiUpdateDataAgent() {
      const formData = new FormData()
      formData.append(
        'member_no',
        JSON.stringify({
          member_no:
            this.detailCompanyAndProduct.companyAndProduct.detail_company
              .member_no,
        })
      )
      formData.append(
        'detail_agent',
        JSON.stringify(this.detailCompanyAndProduct.agent.detail_agent)
      )
      if (this.detailCompanyAndProduct.agent.detail_agent?.length > 0) {
        this.detailCompanyAndProduct.agent.detail_agent.forEach((item, index) => {
          if (item.pic) {
            const num = index + 1
            formData.append(`files_agent_${num}`, item.pic);
          }
        });
      }
      const res = await this.$axios
        .post('/api/user/updateAgent', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200) {
        this.statusDialog = true
      }
    },
    goBack() {
      this.$router.back()
    },
    formPage1(valid) {
      this.formIsValid = valid
      this.statusPage1 = valid
    },
    formPage2(status) {
      this.statusPage2 = true
    },
    getDataform1() {
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
            agent_id: this.agentDetail1.agent_id,
            title_th: this.agentDetail1.title_th,
            title_eng: this.agentDetail1.title_eng,
            name_th: this.agentDetail1.name_th,
            name_eng: this.agentDetail1.name_eng,
            email: this.agentDetail1.email,
            pic: this.agentDetail1.pic_agent instanceof File ? this.agentDetail1.pic_agent : null
          },
          {
            agent_id: this.agentDetail2.agent_id,
            title_th: this.agentDetail2.title_th,
            title_eng: this.agentDetail2.title_eng,
            name_th: this.agentDetail2.name_th,
            name_eng: this.agentDetail2.name_eng,
            email: this.agentDetail2.email,
            pic: this.agentDetail2.pic_agent instanceof File ? this.agentDetail2.pic_agent : null
          },
        ],
      }
      this.detailCompanyAndProduct = {
        companyAndProduct: {
          detail_company: dataSave.detail_company,
          files_logo_company: dataSave.files_logo_company,
        },
        agent: {
          detail_agent: dataSave.detail_agent,
          files_agent: {
            agent1: dataSave.detail_agent[0].pic,
            agent2: dataSave.detail_agent[1].pic,
          },
          member_no: {
            member_no: dataSave.detail_company.member_no,
          },
        },
      }
    },
    getDataform2(obj) {
      this.productsDetail = obj
    },
    scrollup() {
      window.scrollTo(0, 0)
    },
    nextPage() {
      const isValid = this.$refs.form.validate()
      if (isValid) {
        this.getDataform1()
        this.e1 = 2
      }
    },
    record() {
      this.apiUpdateDataCompanyAndProduct()
    },
    async provinceFilter(provinceName, type) {
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
    async districtFilter(districtName, type) {
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
    subDistrictFilter(subDistrictName, type) {
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
    async apiGetProvince(type) {
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
    async apiGetDistrict(provinceId, type) {
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
    async apiGetSubDistrict(districtId, type) {
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
    async provinceFilterUpdate(provinceName, type) {
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
    async districtFilterUpdate(districtName, type) {
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
    subDistrictFilterUpdate(subDistrictName, type) {
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
    },
    uploadFiles() {
      // this.clickFileLogo = true
      document.getElementById('company_logo').click()
    },
    handleFileLogoUpload (event) {
      const file = event
      if(file.size > 2097152) {
        this.$swal({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: `ขนาดไฟล์เกิน 2 MB`,
          confirmButtonText: 'ปิด',
          confirmButtonColor: 'rgba(0, 90, 170, 1)'
        })
      } else {
        this.showFileLogo = file
        this.companyDetails.company_logo = file
      }
    },
    handleFileAgent_1_Upload (event) {
      const file = event
      this.showFileAgent1 = file
      this.agentDetail1.pic_agent = file
    },
    handleFileAgent_2_Upload (event) {
      const file = event
      this.showFileAgent2 = file
      this.agentDetail2.pic_agent = file
    },
    uploadFilesAgent1() {
      document.getElementById('agent1').click()
    },
    uploadFilesAgent2() {
      document.getElementById('agent2').click()
    },
    addProduct(index) {
      this.productsDetails[index].product.push({
        product_no: '',
        product_number: '',
        product_name: '',
        product_country: '',
      })
    },
    deleteProduct(typeProduct, product) {
      if (this.productsDetails[typeProduct].product.length === 1) {
        this.productsDetails.splice(typeProduct, 1)
      } else {
        this.productsDetails[typeProduct].product.splice(product, 1)
      }
    },
    deleteMainProduct (typeIndex) {
      this.productsDetails.splice(typeIndex, 1)
    },
    addTypeProduct() {
      this.productsDetails.push({
        type_product_id: '',
        type_product_name: '',
        product: [
          {
            product_no: '',
            product_number: '',
            product_name: '',
            product_country: '',
          },
        ],
        createNew: true
      })
    },
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

.text-title-edit {
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
  filter: brightness(0) saturate(100%) invert(52%) sepia(13%) saturate(346%) hue-rotate(179deg) brightness(91%) contrast(96%);
  width: 19px;
  height: 19px;
}

.sub-color {
  color: red;
}

@media (max-width: 375px) {
  .container {
    padding-top: 5%;
    background-color: rgba(242, 250, 240, 1);
    position: relative;
    overflow: hidden;
    z-index: 0;
    width: 100%;
    height: 100%;
    font-size: 14px;
  }

  .background-info {
    z-index: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: auto;
  }

  .content-header {
    margin-top: 35px;
    z-index: 1;
    font-size: 20px;
    font-weight: 700;
    position: relative;
    white-space: nowrap;
    align-items: center;
  }

  .display-text-header {
    display: flex;
    padding-left: 20vw;
    padding-bottom: 0;
  }

  .display-subtext-header {
    display: flex;
    justify-content: center;
    font-size: 12px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .position-img {
    z-index: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: auto;
  }

  .text-title {
    margin-top: 42px;
    margin-bottom: -20px;
    z-index: 1;
    font-size: 20px;
    font-weight: 700;
    position: relative;
  }

  .text-sub-title {
    z-index: 1;
    font-size: 14px;
    font-weight: 400;
    position: relative;
    text-align: center;
    color: #fff;
    margin: 0px !important;
  }

  .icon-size {
    font-size: 32px !important;
    background-color: #fff;
    border-radius: 100%;
  }

  .news-title {
    color: #fff;
  }

  .headers-stepper {
    position: relative;
    z-index: 1;
    padding: 16px;
    padding-top: 40px;
  }

  .v-stepper {
    width: 100%;
    border-radius: 16px;
  }

  .edit-products-content {
    padding: 15px;
  }

  .v-stepper__label {
    display: block !important;
  }

  .v-stepper__step--active .v-stepper__label {
    color: rgba(120, 205, 107, 1) !important;
  }

  .v-stepper__header {
    box-shadow: none !important;
  }

  .v-stepper__step__step {
    height: 34px;
    min-width: 34px;
    width: 34px;
  }

  .box-button {
    padding-top: 24px;
    padding-bottom: 0px;
  }

  .box-button .col {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0;
  }

  .member-edit-container {
    font-size: 14px;
  }

  .v-text-field .v-input__control {
    border-radius: 8px;
  }

  .title-products {
    display: flex;
    justify-content: space-between;
  }

  .text-title {
    font-weight: 600;
  }

  .delete-product {}

  .add-product-detail {
    padding: 0;
    margin-bottom: 10px;
  }

  .text-trash {
    text-decoration: underline;
    color: #757D8A;
  }

  .add-product {
    display: flex;
    gap: 2px;
    align-items: center;
  }

  .add-product>.add-title {
    border-bottom: 1px solid;
    color: rgba(120, 205, 107, 1);
    font-weight: 700;
  }

  .add-product>.text {
    border-bottom: 1px solid;
    color: rgba(196, 196, 196, 1) !important;
    font-weight: 700;
  }

  .product-detail {}

  .type-products {
    background-color: rgba(250, 250, 250, 1);
    border-radius: 8px;
    padding: 0;
    margin-bottom: 10px;
  }

  .btn-trash {
    display: flex;
  }

  .text-section {
    font-weight: 500;
    color: rgba(152, 152, 152, 1);
  }
}

@media (min-width: 376px) and (max-width: 430px) {
  .container {
    padding-top: 5%;
    background-color: rgba(242, 250, 240, 1);
    position: relative;
    overflow: hidden;
    z-index: 0;
    width: 100%;
    height: 100%;
    font-size: 14px;
  }

  .background-info {
    z-index: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: auto;
  }

  .content-header {
    margin-top: 35px;
    z-index: 1;
    font-size: 20px;
    font-weight: 700;
    position: relative;
    white-space: nowrap;
    align-items: center;
  }

  .display-text-header {
    display: flex;
    padding-left: 20vw;
    padding-bottom: 0;
  }

  .display-subtext-header {
    display: flex;
    justify-content: center;
    font-size: 14px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .position-img {
    z-index: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: auto;
  }

  .text-title {
    margin-top: 42px;
    margin-bottom: -20px;
    z-index: 1;
    font-size: 20px;
    font-weight: 700;
    position: relative;
  }

  .text-sub-title {
    z-index: 1;
    font-size: 14px;
    font-weight: 400;
    position: relative;
    text-align: center;
    color: #fff;
    margin: 0px !important;
  }

  .icon-size {
    font-size: 32px !important;
    background-color: #fff;
    border-radius: 100%;
  }

  .news-title {
    color: #fff;
  }

  .headers-stepper {
    position: relative;
    z-index: 1;
    padding: 16px;
    padding-top: 40px;
  }

  .v-stepper {
    width: 100%;
    border-radius: 16px;
  }

  .edit-products-content {
    padding: 15px;
  }

  .v-stepper__label {
    display: block !important;
  }

  .v-stepper__step--active .v-stepper__label {
    color: rgba(120, 205, 107, 1) !important;
  }

  .v-stepper__header {
    box-shadow: none !important;
  }

  .v-stepper__step__step {
    height: 34px;
    min-width: 34px;
    width: 34px;
  }

  .box-button {
    padding-top: 24px;
    padding-bottom: 0px;
  }

  .box-button .col {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0;
  }

  .member-edit-container {
    font-size: 16px;
    flex-direction: column;
  }

  .v-text-field .v-input__control {
    border-radius: 8px;
  }

  .title-products {
    display: flex;
    justify-content: space-between;
  }

  .text-title {
    font-weight: 600;
  }

  .delete-product {}

  .add-product-detail {
    padding: 0;
    margin-bottom: 10px;
  }

  .text-trash {
    text-decoration: underline;
    color: #757D8A;
  }

  .add-product {
    display: flex;
    gap: 2px;
    align-items: center;
  }

  .add-product>.add-title {
    border-bottom: 1px solid;
    color: rgba(120, 205, 107, 1);
    font-weight: 700;
  }

  .add-product>.text {
    border-bottom: 1px solid;
    color: rgba(196, 196, 196, 1) !important;
    font-weight: 700;
  }

  .product-detail {}

  .type-products {
    background-color: rgba(250, 250, 250, 1);
    border-radius: 8px;
    padding: 0;
    margin-bottom: 10px;
  }

  .btn-trash {
    display: flex;
  }

  .text-section {
    font-weight: 500;
    color: rgba(152, 152, 152, 1);
  }
}

@media (min-width: 431px) {
  .container {
    padding-top: 5%;
    background-color: rgba(242, 250, 240, 1);
    position: relative;
    overflow: hidden;
    z-index: 0;
    width: 100%;
    height: 100%;
    font-size: 16px;
  }

  .background-info {
    z-index: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: auto;
  }

  .content-header {
    margin-top: 35px;
    z-index: 1;
    font-size: 20px;
    font-weight: 700;
    position: relative;
    white-space: nowrap;
    align-items: center;
  }

  .display-text-header {
    display: flex;
    padding-left: 26vw;
    padding-bottom: 0;
  }

  .display-subtext-header {
    display: flex;
    justify-content: center;
    font-size: 16px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .position-img {
    z-index: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: auto;
  }

  .text-title {
    margin-top: 42px;
    margin-bottom: -20px;
    z-index: 1;
    font-size: 20px;
    font-weight: 700;
    position: relative;
  }

  .text-sub-title {
    z-index: 1;
    font-size: 14px;
    font-weight: 400;
    position: relative;
    text-align: center;
    color: #fff;
    margin: 0px !important;
  }

  .icon-size {
    font-size: 32px !important;
    background-color: #fff;
    border-radius: 100%;
  }

  .news-title {
    color: #fff;
  }

  .headers-stepper {
    position: relative;
    z-index: 1;
    padding: 16px;
    padding-top: 40px;
  }

  .v-stepper {
    width: 100%;
    border-radius: 16px;
  }

  .edit-products-content {
    padding: 15px;
  }

  .v-stepper__label {
    display: block !important;
  }

  .v-stepper__step--active .v-stepper__label {
    color: rgba(120, 205, 107, 1) !important;
  }

  .v-stepper__header {
    box-shadow: none !important;
  }

  .v-stepper__step__step {
    height: 34px;
    min-width: 34px;
    width: 34px;
  }

  .box-button {
    padding-top: 24px;
    padding-bottom: 0px;
  }

  .box-button .col {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0;
  }

  .member-edit-container {
    font-size: 16px;
    flex-direction: column;
  }

  .v-text-field .v-input__control {
    border-radius: 8px;
  }

  .title-products {
    display: flex;
    justify-content: space-between;
  }

  .text-title {
    font-weight: 600;
  }

  .delete-product {}

  .add-product-detail {
    padding: 0;
    margin-bottom: 10px;
  }

  .text-trash {
    text-decoration: underline;
    color: #757D8A;
  }

  .add-product {
    display: flex;
    gap: 2px;
    align-items: center;
  }

  .add-product>.add-title {
    border-bottom: 1px solid;
    color: rgba(120, 205, 107, 1);
    font-weight: 700;
  }

  .add-product>.text {
    border-bottom: 1px solid;
    color: rgba(196, 196, 196, 1) !important;
    font-weight: 700;
  }

  .product-detail {}

  .type-products {
    background-color: rgba(250, 250, 250, 1);
    border-radius: 8px;
    padding: 0;
    margin-bottom: 10px;
  }

  .btn-trash {
    display: flex;
  }

  .text-section {
    font-weight: 500;
    color: rgba(152, 152, 152, 1);
  }
}
</style>
<style></style>