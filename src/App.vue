<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md6>
          <div class="give-space-field-right">
            <v-text-field
              label="Filtro"
              center-line
              hide-details
            ></v-text-field>
          </div>
        </v-flex>

        <v-flex xs12 md6>
          <div class="give-space-field-left">
            <v-select
              v-model="cfdiFilterChoosed"
              :items="cfditype"
              label="Escoge un filtro"
              @change="onFilterSelected"
            ></v-select>
          </div>
        </v-flex>

        <v-flex xs12>
          <v-data-table
            :headers="headers"
            :items="cfdireport"
            :options.sync="pagination"
            :server-items-length="totalElements"
          >
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style lang="scss">
.give-space-field-right {
  margin-right: 20px;
  @media (max-width: 960px) {
    margin: 0px 10px 0px 10px;
  }
}
.give-space-field-left {
  margin-left: 20px;
  @media (max-width: 960px) {
    margin: 0px 10px 0px 10px;
  }
}
</style>


<script>
import cfdiservices from "@/services/cfdi";
// import cfdiFixtures from "@/fixtures/cfdiFixtures";

export default {
  name: "App",

  components: {},

  data: () => ({
    filter: {
      search: "",
      added_by: "",
    },
    pagination:{},
    cfdiFilterChoosed: "",
    cfditype: ["Ingresos", "Egresos"],
    headers: [
      {
        text: "Status",
        align: "start",
        sortable: true,
        value: "status",
      },
      { text: "Compañia", value: "company" },
      { text: "Fecha de Cancelación", value: "cancellation_datetime" },
      { text: "Versión", value: "version" },
      { text: "Tipo de CFDI", value: "cfdi_type" },
      { text: "Series", value: "series" },
      { text: "Folio", align: "center", value: "folio" },
      { text: "ejercicio", align: "center", value: "year" },
      { text: "CFDI", align: "rigth", value: "uuid" },
      { text: "Emisión", value: "cfdi_date_time_t" },
      { text: "Receptor", value: "receiver_rfc" },
      { text: "Descripción del Receptor", value: "receiver_name" },
      { text: "Emisor", value: "issuer_rfc" },
      { text: "Descripción Emisor", value: "issuer_name" },
      { text: "Descripcion", value: "descripcion" },
      { text: "Metodo de Pago", value: "payment_method" },
      { text: "Forma de Pago", value: "payment_mode" },
      { text: "SubTotal", value: "subtotal" },
      { text: "Descuento", value: "discount_total_amount" },
      { text: "Impuestos", value: "taxes" },
      { text: "IVA Retenido", value: "iva_retenido" },
      { text: "Total", value: "total" },
    ],
    cfdireport: [],
    totalElements: 0
  }),
  created() {
    console.log(this.pagination)
    this.getcfidireport();    
  },
  methods: {
    async getcfidireport() {
      const companygroup ='Inmobiliaria'
      const company ='INC'
      let cfditype
      const year = 2021
      let page = this.pagination.page ? this.pagination.page - 1 : 0
      let size = this.pagination.itemsPerPage ? this.pagination.itemsPerPage : 10
      if(this.cfdiFilterChoosed === null){
          cfditype = this.cfditype[0]
        }else{
          cfditype = this.cfdiFilterChoosed
        }
      
      let res = await cfdiservices.getcfdireporissues(companygroup, company, cfditype, year, size, page);
      this.cfdireport = res.content
      res.totalElements = this.cfdireport.totalElements
    },
  
//companygroup, company, cfditype, year, pageSize, pageNo
    onFilterSelected() {
      this.getcfidireport();
  }
  },
  watch:{ 
   pagination: {
      handler: function () {
        this.getcfidireport()
      },
      deep: true,
    },
  }
}
</script>
