import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    ingredients: ['Potato', 'Bread', 'Salt', 'Ice Cream', 'Beef'],
    recipies: []
  }),
  getters: {},
  actions: {
    addIngredient(val) {
      this.ingredients.push(val)
    },
    addRecipe(val) {
      this.recipies.push(val)
    },
    removeRecipe(id) {
      this.recipies = this.recipies.filter((elem) => elem.id != id)
    },
    updateRecipe(item) {
      this.recipies = this.recipies.map((elem) => {
        if (elem.id == item.id) return item
        else return elem
      })
    },
    removeAllRecipies() {
      this.recipies = []
    }
  },
  persist: {
    key: 'recipe-manager-global'
  }
})
