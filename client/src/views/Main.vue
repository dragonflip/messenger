<template>
  <div class="container-lg" style="user-select: none">
    <div class="row" style="margin: 0 -15px">
      <v-progress-linear
        indeterminate
        absolute
        color="primary"
        v-if="loading"
      ></v-progress-linear>

      <v-dialog
        v-model="profile_dialog"
        max-width="450"
        :fullscreen="$vuetify.breakpoint.mobile"
      >
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

            <v-btn
              elevation="0"
              icon
              @click="
                profile_dialog = !profile_dialog;
                edit_profile = false;
              "
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-avatar color="accent" size="55" v-if="!profile.profile_photo">
            <span class="white--text">
              {{ profile.firstname[0] }} {{ profile.lastname[0] }}
            </span>
          </v-avatar>
          <img
            v-else
            :src="profile.profile_photo"
            style="
              width: 128px;
              height: 128px;
              border-radius: 50%;
              object-fit: cover;
              filter: brightness(0.7);
            "
            class="d-flex mx-auto"
          />

          <v-btn
            v-if="edit_profile"
            icon
            width="128"
            height="128"
            style="position: absolute; top: 62px; left: calc(50% - 64px)"
            @click="$refs.profile_photo_upload.click()"
          >
            <v-icon size="40">mdi-image-plus</v-icon>
          </v-btn>

          <input
            type="file"
            accept="image/jpeg, image/png, image/gif"
            ref="profile_photo_upload"
            label="Select File..."
            v-show="false"
            @change="profilePhotoUpload"
          />

          <h5 class="text-center mt-2">
            {{ profile.firstname }} {{ profile.lastname }}
            <h6 class="primary--text mt-1">Online</h6>
          </h5>

          <v-btn
            :color="!edit_profile ? 'primary' : 'transparent'"
            elevation="0"
            rounded
            @click="edit_profile = !edit_profile"
            class="d-flex mx-auto"
          >
            <span v-if="!edit_profile" class="black--text"
              >Редагувати профіль</span
            >
            <span v-else>Скасувати редагування</span>
          </v-btn>

          <v-list three-line>
            <form @submit.prevent="editProfile()">
              <v-list-item v-ripple="!edit_profile">
                <v-list-item-icon>
                  <v-icon> mdi-account-outline </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>
                    <span v-if="!edit_profile">
                      {{ profile.firstname }} {{ profile.lastname }}
                    </span>

                    <div class="d-flex py-1" v-else>
                      <v-text-field
                        type="text"
                        v-model="profile.firstname"
                        name="firstname"
                        label="Ім'я"
                        :autofocus="!$vuetify.breakpoint.mobile"
                        required
                        maxlength="20"
                        autocomplete="off"
                        hide-details="auto"
                      ></v-text-field>
                      <v-text-field
                        type="text"
                        v-model="profile.lastname"
                        name="lastname"
                        label="Прізвище"
                        maxlength="20"
                        autocomplete="off"
                        hide-details="auto"
                        class="ml-4"
                      ></v-text-field>
                    </div>
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

                    <div class="d-flex py-1" v-else>
                      <v-text-field
                        type="email"
                        v-model="profile.email"
                        name="email"
                        label="E-mail"
                        maxlength="40"
                        required
                        autocomplete="off"
                        hide-details="auto"
                      ></v-text-field>
                    </div>
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

                    <div class="d-flex py-1" v-else>
                      <v-text-field
                        type="text"
                        v-model="profile.bio"
                        name="bio"
                        label="Про себе"
                        autocomplete="off"
                        hide-details="auto"
                        maxlength="70"
                      ></v-text-field>
                    </div>
                  </v-list-item-title>
                  <v-list-item-subtitle v-if="!edit_profile">
                    <span v-if="profile.bio">Про себе</span>
                    <span v-else>Кілька слів про себе</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-btn
                type="submit"
                fab
                elevation="0"
                color="primary"
                v-if="edit_profile"
                class="d-flex ml-auto mr-5 mb-2 black--text"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </form>
          </v-list>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="search_dialog"
        max-width="450"
        :fullscreen="$vuetify.breakpoint.mobile"
      >
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
                  <img :src="user.profile_photo" style="object-fit: cover" />
                </v-avatar>

                <!-- <v-badge bordered bottom color="primary" dot></v-badge> -->
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

      <div
        class="col-lg-4 p-0"
        v-if="
          ($vuetify.breakpoint.mobile && !chat_id) ||
          !$vuetify.breakpoint.mobile
        "
      >
        <div class="nav_bar d-flex">
          <v-menu offset-y min-width="280">
            <template v-slot:activator="{ on }">
              <v-app-bar flat color="transparent">
                <v-app-bar-nav-icon
                  @click="menu = !menu"
                  v-on="on"
                ></v-app-bar-nav-icon>
                <v-toolbar-title>Daki</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="search_dialog = true">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </v-app-bar>
            </template>
            <v-list>
              <v-list-item @click="profile_dialog = true">
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
              <v-divider class="my-2"></v-divider>
              <v-list-item>
                <v-icon class="pr-2">mdi-information-outline</v-icon>
                <span>v{{ version }}</span>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div class="chats_wrapper">
          <v-list
            class="chats p-0"
            style="overflow-y: auto"
            :style="
              $vuetify.breakpoint.mobile
                ? 'height: calc(100vh - 57px)'
                : 'height: calc(100vh - 65px)'
            "
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
                    <img :src="chat.profile_photo" style="object-fit: cover" />
                  </v-avatar>

                  <v-badge
                    v-if="chat.online"
                    bordered
                    bottom
                    color="primary"
                    dot
                    offset-x="9"
                    offset-y="-9"
                  ></v-badge>
                </div>
                <div class="message-details w-100">
                  <div class="message-title d-flex justify-space-between">
                    <div class="name">
                      {{ chat.firstname }} {{ chat.lastname }}
                    </div>
                    <div class="time">
                      <v-icon
                        color="primary"
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
                        color="primary black--text"
                        style="color: #000 !important"
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

      <div
        class="col-lg-8 p-0 d-flex flex-column"
        v-if="
          ($vuetify.breakpoint.mobile && chat_id > 0) ||
          !$vuetify.breakpoint.mobile
        "
      >
        <div class="nav_bar d-flex" v-if="chat_id > 0">
          <v-app-bar flat color="transparent">
            <v-btn
              elevation="0"
              icon
              v-if="$vuetify.breakpoint.mobile"
              @click="chat_id = 0"
              class="mr-1"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-avatar
              color="accent"
              :size="$vuetify.breakpoint.mobile ? '45' : '50'"
              v-if="!chats[chat_id - 1].profile_photo"
            >
              <span class="white--text">
                {{ chats[chat_id - 1].firstname[0] }}
                {{ chats[chat_id - 1].lastname[0] }}
              </span>
            </v-avatar>
            <v-avatar :size="$vuetify.breakpoint.mobile ? '45' : '50'" v-else>
              <img
                :src="chats[chat_id - 1].profile_photo"
                style="object-fit: cover"
              />
            </v-avatar>

            <h5
              class="ml-2 mb-0 d-flex flex-column"
              :style="$vuetify.breakpoint.mobile ? 'font-size: 100%' : ''"
            >
              {{ chats[chat_id - 1].firstname }}
              {{ chats[chat_id - 1].lastname }}
              <span
                class="primary--text"
                :style="
                  $vuetify.breakpoint.mobile
                    ? 'font-size: 70%'
                    : 'font-size: 60%'
                "
                v-if="chats[chat_id - 1].online"
                >Онлайн</span
              >
              <span
                class="grey--text"
                :style="
                  $vuetify.breakpoint.mobile
                    ? 'font-size: 70%'
                    : 'font-size: 60%'
                "
                v-else
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
            style="overflow-y: auto"
            :style="
              $vuetify.breakpoint.mobile
                ? 'height: calc(100vh - 140px)'
                : 'height: calc(100vh - 160px)'
            "
          >
            <v-menu
              v-model="messageMenu"
              :position-x="messageMenuX"
              :position-y="messageMenuY"
              absolute
              offset-y
            >
              <v-list>
                <v-list-item @click="copyMessage">
                  <v-list-item-title>
                    <v-icon class="pr-2">mdi-content-copy</v-icon>
                    Копіювати
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-icon class="pr-2">mdi-pencil-outline</v-icon>
                    Редагувати
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="deleteMessage">
                  <v-list-item-title class="red--text">
                    <v-icon class="red--text pr-2">mdi-delete-outline</v-icon>
                    Видалити
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <div
              class="d-flex"
              v-for="(message, i) in messages"
              :key="i"
              :class="message.from_id === user_id ? 'to' : 'from'"
              style="max-width: 80%"
              @contextmenu="messageContext($event, message.from_id, message.id)"
              :id="message.id"
            >
              <div
                class="message_text"
                :style="!$vuetify.breakpoint.mobile ? 'user-select: text' : ''"
              >
                <span v-if="message.message.slice(0, 4) == 'http'"
                  ><a :href="message.message" target="_blank">{{
                    message.message
                  }}</a></span
                >
                <span v-else>{{ message.message }}</span>
              </div>
              <div class="message_time align-self-end ml-1">
                {{ message.sent_date }}
              </div>
              <span v-if="message.from_id === user_id">
                <v-icon
                  color="black"
                  class="ml-1"
                  style="font-size: 22px"
                  v-if="message.has_read"
                  >mdi-check-all</v-icon
                >
                <v-icon
                  color="black"
                  class="ml-1"
                  style="font-size: 22px"
                  v-else
                  >mdi-check</v-icon
                >
              </span>
            </div>
          </div>
          <div
            class="send_message w-100 d-flex"
            :class="!$vuetify.breakpoint.mobile ? 'mb-5' : ''"
          >
            <form class="d-flex w-100" @submit.prevent="send_message()">
              <v-textarea
                v-model="messageTextBox"
                label="Повідомлення"
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
                color="transparent"
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
      profile_dialog: false,
      search_dialog: false,
      profile: {},
      user_id: null,
      edit_profile: false,
      messageTextBox: "",
      to_id: 0,
      notifTimeout: false,
      version: "0.3.2",
      messageMenu: false,
      messageMenuX: 0,
      messageMenuY: 0,
      selected_message_id: 0,
    };
  },
  methods: {
    logout: function () {
      localStorage.removeItem("token");

      this.loading = true;
      this.$router.push("/login");
    },
    send_message: async function (e) {
      if (
        !e ||
        (e.keyCode === 13 && !e.shiftKey && !this.$vuetify.breakpoint.mobile)
      ) {
        if (!this.messageTextBox.trim()) {
          this.messageTextBox = "";
          return;
        }

        this.messageTextBox = this.messageTextBox.replace(/^\s*[\r\n]/gm, "");

        document.getElementById("messageTextBox").focus();

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

        this.messageTextBox = "";

        // let last_chat_id = this.chat_id;

        let res = await fetch(
          `/api/getMessages/${localStorage.token}/${
            this.chats[this.chat_id - 1].user_id
          }`
        );
        this.messages = await res.json();

        res = await fetch(`/api/getChats/${localStorage.token}`);
        this.chats = await res.json();

        this.chat_id = 1;

        let scroll = await document.getElementById("messages");
        scroll.scrollTop = scroll.scrollHeight;

        this.notifTimeout = true;
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
      this.search_dialog = false;

      this.users = this.users.filter((user) => user.id !== id);
    },
    editProfile: async function () {
      if (!this.profile.firstname.trim()) {
        this.profile.firstname = "";
        return;
      }
      if (!this.profile.lastname.trim() && this.profile.lastname.length > 0) {
        this.profile.lastname = "";
        return;
      }
      if (!this.profile.email.trim()) {
        this.profile.email = "";
        return;
      }
      if (!this.profile.bio.trim() && this.profile.bio.length > 0) {
        this.profile.bio = "";
        return;
      }

      await fetch(`/api/editProfile/${localStorage.token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: this.profile.firstname,
          lastname: this.profile.lastname,
          email: this.profile.email,
          bio: this.profile.bio,
          profile_photo: this.profile.profile_photo,
        }),
      });

      this.edit_profile = false;
    },
    messageContext: function (e, from_id, selected_message_id) {
      if (from_id === this.user_id) {
        e.preventDefault();

        this.messageMenu = false;
        this.messageMenuX = e.clientX;
        this.messageMenuY = e.clientY;
        this.$nextTick(() => {
          this.messageMenu = true;
        });

        this.selected_message_id = selected_message_id;
      }
    },
    copyMessage: function () {
      const range = document.createRange();
      range.selectNode(document.getElementById(this.selected_message_id));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
    },
    deleteMessage: async function () {
      await fetch(
        `/api/deleteMessage/${localStorage.token}/${this.selected_message_id}`,
        {
          method: "DELETE",
        }
      );
    },
    profilePhotoUpload: function (e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.addEventListener(
        "load",
        () => {
          this.profile.profile_photo = reader.result;
        },
        false
      );
    },
  },
  async mounted() {
    if (!localStorage.token) {
      this.$router.push("/login");
      return;
    }

    window.onresize = () => {
      if (this.chat_id > 0) {
        let scroll = document.getElementById("messages");
        scroll.scrollTop = scroll.scrollHeight;
      }
    };

    window.onpopstate = () => {
      this.chat_id = 0;
    };

    console.log(`Mobile device: ${this.$vuetify.breakpoint.mobile}`);

    // Update online status
    setInterval(async () => {
      if (!document.hidden) {
        let res = await fetch(`/api/getUserID/${localStorage.token}`);
        const data = await res.json();
        this.user_id = data.user_id;

        if (this.user_id === null) {
          localStorage.removeItem("token");
          this.$router.push("/login");
        }
      }
    }, 55000);

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

          if (!this.notifTimeout) {
            let audio = new Audio(
              "https://audiokaif.ru/wp-content/uploads/2019/04/3-Звук-сообщения-вконтакте.mp3"
            );
            audio.play();
          }
        }

        this.messages = data;
        this.notifTimeout = false;

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

    this.loading = false;
  },
  watch: {
    chat_id: async function (value) {
      if (value > 0) {
        this.view = "messages";
        this.messages = {};

        // MESSAGES
        let res = await fetch(
          `/api/getMessages/${localStorage.token}/${
            this.chats[value - 1].user_id
          }`
        );
        this.messages = await res.json();
        // console.log(this.messages);

        this.chats[value - 1].unread_count = 0;

        if (!this.$vuetify.breakpoint.mobile) {
          document.getElementById("messageTextBox").focus();
        }

        let scroll = await document.getElementById("messages");
        scroll.scrollTop = scroll.scrollHeight;

        if (location.hash != "#messages" && this.$vuetify.breakpoint.mobile) {
          history.pushState({}, null, "#messages");
        }
      } else {
        this.view = "chats";
      }
    },
  },
  async created() {
    this.$vuetify.theme.dark = true;
    this.$vuetify.theme.themes.dark.primary = "#fed81f";
    this.$vuetify.theme.themes.dark.accent = "#333";

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

    // Search Users
    res = await fetch(`/api/getUsers`);
    this.users = await res.json();
    this.users = this.users.filter((user) => user.id !== this.user_id);
  },
};
</script>

<style scoped>
.container-lg {
  border-left: 1px solid #393939;
  border-right: 1px solid #393939;
}

.nav_bar {
  border-bottom: 1px solid #393939;
}

.chats {
  /* background: #ddd; */
  border-right: 1px solid #393939 !important;
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
  background: #fed81f;
  color: #000;
  padding: 5px 12px;
  border-radius: 15px;
  margin-top: 10px;
  align-self: flex-end;
}

.messages .to a {
  color: #000;
}

/* .to:after { */
/* content: ""; */
/* border: 15px solid transparent; */
/* border-left-color: #fed81f; */
/* border-right: 0; */
/* border-bottom: 0; */
/* margin-right: -20px; */
/* } */

.messages .from {
  background: #333;
  color: #fff;
  padding: 5px 12px;
  border-radius: 15px;
  margin-top: 10px;
  align-self: flex-start;
}

/* .from:before {
  content: "";
  border: 15px solid transparent;
  border-right-color: #333;
  border-left: 0;
  margin-left: -20px;
} */

.messages .from a {
  color: #000;
}

.message_text {
  word-break: break-word;
  white-space: pre-wrap;
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
