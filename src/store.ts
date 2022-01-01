import {Store} from 'vuex';

import {Category} from './types/category.type';
import {Material} from './types/material.type';
import {Template} from './types/template.type';
import {Design, EditingData} from './types/design.type';

import {fetchService} from './services/fetch.service';

export const store = new Store({
  state: {
    // home
    categories: [] as Category[],
    templateRecord: {} as Record<number, Template[]>,
    materialRecord: {} as Record<number, Material[]>,
    // editor
    editingDesign: null as null | Design,
    editingData: null as null | EditingData,
  },
  actions: {
    async loadCategoriesAndTemplates({state}) {
      await (
        state.categories.length
          ? Promise.resolve()
          : fetchService.getJson<Category[]>('categories.json')
            .then(categories => {
              state.categories = categories;
              return Promise.all(
                state.categories.map(async (category) => {
                  const templates = await fetchService.getJson<Template[]>(`templates/${category.slug}.json`);
                  return { categoryId: category.id, templates };
                })
              );
            })
            .then(data => {
              state.templateRecord = data.reduce(
                (result, item) => {
                  result[item.categoryId] = item.templates;
                  return result;
                },
                {} as Record<string, Template[]>
              );
              return Promise.resolve();
            })
      );
      const {categories, templateRecord} = state
      return {categories, templateRecord};
    },
    async loadMaterials({state}, template: Template) {
      await (
        state.materialRecord[template.id]
          ? Promise.resolve()
          : fetchService.getJson<Material[]>('materials/all.json').then(materials => {
            state.materialRecord[template.id] = materials;
            return Promise.resolve();
          })
      );
      return state.materialRecord[template.id];
    },
    createDesign({state}, design: Design) {
      state.editingDesign = design;
      return new Promise(resolve => setTimeout(() => resolve(design), 300))
    },
    async loadEditingData({state}, designId: number) {
      // load design
      await (
        state.editingDesign && state.editingDesign.id === designId
          ? Promise.resolve()
          : Promise.resolve() // get design from server
      );
      // load data
      const category = state.categories.find(item => item.id === (state.editingDesign as Design).category_id) as Category;
      const template = state.templateRecord[category.id].find(item => item.id === (state.editingDesign as Design).template_id) as Template;
      const material = state.materialRecord[template.id].find(item => item.id === (state.editingDesign as Design).material_id) as Material;
      state.editingData = {category, template, material};
      // result
      const {editingDesign, editingData} = state;
      return {editingDesign, editingData};
    }
  },
})
