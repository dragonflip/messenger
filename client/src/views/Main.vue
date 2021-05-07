<template>
  <div class="container" style="height: 100vh">
    <div class="row flex-column h-100">
      <div class="nav_bar d-flex" style="border-bottom: 1px solid #dfe1e5">
        <div class="col-lg-4 p-0" style="border-right: 1px solid #dfe1e5">
          <v-app-bar elevation="0" color="white">
            <!-- <div class="col-lg-4 p-0"> -->
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Messenger</v-toolbar-title>
            <!-- </div> -->
          </v-app-bar>
        </div>
        <div class="col-lg-8 p-0">
          <v-app-bar elevation="0" color="white">
            <!-- <div class="col-lg-4 p-0"> -->
            <v-avatar color="accent" size="50"
              ><span class="white--text">І М</span></v-avatar
            >

            <h5 class="ml-2 mb-0 d-flex flex-column">
              Ігор Модняк
              <span class="green--text" style="font-size: 60%">Online</span>
            </h5>
          </v-app-bar>
        </div>
      </div>
      <div class="chats_wrapper d-flex" style="flex: 1">
        <v-list class="col-lg-4 chats p-0">
          <v-list-item-group mandatory>
            <v-list-item class="chat d-flex">
              <div class="photo">
                <v-avatar color="accent" size="55"
                  ><span class="white--text">І М</span></v-avatar
                >
              </div>
              <div class="message-details w-100">
                <div class="message-title d-flex justify-space-between">
                  <div class="name">Ігор Модняк</div>
                  <div class="time">20:17</div>
                </div>
                <div class="message-subtitle d-flex">
                  <div class="message">
                    Куку, пишу тобі тестове повідомлення
                  </div>
                </div>
              </div>
            </v-list-item>
            <v-list-item class="chat d-flex">
              <div class="photo">
                <v-avatar color="#ff695d" size="55"
                  ><span class="white--text">В К</span></v-avatar
                >
              </div>
              <div class="message-details w-100">
                <div class="message-title d-flex justify-space-between">
                  <div class="name">Василь Крутий</div>
                  <div class="time">01:07</div>
                </div>
                <div class="message-subtitle d-flex">
                  <div class="message">Ого, маєш крутий месенджер</div>
                </div>
              </div>
            </v-list-item>
            <v-list-item class="chat d-flex">
              <div class="photo">
                <v-avatar color="#b882ff" size="55"
                  ><span class="white--text">П Л</span></v-avatar
                >
              </div>
              <div class="message-details w-100">
                <div class="message-title d-flex justify-space-between">
                  <div class="name">Петро Лапас</div>
                  <div class="time">06.05.2021</div>
                </div>
                <div class="message-subtitle d-flex">
                  <div class="message">Пишу, чисто по приколу</div>
                </div>
              </div>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <div
          class="col-lg-8 d-flex justify-content-end flex-column messages_wrapper"
        >
          <div class="messages d-flex flex-column px-5 mb-5">
            <div class="to">Дивися шо умію</div>
            <div class="from">Нє, ну ти крутий кнш</div>
            <div class="from">Ніц не скажеш</div>
            <div class="to">Крутий мужик😎</div>
          </div>
          <div class="send_message w-100 mb-5 d-flex">
            <v-form class="d-flex w-100">
              <v-text-field
                type="text"
                label="Повідомлення"
                required
                autofocus
                hide-details="auto"
                autocomplete="false"
                class="ml-5"
              ></v-text-field>
              <v-btn
                x-large
                elevation="0"
                color="white"
                class="ml-1 align-self-end"
                style="height: 55px; width: 60px; min-width: auto"
              >
                <v-icon color="primary">mdi-send</v-icon>
              </v-btn>
            </v-form>
          </div>
          <!-- <h3 class="text-muted">Оберіть чат для спілкування</h3> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {};
  },
  mounted() {
    if (!localStorage.login) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.container {
  border-left: 1px solid #dfe1e5;
  border-right: 1px solid #dfe1e5;
}

.chats {
  /* background: #ddd; */
  border-right: 1px solid #dfe1e5 !important;
}

.chat {
  padding: 10px !important;
}

.chat .photo {
  /* width: 60px; */
  margin-right: 10px;
}

.chat .photo img {
  width: 55px;
}

.chat .name {
  /* width: 100px; */
  font-weight: 700;
}

.chat .message {
  overflow: hidden;
  height: 24px;
  font-size: 15px;
}

.chat .time {
  font-size: 13px;
}

.messages .to {
  background: #1976d2;
  color: #fff;
  padding: 5px 12px;
  border-radius: 15px;
  margin-top: 10px;
  align-self: flex-end;
}

.messages .from {
  background: #eee;
  color: #000;
  padding: 5px 12px;
  border-radius: 15px;
  margin-top: 10px;
  align-self: flex-start;
}
</style>