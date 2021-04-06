<template>
  <v-app>
    <v-data-table
    :headers="headers"
    :items="cfdireport"
    :items-per-page="50"
    class="elevation-1"
  ></v-data-table>
  </v-app>
</template>

<script>

import cfdiservices from '@/services/cfdi'

export default {
  name: 'App',

  components: {
    
  },

  data () {
    return {
        headers: [
          {
            text: 'Status',
            align: 'start',
            sortable: false,
            value: 'status',
          },
          { text: 'Fecha de Cancelación', value: 'cancellation_datetime' },
          { text: 'Versión', value: 'version' },
          { text: 'Tipo de CFDI', value: 'cfdi_type' },
          { text: 'Series', value: 'series' },
          { text: 'Folio', value: 'folio' },
          { text: 'CFDI', value: 'uuid' },
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
    }
  },
  created () {
    this.getcfidireport()
  },
  methods: {
    async getcfidireport () {
      this.cfdireport = await cfdiservices.getcfdireporissues()
    }
  }
};
</script>
