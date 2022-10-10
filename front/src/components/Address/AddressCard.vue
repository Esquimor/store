<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{props.address.name}}</div>
      </q-card-section>

      <q-card-section>
        <div>{{props.address.number}}</div>
        <div>{{props.address.ligne1}}</div>
        <div>{{props.address.ligne2}}</div>
        <div>{{props.address.city}}</div>
        <div>{{props.address.zipCode}} {{props.address.country}}</div>
        <div>{{props.address.comment}}</div>
      </q-card-section>

      <q-separator inset/>

      <q-card-actions align="right">
        <q-btn color="negative" icon="delete" label="Delete" @click="() => $emit('onDelete', props.address.id)"/>
        <q-btn
          color="secondary"
          icon="edit"
          label="Edit"
          :to="{ name: 'settings-address-edit', params: {id: props.address.id } }"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  address: {
    id: string;
    country: string;
    city: string;
    comment: string;
    ligne1: string;
    ligne2: string;
    name: string;
    number: string;
    zipCode: string;
  };
}>();
</script>