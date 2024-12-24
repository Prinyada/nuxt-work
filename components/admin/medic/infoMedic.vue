<template>
  <v-expansion-panels v-model="panel" multiple>
  <v-expansion-panel
    class="px-6"
  >
    <v-expansion-panel-header class="pa-0">
      <h4>ทะเบียนยาสัตว์</h4>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div>
         <v-divider></v-divider>
      <v-card elevation="0" class="mt-6 mb-2 card__dark d-flex justify-center align-center" height="418">
          <div  width="20">
              <v-img
                  :src="require('@/assets/feed/nodata.svg')"
                  contain
                  max-height="150"
                  max-width="250"
                  class="mb-10"
              ></v-img>

          <body>ไม่มีข้อมูลการขึ้นทะเบียนอาหารสัตว์</body>
          </div>


      </v-card>
      </div>

    </v-expansion-panel-content>
  </v-expansion-panel>
</v-expansion-panels>
</template>
<script>
export default {
  data() {
    return {
      panel: [0, 1],
    }
  },
}
</script>
<style scoped>
.card__dark {
  background-color: #F2F2F2;
}
.border__card .v-sheet.v-card {
    border-radius: 8px;
}
</style>