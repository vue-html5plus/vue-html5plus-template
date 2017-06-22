/**
 * 首页问题列表
 * @param {string} type
 * @param {number} page
 */
export const questionList = (type, page) => {
  switch (type) {
    case 'new':
      type = 'sort_type-new__day-0'
      break
    case 'recommend':
      type = 'is_recommend-1'
      break
    case 'hot':
      type = 'sort_type-hot__day-30'
      break
    case 'unresponsive':
      type = 'sort_type-unresponsive'
      break
    default:
      break
  }

  return mui.get(`https://ask.dcloud.net.cn/explore/ajax/list/${type}__page-${page}`)
}

new Vue({
	el: '#app',
	data: {
	  activeTab: 'new',
    lists: [],
    leftPopup: false,
    loading: false
	},
  plusReady () {
		this.queryQuestionList(0)
	},
	methods: {

	}
})