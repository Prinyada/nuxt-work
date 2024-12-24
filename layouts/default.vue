<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" color="#78CD6B" app class="container-sidebar">
      <v-list>
        <v-row no-gutters align="center">
          <v-img max-height="43" max-width="40" class="ml-2 mr-2 my-5 mt-3"
            :src="require(`~/assets/admin/LOGO AHPA 1.svg`)" />
          <div class="ml-14" style="margin-top: -75px">
            <v-row no-gutters class="text_item_big">สมาคมธุรกิจเวชภัณฑ์สัตว์</v-row>
            <v-row no-gutters class="text_item_small">Animal Health Products Association</v-row>
          </div>
        </v-row>
      </v-list>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact class="mx-4 rounded-lg"
          color="rgba(200, 235, 194, 0.7)">
          <v-list-item-action>
            <v-img :src="item.icon"></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <span class="white__color">
                {{ item.title }}
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app class="app__bar">
      <v-icon @click="toggleDrawer" color="#78CD6B">mdi-menu</v-icon>
      <v-spacer></v-spacer>
      <v-menu nudge-bottom="42">
        <template #activator="{ on, attrs }">
          <v-btn v-bind="attrs" class="account__btn" elevation="0" v-on="on">
            <img v-if="setAdmin" height="40" width="auto" :src="require(`~/assets/img/user/Non-profile.png`)" />

            <div class="ml-2 mr-2">
              <v-row v-if="setAdmin" no-gutters class="text__big">{{ adminData.full_name }}</v-row>
              <v-row v-if="setAdmin" no-gutters class="text__small">{{ adminData.role }}</v-row>
            </div>
            <v-icon class="icon__logout" color="#78CD6B">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link dense>
            <v-list-item-title>
              <div class="justify-end d-flex list__baseline" @click="logout()">
                <div class="text__logout">LogOut</div>
                <v-icon class="icon__logout ml-2"> mdi-logout </v-icon>
              </div>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main style="background-color: #f3f7f7;">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: true,
      fixed: false,
      items: [
        {
          icon: require('@/assets/info/users.svg'),
          title: 'ข้อมูลสมาชิก',
          to: '/admin/information',
        },
        // {
        //   icon: require('@/assets/info/edit.svg'),
        //   title: 'จัดการข้อมูลสมาชิก',
        //   to: '/admin/manage',
        // },
      ],
      miniVariant: false,
      token: '',
      adminData: null,
      setAdmin: false 
    }
  },
  mounted() {
    this.adminData = this.$store.state.admin
    this.setAdmin = true
  },
  methods: {
    ...mapActions('auth', ['setLogout']),
    toggleDrawer () {
      this.drawer = !this.drawer
    },
    logout() {
      this.$store.dispatch('logout') // ล้างข้อมูลใน Store
      this.$router.push('/admin/') // นำผู้ใช้ไปหน้า Login
    },
  },
}
</script>
<style scoped>
/* .v-main__wrap {
  background-color: #f3f7f7 !important;
} */
.container-sidebar {
  height: 100vh;
}
.tile {
  margin-inline: 16px;
  border-radius: 16px;
}

.tile:hover {
  background: rgba(200, 235, 194, 0.7);
}

.v-list .v-list-item--active {
  background-color: rgba(200, 235, 194, 0.7);
  /* margin-inline: 16px; */
}

/* .v-list-item {
  margin-inline: 16px;
} */
/* .v-list-item--link:before {
  border-radius: 8px;
} */
/* .theme--light.v-list-item--active::before {
  opacity: 0.7;
  color: rgba(200, 235, 194);
} */
.text__big {
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  color: #78cd6b;
}

.text__small {
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
  color: #989898;
}

.text_item_big {
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  text-align: left;
  color: #03753a;
}

.text_item_small {
  font-size: 11.5px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  color: #f2f2f2;
}

.text__logout {
  font-size: 15px;
}

.icon__logout {
  width: 30px;
  height: 16px;
}

.app__bar {
  box-shadow: 0px 2px 4px -4.5px #000000FF !important;
}

.account__btn {
  border-radius: 0;
  border-left: 1px solid #E6E6E6;
  height: 42px !important;
}
</style>

<style>
.white__color {
  color: white;
}

.main__color {
  color: #78cd6b;
}

.grey-color {
  color: #989898;
}

.text__title {
  font-weight: 700;
}
</style>
