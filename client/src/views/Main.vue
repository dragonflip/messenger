<template>
  <v-app>
    <div class="container-lg">
      <div class="row no-gutters">
        <div class="col-4 no-gutters ls">
          <div>
            <v-app-bar color="grey lighten-2" dense dark>
              <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

              <!--v-toolbar-title>Page title</-v-toolbar-title-->

              <v-spacer></v-spacer>

              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                </template>
                <span>Пошук</span>
              </v-tooltip>
            </v-app-bar>

            <div v-for="user in usersList" :key="user.id">
              <div class="Mblock">
                <div>
                  <img class="PIMG" src="../assets/m2.png" alt="avatar" />
                </div>
                <div class="PNAME">{{ user.name }}</div>
                <div class="PTIME">{{ user.time }}</div>
                <div class="PMES">{{ user.message }}</div>
              </div>
            </div>

            <v-navigation-drawer
              v-model="drawer"
              absolute
              temporary
              color="grey lighten-3"
            >
              <v-list nav dense>
                <v-list-item-group
                  v-model="group"
                  active-class="grey lighten-1"
                >
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Home</v-list-item-title>
                  </v-list-item>

                  <v-list-item color="">
                    <v-list-item-icon>
                      <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Account</v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-navigation-drawer>
          </div>
        </div>

        <div class="col-8 no-gutters">
          <div class="right-side" style="background: #cacaca"></div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,

    usersList: [
      {
        name: "Ivan",
        time: "19:32",
        message: "Hellow How are U",
      },
      {
        name: "Vasia",
        time: "10:32",
        message: "KKKKKKKKkfbew,fvrwe f rewf",
      },
      {
        name: "KKK",
        time: "11:32",
        message: "lol",
      },
    ],
  }),

  computed: {},

  methods: {},
};
</script>


<style lang="scss" scoped>
.left-side,
.right-side {
  height: 100vh;
  width: 100%;
}

.PNAME {
  font-size: 18px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  grid-area: PNAME;
  margin-left: 10px;
  margin-top: 5px;
}

.ls {
  background-color: #e0e0e0;
}

.PTIME {
  font-size: 1rem;
  grid-area: PTIME;
  margin-top: 5px;
}

.PMES {
  padding-left: 5px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  grid-area: PMES;
}

.PIMG {
  border-radius: 100%;
  background-color: #424242;
  margin-top: 10px;
  height: 45px;
  grid-area: PIMG;
}

.Mblock {
  display: grid;
  grid-gap: 1px;
  grid-template-areas:
    "PIMG PIMG PNAME PNAME PNAME PTIME"
    "PIMG PIMG PMES PMES PMES PMES"
    "PIMG PIMG PMES PMES PMES PMES";
  background-color: #e0e0e0;
  height: 87px;
  width: 100%;
  border-radius: 10px;
  padding: 5px;
}

.Mblock:hover {
  cursor: pointer;
  background-color: #bdbdbd;
}

.Mblock.active {
  background-color: #fff8e1;
}

.v-icon {
  color: #000000 !important;
}

.v-btn:hover {
  background-color: #bdbdbd;
}

.left-side {
  background-color: #f5f5f5;
}

.navb {
  background-color: #303434;
  height: 8.5vh;
}

.v-list-item-title {
  color: red !important;
}

.right-side {
  background-color: #ffffff;
}
</style>