<template>
  <b-nav-item-dropdown :text="user.name" right>
    <b-dropdown-item href @click.prevent="logout">
      <i class="fas fa-sign-out-alt"></i> Sair
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import { userKey } from "@/global";
import { mapState } from "vuex";
import Gravatar from "vue-gravatar";

export default {
  name: "UserDropdown",
  components: { Gravatar },
  computed: mapState(["user"]),
  methods: {
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      this.$router.push({ name: "auth" });
    },
  },
};
</script>

<style>
</style>