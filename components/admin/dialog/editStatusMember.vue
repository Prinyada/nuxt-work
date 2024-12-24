<template>
  <div>
    <!-- แก้ไขสถานะสมาชิก -->
    <v-dialog v-if="isStatus" v-model="dialog" width="500">
      <template #activator="{ on, attrs }">
        <v-btn
          text
          color="#78CD6B"
          rounded
          v-bind="attrs"
          v-on="on"
          @click="overlay"
          ><v-icon>mdi-pencil-outline</v-icon
          ><span>แก้ไขสถานะสมาชิก</span></v-btn
        >
      </template>

      <v-card>
        <v-card-title class="text-h5 align-center">
          <v-row no-gutters>
            <!-- <v-avatar color="surface-variant" size="48"> -->
            <!-- <v-img height="48" contain :src="require('@/assets/admin/edit-pencil.svg')"></v-img> -->
            <!-- sdf -->
            <!-- </v-avatar> -->
            <v-col cols="10">
                <v-avatar color="#F2FAF0" size="48">
                <!-- <v-avatar color="surface-variant" size="56"> -->
                    <v-img
                        contain
                        height="32"
                        width="32"
                        :src="require('@/assets/admin/edit-pencil.svg')"
                    ></v-img>
                </v-avatar>
                <span style="font-family: 'Noto Sans Thai', 'sans-serif'; font-size: 20px; font-weight: 700;">แก้ไขสถานะสมาชิก</span>    
            </v-col>
            <v-col cols="2" class="position-close">
                <v-btn
                color="#F2F2F2"
                fab
                x-small
                elevation="0"
                @click="dialog = false"
                >
                    <v-icon color="#9A9A9A">mdi-close</v-icon></v-btn
                >    
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <!-- <pre>{{ selected }}</pre> -->
        <v-card-text>
          <v-row no-gutters align="center" class="mt-4"
            >สถานะสมาชิก :
            <v-select
              v-model="isMemberTH"
              class="ml-6"
              dense
              hide-details
              outlined
              color="#78CD6B"
              append-icon="mdi-chevron-down"
              :items="['เป็นสมาชิก', 'ไม่เป็นสมาชิก']"
            ></v-select>
          </v-row>
          <div
            v-if="isMemberTH === 'ไม่เป็นสมาชิก'"
            class="pa-4 darkgray__background mt-5"
          >
            <span class="weight__500 black__color">เหตุผลการแก้ไข</span>
            <v-radio-group
              v-model="selected"
              column
            >
              <div v-for="(val, index) in editReason" :key="index" class="ma-2">
                <v-radio
                  :value="val.name"
                  color="#78CD6B"
                  hide-details
                  :label="`${index + 1}. ${val.name}`"
                  class="custom-line-height"
                >
                </v-radio>
                <template v-if="val.sub.length > 0">
                  <div v-for="(valSub, indexSub) in val.sub" :key="indexSub">
                    <v-radio
                      :value="valSub"
                      hide-details
                      color="#78CD6B"
                      class="ml-10"
                      :label="`${index + 1}.${indexSub + 1} ${valSub}`"
                    >
                    </v-radio>
                  </div>
                </template>
              </div>
            </v-radio-group>
            
          </div>
        </v-card-text>

        <v-card-actions class="mr-1 pt-0 pb-6">
          <v-spacer></v-spacer>
          <v-btn
            rounded
            color="#78CD6B"
            width="108"
            text
            @click="dialog = false"
            >ยกเลิก</v-btn
          >
          <!-- <v-btn rounded color="#78CD6B" width="108"><span class="white__color">บันทึก</span></v-btn> -->
          <v-dialog v-model="dialogEdit" width="500">
            <template #activator="{ on, attrs }">
              <v-btn
                elevation="0"
                rounded
                color="#78CD6B"
                width="108"
                v-bind="attrs"
                @click="changeDialog"
                v-on="on"
                ><span class="white__color">บันทึก</span></v-btn
              >
            </template>
            <v-card>
              <v-card-title class="text-h5">
                <v-row no-gutters>
                  <v-avatar color="#F2FAF0" size="48" class="mr-4">
                    <v-icon color="#78CD6B">mdi-help</v-icon>
                  </v-avatar>
                  {{ isStatus ? 'ต้องการแก้ไขข้อมูล' : 'ต้องการแก้ไขข้อมูล' }}
                  <v-spacer></v-spacer>
                  <v-btn
                    color="#F2F2F2"
                    fab
                    x-small
                    elevation="0"
                    @click="dialogEdit = false"
                  >
                    <v-icon color="#9A9A9A">mdi-close</v-icon></v-btn
                  >
                </v-row>
              </v-card-title>

              <v-card-text>
                {{
                  isStatus
                    ? 'ต้องการแก้ไขสถานะสมาชิกใช่ไหม'
                    : 'คุณต้องการแก้ไขข้อมูลสมาชิกใช่ไหม'
                }}
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  rounded
                  color="#78CD6B"
                  width="108"
                  text
                  @click="dialogEdit = false"
                  >ยกเลิก</v-btn
                >
                <AdminDialogSuccessEdit
                  name-btn="ยืนยัน"
                  :text-sub="isStatus ? 'แก้ไขข้อมูลสมัครสมาชิกแล้ว' : ''"
                  :width-btn="isStatus ? '108' : '168'"
                  :is-member="isMemberTH === 'เป็นสมาชิก' ? true : false"
                  :note="selected"
                  :id="id"
                  @close-dialog="dialogEdit = false"
                />
                <!-- <AdminDialogSuccessEdit name-btn='บันทึก' text-sub='แก้ไขข้อมูลสมัครสมาชิกแล้ว' width-btn='168'/> -->
                <!-- <v-btn rounded color="#78CD6B" width="108"><span class="white__color">บันทึก</span></v-btn> -->
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- dialog comfirm edit -->
    <v-dialog v-else v-model="dialogEdit" width="500">
      <template #activator="{ on, attrs }">
        <v-btn
          elevation="0"
          rounded
          color="#78CD6B"
          width="168"
          v-bind="attrs"
          @click="changeDialog"
          v-on="on"
          ><span class="white__color">บันทึก</span></v-btn
        >
      </template>
      <v-card>
        <v-card-title class="text-h5 align-center">
          <v-row no-gutters>
            <v-avatar color="#F2FAF0" size="48" class="mr-4">
              <v-icon color="#78CD6B">mdi-help</v-icon>
            </v-avatar>
            {{ isStatus ? 'ต้องการแก้ไขข้อมูล' : 'ต้องการแก้ไขข้อมูล' }}
            <v-spacer></v-spacer>
            <v-btn
              color="#F2F2F2"
              fab
              x-small
              elevation="0"
              @click="dialogEdit = false"
            >
              <v-icon color="#9A9A9A">mdi-close</v-icon></v-btn
            >
          </v-row>
        </v-card-title>

        <v-card-text>
          {{
            isStatus
              ? 'ต้องการแก้ไขสถานะสมาชิกใช่ไหม'
              : 'คุณต้องการแก้ไขข้อมูลสมาชิกใช่ไหม'
          }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            rounded
            color="#78CD6B"
            width="108"
            text
            @click="dialogEdit = false"
            >ยกเลิก</v-btn
          >
          <AdminDialogSuccessEdit
            name-btn="ยืนยัน"
            :text-sub="isStatus ? 'แก้ไขข้อมูลสมัครสมาชิกแล้ว' : ''"
            :width-btn="isStatus ? '168' : '108'"
            :is-member="isMemberTH === 'เป็นสมาชิก' ? true : false"
            :note="selected"
            @close-dialog="dialogEdit = false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-overlay :value="overlay">
      <v-progress-circular
        color="#0E6E60"
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
    isStatus: { type: Boolean, default: null },
    isMember: { type: Boolean, default: null },
    id: { type: String, default: null },
    isEdit: { type: Boolean, default: false },
    reason: { type: Array, default: null }
  },
  data() {
    return {
      selected: [],
      selectedSub: {},
      isMemberTH: '',
      dialog: false,
      dialogEdit: false,
      statusMember: false,
      editReason: [
        { name: 'ตายหรือสิ้นสภาพนิติบุคคล', sub: [] },
        { name: 'ขาดคุณสมบัติตามข้อ 6.1 หรือ 6.2 แล้วแต่กรณี', sub: [] },
        {
          name: 'ลาออกโดยยื่นหนังสือลาออกต่อคณะกรรมการของทางสมาคมและได้ชำระหนี้สิ้น ที่ค้างชำระแก่สมาคมเรียบร้อยแล้ว',
          sub: [],
        },
        { name: 'ต้องคำพิพากษาถึงที่สุดให้เป็นบุคคลล้มละลาย', sub: [] },
        {
          name: 'ถูกศาลสั่งให้เป็นบุคคลไร้ความสามารถ หรือบุคคลเสมือนไร้ความสามารถ',
          sub: [],
        },
        {
          name: 'ต้องคำพิพากษาถึงที่สุดให้ลงโทษจำคุก เว้นแต่เป็นความผิดลหุโทษ หรือความผิด ที่กำหนดโทษขั้นลหุโทษหรือความผิดที่ได้กระทำโดยประมาท',
          sub: [],
        },
        {
          name: 'คณะกรรมการของสมาคมลงมติให้ลบชื่อออกจากทะเบียน โดยคะแนนเสียง ไม่น้อยกว่าสามในสี่ของจำนวนกรรมการทั้งหมด',
          sub: [
            'เจตนากระทำการใดๆ หรือที่ทำให้สมาคมเสื่อมเสียชื่อเสียง',
            'เจตนาละเมิดบังคับ',
            'ไม่ชำระเงินค่าบำรุงสมาคมเกินกว่า 1 ปี โดยปราศจากเหตุผลอันสมควร',
          ],
        },
      ],

      overlay: false,
    }
  },
  mounted() {
    this.selected = this.reason[0]
  },
  computed: {
    // isMemberTH() {
    //     if (this.isMember) {
    //         return 'เป็นสมาชิก'
    //     } else {
    //         return 'ไม่เป็นสมาชิก'
    //     }
    // }
  },
  watch: {
    memberNo(val) {
      this.overlay = false
    },
    isMember(val) {
      if (val === true) {
        this.statusMember = 'member'
      } else {
        this.statusMember = 'not_member'
      }
    },
  },
  created() {
    if (this.isMember) {
      this.isMemberTH = 'เป็นสมาชิก'
    } else {
      this.isMemberTH = 'ไม่เป็นสมาชิก'
    }
  },

  methods: {
    changeDialog() {
      this.dialog = !this.dialog
      this.dialogEdit = !this.dialogEdit
    },
  },
}
</script>
<style scoped>
.position-close {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.custom-line-height > label {
  line-height: 1.8 !important; /* Adjust this value as needed */
}
</style>