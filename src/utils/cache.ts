class LocalCache {
  // 设置缓存
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  // 获取所有缓存
  getCache(key: string) {
    // obj => string => obj
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  // 删除某个缓存
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  // 清空所有缓存
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
