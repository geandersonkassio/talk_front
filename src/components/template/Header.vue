<template>
  <div class="header">
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand to="/">Talk</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="user.admin">
          <b-nav-item to="/">Dashboard</b-nav-item>
          <b-nav-item to="/agendamentos">Agendamentos</b-nav-item>
          <b-nav-item to="/chamados">Chamados</b-nav-item>
          <b-nav-item to="/equipes">Equipes</b-nav-item>
          <b-nav-item to="/usuarios">Usuários</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-else>
          <b-nav-item to="/">Meus Chamados</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <UserDropdown />
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import UserDropdown from "./UserDropdown";
import { mapState } from "vuex";

export default {
  name: "Header",
  components: { UserDropdown },
  computed: mapState(["user"]),
};
</script>

<style>
.header {
  grid-area: header;
}
</style>