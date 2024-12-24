<template>
  <v-container>
    <UserAppbarApp v-if="show" />
    <UserMenuFaq v-if="openFormUserFaq" @getShow="fnShow" />
    <UserMenuContact v-if="openFormUserContact" @getShow="fnShow" />
    <UserMenuMemberInfo v-if="openFormUserDetails" @getShow="fnShow" />
    <UserMenuMemberAssociation
      v-if="openFormUserAssociation"
      @getShow="fnShow"
    />
    <UserMenuMemberCommittee v-if="openFormUserCommittee" @getShow="fnShow" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'empty',
  data() {
    return {
      openFormUserFaq: false,
      openFormUserContact: false,
      openFormUserDetails: false,
      openFormUserAssociation: false,
      openFormUserCommittee: false,
      show: false,
    }
  },
  computed: {
    ...mapState('home', ['title_page']),
  },
  mounted() {
    if (this.$route.params.menu === 'FAQ') {
      this.openFormUserFaq = true
    }
    if (this.$route.params.menu === 'contact') {
      this.openFormUserContact = true
    }
    if (this.$route.params.menu === 'info') {
      this.openFormUserDetails = true
    }
    if (this.$route.params.menu === 'association') {
      this.openFormUserAssociation = true
    }
    if (this.$route.params.menu === 'committee') {
      this.openFormUserCommittee = true
    }
  },
  methods: {
    fnShow(value) {
      this.show = value
    },
  },
}
</script>
<style scoped>
.container {
  background-color: rgba(242, 250, 240, 1);
  height: 100%;
}
</style>