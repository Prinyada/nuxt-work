<template>
    <v-expansion-panels
v-model="panel"
    multiple
    >
    <v-expansion-panel

    >
      <v-expansion-panel-header>
        <h4>เอกสารแนบ</h4>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="px-6">
        <v-divider class="mb-3"></v-divider>
        <v-row>
            <v-col cols="6">
                <div
                    v-for="(v, i) in formatData.slice(0, 4)" :key="i"

                >   
                    <p class="mb-3">{{i + 1}}. {{ v.title }}<span v-if="i > 0" class="red__color"> *</span> <span class="gray__color">{{ v.subtitle }}</span></p>
                    <p v-if="i === 3">ดาวน์โหลดแบบฟอร์ม : แบบรับรองการเข้าเป็นสมาชิก</p>
                    <div v-for="(v_in, i_in) in v.pdf" :key="i_in">

                    
                    <v-card
                        class="dot__border mb-3" elevation="0"
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
                                <h4 class="submain__color text__size">{{v_in.name}}.pdf</h4>
                                <span class="text__small__size">{{v_in.size}} KB / {{v_in.size}} KB</span>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-btn text color="red" rounded small @click="deletePdf(i, i_in)"><v-icon small>mdi-trash-can</v-icon> ลบ</v-btn>
                          
                            
                            
                        </v-row>
                        

                    </v-card>
                    <v-card v-if="i === 0 && formatData[0].pdf.length == 0 && i_in == formatData[0].pdf.length - 1" class="upload__card d-flex justify-center align-center" elevation="0" link>
                        <v-icon color="#78CD6B" class="mr-2">mdi-cloud-upload-outline</v-icon>อัพโหลด
                    </v-card>
                    <v-card v-if="i === 1 && formatData[1].pdf.length <= 1 && i_in == formatData[1].pdf.length - 1" class="upload__card d-flex justify-center align-center" elevation="0" link>
                        <v-icon color="#78CD6B" class="mr-2">mdi-cloud-upload-outline</v-icon>อัพโหลด
                    </v-card>
                    <v-card v-if="i === 2 && formatData[2].pdf.length <= 1 && i_in == formatData[2].pdf.length - 1" class="upload__card d-flex justify-center align-center" elevation="0" link>
                        <v-icon color="#78CD6B" class="mr-2">mdi-cloud-upload-outline</v-icon>อัพโหลด
                    </v-card>
                    <v-card v-if="i === 3 && formatData[3].pdf.length <= 1 && (i_in == formatData[3].pdf.length - 1 || formatData[3].pdf.length == 0)" class="upload__card d-flex justify-center align-center" elevation="0" link>
                        <v-icon color="#78CD6B" class="mr-2">mdi-cloud-upload-outline</v-icon>อัพโหลด
                    </v-card>
                </div>
                </div>
                

                
            </v-col>
            <v-col cols="6">
                <div
                    v-for="(v, i) in formatData.slice(4)" :key="i"

                >   
                    {{i + 5}}. {{ v.title }} <p class="gray__color">{{ v.subtitle }}</p>
                    <p v-if="i === 3">ดาวน์โหลดแบบฟอร์ม : แบบรับรองการเข้าเป็นสมาชิก</p>
                    <div v-for="(v_in, i_in) in v.pdf" :key="i_in">

                    
                        <v-card
                           
                            class="dot__border mb-3 align-center" elevation="0"
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
                                    <h4 class="submain__color text__size">{{v_in.name}}.pdf</h4>
                                    <span class="text__small__size">{{v_in.size}} KB / {{v_in.size}} KB</span>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-btn text color="red" small rounded @click="deletePdf(i + 4, i_in)"><v-icon small>mdi-trash-can</v-icon> ลบ</v-btn>
                                
                                
                            </v-row>
                            

                        </v-card>
                        <v-card v-if="i === 0 && formatData[4].pdf.length <= 2 && i_in + 1 == formatData[4].pdf.length" class="upload__card d-flex justify-center align-center mb-3" elevation="0" link>
                            <v-icon color="#78CD6B" class="mr-2">mdi-cloud-upload-outline</v-icon>อัพโหลด
                        </v-card>
                        <!-- {{ i }} -->
                        <!-- {{ formatData[5] }} -->
                        <v-card v-if="formatData[5] == formatData[5].pdf.length && formatData[5].pdf.length == 0" class="upload__card d-flex justify-center align-center mb-3" elevation="0" link>
                            <v-icon color="#78CD6B" class="mr-2">mdi-cloud-upload-outline</v-icon>อัพโหลด
                        </v-card>
                    </div>
                   
                    
                </div>
            </v-col>
        </v-row>
        
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
    data() {
        return {
            panel: [0, 1],
            formatData: [
                {
                    title: 'หนังสือรับรองบริษัท',
                    subtitle: '(ไม่จำเป็นต้องรวมวัตถุประสงค์ของบริษัท)',
                    pdf: [{
                        name: 'สำเนาหนังรับรองบริษัท',
                        data: null,
                        size: 600
                    }]
                },
                {
                    title: 'สำเนาบัตรประชาชนผู้แทนบริษัท',
                    subtitle: '(ท่านละ1ชุด)',
                    pdf: [{
                            name: 'สำเนาบัตรประชาชนผู้แทน1',
                            data: null,
                            size: 600
                        },
                        {
                            name: 'สำเนาบัตรประชาชนผู้แทน2',
                            data: null,
                            size: 600
                    }]
                },
                {
                    title: 'สำเนาทะเบียนบ้านผู้แทนบริษัท',
                    subtitle: '(ท่านละ1ชุด)',
                    pdf: [{
                            name: 'สำเนาทะเบียนบ้านผู้แทน1',
                            data: null,
                            size: 600
                        },
                        {
                            name: 'สำเนาทะเบียนบ้านผู้แทน2',
                            data: null,
                            size: 600
                    }]
                },
                {
                    title: 'แบบรับรองการเข้าเป็นสมาชิก',
                    subtitle: '(อย่างน้อย2บริษัท บริษัทละ1ชุด)',
                    pdf: [{
                            name: 'เอกสารรับรองสมาชิก1',
                            data: null,
                            size: 600
                        },
                        {
                            name: 'เอกสารรับรองสมาชิก2',
                            data: null,
                            size: 600
                    }]
                },
                {
                    title: 'สำเนาใบสำคัญการขึ้นทะเบียนต้นตำรับยา/อาหารสัตว์/อื่นๆ',
                    subtitle: '(อย่างน้อย3ผลิตภัณฑ์)',
                    pdf: [{
                            name: 'ใบสำคัญขึ้นทะเบียน1',
                            data: null,
                            size: 600
                        },
                        {
                            name: 'ใบสำคัญขึ้นทะเบียน2',
                            data: null,
                            size: 600
                    },
                    {
                            name: 'ใบสำคัญขึ้นทะเบียน3',
                            data: null,
                            size: 600
                    }]
                },
                {
                    title: 'หนังสือรับรองเป็นตัวแทนจำหน่าย',
                    subtitle: '(กรณีที่ผู้สมัครนำผลิตภัณฑ์ของผู้อื่นมาจำหน่ายให้ขอเอกสารรับรองจากเจ้าของ ทะเบียนด้วย)',
                    pdf: [{
                            name: 'เอกสารรับรองตัวแทนจำหน่าย',
                            data: null,
                            size: 600
                        }]
                },
            ]
        }
    },
    methods: {
        deletePdf (index, indexIn) {
            this.formatData[index].pdf.splice(indexIn, 1);
        }
    },
}
</script>
<style scoped>
.dot__border {
    
    border: 1px solid #E6E6E6;
}
.upload__card {
    color: #78CD6B;
    border: 1px dashed #78CD6B;
    background: #F2FAF0;
    height: 50px;
    border-width: 2px;
}
.text__size {
    font-size: 14px;
}
</style>
<style>
.theme--light.v-expansion-panels .v-expansion-panel {
    background-color: #FAFAFA;
    /* color: rgba(0, 0, 0, 0.87); */
}
.red__color {
    color: red;
}
</style>