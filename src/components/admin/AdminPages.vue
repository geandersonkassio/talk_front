<template>
  <div class="admin-pages">
    <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastros & Cia" />

    <div class="admin-pages-tabs">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Agendamentos" active>
            <ScheduleAdmin />
          </b-tab>
          <b-tab title="Chamados">
            <CallAdmin />
          </b-tab>
          <b-tab title="Equipes" >
            <TeamAdmin />
          </b-tab>
          <b-tab title="Usuários">
            <UserAdmin />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import CallAdmin from "./CallAdmin";
import TeamAdmin from "./TeamAdmin";
import ScheduleAdmin from "./ScheduleAdmin";
import UserAdmin from "./UserAdmin";

export default {
  name: "AdminPages",
  components: { PageTitle, CallAdmin, TeamAdmin, ScheduleAdmin, UserAdmin },
};
</script>

<style>
</style>