<template>
  <div class="container-lg">
    <div class="row" style="margin: 0 -15px">
      <v-progress-linear
        indeterminate
        absolute
        color="primary"
        v-if="loading"
      ></v-progress-linear>

      <v-dialog v-model="dialog" max-width="450">
        <v-card>
          <v-card-title class="headline">
            Мій профіль

            <!-- <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn elevation="0" v-on="on" icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Редагувати профіль</span>
            </v-tooltip> -->

            <v-spacer></v-spacer>

            <v-btn elevation="0" icon @click="dialog = !dialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <img
            src="https://telegram.org/file/464001801/4/pPObBDJVv-M.32191.png/9963667389a3218249"
            style="
              width: 128px;
              height: 128px;
              border: 3px dashed #007bff;
              border-radius: 50%;
            "
            class="d-flex mx-auto"
          />

          <h5 class="text-center mt-2">
            {{ profile.firstname }} {{ profile.lastname }}
            <h6 class="green--text mt-1">Online</h6>
          </h5>

          <v-btn
            :color="!edit_profile ? 'primary' : 'white'"
            elevation="0"
            rounded
            @click="edit_profile = !edit_profile"
            class="d-flex mx-auto"
          >
            <span v-if="!edit_profile">Редагувати профіль</span>
            <span v-else>Скасувати редагування</span>
          </v-btn>

          <v-list three-line>
            <v-list-item v-ripple="!edit_profile">
              <v-list-item-icon>
                <v-icon> mdi-account-outline </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>
                  <span v-if="!edit_profile">
                    {{ profile.firstname }} {{ profile.lastname }}
                  </span>

                  <form class="d-flex py-1" v-else>
                    <v-text-field
                      type="text"
                      v-model.trim="profile.firstname"
                      name="firstname"
                      label="Ім'я"
                      autofocus
                      required
                      minlength="2"
                      maxlength="20"
                      autocomplete="off"
                      hide-details="auto"
                    ></v-text-field>
                    <v-text-field
                      type="text"
                      v-model.trim="profile.lastname"
                      name="lastname"
                      label="Прізвище"
                      minlength="2"
                      maxlength="20"
                      autocomplete="off"
                      hide-details="auto"
                      class="ml-4"
                    ></v-text-field>
                  </form>
                </v-list-item-title>
                <v-list-item-subtitle v-if="!edit_profile">
                  Ім'я та прізвище
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-ripple="!edit_profile">
              <v-list-item-icon>
                <v-icon> mdi-email-outline </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>
                  <span v-if="!edit_profile">{{ profile.email }}</span>

                  <form class="d-flex py-1" v-else>
                    <v-text-field
                      type="email"
                      v-model.trim="profile.email"
                      name="email"
                      label="E-mail"
                      required
                      autocomplete="off"
                      hide-details="auto"
                    ></v-text-field>
                  </form>
                </v-list-item-title>
                <v-list-item-subtitle v-if="!edit_profile">
                  E-mail
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-ripple="!edit_profile">
              <v-list-item-icon>
                <v-icon> mdi-information-outline </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>
                  <span v-if="!edit_profile">
                    <span v-if="profile.bio"></span>
                    <span v-else>Про себе</span>
                  </span>

                  <form class="d-flex py-1" v-else>
                    <v-text-field
                      type="text"
                      v-model.trim="profile.bio"
                      name="bio"
                      label="Про себе"
                      required
                      autocomplete="off"
                      hide-details="auto"
                    ></v-text-field>
                  </form>
                </v-list-item-title>
                <v-list-item-subtitle v-if="!edit_profile">
                  Кілька слів про себе
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-btn
              fab
              elevation="0"
              color="primary"
              v-if="edit_profile"
              class="d-flex ml-auto mr-5 mb-2"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-list>
        </v-card>
      </v-dialog>

      <!-- <v-window v-model="view" style="position: fixed; top: 0; left: 0">
        <v-window-item :value="'chats'">
          <h4>1 сторінка</h4>
        </v-window-item>
        <v-window-item :value="'messages'">
          <h4>2 сторінка</h4>
        </v-window-item>
      </v-window> -->

      <div class="col-lg-4 p-0">
        <div class="nav_bar d-flex">
          <v-menu offset-y min-width="300">
            <template v-slot:activator="{ on }">
              <v-app-bar flat color="white" height="64">
                <v-app-bar-nav-icon
                  @click="menu = !menu"
                  v-on="on"
                ></v-app-bar-nav-icon>
                <v-toolbar-title>Messenger</v-toolbar-title>
              </v-app-bar>
            </template>
            <v-list>
              <v-list-item @click="dialog = true">
                <v-icon class="pr-2">mdi-account-outline</v-icon>
                Профіль
              </v-list-item>
              <v-list-item>
                <v-icon class="pr-2">mdi-folder-account-outline</v-icon>
                Контакти
              </v-list-item>
              <v-list-item>
                <v-icon class="pr-2">mdi-cog-outline</v-icon>
                Налаштування
              </v-list-item>
              <v-list-item @click="logout()">
                <v-icon color="red" class="pr-2">mdi-logout</v-icon>
                <span class="red--text"> Вийти</span></v-list-item
              >
            </v-list>
          </v-menu>
        </div>

        <div class="chats_wrapper">
          <v-list
            class="chats p-0"
            style="height: calc(100vh - 65px); overflow-y: auto"
          >
            <v-list-item-group mandatory v-model="chat_id">
              <v-list-item class="d-none"></v-list-item>

              <v-list-item
                class="chat d-flex"
                v-for="(chat, i) in chats"
                :key="i"
              >
                <div class="photo">
                  <v-avatar :color="users[i].avatar_color" size="55"
                    ><span class="white--text">{{
                      chat.avatar
                    }}</span></v-avatar
                  >
                </div>
                <div class="message-details w-100">
                  <div class="message-title d-flex justify-space-between">
                    <div class="name">{{ chat.from }}</div>
                    <div class="time">
                      <v-icon
                        color="green"
                        style="font-size: 22px"
                        v-if="chat.out"
                        >{{
                          chat.status ? "mdi-check-all" : "mdi-check"
                        }}</v-icon
                      >
                      {{ chat.time }}
                    </div>
                  </div>
                  <div class="message-subtitle d-flex justify-space-between">
                    <div class="message">
                      {{ chat.message }}
                    </div>
                    <div
                      class="unread_count"
                      v-if="chat.unread_count > 0 && !chat.out"
                    >
                      <v-badge
                        :content="chat.unread_count"
                        color="green"
                        inline
                      ></v-badge>
                    </div>
                  </div>
                </div>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </div>
      </div>

      <div class="col-lg-8 p-0 d-none d-md-flex flex-column">
        <div class="nav_bar d-flex" v-if="chat_id > 0">
          <v-app-bar flat color="white">
            <v-avatar :color="users[chat_id - 1].avatar_color" size="50"
              ><span class="white--text">{{
                users[chat_id - 1].avatar
              }}</span></v-avatar
            >

            <h5 class="ml-2 mb-0 d-flex flex-column">
              {{ users[chat_id - 1].name }}
              <span
                :class="
                  users[chat_id - 1].online == 'Online'
                    ? 'green--text'
                    : 'grey--text'
                "
                style="font-size: 60%"
                >{{ users[chat_id - 1].online }}</span
              >
            </h5>
          </v-app-bar>
        </div>

        <div
          class="messages_view d-flex flex-column w-100 mt-auto"
          v-if="chat_id > 0"
        >
          <div class="messages d-flex flex-column px-5 mb-5">
            <div
              :class="message.out ? 'to' : 'from'"
              class="d-flex"
              v-for="(message, i) in all_messages[chat_id - 1].messages"
              :key="i"
            >
              <div class="message_text">{{ message.message }}</div>
              <div class="message_time align-self-end ml-1">
                {{ message.sent_date }}
              </div>
              <v-icon
                color="white"
                v-if="message.out"
                class="ml-1"
                style="font-size: 22px"
                >mdi-check-all</v-icon
              >
            </div>
          </div>
          <div class="send_message w-100 mb-5 d-flex">
            <v-form class="d-flex w-100">
              <v-text-field
                type="text"
                label="Повідомлення"
                required
                autofocus
                hide-details="auto"
                autocomplete="off"
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
        </div>

        <h3 v-else class="text-muted align-self-center my-auto">
          Оберіть чат для спілкування
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      // to_id: "ME",
      users: [
        {
          from_id: 1,
          avatar: "І М",
          avatar_color: "primary",
          name: "Ігор Модняк",
          online: "Останні відвідини 07.05.2021 в 21:01",
        },
        {
          from_id: 2,
          avatar: "П К",
          avatar_color: "green",
          name: "Петро Крутій",
          online: "Online",
        },
        {
          from_id: 3,
          avatar: "В П",
          avatar_color: "orange",
          name: "Василь Пупкін",
          online: "Online",
        },
        {
          from_id: 4,
          avatar: "В П",
          avatar_color: "orange",
          name: "Василь Пупкін",
          online: "Online",
        },
        {
          from_id: 5,
          avatar: "В П",
          avatar_color: "orange",
          name: "Василь Пупкін",
          online: "Online",
        },
        {
          from_id: 6,
          avatar: "В П",
          avatar_color: "orange",
          name: "Василь Пупкін",
          online: "Online",
        },
        {
          from_id: 7,
          avatar: "В П",
          avatar_color: "orange",
          name: "Василь Пупкін",
          online: "Online",
        },
        {
          from_id: 8,
          avatar: "В П",
          avatar_color: "orange",
          name: "Василь Пупкін",
          online: "Online",
        },
        {
          from_id: 9,
          avatar: "В П",
          avatar_color: "orange",
          name: "Василь Пупкін",
          online: "Online",
        },
        {
          from_id: 10,
          avatar: "В П",
          avatar_color: "orange",
          name: "Василь Пупкін",
          online: "Online",
        },
        {
          from_id: 11,
          avatar: "В П",
          avatar_color: "orange",
          name: "Василь Пупкін",
          online: "Online",
        },
        {
          from_id: 12,
          avatar: "В П",
          avatar_color: "orange",
          name: "Василь Пупкін",
          online: "Online",
        },
        {
          from_id: 13,
          avatar: "В П",
          avatar_color: "orange",
          name: "Василь Пупкін",
          online: "Online",
        },
        {
          from_id: 14,
          avatar: "В П",
          avatar_color: "orange",
          name: "Василь Пупкін",
          online: "Online",
        },
        {
          from_id: 15,
          avatar: "В П",
          avatar_color: "orange",
          name: "Василь Пупкін",
          online: "Online",
        },
      ],
      all_messages: [
        {
          messages: [
            {
              message: "Куку, пишу тобі тестове повідомлення",
              sent_date: "19:57",
              has_read: true,
              out: false,
            },
            {
              message: "Привіт, надсилаю тобі відповідь))",
              sent_date: "20:03",
              has_read: true,
              out: true,
            },
            {
              message: "А воно ріл працює, красава",
              sent_date: "20:07",
              has_read: true,
              out: false,
            },
          ],
        },
        {
          messages: [
            {
              message: "Чел, вроді всьо пахає класно. Ставлю вподобайку",
              sent_date: "13:14",
              has_read: true,
              out: false,
            },
            {
              message: "Подякував",
              sent_date: "13:15",
              has_read: true,
              out: true,
            },
          ],
        },
        {
          messages: [
            {
              message: "Диви шо можу",
              sent_date: "08:23",
              has_read: true,
              out: true,
            },
            {
              message: "Ого, маєш файний месенджер😎",
              sent_date: "08:23",
              has_read: true,
              out: false,
            },
          ],
        },
        {
          messages: [
            {
              message: "Диви шо можу",
              sent_date: "08:23",
              has_read: true,
              out: true,
            },
            {
              message: "Ого, маєш файний месенджер😎",
              sent_date: "08:23",
              has_read: true,
              out: false,
            },
          ],
        },
        {
          messages: [
            {
              message: "Диви шо можу",
              sent_date: "08:23",
              has_read: true,
              out: true,
            },
            {
              message: "Ого, маєш файний месенджер😎",
              sent_date: "08:23",
              has_read: true,
              out: false,
            },
          ],
        },
        {
          messages: [
            {
              message: "Диви шо можу",
              sent_date: "08:23",
              has_read: true,
              out: true,
            },
            {
              message: "Ого, маєш файний месенджер😎",
              sent_date: "08:23",
              has_read: true,
              out: false,
            },
          ],
        },
        {
          messages: [
            {
              message: "Диви шо можу",
              sent_date: "08:23",
              has_read: true,
              out: true,
            },
            {
              message: "Ого, маєш файний месенджер😎",
              sent_date: "08:23",
              has_read: true,
              out: false,
            },
          ],
        },
        {
          messages: [
            {
              message: "Диви шо можу",
              sent_date: "08:23",
              has_read: true,
              out: true,
            },
            {
              message: "Ого, маєш файний месенджер😎",
              sent_date: "08:23",
              has_read: true,
              out: false,
            },
          ],
        },
        {
          messages: [
            {
              message: "Диви шо можу",
              sent_date: "08:23",
              has_read: true,
              out: true,
            },
            {
              message: "Ого, маєш файний месенджер😎",
              sent_date: "08:23",
              has_read: true,
              out: false,
            },
          ],
        },
        {
          messages: [
            {
              message: "Диви шо можу",
              sent_date: "08:23",
              has_read: true,
              out: true,
            },
            {
              message: "Ого, маєш файний месенджер😎",
              sent_date: "08:23",
              has_read: true,
              out: false,
            },
          ],
        },
        {
          messages: [
            {
              message: "Диви шо можу",
              sent_date: "08:23",
              has_read: true,
              out: true,
            },
            {
              message: "Ого, маєш файний месенджер😎",
              sent_date: "08:23",
              has_read: true,
              out: false,
            },
          ],
        },
        {
          messages: [
            {
              message: "Диви шо можу",
              sent_date: "08:23",
              has_read: true,
              out: true,
            },
            {
              message: "Ого, маєш файний месенджер😎",
              sent_date: "08:23",
              has_read: true,
              out: false,
            },
          ],
        },
        {
          messages: [
            {
              message: "Диви шо можу",
              sent_date: "08:23",
              has_read: true,
              out: true,
            },
            {
              message: "Ого, маєш файний месенджер😎",
              sent_date: "08:23",
              has_read: true,
              out: false,
            },
          ],
        },
        {
          messages: [
            {
              message: "Диви шо можу",
              sent_date: "08:23",
              has_read: true,
              out: true,
            },
            {
              message: "Ого, маєш файний месенджер😎",
              sent_date: "08:23",
              has_read: true,
              out: false,
            },
          ],
        },
        {
          messages: [
            {
              message: "Диви шо можу",
              sent_date: "08:23",
              has_read: true,
              out: true,
            },
            {
              message: "Ого, маєш файний месенджер😎",
              sent_date: "08:23",
              has_read: true,
              out: false,
            },
          ],
        },
      ],

      chats: [
        {
          id: 1,
          avatar: "І М",
          from: "Ігор Модняк",
          message: "А воно ріл працює, красава",
          time: "20:07",
          status: 0,
          unread_count: 1,
          out: false,
        },
        {
          id: 2,
          avatar: "П К",
          from: "Петро Крутій",
          message: "Подякував",
          time: "13:15",
          status: 1,
          unread_count: 0,
          out: true,
        },
        {
          id: 3,
          avatar: "В П",
          from: "Василь Пупкін",
          message: "Ого, маєш файний месенджер😎",
          time: "06.05.2021",
          status: 0,
          unread_count: 0,
          out: false,
        },
        {
          id: 4,
          avatar: "І М",
          from: "Ігор Модняк",
          message: "А воно ріл працює, красава",
          time: "20:07",
          status: 0,
          unread_count: 1,
          out: false,
        },
        {
          id: 5,
          avatar: "П К",
          from: "Петро Крутій",
          message: "Подякував",
          time: "13:15",
          status: 1,
          unread_count: 0,
          out: true,
        },
        {
          id: 6,
          avatar: "В П",
          from: "Василь Пупкін",
          message: "Ого, маєш файний месенджер😎",
          time: "06.05.2021",
          status: 0,
          unread_count: 0,
          out: false,
        },
        {
          id: 7,
          avatar: "І М",
          from: "Ігор Модняк",
          message: "А воно ріл працює, красава",
          time: "20:07",
          status: 0,
          unread_count: 1,
          out: false,
        },
        {
          id: 8,
          avatar: "П К",
          from: "Петро Крутій",
          message: "Подякував",
          time: "13:15",
          status: 1,
          unread_count: 0,
          out: true,
        },
        {
          id: 9,
          avatar: "В П",
          from: "Василь Пупкін",
          message: "Ого, маєш файний месенджер😎",
          time: "06.05.2021",
          status: 0,
          unread_count: 0,
          out: false,
        },
        {
          id: 10,
          avatar: "І М",
          from: "Ігор Модняк",
          message: "А воно ріл працює, красава",
          time: "20:07",
          status: 0,
          unread_count: 1,
          out: false,
        },
        {
          id: 11,
          avatar: "П К",
          from: "Петро Крутій",
          message: "Подякував",
          time: "13:15",
          status: 1,
          unread_count: 0,
          out: true,
        },
        {
          id: 12,
          avatar: "В П",
          from: "Василь Пупкін",
          message: "Ого, маєш файний месенджер😎",
          time: "06.05.2021",
          status: 0,
          unread_count: 0,
          out: false,
        },
        {
          id: 13,
          avatar: "В П",
          from: "Василь Пупкін",
          message: "Ого, маєш файний месенджер😎",
          time: "06.05.2021",
          status: 0,
          unread_count: 0,
          out: false,
        },
        {
          id: 14,
          avatar: "В П",
          from: "Василь Пупкін",
          message: "Ого, маєш файний месенджер😎",
          time: "06.05.2021",
          status: 0,
          unread_count: 0,
          out: false,
        },
        {
          id: 15,
          avatar: "В П",
          from: "Василь Пупкін",
          message: "Ого, маєш файний месенджер😎",
          time: "06.05.2021",
          status: 0,
          unread_count: 0,
          out: false,
        },
      ],
      view: "chats",
      chat_id: 0,
      menu: false,
      loading: true,
      clicked: false,
      dialog: false,
      profile: {},
      user_id: null,
      edit_profile: false,
    };
  },
  methods: {
    logout: function () {
      localStorage.removeItem("login");

      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.$router.push("/login");
      }, 1000);
    },
  },
  async mounted() {
    if (!localStorage.token) {
      this.$router.push("/login");
    }

    console.log(`Mobile device: ${this.$vuetify.breakpoint.mobile}`);

    let res = await fetch(`/api/getUserID/${localStorage.token}`);
    const data = await res.json();
    this.user_id = data.id;

    if (this.user_id !== null) {
      this.loading = true;

      let res = await fetch(`/api/getProfile/${this.user_id}`);
      this.profile = await res.json();
    } else {
      this.loading = true;

      localStorage.removeItem("token");
      this.$router.push("/login");
    }

    setTimeout(() => (this.loading = false), 2000);
  },
  watch: {
    chat_id: function (value) {
      if (value > 0) {
        this.view = "messages";
      } else {
        this.view = "chats";
      }
    },
  },
};
</script>

<style scoped>
.container-lg {
  border-left: 1px solid #dfe1e5;
  border-right: 1px solid #dfe1e5;
}

.nav_bar {
  border-bottom: 1px solid #dfe1e5;
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
  height: 24px;
  font-size: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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

.to:after {
  content: "";
  border: 15px solid transparent;
  border-left-color: #1976d2;
  border-right: 0;
  /* border-bottom: 0; */
  margin-right: -20px;
}

.messages .from {
  background: #eee;
  color: #000;
  padding: 5px 12px;
  border-radius: 15px;
  margin-top: 10px;
  align-self: flex-start;
}

.from:before {
  content: "";
  border: 15px solid transparent;
  border-right-color: #eee;
  border-left: 0;
  margin-left: -20px;
}

.message_time {
  font-size: 80%;
}

.message-subtitle .message {
  max-width: 260px;
}

.v-list .v-list-item {
  padding: 0 24px;
  user-select: none;
}
</style>
