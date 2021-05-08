<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
html {
  overflow: auto !important;
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

::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

/* Track */
/* ::-webkit-scrollbar-track { */
/* background: #f1f1f1; */
/* } */

/* Handle */
::-webkit-scrollbar-thumb {
  background: #bbb;
  border-radius: 20px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #999;
}
</style>
