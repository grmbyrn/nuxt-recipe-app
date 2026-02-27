import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RecipeCard from '../../app/components/RecipeCard.vue'

type Recipe = {
  id: number
  name: string
  ingredients: string[]
  instructions: string[]
  prepTimeMinutes: number
  cookTimeMinutes: number
  servings: number
  difficulty: string
  cuisine: string
  caloriesPerServing: number
  tags: string[]
  userId: string
  image: string
  rating: number
  reviewCount: number
  mealType: string[]
}

const makeRecipe = (): Recipe => ({
  id: 1,
  name: 'Test Pancakes',
  ingredients: ['Flour'],
  instructions: ['Cook'],
  prepTimeMinutes: 5,
  cookTimeMinutes: 10,
  servings: 2,
  difficulty: 'Easy',
  cuisine: 'American',
  caloriesPerServing: 200,
  tags: ['breakfast'],
  userId: 'user-1',
  image: 'https://example.com/image.jpg',
  rating: 4.5,
  reviewCount: 12,
  mealType: ['Breakfast']
})

describe('RecipeCard', () => {
  it('renders basic recipe information', () => {
    const wrapper = mount(RecipeCard, {
      props: {
        recipe: makeRecipe()
      }
    })

    expect(wrapper.text()).toContain('Test Pancakes')
    expect(wrapper.text()).toContain('10') // cookTimeMinutes
    expect(wrapper.text()).toContain('200') // caloriesPerServing
    expect(wrapper.text()).toContain('4.5 (12)') // rating and reviewCount
  })

  it('links to the recipe details page', () => {
    const wrapper = mount(RecipeCard, {
      props: {
        recipe: makeRecipe()
      }
    })

    const btn = wrapper.find('button, a')
    expect(btn.exists()).toBe(true)
  })
})

