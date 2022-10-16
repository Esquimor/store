<template>
  <LayoutSettings title="Categories">
    <q-tree
      v-if="!!tree"
      :nodes="[tree]"
      node-key="id"
      label-key="name"
      default-expand-all
    >
      <template v-slot:default-header="props">
        <div class="fit row justify-between items-center">
          <div class="text-h6">{{props.node.name}}</div>
          <div>
            <q-btn
              v-if="props.node.parent !== null"
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
import { watch, ref, Ref } from "vue";
import LayoutSettings from "../../components/Settings/LayoutSettings.vue";
import SettingsCategoryModalCreate from "../../components/Settings/Category/SettingsCategoryModalCreate.vue";
import SettingsCategoryModalEdit from "../../components/Settings/Category/SettingsCategoryModalEdit.vue";
import { useQuery, useMutation, UseQueryReturn } from "@vue/apollo-composable";
import gql from "graphql-tag";

const $q = useQuasar()

const tree = ref(null) as unknown as Ref<CategoryWithChildren | null>

interface Category  {
  id: string;
  name: string;
  parent?: {
    id: string | null;
  }
}

interface CategoryWithChildren extends Category  {
  children: CategoryWithChildren[]
}

const { result, refetch }: UseQueryReturn<{
  categories: Category[];
}, undefined> = useQuery(gql`
  query categories {
    categories {
      name
      id
      parent {
        id
      }
    }
  }
`)

watch(
  result,
  newResult => {
    if (!newResult) return;
    const firstCategory = newResult.categories.find(c => c.parent === null);
    if (!firstCategory) return;

    const searchChildren = (parentId: string):CategoryWithChildren[] => {
        const childrens = newResult.categories.filter((c => c.parent?.id === parentId));

        return childrens.map(c => ({...c, children: searchChildren(c.id)}))
    }

    tree.value = {...firstCategory, children: searchChildren(firstCategory.id)} as unknown as CategoryWithChildren
})

const { mutate: deleteCategoryMutation  } = useMutation(gql`
  mutation deleteCategory ($id: String!) {
    deleteCategory (id: $id)
  }
`)

const remove = (e: Event, category: Category) => {
  e.preventDefault();
  e.stopPropagation();

  $q.dialog({
    title: "Want to delete the category",
    message: "Are you sur ?",
    cancel: true,
    persistent: true
  }).onOk(() => {
    deleteCategoryMutation({
      id: category.id,
    }).then(() => {
        refetch?.()
          .catch(e => console.log(e))
        $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Deleted"
          })
      })
      .catch((e) => console.log(e))
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
  }).onOk(() => {
    refetch?.()
      .catch(e => console.log(e))
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
  }).onOk(() => {
    refetch?.()
      .catch(e => console.log(e))
  })
}
</script>