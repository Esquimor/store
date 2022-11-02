<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" >
    <q-card
      class="row FurnitureVersionModal"
      v-if="result"
    >
      <q-card-section class="bg-primary text-white full-width q-pa-md row justify-between items-center">
        <div class="text-h6">{{result.furnitureVersion.name}}</div>
        <q-btn
          :to="{name: 'furniture', params: {id: result.furnitureVersion.furniture.id}}"
          icon="mdi-open-in-new"
          round
          color="secondary"
        />
      </q-card-section>
      <q-card-section class="col-12">
        <article class="fit row justify-between">
          <q-img
            v-if="result.furnitureVersion.medias.length > 0"
            :src="result.furnitureVersion.medias[0].base64"
            class="col col-4 q-mx-md"
          />
          <div class="col col-6 q-mx-md">
            <Info
              :label="$t('label.name')"
              :value="result.furnitureVersion.name"
            />
            <Info
              :label="$t('label.description')"
              :value="result.furnitureVersion.description"
            />
          </div>
        </article>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right" class="full-width q-mt-lg bg-grey-2">
        <q-btn
          @click="onDialogHide"
          color="black"
          icon="close"
          :label="$t('label.close')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from "quasar"
import { useQuery, UseQueryReturn } from "@vue/apollo-composable";
import gql from "graphql-tag";
import Info from "../../Global/Ui/Info.vue"

defineEmits([
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide } = useDialogPluginComponent()

const props = defineProps<{
  id: string
}>()

const { result }: UseQueryReturn<{
  furnitureVersion: {
    id: string;
    name: string;
    description: string;
    medias: {
      id: string;
      base64: string;
    }[]
    furniture: {
      id: string;
    }
  };
}, {
  id: string
}> = useQuery(gql`
  query furnitureVersion($id: String!) {
    furnitureVersion(id: $id) {
      id
      name
      description
      medias {
        id
        base64
      }
      furniture {
        id
      }
    }
  }
`, {
  id: props.id
})
</script>

<style lang="scss">
.FurnitureVersionModal {
  max-width: 700px !important;
  width: 700px !important
}
</style>