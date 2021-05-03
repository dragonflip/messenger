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
            Увійдіть в Messenger
          </h3>
          <h5 v-if="Form.status === 2 || Form.status === 3" class="mb-5">
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
          ></v-text-field>

          <v-text-field
            v-if="Form.status === 3"
            label="Імя"
            v-model.trim="Form.first_name"
            outlined
            required
            autofocus
            color="cyan darken"
            placeholder="Введіть імя"
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
          ></v-text-field>

          <v-btn
            elevation="0"
            block
            x-large
            class="mt-2"
            color="accent"
            :hidden="disabledBtn"
            type="submit"
          >
            <span v-if="Form.status === 1">Увійти</span>
            <span v-if="Form.status === 2">Продовжити</span>
            <span v-if="Form.status === 3">Реєстрація</span>
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
        email: "",
        login_code: "",
        status: 1,
        first_name: "",
        last_name: "",
      },
    };
  },

  computed: {
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
      if (Email === "pop@gmail.com") {
        if (this.Form.status === 1) {
          this.Form.status += 1;
        } else if (Status === 2 && Code === "kol12") {
          this.$router.push({ name: "Main" });
        } else if (Status === 2 && Code != "kol12") {
          alert("Не правильний код");
        }
      } else {
        if (Status === 1) {
          this.Form.status += 1;
        } else if (Status === 2 && Code === "kol12") {
          this.Form.status += 1;
        } else if (Status === 2 && Code != "kol12") {
          alert("Не правильний код");
        } else if (Status === 3) {
          this.$router.push({ name: "Main" });
        }
        // POST email
      }
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