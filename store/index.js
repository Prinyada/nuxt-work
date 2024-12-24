export default {
  namespaced: true,

  state() {
    return {
      specialNews: {},
      contact: {},
      title_page: '',
      company: {},
      member_no: {},
      member_details: {},
      type_user: '',
      accountId: '',
      file: [],
      admin: null
    }
  },
  mutations: {
    setAdmin(state, payload) {
      state.admin = payload
    },
    clearAdmin(state) {
      state.admin = null
    },
    setSpecialNews(state, payload) {
      state.specialNews = payload
    },
    setContact(state, payload) {
      state.contact = payload
    },
    setTitlePage(state, payload) {
      state.title_page = payload
    },
    setCompanyDetails(state, payload) {
      state.company = payload
    },
    getMember(state, payload) {
      state.member_no = payload
    },
    setMemberDetails(state, payload) {
      state.member_details = payload;
    },
    setTypeUser(state, payload) {
      state.type_user = payload;
    },
    getAccountId(state, payload) {
      state.accountId = payload
    },
    setFile(state, payload) {
      state.file = payload
    }
  },
  actions: {
    login({ commit }, adminData) {
      commit('setAdmin', adminData) // ตั้งค่าข้อมูลผู้ใช้
    },
    logout({ commit }) {
      commit('clearAdmin') // เรียก mutation เพื่อล้างข้อมูล
    },
    // menu
    getTitlePage({ commit }, titlePage) {
      let titleName = ''
      if (titlePage === 'FAQ') {
        titleName = 'คำถามที่พบบ่อย'
      }
      if (titlePage === 'contact') {
        titleName = 'ติดต่อสมาคม'
      }
      if (titlePage === 'info') {
        titleName = 'ข้อมูลสมาชิก'
      }
      if (titlePage === 'association') {
        titleName = 'สมาชิกสมาคม'
      }
      if (titlePage === 'news') {
        titleName = 'ข่าวสาร'
      }
      if (titlePage === 'activities') {
        titleName = 'กิจกรรมสมาคม'
      }
      if (titlePage === 'committee') {
        titleName = 'คณะกรรมการ'
      }
      commit('setTitlePage', titleName)
    },
    setCompanyDetails({ commit }, data) {
      commit('setCompanyDetails', data)
    },
    setFile({ commit }, data) {
      commit('setFile', data)
    },
    async getApiSpecialNews({ commit }) {
      const res = await this.$axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        url: `/api/user/getSpecialNewAndEvent`,
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200) {
        commit('setSpecialNews', res.data)
      }
    },
    async apiGetDateContact({ commit }) {
      const res = await this.$axios({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        url: `/api/user/getContactGuild`,
      })
        .then((response) => {
          return response
        })
        .catch((err) => {
          return err.response
        })
      if (res.status === 200) {
        const results = res.data.result
        commit('setContact', results)
      }
    },
    setMemberNo(context, { memberNo }) {
      context.commit('getMember', memberNo)
    },
    setMemberDetails(context, { data }) {
      context.commit('getMemberDetails', data)
    },
    setTypeUser(context, { type }) {
      context.commit('getTypeUser', type)
    },
    // setLogout(context, { data }) {
    //   context.commit('logout', data)
    // },
    setAccountId(context, { account }) {
      context.commit('getAccountId', account)
    },
  },
}
