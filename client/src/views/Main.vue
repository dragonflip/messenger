<template>
  <div
    class="container-lg"
    style="user-select: none"
    :style="
      !this.$vuetify.breakpoint.mobile
        ? 'border-left: 1px solid #393939; border-right: 1px solid #393939;'
        : ''
    "
  >
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
        @click:outside="edit_profile = false"
        @keydown.esc="edit_profile = false"
      >
        <v-card>
          <v-card-title class="headline">
            Мій профіль

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

          <v-avatar
            color="accent"
            size="128"
            class="d-flex mx-auto"
            style="font-size: 200%"
            v-if="!profile.profile_photo"
          >
            <span class="white--text" v-if="!edit_profile">
              {{ profile.firstname[0] }} {{ profile.lastname[0] }}
            </span>
          </v-avatar>
          <img
            v-else
            :src="profile.profile_photo"
            style="width: 128px; height: 128px; border-radius: 50%"
            :style="edit_profile ? 'filter: brightness(0.6)' : ''"
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
            accept="image/*"
            ref="profile_photo_upload"
            label="Select File..."
            v-show="false"
            @change="profilePhotoUpload"
          />

          <h5 class="text-center mt-2">
            {{ profile.firstname }} {{ profile.lastname }}
            <h6 class="mt-1">
              <span class="primary--text" v-if="!profile.was_online"
                >Онлайн</span
              >
              <span class="white--text" v-else
                >В мережі {{ profile.was_online }}</span
              >
            </h6>
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
          <v-card-subtitle>Онлайн: {{ usersOnline }}</v-card-subtitle>

          <v-text-field
            type="text"
            v-model.trim="searchQuery"
            name="search"
            label="Пошук за іменем чи поштою"
            autocomplete="off"
            hide-details="auto"
            class="mx-4"
            outlined
          ></v-text-field>

          <v-list three-line>
            <v-list-item
              v-ripple
              v-for="(user, i) in peopleSearch"
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

      <v-dialog
        v-model="call_dialog"
        max-width="450"
        :fullscreen="$vuetify.breakpoint.mobile"
      >
        <v-card>
          <v-card-title class="headline">
            Дзвінок
            <v-spacer></v-spacer>
                

            <v-btn elevation="0" icon @click="call_dialog = !call_dialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>

          </v-card-title> 
            <v-btn v-if="user_id == call_to_id" elevation="0" icon @click="acceptCall()">
              <v-icon>mdi-phone</v-icon>
            </v-btn>
            <div id="video-chat-container" class="video-position" style="display: none">
              <video id="local-video" autoplay="autoplay" muted="muted"></video>
              <video id="remote-video" autoplay="autoplay"></video>
            </div>
        </v-card>
      </v-dialog>

      <v-dialog v-model="test_version_dialog" max-width="450">
        <v-card>
          <v-card-title class="headline">
            <span :style="$vuetify.breakpoint.mobile ? 'font-size: 70%' : ''">
              Перейти на тестову версію?
            </span>

            <v-spacer></v-spacer>

            <v-btn
              elevation="0"
              icon
              @click="test_version_dialog = !test_version_dialog"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-subtitle>Головні фічі</v-card-subtitle>

          <v-list>
            <v-list-item v-ripple>1. Кастомний рендер інтерфейсу</v-list-item>
            <v-list-item v-ripple>2. Швидке завантаження</v-list-item>
            <v-list-item v-ripple>3. Плавність та 60 fps</v-list-item>
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="red" text @click="test_version_dialog = false">
              Скасувати
            </v-btn>

            <v-btn
              color="green"
              text
              href="/test"
              style="text-decoration: none"
            >
              Перейти
            </v-btn>
          </v-card-actions>
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
        class="col-lg-4 col-md-5 p-0"
        v-if="
          ($vuetify.breakpoint.mobile && !chat_id) ||
          !$vuetify.breakpoint.mobile
        "
      >
        <div class="nav_bar d-flex">
          <v-menu offset-y min-width="280">
            <template v-slot:activator="{ on }">
              <v-app-bar
                flat
                color="transparent"
                :short="$vuetify.breakpoint.mobile"
              >
                <v-app-bar-nav-icon
                  @click="menu = !menu"
                  v-on="on"
                ></v-app-bar-nav-icon>
                <v-toolbar-title>
                  <span v-if="connecting">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                    Підключення...
                  </span>
                  <span v-else>Daki</span>
                </v-toolbar-title>
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
              <!-- <v-list-item>
                <v-icon class="pr-2">mdi-folder-account-outline</v-icon>
                Контакти
              </v-list-item>
              <v-list-item>
                <v-icon class="pr-2">mdi-cog-outline</v-icon>
                Налаштування
              </v-list-item> -->
              <v-list-item @click="test_version_dialog = true">
                <v-icon class="pr-2">mdi-test-tube</v-icon>
                Тестова версія
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
                : 'height: calc(100vh - 65px); border-right: 1px solid #393939 !important;'
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
                    <img :src="chat.profile_photo" />
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
                    <div
                      class="unread_count"
                      v-if="
                        chat.unread_count > 0 &&
                        !chat.has_read &&
                        chat.from_id !== user_id
                      "
                    >
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
        class="col-lg-8 col-md-7 p-0 d-flex flex-column"
        v-if="
          ($vuetify.breakpoint.mobile && chat_id > 0) ||
          !$vuetify.breakpoint.mobile
        "
      >
        <div class="nav_bar d-flex" v-if="chat_id > 0">
          <v-app-bar
            flat
            color="transparent"
            :short="$vuetify.breakpoint.mobile"
          >
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
              <img :src="chats[chat_id - 1].profile_photo" />
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
              >
                В мережі {{ lastSeen }}
              </span>
            </h5>

            <v-spacer></v-spacer>

            <v-btn icon @click="call()">
              <v-icon>mdi-phone</v-icon>
            </v-btn>

            <v-btn elevation="0" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-app-bar>
        </div>

        <div
          v-if="chat_id > 0"
          class="messages_view d-flex flex-column"
          style="height: calc(100vh - 70px)"
        >
          <div
            class="messages d-flex flex-column px-5 py-5 h-100"
            id="messages"
            style="overflow-y: auto"
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
                <v-list-item @click="editMessage">
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
              style="max-width: 90%"
              @contextmenu="messageContext($event, message.from_id, message.id)"
              :id="'message_' + message.id"
            >
              <div
                class="message_text"
                :style="!$vuetify.breakpoint.mobile ? 'user-select: text' : ''"
              >
                <span
                  v-if="
                    message.message.slice(0, 7) == 'http://' ||
                    message.message.slice(0, 8) == 'https://'
                  "
                  ><a :href="message.message" target="_blank">{{
                    message.message
                  }}</a></span
                >
                <a
                  v-else-if="message.attachment"
                  :href="'/uploads/' + message.attachment"
                  @click="savePrevChat()"
                >
                  <img
                    :src="'/uploads/' + message.attachment"
                    style="width: 100%; border-radius: 20px"
                  />
                </a>
                <span v-else>{{ message.message }}</span>
              </div>
              <div class="message_time align-self-end ml-1">
                {{ message.sent_date }}
              </div>
              <span v-if="message.from_id === user_id">
                <v-icon
                  color="rgba(255, 255, 255, 0.7)"
                  class="ml-1"
                  style="font-size: 22px"
                  v-if="message.has_read"
                  >mdi-check-all</v-icon
                >
                <v-icon
                  color="rgba(255, 255, 255, 0.7)"
                  class="ml-1"
                  style="font-size: 22px"
                  v-else
                  >mdi-check</v-icon
                >
              </span>
            </div>
          </div>
          <div class="send_message d-flex">
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
                style="max-height: 300px; overflow-y: auto"
                @keydown="send_message"
              ></v-textarea>
              <v-btn
                icon
                style="
                  position: absolute;
                  right: 70px;
                  bottom: 15px;
                  transform: rotate(45deg);
                "
                title="Прикріпити файл"
                @click="$refs.message_file_upload.click()"
              >
                <v-icon>mdi-paperclip</v-icon>
              </v-btn>

              <input
                type="file"
                accept="image/*"
                ref="message_file_upload"
                v-show="false"
                @change="messageFileUpload"
              />

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
import moment from "moment";
moment.locale("uk");

export default {
  name: "Main",
  data() {
    return {
      chats: [],
      messages: {},
      users: [],
      view: "chats",
      chat_id: 0,
      menu: false,
      loading: true,
      clicked: false,
      profile_dialog: false,
      search_dialog: false,
      call_dialog: false,
      test_version_dialog: false,
      profile: {
        firstname: "",
        lastname: "",
      },
      user_id: null,
      edit_profile: false,
      messageTextBox: "",
      to_id: 0,
      notifTimeout: false,
      version: localStorage.version,
      messageMenu: false,
      messageMenuX: 0,
      messageMenuY: 0,
      selected_message_id: 0,
      usersOnline: 0,
      searchQuery: "",
      isTabActive: document.visibilityState === "visible",
      connecting: false,
      moment: moment,
      lastSeen: "",
      peerConnection: null,
      call_to_id: 0,
      call_from_id: 0,
    };
  },
  methods: {
    requestCall: async function () {
      call_dialog = true;

      this.call_to_id = this.chats[this.chat_id - 1].user_id;
      this.call_from_id = this.user_id;

      this.socket.emit("requestCall",{
        from_id: this.call_from_id,
        to_id: this.call_to_id,
      })
    },
    acceptCall: async function () {
      this.socket.emit("acceptCall",{
        from_id: this.call_from_id,
        to_id: this.call_to_id,
      })
    },
    logout: function () {
      localStorage.removeItem("token");
      this.loading = true;
      location = "/login";
      return;
    },
    send_message: function (e) {
      if (!e || (e.keyCode === 13 && !e.shiftKey && !this.isMobile())) {
        if (e) e.preventDefault();

        if (!this.messageTextBox.trim()) {
          this.messageTextBox = "";
          return;
        }

        this.messageTextBox = this.messageTextBox.replace(/^\s*[\r\n]/gm, "");
        document.getElementById("messageTextBox").focus();

        this.socket.emit("sendMessage", {
          from_id: this.user_id,
          to_id: this.chats[this.chat_id - 1].user_id,
          message: this.messageTextBox,
        });

        this.messageTextBox = "";

        this.$nextTick(() => {
          let scroll = document.getElementById("messages");
          scroll.scrollTop = scroll.scrollHeight;
        });

        this.notifTimeout = true;
      }
    },
    selectUser: function (id) {
      this.socket.emit("sendMessage", {
        from_id: this.user_id,
        to_id: id,
        message: "Привіт, розпочнемо спілкування!",
      });

      this.chat_id = 1;
      this.search_dialog = false;
      this.users = this.users.filter((user) => user.id !== id);
    },
    editProfile: async function () {
      if (!this.profile.firstname.trim()) {
        this.profile.firstname = "";
        return;
      }
      if (!this.profile.lastname.trim() && this.profile.lastname.length) {
        this.profile.lastname = "";
        return;
      }
      if (!this.profile.email.trim()) {
        this.profile.email = "";
        return;
      }
      if (!this.profile.bio.trim() && this.profile.bio.length) {
        this.profile.bio = "";
        return;
      }

      this.socket.emit("editProfile", {
        id: this.user_id,
        token: localStorage.token,
        firstname: this.profile.firstname,
        lastname: this.profile.lastname,
        email: this.profile.email,
        bio: this.profile.bio,
        profile_photo: this.profile.profile_photo,
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
      document.querySelector(
        `#message_${this.selected_message_id} .message_text`
      ).style.userSelect = "text";

      const range = document.createRange();
      range.selectNode(
        document.getElementById(`message_${this.selected_message_id}`)
      );
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();

      document.querySelector(
        `#message_${this.selected_message_id} .message_text`
      ).style.userSelect = "none";
    },
    deleteMessage: async function () {
      this.socket.emit("deleteMessage", { id: this.selected_message_id });
    },
    profilePhotoUpload: function (e) {
      const img = new Image();
      const reader = new FileReader();

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = 128;
      canvas.height = 128;

      reader.readAsDataURL(e.target.files[0]);

      reader.onload = async (e) => {
        img.src = e.target.result;

        img.onload = () => {
          // await img.decode();

          let x, y, w, h;

          if (img.width > img.height) {
            x = (img.width - img.height) / 2;
            y = 0;
            w = img.height;
            h = img.height;
          } else if (img.height > img.width) {
            x = 0;
            y = (img.height - img.width) / 2;
            w = img.width;
            h = img.width;
          } else {
            x = 0;
            y = 0;
            w = img.width;
            h = img.height;
          }

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, x, y, w, h, 0, 0, canvas.width, canvas.height);

          const result = canvas.toDataURL("image/webp");
          this.profile.profile_photo = result;

          console.log(img.src.length, result.length);
        };
      };
    },
    messageFileUpload: function (e) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(e.target.files[0]);

      const filename = e.target.files[0].name;

      reader.onload = (e) => {
        let arrayBuffer = new Uint8Array(e.target.result);

        this.socket.emit("sendMessage", {
          from_id: this.user_id,
          to_id: this.chats[this.chat_id - 1].user_id,
          attachment: arrayBuffer,
          filename: filename,
          message: "Фото",
        });

        console.log(arrayBuffer);
      };
      console.log(e.target.files[0]);
    },
    savePrevChat: function () {
      let prev_chat = this.chats.findIndex(
        (chat) => chat.user_id === this.chat_user_id
      );
      localStorage.prev_chat = prev_chat + 1;
    },
  },
  mounted() {
    window.onresize = () => {
      if (this.chat_id > 0) {
        let scroll = document.getElementById("messages");
        scroll.scrollTop = scroll.scrollHeight;
      }
    };

    window.onpopstate = () => {
      this.chat_id = 0;
    };

    let audio = new Audio(
      "https://audiokaif.ru/wp-content/uploads/2019/04/3-Звук-сообщения-вконтакте.mp3"
    );

    console.log(
      `Mobile device: ${this.$vuetify.breakpoint.mobile} | ${this.isMobile()}`
    );

    document.addEventListener("visibilitychange", () => {
      this.isTabActive = document.visibilityState === "visible";
    });

    this.socket.on("call", async (data) => {
      if(data.from_id === this.user_id){
        this.call_dialog = true;

        const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
        this.peerConnection = new RTCPeerConnection(configuration);

        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);

        this.socket.emit("offer",{
          to_id,
          from_id,
          offer, 
        });
      }
    });


    this.socket.on("offer",async (data) => {
      if(data.to_id === this.user_id){
        this.call_dialog = true;
        const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
        this.peerConnection = new RTCPeerConnection(configuration);

        this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);

        this.call_to_id = data.to_id;
        this.call_from_id = data.from_id;

        this.socket.emit("answer",{
          to_id: data.to_id,
          from_id: data.from_id,
          answer,
        })
      }
    });

    this.socket.on("answer", async (data) => {
      if(data.to_id === this.user_id){
        const remoteDesc = new RTCSessionDescription(data.answer);
        await this.peerConnection.setRemoteDescription(remoteDesc);
      }
    });

    this.peerConnection.addEventListener('icecandidate', event => {
      if (event.candidate) {
        this.socket.emit("candidate", {
          to_id: this.call_to_id,
          from_id: this.call_from_id,
          candidate: event.candidate,
        })
      }
    });

    this.socket.on("candidate", async(data) => {
      if(data.candidate.iceCandidate) {
        try {
          await this.peerConnection.addIceCandidate(data.iceCandidate);
        } catch (e) {
          console.error('Error adding received ice candidate', e);
        }
      }
    });

    this.socket.on("version", (version) => {
      if (version !== this.version) {
        localStorage.version = version;
        location.reload();
      }
    });

    this.socket.on("usersOnline", (usersOnline) => {
      this.usersOnline = usersOnline;
    });

    this.socket.on("setOnlineStatus", (data) => {
      if (data.user_id !== this.user_id) {
        let chat_index = this.chats.findIndex(
          (chat) => chat.user_id === data.user_id
        );

        if (chat_index !== -1) {
          this.chats[chat_index].online = data.online;

          if (!data.online) {
            this.chats[chat_index].was_online = data.was_online;

            if (this.chat_id > 0) {
              this.lastSeen = moment
                .unix(this.chats[this.chat_id - 1].was_online)
                .fromNow();
            }
          }
        }
      } else {
        if (data.was_online) {
          this.profile.was_online = moment.unix(data.was_online).fromNow();
        } else {
          this.profile.was_online = data.was_online;
        }
      }
    });

    this.socket.on("getMessages", (data) => {
      this.messages = data;
      console.log("getMessages");

      if (!this.isMobile()) {
        document.getElementById("messageTextBox").focus();
      }

      if (
        !this.chats[this.chat_id - 1].has_read &&
        this.chats[this.chat_id - 1].from_id != this.user_id
      ) {
        console.log(`Read chat message after select`);
        this.socket.emit("readMessage", {
          to_id: this.user_id,
          from_id: this.chat_user_id,
        });
      }

      this.$nextTick(() => {
        let images = document.querySelectorAll(".message_text img");
        let last_img = images[images.length - 1];

        if (last_img) {
          last_img.onload = () => {
            let scroll = document.getElementById("messages");
            scroll.scrollTop = scroll.scrollHeight;
          };
        } else {
          let scroll = document.getElementById("messages");
          scroll.scrollTop = scroll.scrollHeight;
        }
      });
    });

    this.socket.on("deleteMessage", (data) => {
      if (this.chat_id > 0) {
        this.messages = this.messages.filter(
          (message) => message.id !== data.id
        );
      }

      this.socket.emit("getChats", { token: localStorage.token });
    });

    this.socket.on("readMessage", (data) => {
      if (data.from_id == this.user_id || data.to_id == this.user_id) {
        if (this.chat_id > 0) {
          this.messages.forEach((message) => {
            if (
              message.from_id == data.from_id &&
              message.to_id == data.to_id &&
              !message.has_read
            ) {
              message.has_read = 1;
              message.unread_count = 0;
            }
          });
        }

        this.chats.forEach((chat) => {
          if (
            chat.from_id == data.from_id &&
            chat.to_id == data.to_id &&
            !chat.has_read
          ) {
            chat.has_read = 1;
            chat.unread_count = 0;
          }
        });
      }
    });

    this.socket.on("sendMessage", (data) => {
      // For me or from me
      if (data.to_id == this.user_id || data.from_id == this.user_id) {
        // Update messages
        if (
          (data.to_id == this.user_id && data.from_id == this.chat_user_id) ||
          (data.from_id == this.user_id && data.to_id == this.chat_user_id)
        ) {
          this.messages.push(data);

          this.$nextTick(() => {
            if (data.from_id != this.user_id && this.isTabActive) {
              console.log(`Read message after send: ${this.isTabActive}`);
              this.socket.emit("readMessage", {
                from_id: this.chat_user_id,
                to_id: this.user_id,
              });
            }

            let images = document.querySelectorAll(".message_text img");
            let last_img = images[images.length - 1];

            if (last_img) {
              last_img.onload = () => {
                let scroll = document.getElementById("messages");
                scroll.scrollTop = scroll.scrollHeight;

                console.log("load image scroll");
              };
            } else {
              let scroll = document.getElementById("messages");
              scroll.scrollTop = scroll.scrollHeight;
            }
          });
        } else {
          audio.play().catch(() => {});
        }

        // Update chat
        let chat = {
          ...this.chats.filter(
            (chat) =>
              chat.user_id === data.from_id || chat.user_id === data.to_id
          )[0],
          ...data,
        };

        if (data.from_id !== this.user_id) {
          chat.unread_count++;
        }

        chat.has_read = 0;

        this.chats = this.chats.filter(
          (user) => user.user_id !== data.from_id && user.user_id !== data.to_id
        );
        this.chats.unshift(chat);

        let prev_chat = this.chats.findIndex(
          (chat) => chat.user_id === this.chat_user_id
        );
        this.chat_id = prev_chat + 1;
      }
    });

    this.socket.on("editProfile", (data) => {
      if (this.user_id === data.id) {
        this.profile = data;
      } else {
        let chat_ind = this.chats.findIndex((chat) => chat.user_id === data.id);

        if (chat_ind !== -1) {
          this.chats[chat_ind].firstname = data.firstname;
          this.chats[chat_ind].lastname = data.lastname;
          this.chats[chat_ind].email = data.email;
          this.chats[chat_ind].profile_photo = data.profile_photo;
          this.chats[chat_ind].bio = data.bio;
        }
      }
    });

    this.loading = false;
  },
  watch: {
    chat_id: function (value) {
      if (value > 0) {
        this.view = "messages";
        this.messages = {};

        this.chat_user_id = this.chats[value - 1].user_id;

        // Last seen status
        this.lastSeen = moment
          .unix(this.chats[this.chat_id - 1].was_online)
          .fromNow();

        // MESSAGES
        this.socket.emit("getMessages", {
          token: localStorage.token,
          to_id: this.chat_user_id,
        });

        if (location.hash != "#messages" && this.$vuetify.breakpoint.mobile) {
          history.pushState({}, null, "#messages");
        }
      } else {
        this.view = "chats";
      }
    },
    isTabActive: function () {
      this.socket.emit("setOnlineStatus", {
        online: this.isTabActive,
        user_id: this.user_id,
      });

      if (
        this.chat_id > 0 &&
        !this.chats[this.chat_id - 1].has_read &&
        this.isTabActive
      ) {
        console.log(`Read message after open tab: ${this.isTabActive}`);
        this.socket.emit("readMessage", {
          from_id: this.chat_user_id,
          to_id: this.user_id,
        });
      }
    },
  },
  computed: {
    peopleSearch() {
      return this.users.filter((user) => {
        return (
          user.firstname
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          user.lastname
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },
  created() {
    if (!localStorage.token) {
      this.logout();
    }

    this.$vuetify.theme.dark = true;
    this.$vuetify.theme.themes.dark.primary = "#fed81f";
    this.$vuetify.theme.themes.dark.accent = "#333";

    this.socket.on("connect", () => {
      this.loading = false;
      this.connecting = false;
    });

    this.socket.on("disconnect", () => {
      this.loading = true;
      this.connecting = true;
    });

    // USER_ID
    this.socket.emit("getUserID", { token: localStorage.token });
    this.socket.on("getUserID", (data) => {
      if (data.user_id !== null) {
        this.user_id = data.user_id;
        this.socket.emit("getUsers");

        // MY PROFILE
        this.socket.emit("getProfile", { id: this.user_id });
      } else {
        this.logout();
      }
    });

    // MY PROFILE
    this.socket.on("getProfile", (data) => {
      this.profile = data;
    });

    // CHATS
    this.socket.emit("getChats", { token: localStorage.token });
    this.socket.on("getChats", (data) => {
      this.chats = data;

      if (!this.chats.length) {
        this.search_dialog = true;
      }

      let prev_chat = this.chats.findIndex(
        (chat) => chat.user_id === this.chat_user_id
      );

      if (localStorage.prev_chat > 0) {
        this.chat_id = +localStorage.prev_chat;
        localStorage.prev_chat = 0;
      } else {
        this.chat_id = prev_chat + 1;
      }
    });

    // Get all users for search
    this.socket.on("getUsers", (data) => {
      this.users = data.filter((user) => user.id !== this.user_id);
    });

    // Update last seen status
    setInterval(() => {
      if (this.chat_id > 0) {
        this.lastSeen = moment
          .unix(this.chats[this.chat_id - 1].was_online)
          .fromNow();
      }
    }, 10000);
  },
};
</script>

<style scoped>
.nav_bar {
  border-bottom: 1px solid #393939;
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
  color: rgba(255, 255, 255, 0.7);
}

.messages .to {
  background: rgba(254, 216, 31, 0.5);
  color: #fff;
  padding: 5px 12px;
  border-radius: 15px;
  margin-top: 10px;
  align-self: flex-end;
}

.messages .to a {
  color: #fff;
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
  color: #fff;
}

.message_text {
  word-break: break-word;
  white-space: pre-wrap;
}

.message_time {
  font-size: 80%;
  color: rgba(255, 255, 255, 0.7);
}

.message-subtitle .message {
  max-width: 260px;
}

.v-list .v-list-item {
  padding: 0 24px;
  user-select: none;
}

.centered {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.video-position {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#video-chat-container {
  width: 100%;
  background-color: black;
}

#local-video {
  position: absolute;
  height: 30%;
  width: 30%;
  bottom: 0px;
  left: 0px;
}

#remote-video {
  height: 100%;
  width: 100%;
}


</style>
