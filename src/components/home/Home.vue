<template>
  <div class="home">
    <HomeAdmin v-if="user.admin" />
    <HomeClient v-else />
  </div>
</template>

<script>
import HomeAdmin from "./HomeAdmin";
import HomeClient from "./HomeClient";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: { HomeAdmin, HomeClient },
  computed: mapState(["user"]),
};
</script>

<style>
</style>