<template>
  <div class="container mt-2">
    <div class="col-3 mx-auto">
      <div class="d-flex justify-content-center" id="img">
        <img src="../assets/m3.png" alt="icon" />
      </div>
      <form action="">
        <v-app>
          <div class="form-group">
            <v-text-field
              label="E-mail"
              @blur="$v.Form.email.$touch()"
              @input="$v.Form.email.$touch()"
              v-model.trim="Form.email"
              required
              color="cyan darken"
              :error-messages="emailErrors"
            ></v-text-field>
          </div>

          <v-btn
            elevation="6"
            color="accent"
            :hidden="disabledBtn"
            type="submit"
            @click="$router.push({ name: 'Main' })"
          >
            Увійти
          </v-btn>
        </v-app>
      </form>
    </div>
  </div>
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
        nickname: "",
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
    /*
    status(validation) {
      return {
        "is-invalid": validation.$error,
        error: validation.$error,
      };
      :class="status($v.Form.email)"
    },*/
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


<style scoped>
form {
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  /*box-shadow: 0px 5px 10px 2px rgba(32, 35, 51, 0.2);*/
}

/* .override .application--wrap { */
/* min-height: 1vh !important; */
/* } */

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