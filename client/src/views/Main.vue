<template>
  <div class="container" style="height: 100vh">
    <div class="row flex-column h-100">
      <!-- <v-window v-model="chat">
        <v-window-item value="1">
          <h4>1 сторінка</h4>
        </v-window-item>
        <v-window-item>
          <h4>2 сторінка</h4>
        </v-window-item>
      </v-window> -->
      <div class="nav_bar d-flex">
        <div class="col-lg-4 p-0" style="border-right: 1px solid #dfe1e5">
          <v-app-bar flat color="white">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>Messenger</v-toolbar-title>
          </v-app-bar>
        </div>
        <div
          v-if="chat_id > 0"
          class="col-lg-8 p-0 d-none d-lg-flex"
          style="border-bottom: 1px solid #dfe1e5"
        >
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
      </div>
      <div class="chats_wrapper d-flex" style="flex: 1">
        <v-list class="col-lg-4 chats p-0">
          <v-list-item-group mandatory v-model="chat_id">
            <v-list-item class="d-none"></v-list-item>

            <v-list-item
              class="chat d-flex"
              v-for="(chat, i) in chats"
              :key="i"
            >
              <div class="photo">
                <v-avatar :color="users[i].avatar_color" size="55"
                  ><span class="white--text">{{ chat.avatar }}</span></v-avatar
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
                      >{{ chat.status ? "mdi-check-all" : "mdi-check" }}</v-icon
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
        <div
          class="col-lg-8 d-none d-lg-flex justify-content-center messages_wrapper"
        >
          <div
            class="messages_view d-flex flex-column w-100 justify-content-end"
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
          </div>

          <h3 v-else class="text-muted align-self-center">
            Оберіть чат для спілкування
          </h3>
        </div>
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
              sent_date: "06.05.2021 14:37",
              has_read: true,
              out: true,
            },
            {
              message: "Ого, маєш файний месенджер😎",
              sent_date: "06.05.2021 14:40",
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
          time: "06.05.2021 14:40",
          status: 0,
          unread_count: 0,
          out: false,
        },
      ],
      view: "chats",
      chat_id: 0,
    };
  },
  mounted() {
    if (!localStorage.login) {
      this.$router.push("/login");
    }
  },
  watch: {
    chat_id: function (value) {
      console.log(value);
    },
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

.messages .from {
  background: #eee;
  color: #000;
  padding: 5px 12px;
  border-radius: 15px;
  margin-top: 10px;
  align-self: flex-start;
}

.message_time {
  font-size: 80%;
}

.message-subtitle .message {
  width: 260px;
}
</style>