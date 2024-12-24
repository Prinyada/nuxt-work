<template>
  <v-form v-model="valid">
    <v-row class="member-edit-container">
      <v-col class="title-products" cols="12">
        <span class="text-title">ข้อมูลผลิตภัณฑ์</span>
        <div class="add-product" @click="addTypeProduct()">
          <v-icon color="rgba(120, 205, 107, 1)"
            >mdi-plus-circle-outline</v-icon
          >
          <span class="add-title">เพิ่มประเภทผลิตภัณฑ์</span>
        </div>
      </v-col>
      <v-col
        v-for="(productsType, typeIndex) in productDetails"
        :key="typeIndex"
        class="product-detail"
      >
        <span v-if="!productsType.createNew" cols="12" class="product-detail-header">{{productsType.type_product_name}}</span>
        <v-col v-if="productsType.createNew" cols="12" class="add-product-detail">
          <span>ตัวอย่างรายชื่อผลิตภัณฑ์ประเภท</span>
          <v-text-field
            v-model="productsType.type_product_name"
            hide-details
            dense
            outlined
            :rules="validRules"
            required
            background-color="white"
            placeholder="ระบุประเภทผลิตภัณฑ์"
          />
        </v-col>
        <v-col
          v-for="(product, index) in productsType.product"
          :key="index"
          class="type-products"
        >
          <v-col class="title-products" cols="12">
            <span class="text-title">รายการที่ {{ index + 1 }}</span>
            <div class="delete-product" @click="deleteProduct(typeIndex, index)">
              <v-icon color="#757D8A">mdi-trash-can</v-icon>
              <span class="text-trash">ลบ</span>
            </div>
          </v-col>
          <v-col cols="12" class="pt-0">
            <span cols="12" class="text-section">ชื่อสินค้า</span>
            <v-text-field
              v-model="product.product_name"
              hide-details
              dense
              outlined
              :rules="validRules"
              required
              background-color="white"
              placeholder="ระบุชื่อสินค้า"
            />
          </v-col>
          <v-col cols="12" class="pt-0">
            <span cols="12" class="text-section">ผู้ผลิต/ประเทศ</span>
            <v-text-field
              v-model="product.product_country"
              hide-details
              dense
              outlined
              :rules="validRules"
              required
              background-color="white"
              placeholder="ระบุผู้ผลิต/ประเทศ"
            />
          </v-col>
          <v-col cols="12" class="pt-0">
            <span cols="12" class="text-section">เลขทะเบียนยา/อาหารสัตว์</span>
            <v-text-field
              v-model="product.product_no"
              hide-details
              dense
              outlined
              :rules="validRules"
              required
              background-color="white"
              placeholder="ระบุเลขทะเบียนยา/อาหารสัตว์"
            />
          </v-col>
        </v-col>
        <v-col cols="12">
          <v-btn
            color="rgba(120, 205, 107, 1)"
            outlined
            width="100%"
            rounded
            @click="addProduct(typeIndex)"
          >
            <v-icon>mdi-plus</v-icon>
            เพิ่มรายการ
          </v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
export default {
  props: {
    products: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      productDetails: [],
      valid: false,
      validRules: [(v) => !!v || 'กรุณากรอกข้อมูล'],
    }
  },
  watch: {
    products(newValue) {
      this.productDetails = newValue
    },
    valid(newValue) {
      this.$emit('form2', newValue)
    },
  },
  updated() {
    this.dataSave()
  },
  methods: {
    addProduct(index) {
      this.productDetails[index].product.push({
        product_no: '',
        product_number: '',
        product_name: '',
        product_country: '',
      })
    },
    deleteProduct(typeProduct, product) {
      if (this.productDetails[typeProduct].product.length === 1) {
        this.productDetails.splice(typeProduct, 1)
      } else {
        this.productDetails[typeProduct].product.splice(product, 1)
      }
    },
    addTypeProduct() {
      this.productDetails.push({
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
        createNew: true,
      })
    },
    dataSave() {
      const dataSave = this.productDetails
      this.$emit('dataSave', dataSave)
    },
  },
}
</script>
<style scoped>
@media (max-width: 375px) {
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
  .delete-product {
  }
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
  .add-product > .add-title {
    border-bottom: 1px solid;
    color: rgba(120, 205, 107, 1);
    font-weight: 700;
  }
  .add-product > .text {
    border-bottom: 1px solid;
    color: rgba(196, 196, 196, 1) !important;
    font-weight: 700;
  }
  .product-detail {
  }
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
  .delete-product {
  }
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
  .add-product > .add-title {
    border-bottom: 1px solid;
    color: rgba(120, 205, 107, 1);
    font-weight: 700;
  }
  .add-product > .text {
    border-bottom: 1px solid;
    color: rgba(196, 196, 196, 1) !important;
    font-weight: 700;
  }
  .product-detail {
  }
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
  .delete-product {
  }
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
  .add-product > .add-title {
    border-bottom: 1px solid;
    color: rgba(120, 205, 107, 1);
    font-weight: 700;
  }
  .add-product > .text {
    border-bottom: 1px solid;
    color: rgba(196, 196, 196, 1) !important;
    font-weight: 700;
  }
  .product-detail {
  }
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