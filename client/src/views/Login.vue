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
          <span v-if="formStep === 3" style="font-size: 95%">
            Вітаємо, як Вас звати?
          </span>
        </h2>
        <p class="text-muted" style="margin-bottom: 20px">
          <span v-if="formStep === 1">Для продовження введіть свій E-mail</span>
          <span v-if="formStep === 2">
            <span v-if="checkSpam">
              Перевірте код підтвердження у папці Спам
            </span>
            <span v-else>Ми надіслали Вам код підтвердження</span>
          </span>
          <span v-if="formStep === 3">
            Введіть ім'я та почніть спілкування!
          </span>
        </p>

        <form @submit.prevent="!submitBlock ? emailForm() : ''">
          <v-text-field
            v-if="formStep === 1"
            type="email"
            label="E-mail"
            name="email"
            v-model.trim="form.email"
            outlined
            required
            autofocus
            placeholder="Введіть E-mail"
            hide-details="auto"
          ></v-text-field>

          <v-text-field
            v-if="formStep === 2"
            :error-messages="loginCodeError"
            type="text"
            label="Код підтвердження"
            name="login_code"
            v-model.trim="form.login_code"
            outlined
            required
            autofocus
            placeholder="Введіть код підтвердження"
            hide-details="auto"
            minlength="5"
            maxlength="5"
            autocomplete="off"
          ></v-text-field>

          <v-text-field
            v-if="formStep === 3"
            type="text"
            label="Ім'я"
            name="firstname"
            v-model.trim="form.firstname"
            outlined
            required
            autofocus
            placeholder="Введіть ім'я"
            hide-details="auto"
            minlength="2"
            maxlength="20"
            autocomplete="off"
          ></v-text-field>

          <v-text-field
            v-if="formStep === 3"
            type="text"
            label="Прізвище (не обов'язково)"
            name="lastname"
            v-model.trim="form.lastname"
            outlined
            placeholder="Введіть прізвище"
            hide-details="auto"
            minlength="2"
            maxlength="20"
            autocomplete="off"
            class="mt-2"
          ></v-text-field>

          <v-btn
            elevation="0"
            x-large
            block
            class="mt-2"
            color="primary"
            type="submit"
            :loading="okLogin"
          >
            <span v-if="formStep === 3">Почати спілкування</span>
            <span v-else-if="formStep === 1 || needRegister">Продовжити</span>
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
        login_code: "",
        firstname: "",
        lastname: "",
      },
      formStep: 1,
      submitBlock: false,
      needRegister: false,
      loginCodeError: "",
      okLogin: false,
      checkSpam: false,
    };
  },
  methods: {
    async emailForm() {
      // Enter email
      if (this.formStep === 1) {
        if (!this.form.email.trim()) {
          this.email = "";
          return;
        }

        this.submitBlock = true;

        const res = await fetch("/api/sendCode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: this.form.email }),
        });
        const data = await res.json(); // need register (true | false)

        this.needRegister = data.need_register;
        this.formStep++;

        this.submitBlock = false;

        setTimeout(() => {
          this.checkSpam = true;
        }, 30000);
      }
      // Enter login code
      else if (this.formStep === 2) {
        if (!this.form.login_code.trim()) {
          this.form.login_code = "";
          return;
        }

        this.submitBlock = true;
        this.okLogin = true;

        const res = await fetch("/api/signIn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.form.email,
            login_code: this.form.login_code,
          }),
        });
        const data = await res.json(); // token ("..." | null)

        console.log(data);

        if (data.token !== null) {
          this.loginCodeError = "";

          if (this.needRegister) {
            this.formStep++;
            this.okLogin = false;
          } else {
            setTimeout(() => {
              localStorage.token = data.token;
              this.$router.push("/");
            }, 1000);
          }
        } else {
          this.loginCodeError = "Не правильний код підтвердження";
          this.okLogin = false;
        }

        this.submitBlock = false;
      } // Registration
      else if (this.formStep === 3) {
        if (!this.form.firstname.trim()) {
          this.form.firstname = "";
          return;
        }
        if (!this.form.lastname.trim() && this.form.lastname.length) {
          this.form.lastname = "";
          return;
        }

        this.submitBlock = true;
        this.okLogin = true;

        const res = await fetch("/api/signUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.form.email,
            login_code: this.form.login_code,
            firstname: this.form.firstname,
            lastname: this.form.lastname,
          }),
        });
        const data = await res.json(); // token ("..." | null)
        console.log(data);

        if (data.token !== null) {
          setTimeout(() => {
            localStorage.token = data.token;
            this.$router.push("/");
          }, 1000);
        }

        this.submitBlock = false;
      }
    },
  },
  mounted() {
    if (localStorage.token) {
      this.$router.push("/");
    }
  },
};
</script>
