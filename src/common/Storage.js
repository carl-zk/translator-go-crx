class Storage {
  constructor() {}

  async get(key, default_value = undefined) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(key, (result) => {
        resolve(result[key] != null ? result[key] : default_value)
      })
    })
  }

  set(key, val) {
    chrome.storage.local.set({ [key]: val })
  }
}

export default new Storage()
