<template>
    <v-row>
        <v-col>
            <v-overlay :value="loading"></v-overlay>
            <div class="text-center progress-center" v-show="loading">
                <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
            </div>
            <div v-show="!loading">
                <v-dialog v-model="dialog" max-width="70%">
                    <v-card>
                        <v-card-title class="headline text-center">
                            <v-row class="justify-center text-center" ref="pdfform">
                                <v-spacer></v-spacer>
                                <v-col cols="10">
                                </v-col>
                                <v-col cols="1" sm="1" md="1" lg="1">
                                    <v-btn icon color="#166BF9" @click="dialog = false">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-title>
                        <v-card-text>
                            <v-card outlined>
                                <!-- <pdf :src="src" :page="1" /> -->
                            </v-card>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </div>
        </v-col>
    </v-row>
</template>

<script>
// import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'
// import pdf from "vue-pdf";
export default {
    props: {
        filepdf: { type: String, default: null }
    },
    data: () => ({
        dialog: false,
        src: '',
        file: '',
        numPages: undefined,
        loading: false
    }),
    components: {
        // FormDocument
        // pdf
        // VuePdfEmbed
    },
    mounted() {
        this.getdata(this.filepdf)
    },
    created() {
        // this.url = process.env.VUE_APP_API_URL
    },
    watch: {
        dialog(val) {
            if (val === false) {
                this.loading = false
                this.$refs.pdfform.scrollIntoView()
            }
        }
    },
    methods: {
        async getdata(id) {
            this.loading = true
            const res = await this.$axios
                .get(`/api/user/getLinkPdf?files_company_id=${id}`)
                    .then((response) => {
                    return response
                })
                    .catch((err) => {
                    return err.response
                })
            if (res.status === 200) {
                this.dialog = true
                this.src = res.data.urlPdf
                // this.provinceAll = res.data.results
            }
            // const getLink = await this.axios({
            //     method: 'GET',
            //     url: `${process.env.VUE_APP_API_URL}/api/payment/getreceipt?order_id=${item.order_id}`
            // }).then((response) => {
            //     return response
            // }).catch((err) => {
            //     return err.response
            // })
            // this.dialog = true
            // this.src = getLink.data.pdfURL.pdfURL
        }
    },
    beforeDestroy() {
    }
}
</script>

<style scoped>
.progress-center {
    margin: 0;
    position: fixed;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.pdf-border {
    border-radius: 16px 0px 0px 0px;
}
</style>