<template>
  <div class="call-admin">
    <PageTitle icon="fa fa-phone" main="Chamados" sub />

    <b-form>
      <input type="hidden" id="call_id" v-model="call.id" />
      <b-row>
        <b-col xs="12">
          <b-form-group label="Cliente" label-for="call_user_id">
            <b-form-select id="call_user_id" v-model="call.user_id" :options="users"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-form-group label="Descrição:" label-for="call_description">
            <b-form-textarea
              id="call_description"
              v-model="call.description"
              placeholder="Informe do que se trata o chamado..."
              rows="3"
              max-rows="6"
              :readonly="mode==='remove'"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-form-group label="Status:" label-for="call_status">
            <b-form-select id="call_status" v-model="call.status" :options="optionsStatus"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Data de Abertura:" label-for="call_date_open">
            <b-form-input
              id="call_date_open"
              type="date"
              v-model="call.date_open"
              :readonly="mode==='remove'"
              required
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Data de Fechamento:" label-for="call_date_close">
            <b-form-input
              id="call_date_close"
              type="date"
              v-model="call.date_close"
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
    <b-table bordered hover striped :items="calls" :fields="fields" class="mt-3">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadcall(data.item)" class="mr-2">
          <i class="fas fa-edit"></i>
        </b-button>
        <b-button variant="danger" @click="loadcall(data.item, 'remove')" class="mr-2">
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
  name: "callAdmin",
  components: { PageTitle },
  data: function () {
    return {
      mode: "save",
      call: {},
      calls: [],
      users: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "user.name", label: "Cliente", sortable: true },
        { key: "user.property", label: "Empreendimento", sortable: true },
        { key: "description", label: "Descrição", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "date_open_formated", label: "Abertura", sortable: true },
        { key: "date_close_formated", label: "Fechamento", sortable: true },
        { key: "actions", label: "Ações" },
      ],
      optionsStatus: [
        { value: "pendente", text: "PENDENTE" },
        { value: "aberto", text: "ABERTO" },
        { value: "fechado", text: "FECHADO" },
        { value: "cancelado", text: "CANCELADO" },
      ],
    };
  },
  methods: {
    loadcalls() {
      const url = `${baseApiUrl}/chamados`;
      axios.get(url).then((res) => {
        this.calls = res.data;
      });
    },
    reset() {
      this.call = {};
      this.mode = "save";
      this.loadcalls();
    },
    save() {
      const method = this.call.id ? "put" : "post";
      const id = this.call.id ? `/${this.call.id}` : "";
      axios[method](`${baseApiUrl}/chamados${id}`, this.call)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.call.id;
      axios
        .delete(`${baseApiUrl}/chamados/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadcall(call, mode = "save") {
      this.mode = mode;
      this.call = { ...call };
    },
    loadUsers() {
      axios
        .get(`${baseApiUrl}/clientes`)
        .then((res) => {
          const dataUsers = res.data;
          this.users = dataUsers
            .filter((user) => !user.admin)
            .map((user) => {
              return {
                value: user.id,
                text: `${user.name} - ${user.property}`,
              };
            });
        })
        .catch(showError);
    },
  },
  mounted() {
    this.loadcalls();
    this.loadUsers();
  },
};
</script>

<style>
</style>