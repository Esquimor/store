<template>
  <section class="q-pa-md">
    <h3 class="text-subtitle1 q-ma-xs text-weight-bolder">{{$t("category.category")}}</h3>
    <template v-if="!loading">
      <div
        v-for="cat in ancestors"
        :key="cat.id"
        @click="() => $emit('changeCategory', cat.id)"
        class="cursor-pointer"
      >
        <q-icon
          size="xs"
          name="chevron_left"
        />
        {{cat.name}}
      </div>
      <div class="q-pl-md text-weight-bold">{{category.name}}</div>
      <div
        v-for="cat in category.children"
        :key="cat.id"
        @click="() => $emit('changeCategory', cat.id)"
        class="q-pl-lg cursor-pointer"
      >
        {{cat.name}}
      </div>
      <br/>
    </template>
  </section>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useQuery, UseQueryReturn } from "@vue/apollo-composable";
import gql from "graphql-tag";

const props = defineProps<{
  category: string;
}>()

const variablesCategory = computed(() => ({
  id: props.category
}))

const { result, loading }: UseQueryReturn<{
  category: {
    id: string;
    name: string;
    children: {
      id: string;
      name: string
    }[]
    ancestors: {
      id: string;
      name: string
    }[]
  };
}, {
  id: string;
}> = useQuery(gql`
  query category($id: String!) {
    category(id: $id) {
      id
      name
      children {
        id
        name
      }
      ancestors {
        id
        name
      }
    }
  }
`, variablesCategory)

const category = computed(() => result.value?.category ?? {id: "", name: "", children: [], ancestors: []})

const ancestors = computed(() => [...category.value.ancestors].reverse())
</script>