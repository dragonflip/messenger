<template>
  <v-app>
    <div class="container" style="margin-top: calc(50vh - 400px)">
      <div class="col-3 mx-auto">
        <div
          class="d-flex justify-content-center align-items-center flex-column text-center"
          id="img"
        >
          <img src="../assets/m3.png" width="350px" alt="icon" />
          <h3 style="margin-top: -50px; margin-bottom: 20px">
            Увійдіть в Messenger
          </h3>
          <h5 v-if="Form.login_code">{{ Form.email }}</h5>
        </div>
        <form @submit.prevent="login_submit(Form.login_code)">
          <v-text-field
            v-if="!Form.login_code"
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
            v-if="Form.login_code"
            label="Код підтвердження"
            outlined
            required
            autofocus
            color="cyan darken"
            :error-messages="emailErrors"
            placeholder="Введіть код підтвердження"
            hide-details="auto"
          ></v-text-field>

          <v-btn
            elevation="0"
            block
            large
            class="mt-2"
            color="accent"
            :hidden="disabledBtn"
            type="submit"
          >
            <span v-if="Form.login_code">Увійти</span>
            <span v-else>Продовжити</span>
          </v-btn>
        </form>
      </div>
    </div>
  </v-app>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
//const alpha = helpers.regex("alpha", /^[a-zA-Zа-@]*$/);

export default {
  mixins: [validationMixin],
  data() {
    return {
      Form: {
        email: "",
        login_code: false,
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
    login_submit(login_code) {
      if (login_code) {
        // POST login_code
        // push main

        this.$router.push({ name: "Main" });
      } else {
        this.Form.login_code = true;

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
      nickname: {
        required,
        minLength: minLength(6),
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