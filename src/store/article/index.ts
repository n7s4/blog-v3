import { defineStore } from 'pinia'
import ArticleList from './types'
const article = defineStore('article', {
  state: () => {
    return {
      article: {
          id: 0,
          title: "",
          desc: "",
          cover: "",
          createdTime: "",
          updatedTime: "",
          views: "",
          likes: "",
          tage: [],
          category: "",
          readDuration: ''
      }
    }
  },
  getters: {
    getArticle(): ArticleList {
      return this.article
    }
  },
  actions: {
    setArticle(val: ArticleList) {
      Object.assign(this.article, val);
    }
  },
})
export default article