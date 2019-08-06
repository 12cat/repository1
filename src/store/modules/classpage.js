export default {
  state: {
    // $store.state.review.text
    content: '', // 查询内容
    category: 1, // 类目id
    categorys: [],
    categoryName: '', // 类目名称
    dataList: [],
    pageIndex: 1,
    total: 0
  },
  mutations: {
    // $store.commit('fun1')
    setCategoryName (state, name) {
      state.categoryName = name
    },
    setCategorys (state, categorys) {
      state.categorys = categorys || []
    },
    setSearchpage (state, {content, category, dataList, pageIndex, total}) {
      state.content = content
      state.category = category
      state.dataList = dataList
      state.pageIndex = pageIndex
      state.total = total
    }
  }
}
