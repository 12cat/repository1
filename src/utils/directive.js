
export default {
  test: {
    bind: (e1, e2, e3) => {
      console.log('bind', e1)
      console.log('bind', e2)
      console.log('bind', e3)
    },
    inserted: (e1, e2, e3) => {
      console.log('inserted', e1)
      console.log('inserted', e2)
      console.log('inserted', e3)
    },
    update: (e1, e2, e3) => {
      console.log('update', e1)
      console.log('update', e2)
      console.log('update', e3)
    },
    componentUpdated: (e1, e2, e3) => {
      console.log('componentUpdated', e1)
      console.log('componentUpdated', e2)
      console.log('componentUpdated', e3)
    },
    unbind: (e1, e2, e3) => {
      console.log('unbind', e1)
      console.log('unbind', e2)
      console.log('unbind', e3)
    }
  },
  clickoutside () {

  },
  focus: {
    inserted: el => el.focus()
  }
}
