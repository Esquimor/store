<template>
  <LayoutContent>
    <Form
      :validation-schema="schema"
      @submit="onSubmit"
      ref="myForm"
    >
      <q-expansion-item
        expand-separator
        class="full-width q-pb-lg"
        default-opened
      >
        <template v-slot:header>
          <div class="full-width text-h4">{{$t("label.general")}}</div>
        </template>
        <q-card>
          <q-card-section>
            <QInputWithValidation
              name="name"
              :label="$t('label.name')"
            />
            <QInputWithValidation
              name="description"
              :label="$t('label.description')"
              type="textarea"
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        expand-separator
        class="full-width q-pb-lg"
        default-opened
      >
        <template v-slot:header>
          <div class="full-width text-h4">{{$t("attribut.attributs")}}</div>
        </template>
        <q-card>
          <q-card-section>
            <FieldArray name="attributs" v-slot="{ fields: fieldsA, push: pushA, remove: removeA }">
              <q-card-section
                v-for="(fieldA, idxA) in fieldsA"
                :key="fieldA.key"
              >
                <q-card class="full-width" flat bordered>
                  <q-card-section>
                    <q-card-section horizontal>
                      <div class="full-width">
                        <QInputWithValidation
                          :name="`attributs[${idxA}].name`"
                          :label="$t('label.name')"
                        />
                        <FieldArray :name="`attributs[${idxA}].variations`" v-slot="{ fields: fieldsV, push: pushV, remove: removeV }">
                          <q-card-section
                            v-for="(fieldV, idxV) in fieldsV"
                            :key="fieldV.key"
                          >
                            <q-card class="full-width" flat bordered>
                              <q-card-section>
                                <q-card-section horizontal>
                                  <div class="full-width">
                                    <QInputWithValidation
                                      :name="`attributs[${idxA}].variations[${idxV}].name`"
                                      :label="$t('label.name')"
                                    />
                                  </div>

                                  <q-card-actions vertical class="justify-start items-start content-start">
                                    <q-btn flat round color="red" icon="delete" @click="removeV(idxV)"/>
                                  </q-card-actions>
                                </q-card-section>
                              </q-card-section>
                            </q-card>
                          </q-card-section>
                          <q-card-actions class="q-pl-lg">
                            <q-btn :label="$t('label.add')" color="primary"  @click="pushV({ name: '' })" />
                          </q-card-actions>
                        </FieldArray>
                      </div>

                      <q-card-actions vertical class="justify-start items-start content-start">
                        <q-btn flat round color="red" icon="delete" @click="removeA(idxA)"/>
                      </q-card-actions>
                    </q-card-section>
                  </q-card-section>
                </q-card>
              </q-card-section>
              <q-card-actions class="q-pl-lg">
                <q-btn :label="$t('label.add')" color="primary"  @click="pushA({ name: '' })" />
              </q-card-actions>
            </FieldArray>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        expand-separator
        class="full-width q-pb-lg"
        default-opened
      >
        <template v-slot:header>
          <div class="full-width text-h4">{{$t("media.pictures")}}</div>
        </template>
        <q-card>
          <q-card-section>
            <FieldArray name="medias" v-slot="{ fields, push, remove, move }">
              <div class="fit row wrap items-center FurnitureEdit-medias">
                <template
                  v-for="(field, idx) in fields"
                  :key="field.key"
                >
                  <q-img
                    :src="field?.value?.base64 || ''"
                    spinner-color="white"
                    class="q-ma-md FurnitureEdit-media"
                  >
                    <q-icon
                      class="absolute all-pointer-events FurnitureEdit-media-icon"
                      size="32px"
                      name="mdi-delete-circle"
                      color="red"
                      style="top: 8px; left: 8px"
                      @click="remove(idx)"
                    />
                    <q-icon
                      v-if="!field.isFirst"
                      class="absolute all-pointer-events FurnitureEdit-media-icon"
                      size="32px"
                      name="mdi-arrow-left-drop-circle"
                      color="primary"
                      style="bottom: 8px; left: 8px"
                      @click="move(idx, idx -1)"
                    />
                    <q-icon
                      v-if="!field.isLast"
                      class="absolute all-pointer-events FurnitureEdit-media-icon"
                      size="32px"
                      name="mdi-arrow-right-drop-circle"
                      color="primary"
                      style="bottom: 8px; right: 8px"
                      @click="move(idx, idx +1)"
                    />
                  </q-img>
                </template>
                <QImageWithValidation
                  class="q-ma-md"
                  @add="(base64) => push({base64})"
                />
              </div>
            </FieldArray>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-btn color="primary" type="submit" :label="$t('label.submit')" />
    </Form>
  </LayoutContent>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router"
import QImageWithValidation from "src/components/Global/Form/QImageWithValidation.vue";
import { Form, FieldArray } from "vee-validate";
import { useQuasar } from "quasar"
import * as yup from "yup";
import QInputWithValidation from "../../components/Global/Form/QInputWithValidation.vue"
import { useQuery, UseQueryReturn, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { SingleTransition } from "csstype";
import { useI18n } from "vue-i18n"
import LayoutContent from "../../components/Layout/LayoutContent.vue";

const $q = useQuasar()
const router = useRouter()
const route = useRoute()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n() 

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
  attributs: yup.array().of(yup.object({
    id: yup.string().optional(),
    name: yup.string().required(),
    variations: yup.array().of(yup.object({
      id: yup.string().optional(),
      name: yup.string(),
    }))
  })),
  medias: yup.array().of(yup.object({
    id: yup.string().optional(),
    base64: yup.string(),
  }))
});


const { result }: UseQueryReturn<{
  furniture: {
    id: string;
    lastFurnitureVersion: {
      id: string;
      name: string;
      description: string;
      attributs: {
        id: string;
        name: string;
        variations: {
          id: SingleTransition;
          name: string
        }[]
      }[]
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
        attributs {
          id
          name
          variations {
            id
            name
          }
        }
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

const myForm = ref(null);

watch(
  result,
  () => {
    // Sanitize medias
    const medias = result.value?.furniture.lastFurnitureVersion?.medias.map(media => 
      ({id: media.id, base64: media.base64})
    )
    // Sanitize attributs
    const attributs = result.value?.furniture.lastFurnitureVersion.attributs.map(attr => (
      { id: attr.id, name: attr.name, variations: attr.variations.map(variation => 
        ({ id: variation.id, name: variation.name })  
      ) }
    ))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    myForm.value.setValues({...result.value?.furniture.lastFurnitureVersion, medias, attributs})
  }
)

const { mutate: editFurniture } = useMutation(gql`
  mutation editFurniture (
    $id: String!
    $name: String
    $description: String
    $attributs: [AttributUpdate]
    $medias: [MediaUpdate]
  ) {
    editFurniture (
      id: $id
      name: $name
      description: $description
      attributs: $attributs
      medias: $medias
    ) {
      id
    }
  }
`)

const onSubmit = (values: {
  name: string;
  description?: string;
  attributs: {
    id?: string;
    name: string;
    variations: {
    id?: string;
      name: string;
    }[];
  }[];
  medias: {
    id?: string;
    base64: string;
  }[];
}) => {
  editFurniture({...values, id: route.params.id})
    .then(() => {
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: t("label.submited")
      })
      void router.push({ name: "furnitures" })
    })
    .catch((e) => console.log(e))
}
</script>

<style lang="scss">
.FurnitureEdit {
  &-medias {
    > * {
      width: 10rem;
      height: 12rem;
      margin: 0.8rem;
      border-radius: 5px;
      &:hover {
        .FurnitureEdit-media-icon {
          display: initial;
        }
      }
    }
  }
  &-media {
    &-icon {
      cursor: pointer;
      display: none;
    }
  }
}
</style>