<template>
  <div class="container-lg">
    <div
      class="col-lg-4 mx-auto d-flex align-items-center justify-content-center flex-column"
      style="height: 100vh"
    >
      <div class="text-center w-100" style="margin-bottom: 100px">
        <img
          src="https://webz.telegram.org/telegram-logo.df3a91becaa9678c529b4c4cadd45204.svg"
          alt=""
          width="150"
        />
        <h2 style="margin-top: 30px">
          <span v-if="formStep === 1">Увійдіть в Messenger</span>
          <span v-if="formStep === 2">{{ form.email }}</span>
          <span v-if="formStep === 3" style="font-size: 95%"
            >Вітаємо, як Вас звати?</span
          >
        </h2>
        <p class="text-muted" style="margin-bottom: 20px">
          <span v-if="formStep === 1">Для продовження введіть свій E-mail</span>
          <span v-if="formStep === 2">Ми надіслали Вам код підтвердження</span>
          <span v-if="formStep === 3"
            >Введіть ім'я та почніть спілкування!</span
          >
        </p>

        <form @submit.prevent="emailForm()">
          <v-text-field
            v-if="formStep === 1"
            type="email"
            label="E-mail"
            v-model="form.email"
            outlined
            required
            autofocus
            placeholder="Введіть E-mail"
            hide-details="auto"
          ></v-text-field>

          <v-text-field
            v-if="formStep === 2"
            :error-messages="codeError"
            type="text"
            label="Код підтвердження"
            v-model="form.code"
            outlined
            required
            autofocus
            placeholder="Введіть код підтвердження"
            hide-details="auto"
            minlength="5"
            maxlength="5"
            autocomplete="false"
          ></v-text-field>

          <v-text-field
            v-if="formStep === 3"
            type="text"
            label="Ім'я"
            v-model="form.firstname"
            outlined
            required
            autofocus
            placeholder="Введіть ім'я"
            hide-details="auto"
            minlength="2"
            maxlength="20"
          ></v-text-field>

          <v-text-field
            v-if="formStep === 3"
            type="text"
            label="Прізвище"
            v-model="form.lastname"
            outlined
            required
            placeholder="Введіть прізвище"
            hide-details="auto"
            minlength="2"
            maxlength="20"
            class="mt-2"
          ></v-text-field>

          <v-btn
            elevation="0"
            x-large
            block
            class="mt-2"
            color="primary"
            type="submit"
          >
            <v-progress-circular
              v-if="okLogin"
              color="white"
              indeterminate
              class="mr-1"
            ></v-progress-circular>

            <span v-if="formStep === 1 || (formStep === 2 && needRegister)"
              >Продовжити</span
            >
            <span v-else-if="formStep === 3">Почати спілкування</span>
            <span v-else>Увійти</span>
          </v-btn>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        code: "",
        firstname: "",
        lastname: "",
      },
      formStep: 1,
      needRegister: false,
      codeError: "",
      okLogin: false,
    };
  },
  methods: {
    emailForm() {
      // FETCH (EMAIL)
      // -> response

      // Enter email
      if (this.formStep === 1) {
        if (this.form.email != "asd@gmail.com") {
          this.needRegister = true;
        }

        this.formStep++;
      } // Enter login code
      else if (this.formStep === 2) {
        if (this.form.code == "12345") {
          this.codeError = "";

          if (this.needRegister) {
            this.formStep++;
          } else {
            this.okLogin = true;

            setTimeout(() => {
              localStorage.login = true;
              this.$router.push("/");
            }, 1000);
          }
        } else {
          this.codeError = "Не правильний код підтвердження";
        }
      } // Registration
      else if (this.formStep === 3) {
        this.okLogin = true;

        setTimeout(() => {
          localStorage.login = true;
          this.$router.push("/");
        }, 1000);
      }
    },
  },
};
</script>
