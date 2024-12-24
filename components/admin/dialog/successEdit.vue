<template>
  <v-dialog v-model="dialogSuccess" width="500">
    <template #activator="{ on, attrs }">
      <v-btn rounded color="#78CD6B" :width="widthBtn" v-bind="attrs" class="elevation-0" v-on="on"
        @click="showSuccess"><span class="white__color">
          {{ nameBtn }}
        </span></v-btn>
    </template>
    <v-card class="pa-4">
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-btn v-click-outside="onClickOutside" @click="onClickOutside" color="#F2F2F2" fab x-small elevation="0">
          <v-icon color="#9A9A9A">mdi-close</v-icon></v-btn>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" class="justify-center d-flex mb-6">
          <v-img :src="require('@/assets/admin/dialog/success-dialog.svg')" height="120" contain></v-img>
          <!-- <v-icon color="#78CD6B" size="120" >mdi-check-circle</v-icon>  -->
        </v-col>
        <v-col cols="12" class="justify-center d-flex mb-2">
          <h3 class="submain__color">บันทึกข้อมูลสำเร็จ</h3>
        </v-col>
        <v-col cols="12" class="justify-center d-flex"><span class="gray__color">{{ textSub }}</span></v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    textSub: { type: String, default: null },
    nameBtn: { type: String, default: null },
    widthBtn: { type: String, default: null },
    id: { type: String, default: null },
    statusCompany: { type: String, default: null },
    note: { type: String, default: null },
    isMember: { type: Boolean, default: null }
  },
  data() {
    return {
      dialogSuccess: false,
    }
  },
  methods: {
    onClickOutside() {
      this.$emit('close-dialog');
      location.reload()
    },
    async showSuccess() {
      this.isLoading = true
      const res = await this.$axios({
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          url: `/api/admin/updateStatusCompany?id=${this.id}&status_company=${(this.isMember === true ? 'member' : 'not_member') || ''}&status_company_note=${this.note || ''}`,

      })
      .then((response) => {
          return response
      })
      .catch((err) => {
          return err.response
      })
      if (res.status === 200) {
          // location.reload()
          // this.$emit('close-dialog');
          // this.dialogSuccess = true
      }

    },
    // showSuccess() {
    //   this.dialogSuccess = false
    // },
  },
}
</script>
<style scoped>
.card_success {
  justify-content: center;

  box-shadow: 0px 16px 32px -4px #00000029;
  box-shadow: 0px 0px 1px 0px #00000029;
}
</style>