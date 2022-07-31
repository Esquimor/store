<template>
  <q-page padding class="row justify-center">
    <div class="col col-lg-8 col-md-10 col-sx-12">
      <div class="row justify-between items-center">
        <h2 style="margin-top: 0px; margin-bottom: 0px;">Basket</h2>
      </div>
      <q-card class="q-pa-md">
        <q-section>
          <q-input
            filled
            v-model="name"
            label="Name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            class="q-mb-md"
          />
        </q-section>
        <q-section>
          <q-table
            title="Articles"
            :rows="articles"
            :columns="columns"
            row-key="name"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="name" :props="props">
                  {{ props.row.furniture_version.name }}
                </q-td>
                <q-td key="quantity" :props="props">
                  <q-input :model-value="props.row.quantity" @change="(value) => setQuantityOfArticle(props.row.furniture_version.id, +value)">
                    <template v-slot:before>
                      <q-btn round dense flat icon="remove" @click="removeOneQuantityOfArticle(props.row.furniture_version.id)"></q-btn>
                    </template>
                    <template v-slot:after>
                      <q-btn round dense flat icon="add" @click="addOneQuantityOfArticle(props.row.furniture_version.id)"></q-btn>
                    </template>
                  </q-input>
                </q-td>
                <q-td key="delete" :props="props">
                  <q-btn round icon="delete" >
                  </q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-section>
        <q-section class="row justify-end q-pt-md">
          <q-btn color="primary" label="Send Request" @click="sendRequest"/>
        </q-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar"
import { useStore } from "../../store/index";
import { BasketActionTypes } from "../../store/basket/action-types";
import { Article } from "../../../../commons/Interface/Basket";
import OrderRequest from "../../request/OrderRequest";
import { OrderActionTypes } from "../../store/order/action-types";

const $q = useQuasar()
const $store = useStore()

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const articles = computed(() => $store.getters["basket/articles"] as Article[])

const name = ref("")

const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: "name",
    style: "width: 100px",
  },
  {
    name: "quantity",
    required: true,
    label: "Quantity",
    align: "left",
    field: "quantity",
    style: "width: 200px",
  },
  {
    name: "delete",
    style: "width: 50px",
  }
]

const removeOneQuantityOfArticle = (furniture_version_id: string) => {
  void $store.dispatch(`basket/${BasketActionTypes.REMOVE_ONE_QUANTITY_TO_ARTICLE}`, furniture_version_id)
}

const addOneQuantityOfArticle = (furniture_version_id: string) => {
  void $store.dispatch(`basket/${BasketActionTypes.ADD_ONE_QUANTITY_TO_ARTICLE}`, furniture_version_id)
}

const setQuantityOfArticle = (furniture_version_id: string, quantity: number) => {
  void $store.dispatch(`basket/${BasketActionTypes.SET_QUANTITY_TO_ARTICLE}`, {furniture_version_id, quantity})
}

const sendRequest = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  void OrderRequest.Create({
    name: name.value, 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    items: articles.value.map((article: Article) => ({ quantity: article.quantity, furnitureVersionId: article.furniture_version.id}))
  })
    .then(({ order }) => {
      void $store.dispatch(`order/${OrderActionTypes.ADD_ORDER}`, order)
      void $store.dispatch(`basket/${BasketActionTypes.RESET_ARTICLES}`)
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submitted"
      })
    })
}
</script>