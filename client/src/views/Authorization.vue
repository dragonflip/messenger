<template>
  <v-app>
    <div class="container-lg" style="margin-top: calc(50vh - 400px)">
      <div class="col-4 mx-auto">
        <div
          class="d-flex justify-content-center align-items-center flex-column text-center"
          id="img"
        >
          <img src="../assets/m3.png" alt="icon" />
          <h3 style="margin-top: -50px; margin-bottom: 20px">
            <span v-if="Form.status === 1">Увійдіть в Messenger</span>
            <span v-else-if="Form.status === 2 && !Form.need_register"
              >Вітаємо, {{ Form.email }}</span
            >
            <span v-else-if="Form.status === 2 && Form.need_register"
              >Підтвердження пошти</span
            >
            <span v-else-if="Form.status === 3 && Form.need_register"
              >Вітаємо, як Вас звати?</span
            >
          </h3>
          <h5 v-if="Form.status === 3 || Form.need_register">
            {{ Form.email }}
          </h5>
        </div>
        <form
          @submit.prevent="
            login_submitEmail(Form.email, Form.status, Form.login_code)
          "
        >
          <v-text-field
            v-if="Form.status === 1"
            label="E-mail"
            outlined
            @input="$v.Form.email.$touch()"
            v-model.trim="Form.email"
            required
            autofocus
            color="cyan darken"
            :error-messages="emailErrors"
            placeholder="Введіть E-mail"
            hide-details="auto"
          ></v-text-field>

          <v-text-field
            v-if="Form.status === 2"
            label="Код підтвердження"
            v-model.trim="Form.login_code"
            outlined
            required
            autofocus
            color="cyan darken"
            placeholder="Введіть код підтвердження"
            hide-details="auto"
            minlength="5"
            maxlength="5"
            :rules="rule"
            class="input-group--focused"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
          ></v-text-field>

          <v-text-field
            v-if="Form.status === 3"
            label="Ім'я"
            v-model.trim="Form.first_name"
            outlined
            required
            autofocus
            color="cyan darken"
            placeholder="Введіть ім'я"
            hide-details="auto"
          ></v-text-field>

          <v-text-field
            v-if="Form.status === 3"
            label="Прізвище"
            v-model.trim="Form.last_name"
            outlined
            required
            color="cyan darken"
            placeholder="Введіть прізвище"
            hide-details="auto"
            class="mt-2"
          ></v-text-field>

          <v-file-input
            type="file"
            v-if="Form.status === 3"
            v-model="avatar"
            :rules="rules"
            outlined
            required
            class="mt-2"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Виберіть аватарку"
            prepend-icon="mdi-camera"
            label="Аватар"
            @change="onFileChange($event)"
          ></v-file-input>

          <v-avatar size="150" v-if="url" class="ml-15">
            <img :src="url" alt="Admin" />
          </v-avatar>

          <v-btn
            elevation="0"
            block
            x-large
            class="mt-2"
            color="accent"
            :hidden="disabledBtn"
            type="submit"
          >
            <span v-if="Form.status === 1">Продовжити</span>
            <span v-if="Form.status === 2 && Form.need_register"
              >Підтвердити</span
            >
            <span v-else-if="Form.status === 2">Увійти</span>
            <span v-else-if="Form.status === 3">Почати спілкування</span>
          </v-btn>
        </form>
      </div>
    </div>
  </v-app>
</template>

<script>
import {
  email,
  required,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

import { validationMixin } from "vuelidate";
//const alpha = helpers.regex("alpha", /^[a-zA-Zа-@]*$/);

export default {
  mixins: [validationMixin],
  data() {
    return {
      Form: {
        avatar: null,
        email: "",
        login_code: "",
        status: 1,
        first_name: "",
        last_name: "",
        need_register: false,
      },
      show: false,
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Розмір аватарки має бути менше 2 MB!",
      ],

      url: null,
      code: "12345",
    };
  },

  computed: {
    rule() {
      const rules = [];
      if (this.code) {
        const rul = (v) =>
          (!!v && v) === this.code || "Ввели не правильний код підтвердження";
        rules.push(rul);
      }
      return rules;
    },
    disabledBtn() {
      return this.$v.Form.email.$invalid;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.Form.email.$dirty) return errors;
      !this.$v.Form.email.email && errors.push("Введіть норм e-mail");
      !this.$v.Form.email.required && errors.push("E-mail є пустишкою");
      return errors;
    },
  },

  methods: {
    login_submitEmail(Email, Status, Code) {
      if (Email === "asd@gmail.com") {
        if (this.Form.status === 1) {
          this.Form.status += 1;
        } else if (Status === 2 && Code === "12345") {
          this.$router.push({ name: "Main" });
        } else if (Status === 2 && Code != "12345") {
          //alert("Не правильний код");
        }
      } else {
        if (Status === 1) {
          this.Form.status += 1;
          this.Form.need_register = true;
        } else if (Status === 2 && Code === "12345") {
          this.Form.status += 1;
        } else if (Status === 2 && Code != "12345") {
          //alert("Не правильний код");
        } else if (Status === 3) {
          this.$router.push({ name: "Main" });
        }
        // POST email
      }
    },

    onFileChange(e) {
      const file = e;
      this.url = URL.createObjectURL(file);
    },
  },

  validations: {
    Form: {
      email: {
        email,
        required,
        //alpha,
      },

      login_code: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(5),
      },

      nickname: {
        required,
        minLength: minLength(6),
      },

      first_name: {
        required,
      },

      last_name: {
        required,
      },
    },
  },
};
</script>

<style>
form {
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  /*box-shadow: 0px 5px 10px 2px rgba(32, 35, 51, 0.2);*/
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus textarea:-webkit-autofill,
textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  box-shadow: 0 0 0px 30px #ffffff inset !important;
}

/* .md-theme-default { */
/* overflow-y: auto; */
/* } */

@media screen and (max-width: 768px) {
  #img {
    width: 160px;
    height: 160px;
  }
}
</style>