<template>
  <div class="home">
    <PageTitle icon="fa fa-phone" main="Meus Chamados" sub />

    <h3
      class="my-4"
    >{{ this.call.id ? 'Editar chamado' : 'Abrir novo chamado para '+user.property }}</h3>

    <b-form>
      <input type="hidden" id="call_id" v-model="call.id" />
      <b-row>
        <b-col xs="12">
          <b-form-group label="Descrição:" label-for="call_description">
            <b-form-textarea
              required
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
          <b-button
            variant="primary"
            v-if="mode === 'save'"
            @click="save"
          >{{ this.call.id ? 'Atualizar chamado' : 'Abrir Chamado' }}</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>
    <hr />
    <b-table bordered hover striped :items="this.calls" :fields="fields" class="mt-3">
      <template slot="actions" slot-scope="data" v-if="data.item.status === 'pendente'">
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
import PageTitle from "../template/PageTitle";
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
import { mapState } from "vuex";
import { formatDate } from "@/helpers";

export default {
  name: "Home",
  components: { PageTitle },
  computed: mapState(["user"]),
  data: function () {
    return {
      calls: [],
      call: {},
      mode: "save",
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "description", label: "Descrição", sortable: true },
        { key: "user.property", label: "Empreendimento", sortable: true },
        { key: "status", label: "Status", sortable: true },
        {
          key: "schedule.date_schedule",
          label: "Agendado para",
          sortable: true,
          formatter: (value) => formatDate(value),
        },
        { key: "date_open_formated", label: "Aberto em", sortable: true },
        { key: "date_close_formated", label: "Fechado em", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadCalls() {
      axios
        .get(`${baseApiUrl}/usuarios/${this.user.id}/chamados`)
        .then((res) => (this.calls = res.data));
    },
    reset() {
      this.call = {};
      this.mode = "save";
      this.loadCalls();
    },
    save() {
      this.call.user_id = this.user.id;
      this.call.status = "pendente";

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
  },
  mounted() {
    this.loadCalls();
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