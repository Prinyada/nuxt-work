<template>
  <v-container class="container-contact">
    <div>
      <v-img
        style="
          z-index: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: 100%;
          height: auto;
        "
        :src="require('~/assets/img/user/news-bg.svg')"
      />
      <v-row
        style="
          margin-top: 42px;
          z-index: 1;
          font-size: 20px;
          font-weight: 700;
          position: relative;
          white-space: nowrap;
        "
        align="center"
      >
        <v-col
          ><v-icon
            style="
              font-size: 32px !important;
              background-color: #fff;
              border-radius: 100%;
            "
            color="rgba(120, 205, 107, 1)"
            @click="$router.back()"
            >mdi-chevron-left</v-icon
          ></v-col
        >
        <v-col
          ><v-row justify="center" style="color: #ffffff"
            >ติดต่อสมาคม</v-row
          ></v-col
        >
        <v-col></v-col>
      </v-row>
    </div>
    <div class="headers">
      <Loading :overlay="overlay" />
      <v-row v-show="!overlay" justify="center">
        <v-col cols="12" class="text-title">ที่อยู่</v-col>
        <v-col cols="12" class="text-sub">
          <p style="margin-bottom: 0px;">สมาคมธุรกิจเวชภัณฑ์สัตว์</p>
          <p>2/9 หมู่ 3 ถ.รังสิต-นครนายกต.ลำผักกูด อ.ธัญบุรี จ.ปทุมธานี 12110</p>
        </v-col>
        <v-col cols="6" class="text-title">เบอร์โทร / แฟกซ์</v-col>
        <v-col cols="6" class="text-title">เบอร์โทรศัพท์</v-col>
        <v-col cols="6" class="text-sub">
          <a href="tel:029055138p2" style="text-decoration: none; color: #000000;">0-2905-5138 กด 2</a>
        </v-col>
        <v-col cols="6" class="text-sub">
          <a href="tel:0922712050" style="text-decoration: none; color: #000000;">092-271-2050</a>
        </v-col>
        <v-col cols="12" class="text-title">อีเมล</v-col>
        <v-col cols="12" class="text-sub">
          <a href="mailto:ahpa@thaiahpa.com" style="margin-bottom: 0px; text-decoration: none; color: #000000;">ahpa@thaiahpa.com</a>
          <a href="mailto:nantarat.sueb@gmail.com" style="text-decoration: none; color: #000000;">nantarat.sueb@gmail.com</a>
        </v-col>
        <v-col cols="12" class="text-title">แผนที่</v-col>
        <v-col cols="12">
          <div class="box-image">
            <v-img
              class="image-map"
              :src="require(`~/assets/img/user/mapAhpa.png`)"
            />
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
export default {
  layout: 'empty',
  data() {
    return {
      contactResults: [],
      overlay: true,
    }
  },
  mounted() {
    this.apiGetDateContact()
  },
  updated() {
    this.$emit('getShow', true)
  },
  methods: {
    async apiGetDateContact() {
      this.overlay = true
      const res = await this.$axios
        .get(`/api/user/getContactGuild`)
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200) {
        const results = res.data.result
        this.contactResults = results[0]
        this.overlay = false
      }
    },
  },
}
</script>
<style scoped>
.container-contact {
  padding-top: 5%;
  background-color: rgba(242, 250, 240, 1);
  position: relative;
  overflow: hidden;
  z-index: 0;
  width: 100%;
  height: 100%;
}
.headers {
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: 16px;
  padding-top: 40px;
  border-radius: 16px;
  background-color: #fff;
}
.box-image {
  position: relative;
  width: 358px;
  height: 269px;
  background-color: #fff;
  border: 1px solid rgba(230, 230, 230, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}
.box-image .image-map {
  /* position: absolute; */
  width: 100%;
  height: 100%;
}
.text-title {
  font-size: 14px;
  font-weight: 400;
  color: rgba(152, 152, 152, 1);
  padding-bottom: 4px !important;
  padding-top: 0px !important;
}
.text-sub {
  font-size: 16px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  padding-top: 0px !important;
}
</style>