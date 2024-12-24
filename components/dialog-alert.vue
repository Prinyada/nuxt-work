<template>
    <div>
        <v-dialog v-model="dialogCancel" max-width="300" height="400" persistent>
            <v-card style="border-radius: 16px;">
                <v-card-title class="headline background-title font-weight-bold"
                    style="text-align: center; padding: 5px 0px 5px;">
                    <v-row class="center" no-gutters>
                        <v-col cols="2" style="text-align: center">
                        </v-col>
                        <v-col cols="8" style="text-align: center">
                        </v-col>
                        <v-col col="1" sm="1" mb="1" lg="1">
                            <v-btn icon color="#78CD6B" @click="dialogCancel = !dialogCancel">
                                <v-icon> mdi-close </v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-row no-gutters justify="center">
                        <v-col cols="4" style="align-items: center">
                        </v-col>
                        <v-col cols="4">
                            <!-- <v-img src="../../assets/BellAlert.png" width="150"></v-img> -->
                        </v-col>
                        <v-col cols="4" style="align-items: center;">
                        </v-col>
                    </v-row>
                    <v-row style="margin-top: 1px;">
                        <v-col cols="12" style="text-align: center">
                            <p class="text">
                                <span style="font-size: 13px;
                      color: #333333;
                      font-weight: 600;">
                                    คุณแน่ใจที่จะออกจากหน้านี้ ?
                                </span>
                                <br>
                                <span>หากออกจากหน้านี้ข้อมูลจะไม่บันทึก</span>
                            </p>
                        </v-col>
                    </v-row>
                    <v-row class="justify-center text-center" style="margin-top: -25px;">
                        <v-col cols="6">
                            <v-btn block outlined color="#FF7800" @click="dialogCancel = !dialogCancel" rounded>
                                ยกเลิก
                            </v-btn>
                        </v-col>
                        <v-col cols="6" class="btn">
                            <v-btn block color="#4574DE" style="background-color: #FF7800; color: white;" rounded
                                @click="goBack()">
                                ยืนยัน
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogFileSuccess" max-width="350" height="400" persistent>
            <v-card style="border-radius: 16px;">
                <v-card-title class="headline background-title font-weight-bold"
                    style="text-align: center; padding: 5px 0px 5px;">
                    <v-row class="center" no-gutters>
                        <v-col align="end">
                            <v-btn icon color="#78CD6B" @click="dialogFileSuccess = !dialogFileSuccess">
                                <v-icon> mdi-close </v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-row>
                    <v-col cols="12" align="center">
                        <!-- <v-img contain width="180" src="../../assets/file-success.png"></v-img> -->
                    </v-col>
                </v-row>
                <v-row class="center" no-gutters>
                    <v-col cols="2" style="text-align: center">
                    </v-col>
                    <v-col cols="8" style="text-align: center">
                        <span style="
                      font-size: 15px;
                      color: #333333;
                      font-weight: 600;
                      text-align: center;
                    ">บันทึก</span>
                    </v-col>
                </v-row>
                <v-card-text>
                    <v-row class="">
                        <v-col cols="12" style="text-align: center">
                            <p class="text">
                                <span style="color: #989898; text-align: center; font-size: 13px;">
                                    หากต้องการบันทึกข้อมูลสมาชิก กรุณากดยืนยัน
                                </span>
                            </p>
                        </v-col>
                    </v-row>
                    <v-row class="justify-center text-center" style="margin-top: -25px;">
                        <v-col cols="6" class="btn">
                            <v-btn block color="#78CD6B" style=" color: #78CD6B;" rounded outlined
                                @click="dialogFileSuccess = !dialogFileSuccess">
                                ปิด
                            </v-btn>
                        </v-col>
                        <v-col cols="6" class="btn">
                            <v-btn block color="#78CD6B" style="background-color: #78CD6B; color: white;" rounded
                                @click="confirmDetail">
                                บันทึก
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogSuccess" max-width="380" height="400" persistent>
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
                        <v-img contain width="120" :src="require('@/assets/img/user/success.png')"></v-img>
                    </v-col>
                </v-row>
                <v-row class="center">
                    <v-col cols="2" style="text-align: center">
                    </v-col>
                    <v-col cols="8" style="text-align: center">
                        <span style="
                      font-size: 15px;
                      color: #00A24D;
                      font-weight: 600;
                      text-align: center;
                    ">สำเร็จ</span>
                    </v-col>
                </v-row>
                <v-card-text>
                    <v-row class="">
                        <v-col cols="12" style="text-align: center">
                            <p class="text">
                                <span style="color: #989898; text-align: center; font-size: 13px;">
                                    แก้ไขข้อมูลสมาชิกสำเร็จ
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
            dialogCancel: false,
            dialogFileSuccess: false,
            dialogSuccess: false
        }
    },
    watch: {
        statusDialog (val) {
            if (val) {
                this.dialogSuccess = true
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
            this.$emit('goBack')
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
