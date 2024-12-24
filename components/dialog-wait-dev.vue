<template>
    <div>
        <v-dialog v-model="dialogWaitDev" max-width="380" height="400" persistent>
            <v-card style="border-radius: 16px;">
                <v-card-title>
                    <v-row>
                        <v-col align="end">
                            <v-btn icon color="" @click="closeDialog">
                                <v-icon> mdi-close </v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-row>
                    <v-col cols="12" align="center">
                        <v-img contain width="120" :src="require('@/assets/img/user/operational-system.png')"></v-img>
                    </v-col>
                </v-row>
                <v-row class="center">
                    <v-col cols="2" style="text-align: center">
                    </v-col>
                    <v-col cols="8" style="text-align: center">
                        <span style="
                      font-size: 15px;
                      font-weight: 600;
                      text-align: center;
                    ">กำลังพัฒนาระบบ</span>
                    </v-col>
                </v-row>
                <v-card-text>
                    <v-row class="">
                        <v-col cols="12" style="text-align: center">
                            <p class="text">
                                <span style="color: #989898; text-align: center; font-size: 13px;">
                                    ขออภัยในความไม่สะดวก
                                </span>
                            </p>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
// import EventBus from '@/event-bus'
export default {
    props: {
        statusDialog: { type: Boolean, default: null },
        type: { type: String, default: null }
    },
    data() {
        return {
            dialogWaitDev: false
        }
    },
    watch: {
        statusDialog (val) {
            if (val) {
                this.dialogWaitDev = true
            }
        }
    },
    methods: {
        // check confirm
        open(data) {
            this.form_id = data
            this.dialogCancel = true
            //   this.fullname = data.prefix + '' + data.firstname + ' ' + data.lastname
            //   this.form_id = data.form_id
            //   this.dialogCancel = true
        },
        goBack() {
            // this.resolve(true)
            this.dialogCancel = false
            this.$router.push('/manage-account')
        },
        confirmDetail() {
            this.dialogFileSuccess = false
            this.$emit('save-data')
            setTimeout(() => {
                this.dialogSuccess = true
                // this.$router.push('/manage-account/' + this.form_id)
            }, 2000)
        },
        cancel() {
            // this.resolve(false)
            this.dialogCancel = false
        },
        closeDialog() {
            this.dialogWaitDev = false
        }
    }
}
</script>
<style scoped>
.font-14 {
    font-size: 14px;
}

::v-deep(.v-dialog) {
    margin: 0px !important;
    overflow: unset !important;
    box-shadow: none !important;
}
</style>
