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

            <div class="Mblock"></div>
            <div class="Mblock"></div>
            <div class="Mblock"></div>
            <div class="Mblock"></div>
            <div class="Mblock"></div>

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

.ls {
  background-color: #e0e0e0;
}

.Mblock {
  background-color: #e0e0e0;
  height: 80px;
  width: 100%;
  border-radius: 10px;
}

.Mblock:hover {
  cursor: pointer;
  background-color: #bdbdbd;
}

.v-icon {
  color: #000000 !important;
  opacity: 65% !important;
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