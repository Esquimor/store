<template>
  <div class="row justify-center">
    <div
      v-if="!loading && !!result"
      class="col col-lg-10 col-sx-12 row"
    >
      <section class="col-12 justify-between row q-my-md items-center">
        <q-breadcrumbs>
          <q-breadcrumbs-el :label="$t('label.home')" :to="{ name: 'home' }"/>
          <q-breadcrumbs-el :label="$t('furniture.furnitures')" :to="{ name: 'furnitures' }"/>
          <q-breadcrumbs-el :label="result.furniture.lastFurnitureVersion.name" />
        </q-breadcrumbs>
        <div>
          <q-btn color="primary" :label="$t('label.edit')" icon="edit" :to="{ name: 'furniture-edit', params: {id: route.params.id}}"/>
          <q-btn round icon="mdi-dots-vertical" class="q-ml-md" >
            <q-menu auto-close>
              <q-item clickable v-ripple @click="deleteFurniture">
                <q-item-section avatar>
                  <q-icon name="delete" />
                </q-item-section>
                <q-item-section>
                  {{$t("label.delete")}}
                </q-item-section>
              </q-item>
            </q-menu>
          </q-btn>
        </div>
      </section>
      <section class="col-12">
        <article class="fit row justify-between">
          <Image
            :image="result?.furniture.lastFurnitureVersion.medias?.[0]?.base64 ?? undefined"
            class="col col-4 q-mx-lg"
            style="height: 400px;"
          />
          <div class="col col-7 q-mx-lg">
            <div class="text-h3">{{result.furniture.lastFurnitureVersion.name}}</div>
          </div>
        </article>
      </section>
      <section class="col-12 q-mt-lg">
        <q-tabs
          v-model="tab"
          inline-label
          class="bg-grey-2 text-black shadow-2"
          align="left"
        >
          <q-tab name="description" icon="mdi-text-long" :label="$t('label.description')" />
        </q-tabs>
        <div v-if="tab === 'description'">
          <div class="q-my-lg text-h5">{{result.furniture.lastFurnitureVersion.name}}</div>
          <div class="q-my-lg">{{result.furniture.lastFurnitureVersion.description}}</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar"
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router"
import gql from "graphql-tag";
import { useQuery, UseQueryReturn, useMutation } from "@vue/apollo-composable";
import Image from "../../components/Global/Ui/Image.vue"
import { useI18n } from "vue-i18n"

const $q = useQuasar()
const route = useRoute()
const router = useRouter()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n() 

const tab = ref("description")

const { result, loading }: UseQueryReturn<{
  furniture: {
    id: string;
    lastFurnitureVersion: {
      id: string;
      name: string;
      description: string;
      medias: {
        id: string;
        base64: string;
      }[]
    }
  }
}, {
  id: string
}> = useQuery(gql`
  query furniture (
    $id: String!
  ) {
    furniture (id: $id) {
      id
      lastFurnitureVersion {
        id
        name
        description
        medias {
          id
          base64
        }
      }
    }
  }
`, {
  id: route.params.id
})

const { mutate: archiveFurniture  } = useMutation(gql`
  mutation archiveFurniture ($id: String!) {
    archiveFurniture (id: $id) {
      id
    }
  }
`)

const deleteFurniture = () => {
  $q.dialog({
    title: t("furniture.want_to_delete_the_furniture"),
    message: t("label.are_you_sur"),
    cancel: true,
    persistent: true
  }).onOk(() => {
    archiveFurniture({
      id: route.params.id,
    }).then(() => {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: t("label.deleted")
        })
        void router.push({ name: "furnitures" })
      })
      .catch((e) => console.log(e))
  })
}
</script>
