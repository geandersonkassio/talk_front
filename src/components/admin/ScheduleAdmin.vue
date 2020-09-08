<template>
  <div class="schedule-admin">
    <PageTitle icon="fas fa-calendar-day" main="Agendamentos" sub />
    <b-form>
      <input type="hidden" id="schedule_id" v-model="schedule.id" />
      <input type="hidden" id="schedule_user_id" v-model="schedule.user_id" value="user_id" />
      <b-row>
        <b-col xs="12">
          <b-form-group label="Chamado" label-for="schedule_call_id">
            <b-form-select id="schedule_call_id" v-model="schedule.call_id" :options="calls"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-form-group label="Equipe" label-for="schedule_team_id">
            <b-form-select id="schedule_team_id" v-model="schedule.team_id" :options="teams"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12" xs="12">
          <b-form-group label="Status:" label-for="schedule_status">
            <b-form-select id="schedule_status" v-model="schedule.status" :options="optionsStatus"></b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12" xs="12">
          <b-form-group label="Agendar Para:" label-for="schedule_date_schedule">
            <b-form-input
              id="schedule_date_schedule"
              type="date"
              v-model="schedule.date_schedule"
              :readonly="mode==='remove'"
              required
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>
    <b-table bordered hover striped :items="schedules" :fields="fields" class="mt-3">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadschedule(data.item)" class="mr-2">
          <i class="fas fa-edit"></i>
        </b-button>
        <b-button variant="danger" @click="loadschedule(data.item, 'remove')" class="mr-2">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle";

export default {
  name: "scheduleAdmin",
  components: { PageTitle },
  data: function () {
    return {
      mode: "save",
      schedule: {},
      schedules: [],
      teams: [],
      calls: [],
      user_id: 2,
      fields: [
        { key: "id", label: "Código", sortable: true },
        {
          key: "date_schedule_formated",
          label: "Agendado para",
          sortable: true,
        },
        { key: "call.description", label: "Motivo", sortable: true },
        { key: "call.user.name", label: "Cliente", sortable: true },
        { key: "call.user.property", label: "Empreendimento", sortable: true },
        { key: "team.name", label: "Equipe", sortable: true },
        { key: 'status', label:'Status'},
        { key: "actions", label: "Ações" },
      ],
      optionsStatus: [
        { value: "aberto", text: "ABERTO" },
        { value: "fechado", text: "FECHADO" },
      ],
    };
  },
  methods: {
    loadschedules() {
      const url = `${baseApiUrl}/agendamentos`;
      axios.get(url).then((res) => {
        this.schedules = res.data;
      });
    },
    reset() {
      this.schedule = {};
      this.mode = "save";
      this.loadschedules();
    },
    save() {
      this.schedule.user_id = 1;
      const method = this.schedule.id ? "put" : "post";
      const id = this.schedule.id ? `/${this.schedule.id}` : "";
      axios[method](`${baseApiUrl}/agendamentos${id}`, this.schedule)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.schedule.id;
      axios
        .delete(`${baseApiUrl}/agendamentos/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadschedule(schedule, mode = "save") {
      this.mode = mode;
      this.schedule = { ...schedule };
    },
    loadCalls() {
      axios
        .get(`${baseApiUrl}/chamados`)
        .then((res) => {
          const dataCalls = res.data;
          this.calls = dataCalls
            // .filter((call) => call.status === "aberto")
            .map((call) => {
              return {
                value: call.id,
                text: `${call.user.name} - ${call.description}`,
              };
            });
        })
        .catch(showError);
    },
    loadTeams() {
      axios
        .get(`${baseApiUrl}/equipes`)
        .then((res) => {
          const dataTeams = res.data;
          this.teams = dataTeams.map((team) => {
            return {
              value: team.id,
              text: `${team.name} | ${team.description}`,
            };
          });
        })
        .catch(showError);
    },
  },
  mounted() {
    this.loadschedules();
    this.loadCalls();
    this.loadTeams();
  },
};
</script>

<style>
</style>