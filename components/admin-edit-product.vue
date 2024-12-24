<template>
  <div>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel v-if="!isEdit" class="px-6 elevation-0">
        <v-expansion-panel-header class="pa-0 panel__header">
          <h4>ข้อมูลผลิตภัณฑ์</h4>
        </v-expansion-panel-header>
        <v-expansion-panel-content
          class="elevation-0 pb-0 none__expen_panel__warp"
        >
          <v-divider></v-divider>
          <template v-if="item.length === 0">
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
            <!-- <p style="margin-top: 16px;">ไม่มีข้อมูลผลิตภัณฑ์</p> -->
          </template>
          <template v-else>
            <div v-for="(v, i) in item" :key="i" class="mt-8">
              {{ v.type_product_name }}
              <v-card elevation="0" class="my-6">
                <div
                  v-for="(v_in, i_in) in v.product"
                  :key="i_in"
                  class="dark__background pa-3"
                >
                  <h4 class="mb-4">รายการที่ {{ i_in + 1 }}</h4>
                  <v-row no-gutters>
                    <v-col md="4"
                      ><span class="gray__color mr-4">ชื่อสินค้า :</span
                      >{{ v_in.product_name }}</v-col
                    >
                    <v-col md="3"
                      ><span class="gray__color mr-4">ผู้ผลิต/ประเทศ :</span
                      >{{ v_in.product_country }}</v-col
                    >
                    <v-col md="5"
                      ><span class="gray__color mr-4"
                        >เลขทะเบียนยา/อาหารสัตว์ :</span
                      >{{ v_in.product_no }}</v-col
                    >
                  </v-row>
                </div>
              </v-card>
            </div>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel v-else class="px-6">
        <v-expansion-panel-header class="pa-0 panel__header">
          <v-row no-gutters align="center">
            <h4>ข้อมูลผลิตภัณฑ์</h4>
            <v-spacer></v-spacer>
            <!-- <v-btn text color="#78CD6B" @click="addProduct"
              ><v-icon>mdi-plus-circle-outline</v-icon
              >เพิ่มประเภทผลิตภัณฑ์</v-btn
            > -->
            <!-- <v-btn text color="#78CD6B" @click="openDialogWaitDev"
              ><v-icon>mdi-plus-circle-outline</v-icon
              >เพิ่มประเภทผลิตภัณฑ์</v-btn
            > -->
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="pb-0">
          <v-divider></v-divider>
          <template v-if="itemTemp.length > 0">
            <div v-for="(v, i) in itemTemp" :key="i">
              <v-row no-gutters class="align-center my-6">
                ชื่อผลิตภัณฑ์ประเภท
                <template v-if="v.type_product_name !== null">
                  {{ v.type_product_name }}
                </template>
                <template v-else>
                  <v-text-field
                    v-model="v.title"
                    placeholder="กรอกชื่อประเภทผลิตภัณฑ์"
                    hide-details
                    class="ml-2"
                    outlined
                    dense
                    style="background-color: white"
                  ></v-text-field>
                </template>

                <v-spacer></v-spacer>
                <v-btn
                  outlined
                  color="#78CD6B"
                  rounded
                  width="210"
                  @click="addsubProduct(i)"
                  ><v-icon>mdi-plus</v-icon> เพิ่มรายการ</v-btn
                >
                <!-- <v-btn outlined class="ml-4" color="red" rounded @click="deleteProduct(i)"><v-icon>mdi-trash-can</v-icon><h4>ลบ</h4></v-btn> -->
              </v-row>
              <v-card elevation="0">
                <div
                  v-for="(v_in, i_in) in v.product"
                  :key="i_in"
                  class="dark__background pa-4"
                >
                  รายการที่ {{ i_in + 1 }}
                  <v-row no-gutters>
                    <v-col cols="3"
                      ><span class="gray__color">ชื่อสินค้า :</span>
                      <v-text-field
                        v-model="v_in.product_name"
                        background-color="white"
                        height="40"
                        dense
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3" class="mx-6"
                      ><span class="gray__color">ผู้ผลิต/ประเทศ :</span>
                      <v-text-field
                        v-model="v_in.product_country"
                        background-color="white"
                        height="40"
                        dense
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3"
                      ><span class="gray__color"
                        >เลขทะเบียนยา/อาหารสัตว์ :</span
                      >
                      <v-text-field
                        v-model="v_in.product_no"
                        background-color="white"
                        height="40"
                        dense
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="btn__center pa-0">
                      <v-btn color="red" text @click="deletesubProduct(i, i_in)"
                        ><v-icon>mdi-trash-can</v-icon
                        ><span class="text__underline">ลบ</span></v-btn
                      >
                    </v-col>
                  </v-row>
                </div>
              </v-card>
            </div>
          </template>
          <template v-else>
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
            <!-- <p style="margin-top: 16px;">ไม่มีข้อมูลผลิตภัณฑ์</p> -->
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- {{ detailProduct }} -->

      <!-- {{ item }} -->
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
    detailProduct: { type: Array, default: null },
  },

  data() {
    return {
      // valid: false,
      overlay: true,

      panel: [0, 1],
      item: [],
      itemTemp: [],
      statusDialog: false,
    }
  },
  watch: {
    detailProduct(val) {
      this.item = val
      this.itemTemp = JSON.parse(JSON.stringify(val))
      this.overlay = false
    },
    isEdit(val) {
      this.itemTemp = JSON.parse(JSON.stringify(this.detailProduct))
    },
  },
  methods: {
    openDialogWaitDev() {
      this.statusDialog = true
    },
    addsubProduct(index) {
      this.itemTemp[index].product.push({
        name: null,
        country: null,
        number: null,
      })
    },
    deletesubProduct(index, indexInside) {
      if (this.item[index].product.length === 1) {
        this.item.splice(index, 1)
      } else {
        this.item[index].product.splice(indexInside, 1)
      }
    },
    addProduct() {
      this.panel = 1
      this.itemTemp.push({
        type_product_name: null,
        product: [
          {
            product: [],
            type_product_name: null,
          },
        ],
      })
    },
    deleteProduct(index) {
      this.item.splice(index, 1)
    },
  },
}
</script>
<style scoped>
@media (max-width: 375px) {
}
@media (min-width: 376px) and (max-width: 430px) {
}
@media (min-width: 431px) {
}
.border__card .v-sheet.v-card {
  border-radius: 8px;
}
.v-expansion-panel::before {
  box-shadow: none;
}

.btn__center {
  display: grid;
  align-content: center;
  justify-content: end;
}
.text__underline {
  text-decoration: underline;
  font-weight: bold;
}
.none__expen_panel__warp .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
