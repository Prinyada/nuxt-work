<template>
  <div class="border__card">
    <v-row no-gutters style="display: flex; justify-content: space-between">
      <v-btn
        rounded
        text
        color="#78CD6B"
        @click="backToInformation"
        style="padding-left: 0px"
        ><v-icon>mdi-chevron-left</v-icon>
        <h3>รายละเอียดข้อมูลสมาชิก</h3>
      </v-btn>
      <!-- แก้ไข -->
      <div v-if="isEdit" class="d-flex">
        <v-btn
          rounded
          outlined
          color="#78CD6B"
          width="164"
          @click="isEdit = false"
          >ยกเลิก</v-btn
        >
        &nbsp;&nbsp;
        <v-btn
          elevation="0"
          rounded
          color="#78CD6B"
          width="168"
          @click="saveEdit"
        >
          <span class="white__color">บันทึก</span>
        </v-btn>
      </div>
      <!-- ยังไม่แก้ไข -->
      <v-btn
        v-else
        color="#78CD6B"
        rounded
        width="164"
        class="shadow__btn"
        @click="isEdit = true"
        ><v-icon color="white">mdi-square-edit-outline</v-icon
        ><span class="white__color">แก้ไขข้อมูล</span></v-btn
      >
    </v-row>
    <v-card class="pa-4 mt-8" elevation="0">
      <v-row no-gutters class="align-center">
        <span style="font-weight: 600">รายละเอียดสมาชิก</span
        ><v-chip small :color="isMember ? '#DDF1DD' : '#EFF2F9'" class="ml-6"
          ><span :class="isMember ? 'main__color' : 'gray__color'">{{
            isMember ? 'เป็นสมาชิก' : 'ไม่เป็นสมาชิก'
          }}</span></v-chip
        >
        <v-tooltip v-if="!isMember" right color="black">
          <template v-slot:activator="{ on, attrs }">
            <v-icon class="ml-2" v-bind="attrs" v-on="on" color="#78CD6B"
              >mdi-information-outline</v-icon
            >
          </template>
          <h4>เหตุผล :</h4>
          <ul>
            <li v-for="(val, index) in listInfo" :key="index">{{ val }}</li>
          </ul>
        </v-tooltip>
        <v-spacer></v-spacer>
        <!-- แก้ไขสถานะสมาชิก -->
        <AdminDialogEditStatusMember
          v-if="isEdit"
          :is-status="true"
          :is-member="isMember"
          :id="idCompany"
          :reason="listInfo"
        />
      </v-row>
      <v-divider class="mt-3 mb-6"></v-divider>
      <v-row no-gutters>
        <v-col md="12">
          <span class="gray__color mr-4"
            >เลขที่สมาชิก&nbsp;:&nbsp;
            <span style="color: #333333; font-weight: 400"
              >ธสว(ส){{ company.member_no }}</span
            >
          </span>
          <span class="gray__color mr-4"
            >ประเภทสมาชิก&nbsp;:&nbsp;
            <span style="color: #333333; font-weight: 400">{{
              company.type_member
            }}</span>
          </span>
        </v-col>
        <!-- <v-col cols="6">
                    <span class="gray__color mr-4">วันที่สมัครสมาชิก&nbsp;:&nbsp;
                        <span style="color: #333333; font-weight: 400;">20/01/2024</span>
                    </span>
                    <span class="gray__color">วันหมดอายุสมาชิก&nbsp;:&nbsp;
                        <span style="color: #333333; font-weight: 400;">31/12/2024</span>
                    </span>
                </v-col> -->
      </v-row>
    </v-card>
    <v-card class="mt-6 pa-4" elevation="0">
      <v-tabs v-model="tab" color="#78CD6B">
        <!-- {{ tab }} -->
        <v-tab href="#tabOffice"
          ><v-chip class="pa-1" :color="tab === 'tabOffice' ? '#F2FAF0' : ''"
            ><v-img
              v-if="tab === 'tabOffice'"
              class="main__color"
              :src="require('@/assets/admin/building.svg')"
            ></v-img
            ><v-img
              v-else
              :src="require('@/assets/admin/building-inactive.svg')"
            ></v-img
          ></v-chip>
          ข้อมูลบริษัท</v-tab
        >
        <v-tab-item value="tabOffice">
          <v-card flat>
            <v-card-text> </v-card-text>
            <v-expansion-panels v-model="panel" multiple class="mb-5">
              <!-- company ยังไม่แก้ไข -->
              <v-expansion-panel v-if="!isEdit" elevation="0" class="pa-0 px-6">
                <v-expansion-panel-header class="pa-0 panel__header">
                  <h4>ข้อมูลบริษัท</h4>
                </v-expansion-panel-header>
                <v-expansion-panel-content elevation="0">
                  <v-divider></v-divider>
                  <v-row no-gutters class="mt-4">
                    <v-col
                      v-if="!itemCompany.company_logo"
                      style="display: flex; align-items: center"
                      cols="auto"
                      class="pa-0"
                    >
                      <span class="gray__color">โลโก้บริษัท : </span>
                      <v-img
                        class="ml-4"
                        :src="require('@/assets/info/logo-office-data.svg')"
                        height="60"
                        contain
                      ></v-img>
                    </v-col>
                    <v-col
                      v-else
                      style="display: flex; align-items: center"
                      class="pa-0"
                    >
                      <span class="gray__color">โลโก้บริษัท : </span>
                      <v-img
                        class="ml-4 img__border"
                        :src="
                          `data:image/${itemCompany.fileType};base64,` +
                          itemCompany.company_logo
                        "
                        max-width="60"
                        height="60"
                        cover
                      ></v-img>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col md="4" class="pl-0">
                      <span class="gray__color">ชื่อบริษัท (ภาษาไทย) : </span
                      >{{ itemCompany.company_name_th }}
                    </v-col>
                    <v-col cols="4"
                      ><span class="gray__color">Company name : </span
                      >{{ itemCompany.company_name_eng }}</v-col
                    >
                    <v-col cols="4"
                      ><span class="gray__color">ประเภทธุรกิจ : </span
                      >{{ itemCompany.type_company }}</v-col
                    >
                    <v-col cols="4" class="pl-0"
                      ><span class="gray__color">เบอร์โทรศัพท์ : </span
                      >{{ itemCompany.company_telephone }}</v-col
                    >
                    <v-col cols="4"
                      ><span class="gray__color">เบอร์โทรสาร : </span
                      >{{ itemCompany.company_fax }}</v-col
                    >
                    <v-col cols="4"
                      ><span class="gray__color">อีเมล : </span
                      >{{ itemCompany.company_email }}</v-col
                    >
                    <v-col cols="6" class="pl-0"
                      ><span class="gray__color">ที่อยู่บริษัท(ภาษาไทย) : </span
                      >{{ itemCompany.company_full_address_th }}</v-col
                    >
                    <v-col cols="6"
                      ><span class="gray__color">Office Address : </span
                      >{{ itemCompany.company_full_address_eng }}</v-col
                    >
                  </v-row>
                  <v-col cols="12" class="pl-0 mb-1">
                    <h4>ข้อมูลผู้แทนในนามบริษัท</h4>
                  </v-col>
                  <v-divider></v-divider>
                  <template
                    v-if="
                      itemAgent[0]?.agent_id === null &&
                      itemAgent[1]?.agent_id === null
                    "
                  >
                    <p style="margin-top: 16px">ไม่พบข้อมูลผู้แทนในนามบริษัท</p>
                  </template>
                  <template v-else>
                    <!-- form ผู้แทนคนที่ 1 -->
                    <v-form ref="agent1">
                      <v-row no-gutters>
                        <v-col cols="12" class="px-0">ผู้แทนที่ 1</v-col>
                        <div cols="3" class="px-0 pt-4 pr-4">
                          <v-row no-gutters>
                            <span class="gray__color">รูปผู้แทน : </span>
                            <!-- <v-col cols="auto" class="pa-0 ml-4"><v-img :src="v.img" height="48" contain></v-img></v-col> -->
                            <v-img
                              v-if="itemAgent[0]?.pic_agent !== null"
                              class="ml-2 img__border"
                              :src="
                                `data:image/${itemAgent[0]?.fileType};base64,` +
                                itemAgent[0]?.pic_agent
                              "
                              max-width="48"
                              height="48"
                              cover
                            ></v-img>
                            <v-img
                              v-else
                              height="56"
                              class="ml-2"
                              width="56"
                              cover
                              :src="
                                require('~/assets/img/user/Non-profile.png')
                              "
                            ></v-img>
                            <!-- <v-img class="ml-2 img__border" :src="'data:image/png;base64,' + imageItem" max-width="48" height="48" cover></v-img> -->
                          </v-row>
                        </div>
                        <v-col cols="9">
                          <v-row no-gutters>
                            <v-col cols="" class="pa-0"
                              ><span class="gray__color"
                                >ชื่อ-นามสกุล (ภาษาไทย) : </span
                              >{{ itemAgent[0]?.title_th }}
                              {{ itemAgent[0]?.name_th }}</v-col
                            >
                            <v-col cols="6" class="pa-0"
                              ><span class="gray__color"
                                >First name - Last name : </span
                              >{{ itemAgent[0]?.title_eng }}
                              {{ itemAgent[0]?.name_eng }}</v-col
                            >
                            <v-col cols="6" class="pa-0 mt-6"
                              ><span class="gray__color">อีเมล : </span
                              >{{ itemAgent[0]?.email }}</v-col
                            >
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-form>
                    <!-- form ผู้แทนคนที่ 2 -->
                    <v-form ref="agent2">
                      <v-row no-gutters>
                        <v-col cols="12" class="px-0">ผู้แทนที่ 2</v-col>
                        <div cols="3" class="px-0 pt-4 pr-4">
                          <v-row no-gutters>
                            <span class="gray__color">รูปผู้แทน : </span>
                            <!-- <v-col cols="auto" class="pa-0 ml-4"><v-img :src="v.img" height="48" contain></v-img></v-col> -->
                            <v-img
                              v-if="itemAgent[1]?.pic_agent !== null"
                              class="ml-2 img__border"
                              :src="
                                `data:image/${itemAgent[1]?.fileType};base64,` +
                                itemAgent[1]?.pic_agent
                              "
                              max-width="48"
                              height="48"
                              cover
                            ></v-img>
                            <v-img
                              v-else
                              height="54"
                              class="ml-2"
                              width="54"
                              cover
                              :src="
                                require('~/assets/img/user/Non-profile.png')
                              "
                            ></v-img>
                            <!-- <v-img class="ml-2 img__border" :src="'data:image/png;base64,' + imageItem" max-width="48" height="48" cover></v-img> -->
                          </v-row>
                        </div>
                        <v-col cols="9">
                          <v-row no-gutters>
                            <v-col cols="" class="pa-0"
                              ><span class="gray__color"
                                >ชื่อ-นามสกุล (ภาษาไทย) : </span
                              >{{ itemAgent[1]?.title_th }}
                              {{ itemAgent[1]?.name_th }}</v-col
                            >
                            <v-col cols="6" class="pa-0"
                              ><span class="gray__color"
                                >First name - Last name : </span
                              >{{ itemAgent[1]?.title_eng }}
                              {{ itemAgent[1]?.name_eng }}</v-col
                            >
                            <v-col cols="6" class="pa-0 mt-6"
                              ><span class="gray__color">อีเมล : </span
                              >{{ itemAgent[1]?.email }}</v-col
                            >
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-form>
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
                  <v-row
                    v-if="
                      isFile(itemCompanyTemp.company_logo) ||
                      !(itemCompanyTemp.company_logo === null)
                    "
                    no-gutters
                    class="d-flex"
                    justify="center"
                  >
                    <div
                      class="ml-2 pa-2"
                      style="
                        border-radius: 6px;
                        border: 1px dashed #e6e6e6;
                        height: 112px;
                        width: 112px;
                      "
                    >
                      <v-img
                        :src="
                          showFileLogo
                            ? showFileLogo
                            : `data:image/${itemCompanyTemp.fileType};base64,` +
                              itemCompanyTemp.company_logo
                        "
                        height="96"
                        class="pa-2 img__border__edit"
                        width="96"
                        cover
                      ></v-img>
                      <v-btn
                        text
                        icon
                        height="28"
                        width="28"
                        class="pa-2 img__border__edit"
                        style="position: relative; left: 85px; bottom: 115px"
                        @click="deleteFileLogo"
                        ><v-icon size="16" color="red"
                          >mdi-delete</v-icon
                        ></v-btn
                      >
                    </div>
                  </v-row>
                  <v-row v-else no-gutters class="d-flex mt-4" justify="center">
                    <div class="img__border__edit__dashed mr-1 pa-2">
                      <v-img
                        :src="require('@/assets/info/logo-office-data.svg')"
                        cover
                        height="88"
                        width="88"
                        class="img__border__edit"
                      ></v-img>
                      <v-btn
                        text
                        icon
                        height="28"
                        width="28"
                        class="icon__btn"
                        style="position: relative; left: 85px; bottom: 115px"
                        @click="triggerFileLogoInput"
                        ><v-icon size="16">mdi-pencil-outline</v-icon></v-btn
                      >
                    </div>
                    <!-- {{ file }} -->
                  </v-row>
                  <v-file-input
                    id="company_logo"
                    accept="image/*"
                    label="Upload your file"
                    class="d-none"
                    @change="handleFileLogoChange"
                  />
                  <v-form ref="company">
                    <v-row no-gutters>
                      <v-col cols="4" class="pl-0">
                        <span class="gray__color">ชื่อบริษัท (ภาษาไทย)</span
                        ><span class="red__color"> *</span>
                        <v-text-field
                          v-model="itemCompanyTemp.company_name_th"
                          color="#78CD6B"
                          background-color="white"
                          outlined
                          dense
                          height="40"
                          :rules="[rules.required, rules.thaiOnly]"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <span class="gray__color">Company name</span
                        ><span class="red__color"> *</span>

                        <v-text-field
                          v-model="itemCompanyTemp.company_name_eng"
                          color="#78CD6B"
                          background-color="white"
                          outlined
                          dense
                          height="40"
                          :rules="[rules.engCompany, rules.required]"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="4" class="pr-0"
                        ><span class="gray__color">ประเภทธุรกิจ</span>
                        <!-- {{ typeTemp }} -->
                        <v-text-field
                          v-model="itemCompanyTemp.type_company"
                          color="#78CD6B"
                          background-color="white"
                          outlined
                          dense
                          height="40"
                        />
                      </v-col>
                      <v-col cols="4" class="pl-0"
                        ><span class="gray__color">เบอร์โทรศัพท์</span
                        ><span class="red__color"> *</span>
                        <v-text-field
                          v-model="itemCompanyTemp.company_telephone"
                          color="#78CD6B"
                          background-color="white"
                          outlined
                          dense
                          height="40"
                          :rules="[rules.required]"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="4"
                        ><span class="gray__color">เบอร์โทรสาร</span>

                        <v-text-field
                          v-model="itemCompanyTemp.company_fax"
                          color="#78CD6B"
                          background-color="white"
                          outlined
                          dense
                          height="40"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="4" class="pr-0"
                        ><span class="gray__color">อีเมล</span>
                        <v-text-field
                          v-model="itemCompanyTemp.company_email"
                          color="#78CD6B"
                          background-color="white"
                          outlined
                          dense
                          height="40"
                          :rules="
                            itemCompanyTemp.company_email
                              ? [rules.emailRules]
                              : []
                          "
                        >
                        </v-text-field>
                      </v-col>
                      <h4>ที่อยู่บริษัท (ภาษาไทย)</h4>
                      <v-col cols="12" class="px-0"
                        ><span class="gray__color">ที่อยู่ (ภาษาไทย)</span>
                        <v-textarea
                          v-model="itemCompanyTemp.company_address_th"
                          background-color="white"
                          outlined
                          dense
                        >
                        </v-textarea>
                      </v-col>
                      <v-col cols="4" class="pl-0">
                        <span class="gray__color pl-0">จังหวัด (ภาษาไทย)</span>
                        <v-select
                          v-model="itemCompanyTemp.company_province_th"
                          color="#78CD6B"
                          :items="itemProvinces"
                          item-text="name_th"
                          background-color="white"
                          append-icon="mdi-chevron-down"
                          outlined
                          dense
                          @change="
                            provinceFilter(
                              itemCompanyTemp.company_province_th,
                              'house'
                            )
                          "
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="4">
                        <span class="gray__color">เขต/อำเภอ (ภาษาไทย)</span>
                        <v-select
                          v-model="itemCompanyTemp.company_district_th"
                          color="#78CD6B"
                          :items="itemDistrict"
                          background-color="white"
                          item-text="name_th"
                          append-icon="mdi-chevron-down"
                          outlined
                          dense
                          @change="
                            districtFilter(
                              itemCompanyTemp.company_district_th,
                              'house'
                            )
                          "
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="4" class="pr-0">
                        <span class="gray__color">แขวง/ตำบล (ภาษาไทย)</span>
                        <v-select
                          v-model="itemCompanyTemp.company_sub_district_th"
                          color="#78CD6B"
                          item-text="name_th"
                          :items="itemSubDistrict"
                          background-color="white"
                          append-icon="mdi-chevron-down"
                          outlined
                          dense
                          @change="
                            subDistrictFilter(
                              itemCompanyTemp.company_sub_district_th,
                              'house'
                            )
                          "
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="4" class="pl-0">
                        <span class="gray__color pl-0">รหัสไปรษณีย์</span>
                        <v-text-field
                          v-model="itemCompanyTemp.company_zip_code"
                          color="#78CD6B"
                          height="40"
                          filled
                          disabled
                          outlined
                          dense
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="px-0">
                        <h4>Office Address</h4>
                        <span class="gray__color">Address</span>
                        <v-textarea
                          v-model="itemCompanyTemp.company_address_eng"
                          background-color="white"
                          outlined
                          dense
                        >
                        </v-textarea>
                      </v-col>
                      <v-col cols="4" class="pl-0"
                        ><span class="gray__color">Province</span>
                        <v-select
                          v-model="itemCompanyTemp.company_province_eng"
                          background-color="white"
                          :items="itemsProvincesEN"
                          height="40"
                          item-text="name_en"
                          outlined
                          dense
                          @change="
                            provinceFilter(
                              itemCompanyTemp.company_province_eng,
                              'EN'
                            )
                          "
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="4"
                        ><span class="gray__color">District / Area</span>
                        <v-select
                          v-model="itemCompanyTemp.company_district_eng"
                          background-color="white"
                          :items="itemsDistrictsEN"
                          height="40"
                          item-text="name_en"
                          dense
                          outlined
                          @change="
                            districtFilter(
                              itemCompanyTemp.company_district_eng,
                              'EN'
                            )
                          "
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="4" class="pr-0"
                        ><span class="gray__color">Sub-district/Sub-area</span>
                        <v-select
                          v-model="itemCompanyTemp.company_sub_district_eng"
                          background-color="white"
                          :items="itemSubDistrictsEN"
                          height="40"
                          item-text="name_en"
                          outlined
                          dense
                          @change="
                            subDistrictFilter(
                              itemCompanyTemp.company_sub_district_eng,
                              'EN'
                            )
                          "
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="4" class="pl-0"
                        ><span class="gray__color">Postal Code</span>
                        <v-text-field
                          v-model="subDistrictEN.zip_code"
                          color="#78CD6B"
                          height="40"
                          outlined
                          dense
                          disabled
                          filled
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>

                  <h4>ข้อมูลผู้แทนในนามบริษัท</h4>
                  <v-divider></v-divider>
                  <!-- แก้ไขผู้แทนที่ 1 -->
                  <v-form ref="agent1">
                    <v-row style="margin-top: 5px">
                      <v-col>
                        <span>ผู้แทนที่ 1</span>
                      </v-col>
                    </v-row>
                    <v-row style="margin-top: 0px">
                      <v-col style="display: flex; align-items: center">
                        <v-col cols="2">
                          <v-row style="display: flex">
                            <span class="gray__color">รูปผู้แทน</span>
                            <!-- อัปโหลดใหม่ กับ แสดงของเดิม -->
                            <template
                              v-if="
                                isFile(itemAgentTemp[0].pic_agent) ||
                                !(itemAgentTemp[0].pic_agent === null)
                              "
                            >
                              <div
                                class="ml-2 pa-2"
                                style="
                                  border-radius: 6px;
                                  border: 1px dashed #e6e6e6;
                                  height: 72px;
                                  width: 72px;
                                "
                              >
                                <v-img
                                  height="56"
                                  class="pa-2 img__border__edit"
                                  width="56"
                                  cover
                                  :src="
                                    showFileAgent1 !== null
                                      ? showFileAgent1
                                      : `data:image/${itemAgent[0]?.fileType};base64,` +
                                        itemAgent[0]?.pic_agent
                                  "
                                />
                                <v-btn
                                  text
                                  icon
                                  max-height="28"
                                  max-width="28"
                                  class="icon__btn"
                                  style="
                                    position: relative;
                                    left: 50px;
                                    bottom: 75px;
                                  "
                                  @click="deleteFileUpload(0)"
                                  ><v-icon size="16" color="red"
                                    >mdi-delete</v-icon
                                  ></v-btn
                                >
                              </div>
                            </template>
                            <!-- ไม่มีของเดิม รออัปโหลดใหม่ -->
                            <template v-else>
                              <div
                                class="ml-2 pa-2"
                                style="
                                  border-radius: 6px;
                                  border: 1px dashed #e6e6e6;
                                  height: 72px;
                                  width: 72px;
                                "
                              >
                                <v-img
                                  height="56"
                                  class="pa-2 img__border__edit"
                                  width="56"
                                  cover
                                  :src="
                                    require('~/assets/img/user/Non-profile.png')
                                  "
                                ></v-img>
                                <v-btn
                                  text
                                  icon
                                  max-height="28"
                                  max-width="28"
                                  class="icon__btn"
                                  style="
                                    position: relative;
                                    left: 50px;
                                    bottom: 75px;
                                  "
                                  @click="triggerFileInput(0)"
                                  ><v-icon size="16"
                                    >mdi-pencil-outline</v-icon
                                  ></v-btn
                                >
                              </div>
                            </template>
                          </v-row>
                        </v-col>
                        <v-col cols="10" style="display: flex">
                          <v-row>
                            <v-col>
                              <span class="gray__color">คำนำหน้า</span
                              ><span class="red__color"> *</span>
                              <v-select
                                v-model="itemAgentTemp[0].title_th"
                                color="#78CD6B"
                                background-color="white"
                                :items="['นาย', 'นาง', 'นางสาว']"
                                append-icon="mdi-chevron-down"
                                outlined
                                dense
                                placeholder="กรุณาระบุคำนำหน้า"
                                :rules="[rules.select]"
                              />
                            </v-col>
                            <v-col>
                              <span class="gray__color"
                                >ชื่อ-นามสกุล (ภาษาไทย)</span
                              ><span class="red__color"> *</span>
                              <v-text-field
                                v-model="itemAgentTemp[0].name_th"
                                color="#78CD6B"
                                background-color="white"
                                height="40"
                                outlined
                                dense
                                placeholder="กรุณาระบุชื่อ-นามสกุล"
                                :rules="[rules.thaiOnly, rules.required]"
                              />
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-col>
                    </v-row>
                    <v-row style="margin-top: 0px">
                      <v-col style="display: flex">
                        <v-col cols="4">
                          <span class="gray__color">Name title</span
                          ><span class="red__color"> *</span>
                          <v-select
                            v-model="itemAgentTemp[0].title_eng"
                            color="#78CD6B"
                            background-color="white"
                            :items="['Mr', 'Ms', 'Miss']"
                            append-icon="mdi-chevron-down"
                            outlined
                            dense
                            placeholder="กรุณาระบุคำนำหน้า(ภาษาอังกฤษ)"
                            :rules="[rules.select]"
                          />
                        </v-col>
                        <v-col cols="4">
                          <span class="gray__color">First name - Last name</span
                          ><span class="red__color"> *</span>
                          <v-text-field
                            v-model="itemAgentTemp[0].name_eng"
                            color="#78CD6B"
                            background-color="white"
                            height="40"
                            outlined
                            dense
                            placeholder="กรุณาระบุชื่อ-นามสกุล(ภาษาอังกฤษ)"
                            :rules="[rules.engOnly]"
                          />
                        </v-col>
                        <v-col cols="4">
                          <span class="gray__color">อีเมล</span
                          ><span class="red__color"> *</span>
                          <v-text-field
                            v-model="itemAgentTemp[0].email"
                            color="#78CD6B"
                            background-color="white"
                            height="40"
                            outlined
                            dense
                            placeholder="กรุณาระบุอีเมล"
                            :rules="[rules.emailRules]"
                          />
                        </v-col>
                      </v-col>
                    </v-row>
                  </v-form>
                  <!-- แก้ไขผู้แทนที่ 2 -->
                  <v-form ref="agent2">
                    <v-row style="margin-top: 5px">
                      <v-col>
                        <span>ผู้แทนที่ 2</span>
                      </v-col>
                    </v-row>
                    <v-row style="margin-top: 0px">
                      <v-col style="display: flex; align-items: center">
                        <v-col cols="2">
                          <v-row style="display: flex">
                            <span class="gray__color">รูปผู้แทน</span>
                            <!-- อัปโหลดใหม่ กับ แสดงของเดิม -->
                            <template
                              v-if="
                                isFile(itemAgentTemp[1].pic_agent) ||
                                !(itemAgentTemp[1].pic_agent === null)
                              "
                            >
                              <div
                                class="ml-2 pa-2"
                                style="
                                  border-radius: 6px;
                                  border: 1px dashed #e6e6e6;
                                  height: 72px;
                                  width: 72px;
                                "
                              >
                                <v-img
                                  height="56"
                                  class="pa-2 img__border__edit"
                                  width="56"
                                  cover
                                  :src="
                                    showFileAgent2 !== null
                                      ? showFileAgent2
                                      : `data:image/${itemAgent[1]?.fileType};base64,` +
                                        itemAgent[1]?.pic_agent
                                  "
                                />
                                <v-btn
                                  text
                                  icon
                                  max-height="28"
                                  max-width="28"
                                  class="icon__btn"
                                  style="
                                    position: relative;
                                    left: 50px;
                                    bottom: 75px;
                                  "
                                  @click="deleteFileUpload(1)"
                                  ><v-icon size="16" color="red"
                                    >mdi-delete</v-icon
                                  ></v-btn
                                >
                              </div>
                            </template>
                            <!-- ไม่มีของเดิม รออัปโหลดใหม่ -->
                            <template v-else>
                              <div
                                class="ml-2 pa-2"
                                style="
                                  border-radius: 6px;
                                  border: 1px dashed #e6e6e6;
                                  height: 72px;
                                  width: 72px;
                                "
                              >
                                <v-img
                                  height="56"
                                  class="pa-2 img__border__edit"
                                  width="56"
                                  cover
                                  :src="
                                    require('~/assets/img/user/Non-profile.png')
                                  "
                                ></v-img>
                                <v-btn
                                  text
                                  icon
                                  max-height="28"
                                  max-width="28"
                                  class="icon__btn"
                                  style="
                                    position: relative;
                                    left: 50px;
                                    bottom: 75px;
                                  "
                                  @click="triggerFileInput(1)"
                                  ><v-icon size="16"
                                    >mdi-pencil-outline</v-icon
                                  ></v-btn
                                >
                              </div>
                            </template>
                          </v-row>
                        </v-col>
                        <v-col cols="10" style="display: flex">
                          <v-row>
                            <v-col>
                              <span class="gray__color">คำนำหน้า</span
                              ><span class="red__color"> *</span>
                              <v-select
                                v-model="itemAgentTemp[1].title_th"
                                color="#78CD6B"
                                background-color="white"
                                :items="['นาย', 'นาง', 'นางสาว']"
                                append-icon="mdi-chevron-down"
                                outlined
                                dense
                                placeholder="กรุณาระบุคำนำหน้า"
                                :rules="[rules.select]"
                              />
                            </v-col>
                            <v-col>
                              <span class="gray__color"
                                >ชื่อ-นามสกุล (ภาษาไทย)</span
                              ><span class="red__color"> *</span>
                              <v-text-field
                                v-model="itemAgentTemp[1].name_th"
                                color="#78CD6B"
                                background-color="white"
                                height="40"
                                outlined
                                dense
                                placeholder="กรุณาระบุชื่อ-นามสกุล"
                                :rules="[rules.thaiOnly, rules.required]"
                              />
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-col>
                    </v-row>
                    <v-row style="margin-top: 0px">
                      <v-col style="display: flex">
                        <v-col cols="4">
                          <span class="gray__color">Name title</span
                          ><span class="red__color"> *</span>
                          <v-select
                            v-model="itemAgentTemp[1].title_eng"
                            color="#78CD6B"
                            background-color="white"
                            :items="['Mr', 'Ms', 'Miss']"
                            append-icon="mdi-chevron-down"
                            outlined
                            dense
                            placeholder="กรุณาระบุคำนำหน้า(ภาษาอังกฤษ)"
                            :rules="[rules.select]"
                          />
                        </v-col>
                        <v-col cols="4">
                          <span class="gray__color">First name - Last name</span
                          ><span class="red__color"> *</span>
                          <v-text-field
                            v-model="itemAgentTemp[1].name_eng"
                            color="#78CD6B"
                            background-color="white"
                            height="40"
                            outlined
                            dense
                            placeholder="กรุณาระบุชื่อ-นามสกุล(ภาษาอังกฤษ)"
                            :rules="[rules.engOnly]"
                          />
                        </v-col>
                        <v-col cols="4">
                          <span class="gray__color">อีเมล</span
                          ><span class="red__color"> *</span>
                          <v-text-field
                            v-model="itemAgentTemp[1].email"
                            color="#78CD6B"
                            background-color="white"
                            height="40"
                            outlined
                            dense
                            placeholder="กรุณาระบุอีเมล"
                            :rules="[rules.emailRules]"
                          />
                        </v-col>
                      </v-col>
                    </v-row>
                  </v-form>
                  <v-file-input
                    id="agent1"
                    @change="handleFileAgent_1_Upload"
                    style="display: none"
                    accept=".png, .jpeg, .jpg"
                    outlined
                    dense
                    hide-input
                  ></v-file-input>
                  <v-file-input
                    id="agent2"
                    @change="handleFileAgent_2_Upload"
                    style="display: none"
                    accept=".png, .jpeg, .jpg"
                    outlined
                    dense
                    hide-input
                  ></v-file-input>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <!-- ข้อมูลผลิตภัณฑ์ -->
            <admin-edit-product
              :is-edit="isEdit"
              :detail-product="detailProduct"
              class="mb-6"
            />
            <admin-edit-guarantor
              :is-edit="isEdit"
              :certifier="certifier"
              :item-province="itemProvince"
              @valid-guarant="validGuarant"
            />
          </v-card>
        </v-tab-item>

        <v-tab href="#tabDoc"
          ><v-chip class="px-2" :color="tab === 'tabDoc' ? '#F2FAF0' : ''"
            ><v-img
              v-if="tab === 'tabDoc'"
              class="main__color"
              :src="require('@/assets/attach/paper-active.svg')"
            ></v-img
            ><v-img v-else :src="require('@/assets/attach/paper.svg')"></v-img
          ></v-chip>
          เอกสารแนบ</v-tab
        >
        <v-tab-item value="tabDoc">
          <v-card flat>
            <v-card-text></v-card-text>
            <admin-attach-pdfData
              v-model="fileDoc"
              :is-edit="isEdit"
              :id="idCompany"
            />
          </v-card>
        </v-tab-item>

        <v-tab href="#tabFood"
          ><v-chip class="px-2" :color="tab === 'tabFood' ? '#F2FAF0' : ''"
            ><v-img
              v-if="tab === 'tabFood'"
              class="main__color"
              :src="require('@/assets/feed/food-active.svg')"
            ></v-img
            ><v-img v-else :src="require('@/assets/feed/food.svg')"></v-img
          ></v-chip>
          ทะเบียนอาหารสัตว์</v-tab
        >
        <v-tab-item value="tabFood">
          <v-card flat>
            <v-card-text></v-card-text>
            <AdminFeedFoodData />
          </v-card>
        </v-tab-item>

        <v-tab href="#tabMedic"
          ><v-chip
            class="tabs__chip"
            width="32"
            :color="tab === 'tabMedic' ? '#F2FAF0' : ''"
            ><v-img
              v-if="tab === 'tabMedic'"
              class="main__color"
              :src="require('@/assets/admin/pill-active.svg')"
            ></v-img
            ><v-img v-else :src="require('@/assets/admin/pill.svg')"></v-img
          ></v-chip>
          ทะเบียนยาสัตว์</v-tab
        >
        <v-tab-item value="tabMedic">
          <v-card flat>
            <v-card-text></v-card-text>
            <AdminMedicInfoMedic />
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
    <v-overlay :value="overlay">
      <v-progress-circular
        color="#0E6E60"
        indeterminate
        size="40"
        class="circle"
      ></v-progress-circular>
    </v-overlay>

    <!-- <DialogAlert :statusDialog="statusDialog" @goBack="goBack" /> -->

    <!-- แจ้งเตือนกรอกข้อมูลให้ครบ -->
    <v-dialog v-model="daialogValidateForm" width="600" persistent class="dialog-validate">
      <v-card style="border-radius: 16px;">
        <v-card-title>
          <v-row>
            <v-col align="end">
              <v-btn icon color="" @click="daialogValidateForm = false">
                <v-icon> mdi-close </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-row>
          <v-col cols="12" align="center">
            <v-img contain width="300" :src="require('@/assets/admin/no-data.png')"></v-img>
          </v-col>
        </v-row>
        <v-row class="center">
          <v-col cols="12" style="text-align: center">
            <span style="font-size: 18px; color: #000000; font-weight: 600; text-align: center;">กรุณากรอกข้อมูลบริษัทให้ครบ</span>
          </v-col>
        </v-row>
        <v-card-text>
          <v-row class="">
            <v-col cols="12" style="text-align: center">
              <p class="text">
                <span style="color: #989898; text-align: center; font-size: 16px;">
                  ก่อนกดบันทึก
                </span>
              </p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- แจ้งเตือนแก้ไขข้อมูลสำเร็จ -->
    <v-dialog v-model="dialogSuccess" width="400" persistent>
      <v-card style="border-radius: 16px;" class="py-8">
        <v-row>
          <v-col cols="12" align="center">
            <v-img contain width="100" :src="require('@/assets/img/user/success.png')"></v-img>
          </v-col>
        </v-row>
        <v-row class="center">
          <v-col cols="12" style="text-align: center">
            <span style="font-size: 18px; color: #00A24D; font-weight: 600; text-align: center; ">สำเร็จ</span>
            <br>
            <span style="color: #989898; text-align: center; font-size: 16px;">แก้ไขข้อมูลสมาชิกสำเร็จ</span>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import adminEditGuarantor from '../../../components/admin-edit-guarantor.vue'
import AdminEditProduct from '../../../components/admin-edit-product.vue'
export default {
  components: { adminEditGuarantor, AdminEditProduct },
  data() {
    return {
      validGuarant: false,

      company: {},
      agent: [],
      detailProduct: [],
      certifier: [],

      tab: '',
      activeTab: true,

      isEdit: false,

      tabOffice: null,
      tabDoc: null,
      tabFood: null,
      tabMedic: null,

      isMember: false,
      listInfo: [],

      itemProvince: [],
      idCompany: '',
      reason: [],
      fileDoc: [
        {
          name_type: 'หนังสือรับรองบริษัท',
          file: [],
        },
        {
          name_type: 'สำเนาบัตรประชาชนผู้แทนบริษัท',
          file: [],
        },
        {
          name_type: 'สำเนาทะเบียนบ้านผู้แทนบริษัท',
          file: [],
        },
        {
          name_type: 'แบบรับรองการเข้าเป็นสมาชิก',
          file: [],
        },
      ],
      // admin edit company
      file: null,

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
      showFileAgent1: null,
      showFileAgent2: null,
      showFileLogo: null,
      productsDetails: [],
      statusDialog: false,
      daialogValidateForm: false,
      dialogSuccess: false
    }
  },
  computed: {
    // memberNo() {
    //     return this.$route.query.memberNo
    // },
  },
  async mounted() {
    this.idCompany = this.$route.params.idCompany
    await this.getDetail()
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
    this.overlay = false
  },
  methods: {
    backToInformation() {
      this.$router.push({ path: '/admin/information' })
    },
    goBack() {
      this.isEdit = false
      this.overlay = false
      this.$router.push(`/admin/profile/${this.idCompany}`)
    },
    async getProvince() {
      const res = await this.$axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        url: `/api/location/getProvince`,
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200) {
        this.itemProvince = res.data.results
      }
    },
    async getDetail() {
      // let tempNote = ''
      this.isLoading = true
      const res = await this.$axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        url: `/api/admin/getDetailCompanyAdmin?idCompany=${this.idCompany}`,
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200) {
        this.company = res.data.company[0]
        this.member_no = res.data.company[0]?.member_no
        this.itemCompanyTemp = res.data.company[0]
        this.itemCompany = res.data.company[0]
        if (res.data.agent.length === 0) {
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
          this.agent = res.data.agent
          this.itemAgent = res.data.agent
          this.itemAgentTemp = res.data.agent
        }
        this.detailProduct = res.data.detail_product
        this.certifier = res.data.certifier
        if (this.company.status_company === 'member') {
          this.isMember = true
        } else {
          this.isMember = false
        }
        if (res.data.company[0]?.status_company_note !== null) {
          const reasonReject = res.data.company[0]?.status_company_note
          const splitReason = reasonReject.split(',')
          this.listInfo = JSON.parse(JSON.stringify(splitReason))
        }
      }
      this.isLoading = false
    },
    cancleEdit() {
      this.isEdit = false
    },
    async saveEdit() {
      if (
        this.$refs.agent1.validate() &&
        this.$refs.agent2.validate() &&
        this.$refs.company.validate()
      ) {
        await this.preData()
        this.overlay = true
        await this.apiUpdateDataCompanyAndProduct()
      } else {
        this.daialogValidateForm = true
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
        'logo_company',
        this.detailCompanyAndProduct.companyAndProduct.files_logo_company
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
        this.detailCompanyAndProduct.agent.detail_agent.forEach(
          (item, index) => {
            if (item.pic) {
              const num = index + 1
              formData.append(`files_agent_${num}`, item.pic)
            }
          }
        )
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
        this.uploadFileDoc()
      }
    },
    async uploadFileDoc() {
      let res
      for (let i = 0; i < this.fileDoc.length; i++) {
        const formData = new FormData()
        if (this.fileDoc[i].file.length > 0) {
          for (let j = 0; j < this.fileDoc[i].file.length; j++) {
            const file = this.fileDoc[i].file[j]
            if (file instanceof File) {
              formData.append('file_upload', file) // Append each file
            }
          }
          formData.append('type_file', this.fileDoc[i].name_type)
          formData.append('member_no', this.member_no)
          formData.append('company_id', this.idCompany)

          try {
            res = await this.$axios.post('/api/admin/uploadFileDoc', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            })
          } catch (err) {
            // eslint-disable-next-line no-unused-vars
            res = err.response
          }
        }
      }
      this.dialogSuccess = true;
      setTimeout(() => {
        this.dialogSuccess = false;
        this.goBack();
      }, 3000);
    },
    preData() {
      const dataSave = {
        detail_company: {
          member_no: this.itemCompanyTemp.member_no,
          company_name_th: this.itemCompanyTemp.company_name_th,
          company_name_eng: this.itemCompanyTemp.company_name_eng,
          company_telephone: this.itemCompanyTemp.company_telephone,
          company_fax: this.itemCompanyTemp.company_fax,
          company_email: this.itemCompanyTemp.company_email,
          company_address_th: this.itemCompanyTemp.company_address_th,
          company_address_eng: this.itemCompanyTemp.company_address_eng,
          company_province_th: this.itemCompanyTemp.company_province_th,
          company_district_th: this.itemCompanyTemp.company_district_th,
          company_sub_district_th: this.itemCompanyTemp.company_sub_district_th,
          company_province_eng: this.itemCompanyTemp.company_province_eng,
          company_district_eng: this.itemCompanyTemp.company_district_eng,
          company_sub_district_eng:
            this.itemCompanyTemp.company_sub_district_eng,
          company_zip_code: this.zipCode,
          type_company: this.itemCompanyTemp.type_company,
        },
        files_logo_company:
          this.itemCompanyTemp.company_logo instanceof File
            ? this.itemCompanyTemp.company_logo
            : null,
        detail_agent: [
          {
            agent_id: this.itemAgentTemp[0].agent_id,
            title_th: this.itemAgentTemp[0].title_th,
            title_eng: this.itemAgentTemp[0].title_eng,
            name_th: this.itemAgentTemp[0].name_th,
            name_eng: this.itemAgentTemp[0].name_eng,
            email: this.itemAgentTemp[0].email,
            pic:
              this.itemAgentTemp[0].pic_agent instanceof File
                ? this.itemAgentTemp[0].pic_agent
                : null,
          },
          {
            agent_id: this.itemAgentTemp[1].agent_id,
            title_th: this.itemAgentTemp[1].title_th,
            title_eng: this.itemAgentTemp[1].title_eng,
            name_th: this.itemAgentTemp[1].name_th,
            name_eng: this.itemAgentTemp[1].name_eng,
            email: this.itemAgentTemp[1].email,
            pic:
              this.itemAgentTemp[1].pic_agent instanceof File
                ? this.itemAgentTemp[1].pic_agent
                : null,
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
    },
    handleFileAgent_2_Upload(event) {
      const file = event
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
    },
    handleFileLogoChange(event) {
      const file = event
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
    },
    isFile(value) {
      return value instanceof File || value instanceof Blob
    },
  },
}
</script>
<style scoped>
::v-deep(.v-dialog) {
    margin: 0px !important;
    overflow: unset !important;
    box-shadow: none !important;
}
.tabs__chip {
  padding-inline: 6px;
}

.shadow__btn {
  box-shadow: 0px 2px 4px -4px rgba(0, 0, 0, 0.06),
    0px 0px 1px 0px rgba(0, 0, 0, 0.12);
}
/* edit company */
.position__btn {
  position: relative;
  left: 80px;
  bottom: 110px;
}

.v-expansion-panel::before {
  box-shadow: none;
}

.row.no-gutters > .col,
.row.no-gutters > [class*='col-'] {
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
.white__color {
  color: white;
}

.main__color {
  color: #33a934;
}

.submain__color {
  color: #78cd6b;
}

.gray__color {
  color: #989898;
}

.border__card .v-sheet.v-card {
  border-radius: 12px;
}

/* .v-main__wrap {
  background-color: #f3f7f7;
} */

.unset__shadow .v-expansion-panel::before {
  box-shadow: inset !important;
}

.dark__background {
  background-color: #f2f2f2;
}

.text__small__size {
  font-size: 10px;
}

.v-application .primary--text {
  color: #78cd6b !important;
}

.panel__header {
  min-height: 60px !important;
}

@media (min-width: 960px) {
  .container {
    padding: 36px;
  }
}
</style>
