<template>
  <LayoutSettings title="Categories">
    <q-tree
      v-if="!!categoriesTree"
      :nodes="[categoriesTree]"
      node-key="id"
      label-key="name"
      default-expand-all
    >
      <template v-slot:default-header="props">
        <div class="fit row justify-between items-center">
          <div class="text-h6">{{props.node.name}}</div>
          <div>
            <q-btn
              v-if="props.node.children.length === 0"
              unelevated
              color="negative"
              icon="delete"
              size="xs"
              class="q-mr-md"
              @click="(e) => remove(e, props.node)"
            >
              <q-tooltip>
                Remove
              </q-tooltip>
            </q-btn>
            <q-btn
              unelevated
              color="secondary"
              icon="edit"
              size="xs"
              class="q-mr-md"
              @click="(e) => edit(e, props.node)"
            >
              <q-tooltip>
                Edit
              </q-tooltip>
            </q-btn>
            <q-btn
              unelevated
              color="primary"
              icon="add"
              size="xs"
              @click="(e) => add(e, props.node)"
            >
              <q-tooltip>
                Add Children
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </template>
    </q-tree>
  </LayoutSettings>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar"
import { onMounted, computed } from "vue";
import { useStore } from "../../store/index";
import LayoutSettings from "../../components/Settings/LayoutSettings.vue";
import CategoryRequest from "../../request/CategoryRequest";
import { CategoryActionTypes } from "../../store/category/action-types";
import { Category } from "../../../../commons/Interface/Category";
import SettingsCategoryModalCreate from "../../components/Settings/Category/SettingsCategoryModalCreate.vue";
import SettingsCategoryModalEdit from "../../components/Settings/Category/SettingsCategoryModalEdit.vue";

const $q = useQuasar()
const $store = useStore()

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const categoriesTree = computed(() => $store.state.category.categoriesTree)

onMounted(() => {
  void CategoryRequest.GetTree()
    .then((data) => {
      void $store.dispatch(`category/${CategoryActionTypes.SET_CATEGORIES_TREE}`, data.categories)
    })
})

const remove = (e: Event, category: Category) => {
  e.preventDefault();
  e.stopPropagation();

  void CategoryRequest.DeleteTree(category.id)
    .then((data) => {
      void $store.dispatch(`category/${CategoryActionTypes.SET_CATEGORIES_TREE}`, data.categories)
    })
}

const edit = (e: Event, category: Category) => {
  e.preventDefault();
  e.stopPropagation();

  $q.dialog({
    component: SettingsCategoryModalEdit,
    componentProps: {
      category
    }
  })
}

const add = (e: Event, category: Category) => {
  e.preventDefault();
  e.stopPropagation();

  $q.dialog({
    component: SettingsCategoryModalCreate,
    componentProps: {
      parentId: category.id
    }
  })
}
</script>