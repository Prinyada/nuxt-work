export default {
    namespaced: true,
    state () {
        return {
            member_no:{},
            member_details:{},
            type_user:'',
            title_page:'',
            accountId: ''
        }
    },
    mutations: {
        getMember(state, payload){
            state.member_no = payload
        },
        getMemberDetails(state, payload){
            state.member_details = payload
        },
        getTypeUser(state, payload){
            state.type_user = payload
        },
        setTitlePage(state, payload){
            state.title_page = payload
        },
        logout (state, payload) {
            localStorage.removeItem('accessTokenApha')
            this.$router.replace('/')
        },
        getAccountId (state, payload) {
            state.accountId = payload
        }
        
    },
    actions: {
        setMemberNo(context,{memberNo}){
            context.commit('getMember',memberNo)
        },
        setMemberDetails(context,{data}){
            context.commit('getMemberDetails',data)
        },
        setTypeUser(context,{type}){
            context.commit('getTypeUser',type)
        },
        setLogout(context, {data}){
            context.commit('logout',data)
        },
        setAccountId(context, {account}) {
            context.commit('getAccountId', account)
        }
    }
}