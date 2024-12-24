import { VuexPersistence } from 'vuex-persist'

import Crypto from 'crypto-js'
import Cookie from 'js-cookie'
import { v4 } from 'uuid'

const cookieName = 'cookieName'

const uuId = v4()

const storageKey = 'storageKey'

// Get the encryption token from cookie or generate a new one.
const encryptionToken = Cookie.get(cookieName) || uuId

// Store the encryption token in a secure cookie.
Cookie.set(cookieName, encryptionToken, { secure: true, expires: 180 })

export default ({ store }) => {
  new VuexPersistence({
    storage: {
      getItem: () => {
      // Get the store from local storage.
        const store = window.sessionStorage.getItem(storageKey)

        if (store) {
          try {
          // Decrypt the store retrieved from local storage
          // using our encryption token stored in cookies.
            const bytes = Crypto.AES.decrypt(store, encryptionToken)

            return JSON.parse(bytes.toString(Crypto.enc.Utf8))
          } catch (e) {
          // The store will be reset if decryption fails.
            window.sessionStorage.removeItem(storageKey)
          }
        }

        return null
      },
      setItem: (key, value) => {
      // Encrypt the store using our encryption token stored in cookies.
        const store = Crypto.AES.encrypt(value, encryptionToken).toString()

        // Save the encrypted store in local storage.
        return window.sessionStorage.setItem(storageKey, store)
      },
      removeItem: () => window.sessionStorage.removeItem(storageKey)
    }
  }).plugin(store)
}
