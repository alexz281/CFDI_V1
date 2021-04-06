<template>
    <v-layout row wrap>
        <v-flex xs3>
            <v-text-field
                    append-icon="Busqueda"
                    label="Filtro"
                    center-line
                    hide-details
                    @input="filterSearch"
            ></v-text-field>
        </v-flex>
        
        <v-flex xs3>
            <v-select
                    :items="authors"
                    label="Author"
                    @change="filterAuthor"
            ></v-select>
        </v-flex>
        
        <v-flex xs12>
            <v-data-table
                    :headers="headers"
                    :items="cfdireport"                    
                    :item-key="cfdi_type"
                    :search="filters"
                    :items-per-page="5"
                    :custom-filter="customFilter"
            >
                <template slot="headers" slot-scope="props">
                    <tr>
                        <th v-for="header in props.headers" :key="header.text">
                            {{ header.text }}
                        </th>
                    </tr>
                </template>
                <template slot="items" slot-scope="props">
                    <tr>
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.added_by }}</td>
                    </tr>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>


<script>

import cfdiservices from '@/services/cfdi'

export default {
  name: 'App',

  components: {
    
  },

  data: () =>({
    filter: {
      search: '',
      added_by: '',

    },
    cfditype: ['Admin', 'Editor'],
    headers: [
          {
            text: 'Status',
            align: 'start',
            sortable: true,
            value: 'status',
          },
          { text: 'Fecha de Cancelación', value: 'cancellation_datetime' },
          { text: 'Versión', value: 'version' },
          { text: 'Tipo de CFDI', value: 'cfdi_type' },
          { text: 'Series', value: 'series' },
          { text: 'Folio', align: 'center', value: 'folio' },
          { text: 'CFDI', align: 'rigth', value: 'uuid' },
          { text: 'Emisión', value: 'cfdi_date_time_t' },
          { text: 'Receptor', value: 'receiver_rfc' },
          { text: 'Descripción del Receptor', value: 'receiver_name' },
          { text: 'Emisor', value: 'issuer_rfc' },
          { text: 'Descripción Emisor', value: 'issuer_name' },
          { text: 'Descripcion', value: 'descripcion' },
          { text: 'Metodo de Pago', value: 'payment_method' },
          { text: 'Forma de Pago', value: 'payment_mode' },
          { text: 'SubTotal', value: 'subtotal' },
          { text: 'Descuento', value: 'discount_total_amount' },
          { text: 'Impuestos', value: 'taxes' },
          { text: 'IVA Retenido', value: 'iva_retenido' },
          { text: 'Total', value: 'total' },
        ], 
        cfdireport: []
  }),
  created () {
    this.getcfidireport()
  },
  methods: {
    async getcfidireport () {
      this.cfdireport = await cfdiservices.getcfdireporissues()
    },
    customFilter(items, filters, filter, headers) {
        const cf = new this.$MultiFilters(items, filters, filter, headers);
        cf.registerFilter('search', function (searchWord, items) {
          if (searchWord.trim() === '') return items;

          return items.filter(item => {
            return item.name.toLowerCase().includes(searchWord.toLowerCase());
          }, searchWord);

        });
        cf.registerFilter('added_by', function (added_by, items) {
          if (added_by.trim() === '') return items;

          return items.filter(item => {
            return item.added_by.toLowerCase() === added_by.toLowerCase();
          }, added_by);

        });
        return cf.runFilters();
      },
      filterSearch(val) {
        this.filters = this.$MultiFilters.updateFilters(this.filters, {search: val});
      },
      filterAuthor(val) {
        this.filters = this.$MultiFilters.updateFilters(this.filters, {added_by: val});
      },
  }
};
</script>
