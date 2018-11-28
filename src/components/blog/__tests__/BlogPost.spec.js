import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Loader from '@/components/Loader'
import BlogPosts from '@/components/blog/BlogPost'
import TestHelpers from 'tests/test-helpers'
import { getters, mutations, actions } from '@/store/modules/blog'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)

// jest.mock('@/api', () => ({
//   getBlogPosts: jest.fn(() => {
//     return new Promise(resolve => {
//       process.nextTick(() => {
//         resolve({ data: [{ title: 'title 1' }, { title: 'title 2' }] })
//       })
//     })
//   })
// }))

describe('BlogPosts', () => {
  let wrapper
  let store
  let h
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        blog: {
          namespaced: true,
          state: {
            blogPosts: []
          },
          getters,
          mutations,
          actions
        }
      }
    })
    wrapper = shallowMount(BlogPosts, {
      localVue,
      store,
      mocks: {
        $texts: {
          numberOfPosts: 'Number of posts'
        }
      },
      stubs: {
        Loader,
        Post: '<div class="posts"></div>'
      }
    })
    h = new TestHelpers(wrapper, expect)
  })

  it('component mounts without errors', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // it('shows loader initially, and hides when posts have loaded', async () => {
  //   h.domHas('.loader')
  //   await flushPromises()
  //   h.domHasNot('.loader')
  // })

  it('should fetch and show the data', () => {
    return store.dispatch('blog/getBlogPosts')
      .then(() => {
        expect(store.getters['blog/getBlogPosts']).not.toEqual(0)
        h.domHas('.posts')
      })
  })

  // it('shows correct number of posts', async () => {
  //   await flushPromises()
  //   const blogPosts = wrapper.findAll('.posts')
  //   expect(blogPosts.length).toBe(2)
  // })
})