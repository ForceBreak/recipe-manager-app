import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    ingredients: ['Potato', 'Bread', 'Salt', 'Ice Cream', 'Beef'],
    recipes: []
  }),
  getters: {},
  actions: {
    addIngredient(val) {
      this.ingredients.push(val)
    },
    addRecipe(val) {
      this.recipes.push(val)
    },
    removeRecipe(id) {
      this.recipes = this.recipes.filter((elem) => elem.id != id)
    },
    updateRecipe(item) {
      this.recipes = this.recipes.map((elem) => {
        if (elem.id == item.id) return item
        else return elem
      })
    },
    removeAllRecipes() {
      this.recipes = []
    }
  },
  persist: {
    key: 'recipe-manager-global'
  }
})
