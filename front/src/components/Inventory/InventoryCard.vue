<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{props.inventory.name}}</div>
      </q-card-section>

      <q-separator inset/>

      <q-card-actions align="right">
        <q-btn color="negative" icon="delete" label="Delete" @click="() => $emit('onDelete', props.inventory.id)"/>
        <q-btn
          color="secondary"
          icon="edit"
          label="Edit"
          :to="{ name: 'settings-inventory-edit', params: {id: props.inventory.id } }"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { Inventory } from "../../../../commons/Interface/Inventory";

const props = defineProps<{
  inventory: Inventory
}>()
</script>