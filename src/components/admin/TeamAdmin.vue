<template>
  <div class="team-admin">
    <PageTitle icon="fas fa-users-cog" main="Equipes" sub />

    <b-form>
      <input type="hidden" id="team_id" v-model="team.id" />
      <b-row>
        <b-col md="12" sm="12">
          <b-form-group label="Nome:" label-for="team_name">
            <b-form-input
              id="team_name"
              type="text"
              v-model="team.name"
              :readonly="mode==='remove'"
              required
              placeholder="Informe o Nome da equipe..."
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-form-group label="Descrição:" label-for="team_description">
            <b-form-textarea
              id="team_description"
              v-model="team.description"
              placeholder="Informe a descrição do que equipe faz..."
              rows="3"
              max-rows="6"
              :readonly="mode==='remove'"
            ></b-form-textarea>
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
    <b-table bordered hover striped :items="teams" :fields="fields" class="mt-3">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadTeam(data.item)" class="mr-2">
          <i class="fas fa-edit"></i>
        </b-button>
        <b-button variant="danger" @click="loadTeam(data.item, 'remove')" class="mr-2">
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
  components: { PageTitle },
  name: "TeamAdmin",
  data: function () {
    return {
      mode: "save",
      team: {},
      teams: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "description", label: "Descrição", sortable: true },
        { key: "created_at", label: "Criando Em", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadTeams() {
      const url = `${baseApiUrl}/equipes`;
      axios.get(url).then((res) => {
        this.teams = res.data;
      });
    },
    reset() {
      this.team = {};
      this.mode = "save";
      this.loadTeams();
    },
    save() {
      const method = this.team.id ? "put" : "post";
      const id = this.team.id ? `/${this.team.id}` : "";

      axios[method](`${baseApiUrl}/equipes${id}`, this.team)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.team.id;
      axios
        .delete(`${baseApiUrl}/equipes/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadTeam(team, mode = "save") {
      this.mode = mode;
      this.team = { ...team };
    },
  },
  mounted() {
    this.loadTeams();
  },
};
</script>

<style>
.team-content {
  padding: 20px;
}
</style>