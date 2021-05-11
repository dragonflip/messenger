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
            :src="
              profile.profile_photo
                ? profile.profile_photo
                : 'https://telegram.org/file/464001801/4/pPObBDJVv-M.32191.png/9963667389a3218249'
            "
            style="width: 128px; height: 128px; border-radius: 50%"
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
                    <span v-if="profile.bio">{{ profile.bio }}</span>
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
                  <span v-if="profile.bio">Про себе</span>
                  <span v-else>Кілька слів про себе</span>
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

      <v-dialog v-model="search_dialog" max-width="450">
        <v-card>
          <v-card-title class="headline">
            Пошук людей

            <v-spacer></v-spacer>

            <v-btn elevation="0" icon @click="search_dialog = !search_dialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-list three-line>
            <v-list-item
              v-ripple
              v-for="(user, i) in users"
              :key="i"
              @click="selectUser(user.id)"
            >
              <v-list-item-icon>
                <v-avatar color="accent" size="50" v-if="!user.profile_photo">
                  <span class="white--text">
                    {{ user.firstname[0] }} {{ user.lastname[0] }}
                  </span>
                </v-avatar>
                <v-avatar size="50" v-else>
                  <img :src="user.profile_photo" />
                </v-avatar>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>
                  {{ user.firstname }} {{ user.lastname }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ user.bio ? user.bio : user.email }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
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
                <v-spacer></v-spacer>
                <v-btn icon @click="search_dialog = true">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
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
                  <v-avatar color="accent" size="55" v-if="!chat.profile_photo">
                    <span class="white--text">
                      {{ chat.firstname[0] }} {{ chat.lastname[0] }}
                    </span>
                  </v-avatar>
                  <v-avatar size="55" v-else>
                    <img :src="chat.profile_photo" />
                  </v-avatar>
                </div>
                <div class="message-details w-100">
                  <div class="message-title d-flex justify-space-between">
                    <div class="name">
                      {{ chat.firstname }} {{ chat.lastname }}
                    </div>
                    <div class="time">
                      <v-icon
                        color="green"
                        style="font-size: 22px"
                        v-if="chat.from_id === user_id"
                        >{{
                          chat.has_read ? "mdi-check-all" : "mdi-check"
                        }}</v-icon
                      >
                      {{ chat.sent_date }}
                    </div>
                  </div>
                  <div class="message-subtitle d-flex justify-space-between">
                    <div class="message">
                      <span v-if="chat.from_id === user_id">Ви:</span>
                      {{ chat.message }}
                    </div>
                    <div class="unread_count" v-if="chat.unread_count > 0">
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
            <v-avatar
              color="accent"
              size="50"
              v-if="!chats[chat_id - 1].profile_photo"
            >
              <span class="white--text">
                {{ chats[chat_id - 1].firstname[0] }}
                {{ chats[chat_id - 1].lastname[0] }}
              </span>
            </v-avatar>
            <v-avatar size="50" v-else>
              <img :src="chats[chat_id - 1].profile_photo" />
            </v-avatar>

            <h5 class="ml-2 mb-0 d-flex flex-column">
              {{ chats[chat_id - 1].firstname }}
              {{ chats[chat_id - 1].lastname }}
              <span
                class="green--text"
                style="font-size: 60%"
                v-if="chats[chat_id - 1].online"
                >Онлайн</span
              >
              <span class="grey--text" style="font-size: 60%" v-else
                >В мережі {{ chats[chat_id - 1].was_online }}</span
              >
            </h5>

            <v-spacer></v-spacer>

            <v-btn elevation="0" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-app-bar>
        </div>

        <div
          v-if="chat_id > 0"
          class="messages_view d-flex flex-column w-100 mt-auto"
        >
          <div
            class="messages d-flex flex-column px-5 mb-5"
            id="messages"
            style="height: calc(100vh - 160px); overflow-y: auto"
          >
            <div
              class="d-flex"
              v-for="(message, i) in messages"
              :key="i"
              :class="message.from_id === user_id ? 'to' : 'from'"
              style="max-width: 80%"
            >
              <div class="message_text">
                {{ message.message }}
              </div>
              <div class="message_time align-self-end ml-1">
                {{ message.sent_date }}
              </div>
              <span v-if="message.from_id === user_id">
                <v-icon
                  color="white"
                  class="ml-1"
                  style="font-size: 22px"
                  v-if="message.has_read"
                  >mdi-check-all</v-icon
                >
                <v-icon
                  color="white"
                  class="ml-1"
                  style="font-size: 22px"
                  v-else
                  >mdi-check</v-icon
                >
              </span>
            </div>
          </div>
          <div class="send_message w-100 mb-5 d-flex">
            <form class="d-flex w-100" @submit.prevent="send_message()">
              <v-textarea
                v-model="messageTextBox"
                label="Повідомлення"
                autofocus
                hide-details="auto"
                autocomplete="off"
                class="ml-5"
                id="messageTextBox"
                rows="1"
                auto-grow
                @keydown="send_message"
              ></v-textarea>
              <v-btn
                type="submit"
                x-large
                elevation="0"
                color="white"
                class="ml-1 align-self-end"
                style="height: 55px; width: 60px; min-width: auto"
              >
                <v-icon color="primary">mdi-send</v-icon>
              </v-btn>
            </form>
          </div>
        </div>

        <h3 v-else class="text-muted align-self-center my-auto">
          <span v-if="!chats.length">
            Знайдіть людей та почніть спілкування
          </span>
          <span v-else>Оберіть чат для спілкування</span>
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
      chats: {},
      messages: {},
      users: {},
      view: "chats",
      chat_id: 0,
      last_chat_id: 0,
      menu: false,
      loading: true,
      clicked: false,
      dialog: false,
      search_dialog: false,
      profile: {},
      user_id: null,
      edit_profile: false,
      messageTextBox: "",
      to_id: 0,
    };
  },
  methods: {
    logout: function () {
      localStorage.removeItem("token");

      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.$router.push("/login");
      }, 1000);
    },
    send_message: async function (e) {
      if (!this.messageTextBox.replace(/\s/g, "").length) {
        this.messageTextBox = "";
        return;
      }

      if (!e || (e.keyCode === 13 && !e.shiftKey)) {
        await fetch(`/api/sendMessage/${localStorage.token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from_id: this.user_id,
            to_id: this.chats[this.chat_id - 1].user_id,
            message: this.messageTextBox,
          }),
        });

        // let last_chat_id = this.chat_id;

        let res = await fetch(
          `/api/getMessages/${localStorage.token}/${
            this.chats[this.chat_id - 1].user_id
          }`
        );
        this.messages = await res.json();

        res = await fetch(`/api/getChats/${localStorage.token}`);
        this.chats = await res.json();

        this.messageTextBox = "";
        this.chat_id = 1;

        let scroll = await document.getElementById("messages");
        scroll.scrollTop = scroll.scrollHeight;
      }
    },
    selectUser: async function (id) {
      await fetch(`/api/sendMessage/${localStorage.token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from_id: this.user_id,
          to_id: id,
          message: "Привіт, розпочнемо спілкування!",
        }),
      });

      let res = await fetch(`/api/getChats/${localStorage.token}`);
      this.chats = await res.json();

      this.chat_id = 1;
    },
  },
  async mounted() {
    if (!localStorage.token) {
      this.$router.push("/login");
    }

    console.log(`Mobile device: ${this.$vuetify.breakpoint.mobile}`);

    // USER_ID
    let res = await fetch(`/api/getUserID/${localStorage.token}`);
    const data = await res.json();

    // MY PROFILE
    if (data.user_id !== null) {
      this.user_id = data.user_id;

      let res = await fetch(`/api/getProfile/${this.user_id}`);
      this.profile = await res.json();
    } else {
      localStorage.removeItem("token");
      this.$router.push("/login");
    }

    // CHATS
    res = await fetch(`/api/getChats/${localStorage.token}`);
    this.chats = await res.json();

    if (!this.chats.length) {
      this.search_dialog = true;
    }

    setTimeout(() => (this.loading = false), 2000);

    // Update online status
    setInterval(async () => {
      // if (!document.hidden) {
      let res = await fetch(`/api/getUserID/${localStorage.token}`);
      const data = await res.json();
      this.user_id = data.user_id;
      // }
    }, 59000);

    // Check new messages
    setInterval(async () => {
      if (this.chat_id) {
        let res = await fetch(
          `/api/getMessages/${localStorage.token}/${
            this.chats[this.chat_id - 1].user_id
          }`
        );
        let data = await res.json();

        if (data.length != this.messages.length) {
          this.messages = data;

          let scroll = await document.getElementById("messages");
          scroll.scrollTop = scroll.scrollHeight;
        }

        this.messages = data;

        // let scroll = await document.getElementById("messages");
        // if (scroll.scrollTop != scroll.scrollHeight) {
        //   scroll.scrollTop = scroll.scrollHeight;
        // }
      }

      let res = await fetch(`/api/getChats/${localStorage.token}`);
      let data = await res.json();

      if (data.length) {
        if (this.chats[0].from_id != data[0].from_id && this.chat_id > 1) {
          console.log("New chat");

          this.chats = data;
          this.chat_id++;
        } else {
          this.chats = data;
        }
      }
    }, 1000);

    // Search Users
    res = await fetch(`/api/getUsers`);
    this.users = await res.json();

    this.users = this.users.filter((user) => user.id !== this.user_id);
  },
  watch: {
    chat_id: async function (value) {
      if (value > 0) {
        this.view = "messages";

        // MESSAGES
        let res = await fetch(
          `/api/getMessages/${localStorage.token}/${
            this.chats[value - 1].user_id
          }`
        );
        this.messages = await res.json();
        // console.log(this.messages);

        this.chats[value - 1].unread_count = 0;

        let scroll = await document.getElementById("messages");
        scroll.scrollTop = scroll.scrollHeight;

        document.getElementById("messageTextBox").focus();
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

.message_text {
  word-break: break-all;
  white-space: pre-line;
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
