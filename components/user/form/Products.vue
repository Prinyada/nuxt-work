<template>
    <p>ppp</p>
    <!-- <v-form v-model="valid">
        <v-row align="center">
            <v-col class="title-products" cols="12">
                <div class="text-title">ข้อมูลผลิตภัณฑ์</div>
                <div class="add-product" @click="addTypeProduct()">
                    <v-icon color="rgba(120, 205, 107, 1)">mdi-plus-circle-outline</v-icon>
                    <div class="add-title">เพิ่มประเภทผลิตภัณฑ์</div>
                </div>
            </v-col>
            <v-col  v-for="(productsType,typeIndex) in productDetails" :key="typeIndex" cols="12">
                <v-col v-if="!productsType.createNew" cols="12">{{ productsType.type_product_name }}</v-col>
                <v-col v-if="productsType.createNew" cols="12">ตัวอย่างรายชื่อผลิตภัณฑ์ประเภท</v-col>
                <v-col v-if="productsType.createNew" cols="12"><v-text-field v-model="productsType.type_product_name" height="40" hide-details dense outlined :rules="validRules" required></v-text-field></v-col>
                <v-col v-for="(product, index) in productsType.product" :key="index" cols="12" class="type-products mt-4">
                    <v-col class="title-products" cols="12">
                        <div class="text-title">รายการที่ {{ index + 1 }}</div>
                        <div class="add-product" @click="deleteProduct(typeIndex,index)">
                            <div class="color-trash"><v-img width="32" :src="require('~/assets/img/user/trash.svg')" /></div>
                            <div class="text">ลบ</div>
                        </div>
                    </v-col>
                    <v-col cols="12" class="text-section">ชื่อสินค้า</v-col>
                    <v-col cols="12" class="pt-0"><v-text-field v-model="product.product_name" height="40" hide-details dense outlined :rules="validRules" required></v-text-field></v-col>
                    <v-col cols="12" class="text-section">ผู้ผลิต/ประเทศ</v-col>
                    <v-col cols="12" class="pt-0"><v-text-field v-model="product.product_country" height="40" hide-details dense outlined :rules="validRules" required></v-text-field></v-col>
                    <v-col cols="12" class="text-section">เลขทะเบียนยา/อาหารสัตว์</v-col>
                    <v-col cols="12" class="pt-0"><v-text-field v-model="product.product_no" height="40" hide-details dense outlined :rules="validRules" required></v-text-field></v-col>
                </v-col>
                <v-col cols="12"><v-btn color="rgba(120, 205, 107, 1)" outlined width="100%" rounded @click="addProduct(typeIndex)"><v-icon>mdi-plus</v-icon>เพิ่มรายการ</v-btn></v-col>
            </v-col>
        </v-row>
    </v-form> -->
</template>
<script>
export default {
    props:{
        products: {
            type: Array,
            default: null
        },
    },
    data(){
        return {
            productDetails:[],
            valid: false,
            validRules: [
                v => !!v || 'กรุณากรอกข้อมูล',
            ],
        }
    },
    watch:{
        products(newValue){
            this.productDetails = newValue
        },
        valid(newValue){
            this.$emit('form2',newValue)
        }
    },
    updated(){
        this.dataSave()
    },
    methods:{
        addProduct(index){
            this.productDetails[index].product.push({
                product_no: '',
                product_number: '',
                product_name: '',
                product_country: ''
            })
        },
        deleteProduct(typeProduct,product){
            if(this.productDetails[typeProduct].product.length === 1){
                this.productDetails.splice(typeProduct,1)
            } else {
                this.productDetails[typeProduct].product.splice(product,1)
            }
        },
        addTypeProduct(){
            this.productDetails.push({
                type_product_id: '',
                type_product_name:'',
                product:[{
                    product_no: '',
                    product_number: '',
                    product_name: '',
                    product_country: ''
                }],
                createNew: true
            })
        },
        dataSave(){
            const dataSave = this.productDetails
            this.$emit('dataSave',dataSave)
        }       
        }
    }
</script>
<style scoped>
.v-text-field .v-input__control{
    border-radius: 8px;
}
.title-products {
    display: flex;
    justify-content: space-between;
}
.text-title{
    font-size: 16px;
    font-weight: 600;
}
.add-product{
    display: flex;
    gap: 2px;
    align-items: center;
}
.add-product > .add-title{
    border-bottom: 1px solid;
    color: rgba(120, 205, 107, 1);
    font-size: 16px;
    font-weight: 700;
}
.add-product > .text{
    border-bottom: 1px solid;
    color: rgba(196, 196, 196, 1) !important;
    font-size: 16px;
    font-weight: 700;
}
.type-products{
    background-color: rgba(250, 250, 250, 1);
    border-radius: 8px;
}
.color-trash{
    filter: brightness(0) saturate(100%) invert(64%) sepia(3%) saturate(398%) hue-rotate(184deg) brightness(97%) contrast(93%);
    width: 19px;
    height: 19px;
}
.text-section{
    font-size: 16px;
    font-weight: 500;
    color: rgba(152, 152, 152, 1)
}
</style>