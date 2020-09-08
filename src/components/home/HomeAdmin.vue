<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" sub="Sistema de agendamentos" />
    <div class="stats">
      <Stat
        title="Agendamentos"
        :value="stat.agendamentos"
        icon="fa fa-calendar-day fa-5x"
        color="#3282cd"
      />
      <Stat title="Chamados" :value="stat.chamados" icon="fa fa-phone fa-5x" color="#d54d50" />
      <Stat title="Equipes" :value="stat.equipes" icon="fas fa-users-cog fa-5x" color="#3bc480" />
    </div>

    <b-table bordered hover striped :items="this.calls" :fields="fields" class="mt-3"></b-table>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import Stat from "./Stat";
import axios from "axios";
import { baseApiUrl } from "@/global";
import { formatDate } from "@/helpers";

export default {
  name: "Home",
  components: { PageTitle, Stat },
  data: function () {
    return {
      stat: {},
      calls: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "user.name", label: "Cliente", sortable: true },
        { key: "user.property", label: "Empreedimento", sortable: true },
        { key: "description", label: "Descrição", sortable: true },
        { key: "status", label: "Status", sortable: true },
        {
          key: "schedule.date_schedule",
          label: "Agendado para",
          sortable: true,
          formatter: (value) => formatDate(value),
        },
        { key: "date_open_formated", label: "Aberto em", sortable: true },
        { key: "date_close_formated", label: "Fechado em", sortable: true },
      ],
    };
  },
  methods: {
    getStats() {
      axios.get(`${baseApiUrl}/stats`).then((res) => (this.stat = res.data));
    },
    getCalls() {
      axios
        .get(`${baseApiUrl}/chamados`)
        .then((res) => (this.calls = res.data));
    },
  },
  mounted() {
    this.getStats();
    this.getCalls();
  },
};
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>