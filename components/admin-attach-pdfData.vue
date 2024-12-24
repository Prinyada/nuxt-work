<template>
  <div>
    <v-expansion-panels v-if="!overlay" v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h4>เอกสารแนบ</h4>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="px-6">
          <v-divider class="mb-3"></v-divider>
          <v-row>
            <v-col v-if="isEdit" cols="6">
              <div v-for="(v, i) in formatData.slice(0, 4)" :key="i">
                <p class="mb-3">
                  {{ i + 1 }}. {{ v.name_type
                  }}<span v-if="i > 0" class="red__color"> *</span>
                  <span
                    v-if="v.name_type === 'หนังสือรับรองบริษัท'"
                    class="gray__color"
                    >(ไม่จำเป็นต้องรวมวัตถุประสงค์ของบริษัท)</span
                  >
                  <span
                    v-else-if="v.name_type === 'สำเนาบัตรประชาชนผู้แทนบริษัท'"
                    class="gray__color"
                    >(ท่านละ1ชุด)</span
                  >
                  <span
                    v-else-if="v.name_type === 'สำเนาทะเบียนบ้านผู้แทนบริษัท'"
                    class="gray__color"
                    >(ท่านละ1ชุด)</span
                  >
                  <span
                    v-else-if="v.name_type === 'แบบรับรองการเข้าเป็นสมาชิก'"
                    class="gray__color"
                    >(อย่างน้อย2บริษัท บริษัทละ1ชุด)</span
                  >
                </p>
                <p v-if="i === 3">
                  ดาวน์โหลดแบบฟอร์ม : <span @click="downloadFormRegis">แบบรับรองการเข้าเป็นสมาชิก</span>
                </p>
                <template v-if="v.file.length >= 0 && v.file.length <= 1">
                  <template v-if="v.file.length === 1">
                    <div v-for="(v_in, i_in) in v.file" :key="i_in">
                      <v-card class="dot__border py-1 mb-2 pr-4" elevation="0">
                        <v-row no-gutters align="center">
                          <v-col cols="1" class="ml-4">
                            <v-img
                              :src="require('@/assets/attach/pdf.svg')"
                              contain
                              width="32"
                            ></v-img>
                          </v-col>
                          <v-col cols="8" class="pl-2">
                            <h4 class="submain__color text__size">
                              {{ v_in.file_name || v_in.name }}
                            </h4>
                            <span class="text__small__size"
                              >{{ parseInt(v_in.size / 1024) }} KB</span
                            >
                          </v-col>
                          <v-spacer></v-spacer>
                          <v-icon v-if="!isEdit" small @click="openFile(v_in)"
                            >mdi-eye-outline</v-icon
                          >
                          <v-btn
                            v-if="isEdit"
                            text
                            color="red"
                            rounded
                            small
                            @click="deletePdf(i, i_in)"
                            ><v-icon small>mdi-trash-can</v-icon> ลบ</v-btn
                          >
                        </v-row>
                      </v-card>
                    </div>
                    <!-- สำเนาบัตรประชาชน -->
                    <v-card
                      v-if="i === 1"
                      class="upload__card d-flex justify-center align-center"
                      elevation="0"
                      link
                      @click="uploadIdCardFile"
                    >
                      <v-icon color="#78CD6B" class="mr-2"
                        >mdi-cloud-upload-outline</v-icon
                      >อัพโหลด
                    </v-card>
                    <!-- สำเนาทะเบียนบ้าน -->
                    <v-card
                      v-if="i === 2"
                      class="upload__card d-flex justify-center align-center"
                      elevation="0"
                      link
                      @click="uploadHouseFile"
                    >
                      <v-icon color="#78CD6B" class="mr-2"
                        >mdi-cloud-upload-outline</v-icon
                      >อัพโหลด
                    </v-card>
                    <!-- แบบรับรองเข้าเป็นสมาชิก -->
                    <v-card
                      v-if="i === 3"
                      class="upload__card d-flex justify-center align-center"
                      elevation="0"
                      link
                      @click="uploadRegisFile"
                    >
                      <v-icon color="#78CD6B" class="mr-2"
                        >mdi-cloud-upload-outline</v-icon
                      >อัพโหลด
                    </v-card>
                  </template>
                  <template v-else>
                    <!-- หนังสือรับรองบริษัท 1 ใบ -->
                    <v-card
                      v-if="i === 0"
                      class="upload__card d-flex justify-center align-center"
                      elevation="0"
                      link
                      @click="uploadCertificateFile"
                    >
                      <v-icon color="#78CD6B" class="mr-2"
                        >mdi-cloud-upload-outline</v-icon
                      >อัพโหลด
                    </v-card>
                    <!-- สำเนาบัตรประชาชน -->
                    <v-card
                      v-if="i === 1"
                      class="upload__card d-flex justify-center align-center"
                      elevation="0"
                      link
                      @click="uploadIdCardFile"
                    >
                      <v-icon color="#78CD6B" class="mr-2"
                        >mdi-cloud-upload-outline</v-icon
                      >อัพโหลด
                    </v-card>
                    <!-- สำเนาทะเบียนบ้าน -->
                    <v-card
                      v-if="i === 2"
                      class="upload__card d-flex justify-center align-center"
                      elevation="0"
                      link
                      @click="uploadHouseFile"
                    >
                      <v-icon color="#78CD6B" class="mr-2"
                        >mdi-cloud-upload-outline</v-icon
                      >อัพโหลด
                    </v-card>
                    <!-- แบบรับรองเข้าเป็นสมาชิก -->
                    <v-card
                      v-if="i === 3"
                      class="upload__card d-flex justify-center align-center"
                      elevation="0"
                      link
                      @click="uploadRegisFile"
                    >
                      <v-icon color="#78CD6B" class="mr-2"
                        >mdi-cloud-upload-outline</v-icon
                      >อัพโหลด
                    </v-card>
                  </template>
                </template>
                <template v-else>
                  <div v-for="(v_in, i_in) in v.file" :key="i_in">
                    <v-card class="dot__border py-1 mb-2 pr-4" elevation="0">
                      <v-row no-gutters align="center">
                        <v-col cols="1" class="ml-4">
                          <v-img
                            :src="require('@/assets/attach/pdf.svg')"
                            contain
                            width="32"
                          ></v-img>
                        </v-col>
                        <v-col cols="8" class="pl-2">
                          <h4 class="submain__color text__size">
                            {{ v_in.file_name || v_in.name }}
                          </h4>
                          <span class="text__small__size"
                            >{{ parseInt(v_in.size / 1024) }} KB</span
                          >
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-icon v-if="!isEdit" small @click="openFile(v_in)"
                          >mdi-eye-outline</v-icon
                        >
                        <v-btn
                          v-if="isEdit"
                          text
                          color="red"
                          rounded
                          small
                          @click="deletePdf(i, i_in)"
                          ><v-icon small>mdi-trash-can</v-icon> ลบ</v-btn
                        >
                      </v-row>
                    </v-card>
                  </div>
                </template>
              </div>
            </v-col>
            <v-col v-else cols="6">
              <div v-for="(v, i) in formatData.slice(0, 4)" :key="i">
                <p class="mb-3">
                  {{ i + 1 }}. {{ v.name_type
                  }}<span v-if="i > 0" class="red__color"> *</span>
                  <span
                    v-if="v.name_type === 'หนังสือรับรองบริษัท'"
                    class="gray__color"
                    >(ไม่จำเป็นต้องรวมวัตถุประสงค์ของบริษัท)</span
                  >
                  <span
                    v-else-if="v.name_type === 'สำเนาบัตรประชาชนผู้แทนบริษัท'"
                    class="gray__color"
                    >(ท่านละ1ชุด)</span
                  >
                  <span
                    v-else-if="v.name_type === 'สำเนาทะเบียนบ้านผู้แทนบริษัท'"
                    class="gray__color"
                    >(ท่านละ1ชุด)</span
                  >
                  <span
                    v-else-if="v.name_type === 'แบบรับรองการเข้าเป็นสมาชิก'"
                    class="gray__color"
                    >(อย่างน้อย2บริษัท บริษัทละ1ชุด)</span
                  >
                </p>
                <p v-if="i === 3">
                  ดาวน์โหลดแบบฟอร์ม : <span @click="downloadFormRegis">แบบรับรองการเข้าเป็นสมาชิก</span>
                </p>
                <template v-if="v.file.length > 0">
                  <div v-for="(v_in, i_in) in v.file" :key="i_in">
                    <v-card class="dot__border py-1 mb-2 pr-4" elevation="0">
                      <v-row no-gutters align="center">
                        <v-col cols="1" class="ml-4">
                          <v-img
                            :src="require('@/assets/attach/pdf.svg')"
                            contain
                            width="32"
                          ></v-img>
                        </v-col>
                        <v-col cols="8" class="pl-2">
                          <h4 class="submain__color text__size">
                            {{ v_in.file_name || v_in.name }}
                          </h4>
                          <span class="text__small__size"
                            >{{ parseInt(v_in.size / 1024) }} KB</span
                          >
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-icon small @click="openFile(v_in)"
                          >mdi-eye-outline</v-icon
                        >
                      </v-row>
                    </v-card>
                  </div>
                </template>
                <template v-else>
                  <v-card class="dot__border py-1 mb-2 pr-4" elevation="0">
                    <v-row no-gutters align="center">
                      <v-col cols="12" class="ml-4">
                        <span>ไม่พบ{{ v.name_type }}</span>
                      </v-col>
                    </v-row>
                  </v-card>
                </template>
              </div>
            </v-col>
            <!-- <v-col cols="6">
              <div v-for="(v, i) in formatData.slice(4)" :key="i">
                {{ i + 5 }}. {{ v.title }}
                <p class="gray__color">{{ v.subtitle }}</p>
                <p v-if="i === 3">
                  ดาวน์โหลดแบบฟอร์ม : แบบรับรองการเข้าเป็นสมาชิก
                </p>
                <div v-for="(v_in, i_in) in v.file" :key="i_in">
                  <v-card
                    class="dot__border mb-3 align-center"
                    elevation="0"
                    link
                  >
                    <v-row no-gutters align="center">
                      <v-col cols="1" class="ml-4">
                        <v-img
                          :src="require('@/assets/attach/pdf.svg')"
                          contain
                          width="32"
                        ></v-img>
                      </v-col>
                      <v-col cols="8" class="pl-2">
                        <h4 class="submain__color text__size">
                          {{ v_in.name }}.pdf
                        </h4>
                        <span class="text__small__size"
                          >{{ v_in.size / 1024 }} KB</span
                        >
                      </v-col>
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="red"
                        small
                        rounded
                        @click="deletePdf(i + 4, i_in)"
                        ><v-icon small>mdi-trash-can</v-icon> ลบ</v-btn
                      >
                    </v-row>
                  </v-card>
                  <v-card
                    v-if="
                      i === 0 &&
                      formatData[4].file.length <= 2 &&
                      i_in + 1 == formatData[4].file.length
                    "
                    class="upload__card d-flex justify-center align-center mb-3"
                    elevation="0"
                    link
                  >
                    <v-icon color="#78CD6B" class="mr-2"
                      >mdi-cloud-upload-outline</v-icon
                    >อัพโหลด
                  </v-card>
                  <v-card
                    v-if="
                      formatData[5] == formatData[5].file.length &&
                      formatData[5].file.length == 0
                    "
                    class="upload__card d-flex justify-center align-center mb-3"
                    elevation="0"
                    link
                  >
                    <v-icon color="#78CD6B" class="mr-2"
                      >mdi-cloud-upload-outline</v-icon
                    >อัพโหลด
                  </v-card>
                </div>
              </div>
            </v-col> -->
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-file-input
      id="certificate_file"
      style="display: none"
      accept=".pdf"
      @change="handleCertificateUpload"
      outlined
      dense
      hide-input
    ></v-file-input>
    <v-file-input
      id="idCard_file"
      style="display: none"
      accept=".pdf"
      @change="handleIdCardUpload"
      outlined
      dense
      hide-input
    ></v-file-input>
    <v-file-input
      id="house_file"
      style="display: none"
      accept=".pdf"
      @change="handleHouseUpload"
      outlined
      dense
      hide-input
    ></v-file-input>
    <v-file-input
      id="regis_file"
      style="display: none"
      accept=".pdf"
      @change="handleRegisUpload"
      outlined
      dense
      hide-input
    ></v-file-input>
    <v-overlay :value="overlay">
      <v-progress-circular
        color="#0E6E60"
        indeterminate
        size="40"
        class="circle"
      ></v-progress-circular>
    </v-overlay>
    <DialogPreview
      v-if="openDialogPreview"
      :filepdf="files_company_id"
      @close="closePreview"
    />
  </div>
</template>
<script>
export default {
  props: {
    isEdit: { type: Boolean, default: null },
    id: { type: String, default: null },
    allFile: { type: Array, default : null },
    value: { type: Array, default: () => [] }
  },
  data() {
    return {
      panel: [0, 1],
      formatData: this.value,
      overlay: true,
      files_company_id: '',
      openDialogPreview: false,
    }
  },
  async mounted() {
    await this.loadAllFile()
  },
  watch: {
    formatData: {
      handler(newValue) {
        this.$emit('input', newValue);
      },
      deep: true,
    },
  },
  methods: {
    deletePdf(index, indexIn) {
      this.formatData[index].file.splice(indexIn, 1)
    },
    async loadAllFile() {
      const res = await this.$axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        url: `/api/admin/getFileByCompanyId?company_id=${this.id}`,
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200) {
        this.overlay = false
        if (res.data.all_detail_file !== null) {
          this.formatData = JSON.parse(
            JSON.stringify(res.data.all_detail_file.files)
          )
        }
        this.$store.commit(
          'setFile', res.data.all_detail_file?.files || null
        )
      }
    },
    openFile(file) {
      this.files_company_id = file.files_company_id
      this.openDialogPreview = true
    },
    closePreview() {
      this.openDialogPreview = false
    },
    uploadCertificateFile() {
      document.getElementById('certificate_file').click()
    },
    uploadIdCardFile() {
      document.getElementById('idCard_file').click()
    },
    uploadHouseFile() {
      document.getElementById('house_file').click()
    },
    uploadRegisFile() {
      document.getElementById('regis_file').click()
    },
    handleCertificateUpload(event) {
      const file = event
      this.formatData[0].file.push(file)
    },
    handleIdCardUpload(event) {
      const file = event
      this.formatData[1].file.push(file)
    },
    handleHouseUpload(event) {
      const file = event
      this.formatData[2].file.push(file)
    },
    handleRegisUpload(event) {
      const file = event
      this.formatData[3].file.push(file)
    },
    downloadFormRegis () {
      window.open(`${process.env.API_URL}/api/admin/downloadFormRegis?type_form=regis`)
    }
  },
}
</script>
<style scoped>
.dot__border {
  border: 1px solid #e6e6e6;
}

.upload__card {
  color: #78cd6b;
  border: 1px dashed #78cd6b;
  background: #f2faf0;
  height: 50px;
  border-width: 2px;
}

.text__size {
  font-size: 14px;
}
</style>
<style>
.theme--light.v-expansion-panels .v-expansion-panel {
  background-color: #fafafa;
  /* color: rgba(0, 0, 0, 0.87); */
}

.red__color {
  color: red;
}
</style>
