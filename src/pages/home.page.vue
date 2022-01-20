<script lang="ts" setup>
import {ref, computed} from 'vue';

import {Category} from '../types/category.type';
import {Template} from '../types/template.type';
import {Material, Texture} from '../types/material.type';
import {Design, DesignSide, DesignData} from '../types/design.type';

import {router} from '../router';
import {store} from '../store';

const tab = ref('blank')
const activeCategory = ref<null | Category>(null)
const activeTemplate = ref<null | Template>(null)
const activeMaterial = ref<null | Material>(null)
const activeColors = ref<null | Record<any, string>>(null)

const categories = computed(() => store.state.categories)
const materialRecord = computed(() => store.state.materialRecord)
const templateRecord = computed(() => store.state.templateRecord)

function editFromDesign(design: Design) {
  router.push({ name: 'editor', params: {iid: `${design.slug}-${design.id}`} })
}

function editFromTemplate() {
  if (!activeCategory.value || !activeTemplate.value || !activeMaterial.value || !activeColors.value?.front) return
  const designData = activeTemplate.value.spec.units.reduce(
    (result, item) => {
      result[item.id] = {
        front: {
          showBackdrop: true,
          showNumbering: true,
          color: (activeColors.value as any)['front'],
          canvasJSON: JSON.stringify({version: '4.6.0', objects: []})
        },
        back: {
          showBackdrop: true,
          showNumbering: true,
          color: (activeColors.value as any)['back'] || (activeColors.value as any)['front'],
          canvasJSON: JSON.stringify({version: '4.6.0', objects: []})
        }
      }
      return result;
    },
    {} as Record<string, DesignData>
  )
  const design: Design = {
      id: Math.floor(Math.random() * 1000),
      slug: 'untitled-design',
      title: 'Untitled design',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      template_id: activeTemplate.value.id,
      category_id: activeCategory.value.id,
      material_id: activeMaterial.value.id,
      design_data: designData,
    };
  store.dispatch('createDesign', design).then(() => editFromDesign(design));
}

async function selectTemplate(category: Category, template: Template) {
  // set active category
  activeCategory.value = category
  // set active template
  activeTemplate.value = template
  // load belonging materials
  await store.dispatch('loadMaterials', template)
  // set default material
  selectMaterial(
    materialRecord.value[template.id].find(
      item => item.id === template.default_material_id
    ) as Material
  )
}

function selectMaterial(material: Material) {
  // reset color
  activeColors.value = null
  // set active material
  activeMaterial.value = material
  // set default color
  activeColors.value = Object.keys(activeMaterial.value.textures).reduce(
    (result, name) => {
      result[name as DesignSide] = ((activeMaterial.value as Material)
        .textures[name as DesignSide] as Texture)
        .colors[0]
      return result
    },
    {} as Record<any, string>
  )
}

function selectColor(name: any, color: string) {
  activeColors.value = { ...activeColors.value, [name]: color } as Record<any, string>
}

function chooseCustomColor() {
  alert('TODO: choose custom color ...')
}

store.dispatch('loadCategoriesAndTemplates')
</script>

<template>

<div class="header">
  <h1>BOX-R</h1>
</div>

<div class="main">

  <ul class="category-list">
    <li v-for="(categoryItem, i) in categories" :key="i">
      <h2 class="category-head">
        <img :src="categoryItem.thumbnail" :alt="categoryItem.title">
        <strong>{{categoryItem.title}}</strong>
      </h2>
      <p v-if="!templateRecord[categoryItem.id]?.length">No template available!</p>
      <ul class="template-list" v-else>
        <li
          v-for="(templateItem, j) in templateRecord[categoryItem.id]"
          :key="j"
          @click="templateItem.id === activeTemplate?.id ? false : selectTemplate(categoryItem, templateItem)"
          :class="{active: templateItem.id === activeTemplate?.id}"
        >
          <div class="info">
            <div class="thumbnail">
              <img :src="templateItem.thumbnail" :alt="templateItem.title">
            </div>
            <div class="content">
              <h3>{{templateItem.title}}</h3>
              <p>Size: <strong>{{templateItem.display_size}}</strong></p>
            </div>
            <div class="price">
              <span v-if="templateItem.sale_off">-{{templateItem.sale_off}} off</span>
              <strong>{{templateItem.base_price - templateItem.sale_off}}</strong><em>₫</em>
            </div>
          </div>

          <div class="detail" v-if="templateItem.id === activeTemplate?.id">

            <div class="links">
              <h4 @click.prevent="tab='blank'" :style="{opacity: tab==='blank' ? 1 : .5}">Start from scratch</h4>
              <h4 @click.prevent="tab='ready'" :style="{opacity: tab==='ready' ? 1 : .5}">Choose a design</h4>
            </div>

            <div class="start-from-scratch" v-if="tab==='blank'">
              <div class="selectors">
                <div class="material-selection">
                  <h5>Select material</h5>
                  <ul class="material-list">
                    <li
                      v-for="(materialItem, k) in materialRecord[templateItem.id]"
                      :key="k"
                      :class="{active: activeMaterial?.id === materialItem.id}"
                      @click.stop="selectMaterial(materialItem)"
                    >
                      <div class="thumbnail">
                        <em
                          class="color-front"
                          :style="{
                            background:
                              activeMaterial?.id === materialItem.id && activeColors?.front
                                ? activeColors.front
                                : materialItem.textures.front.colors[0]
                          }"
                        ></em>
                        <em
                          class="color-back"
                          :style="{
                            background:
                              activeMaterial?.id === materialItem.id && (activeColors?.back || activeColors?.front)
                                ? (activeColors.back || activeColors.front)
                                : (materialItem.textures.back?.colors[0] || materialItem.textures.front.colors[0])
                          }"
                        ></em>
                      </div>
                      <div class="content"><h6>{{materialItem.title}}</h6></div>
                      <div class="price" v-if="materialItem.offset_price">+{{ materialItem.offset_price }}</div>
                    </li>
                  </ul>
                </div>
                <div class="color-selection">
                  <h5>Select color</h5>
                  <template v-if="activeMaterial && activeMaterial.textures.front.colors.length > 1">
                    <div v-for="(textureItem, k) in activeMaterial.textures" :key="k">
                      <div class="material-name" v-if="textureItem?.title">{{ textureItem.title }}</div>
                      <ul class="color-list">
                        <li
                          v-for="(colorItem, m) in textureItem?.colors"
                          :key="m"
                          :class="{active: activeColors?.[k] === colorItem}"
                          @click.stop="selectColor(k, colorItem)"
                        >
                          <h6 class="thumbnail" :style="{background: colorItem}"></h6>
                        </li>
                        <li class="choose-custom" v-if="textureItem?.customizable" @click.stop="chooseCustomColor()">(+)</li>
                      </ul>
                    </div>
                  </template>
                  <p class="no-color" v-else>This material doesn't support custom background color!</p>
                </div>
              </div>
              <div class="actions">
                <button @click.stop="editFromTemplate()">Start design</button>
              </div>
            </div>

            <div class="choose-a-design" v-else>
              <p>TODO: ...</p>
            </div>

          </div>

        </li>
      </ul>
    </li>
  </ul>

</div>

</template>

<style lang="scss" scoped>

.header {
  
  h1 {
    text-align: center;
    margin-bottom: 0;
    margin-top: 3rem;
    font-size: 2.5rem;
  }
}

.main {
  padding: 3rem;
  max-width: 992px;
  margin: auto;

  .category-list {
    list-style: none;
    margin: 0;
    padding: 0;

    & > li {
      margin-top: 3rem;

      &:first-child {
        margin-top: 0;
      }
    }

    .category-head {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;

      img {
        width: 50px;
        margin-right: 1rem;
      }
    }

    .template-list {
      list-style: none;
      margin: 0;
      padding: 0;

      & > li {
        padding: 1rem;
        border: 1px solid #cccccc;
        border-radius: 1rem;
        margin-bottom: 1rem;

        &:hover {
          cursor: pointer;
          background: #f1f1f1;
        }

        &.active:hover {
          cursor: default;
          background: #ffffff;
        }
      }

      .info {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        margin-right: 1rem;

        .thumbnail {
          width: 120px;
          height: 120px;
          margin-right: 1rem;

          img {
            width: 100%;
          }
        }

        .content {
          flex: 1;

          h3 {
            margin: 0;
          }

          p {
            margin: 0;
          }
        }

        .price {

          strong {
            font-size: 1.3rem;
            margin-right: .5rem;
          }
        }
      }

      .detail {

        .links {
          border-bottom: 1px solid #cccccc;

          h4 {
            display: inline-block;
            margin: 0;
            padding: .5rem 1rem;
            font-size: .9rem;
            font-weight: normal;
            cursor: pointer;
          }
        }

        .start-from-scratch {

          .selectors {
            display: flex;
            flex-wrap: nowrap;
            padding: 1rem 2rem;
            border-bottom: 1px solid #cccccc;

            .material-selection {
              width: 45%;
              margin-right: 3%;
              padding-right: 2%;
              border-right: 1px solid #cccccc;

              .material-list {
                list-style: none;
                margin: 0;
                padding: 0;

                li {
                  display: flex;
                  flex-wrap: nowrap;
                  align-items: center;
                  margin-bottom: 1rem;
                  cursor: pointer;

                  &.active .thumbnail {
                    box-shadow: 0 0 0 3px rgb(17, 60, 252, .5);
                  }

                  .thumbnail {
                    position: relative;
                    overflow: hidden;
                    width: 30px;
                    height: 30px;
                    margin-right: 1rem;
                    border-radius: 100%;
                    box-shadow: 0 0 0 1px #cccccc;

                    .color-front {
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 15px;
                      height: 30px;
                    }

                    .color-back {
                      position: absolute;
                      top: 0;
                      left: 15px;
                      width: 15px;
                      height: 30px;
                    }
                  }

                  .content {
                    flex: 1;

                    h6 {
                      margin: 0;
                      font-size: 1rem;
                      font-weight: normal;
                    }
                  }
                }
              }
            }

            .color-selection {
              width: 50%;

              .material-name {
                color: #777777;
              }

              .color-list {
                list-style: none;
                margin: 0;
                padding: 0;
                display: flex;
                flex-wrap: nowrap;
                align-items: center;

                li {
                  margin: .5rem 1rem 1rem 0;
                  cursor: pointer;

                  &.active .thumbnail {
                    box-shadow: 0 0 0 3px rgb(17, 60, 252, .5);
                  }

                  .thumbnail {
                    margin: 0;
                    width: 30px;
                    height: 30px;
                    border-radius: 100%;
                    box-shadow: 0 0 0 1px #cccccc;
                  }
                }

                .choose-custom {
                  margin-left: 1rem;
                }
              }

              .no-color {
                color: #777777;
              }
            }
          }

          .actions {
            padding: 1rem 0;

            button {
              background: #333333;
              color: #ffffff;
              border: none;
              border-radius: 5px;
              outline: none;
              padding: 10px;
              width: 150px;
              cursor: pointer;

              &:hover {
                opacity: .7;
              }
            }
          }
        }

        .choose-a-design {}

      }
    }
  }

}

</style>