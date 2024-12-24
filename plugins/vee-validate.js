import Vue from 'vue'
import {
  ValidationObserver,
  ValidationProvider,
  extend
} from 'vee-validate'
// eslint-disable-next-line camelcase
import { required, email, min, max, numeric, ext, size, alpha_num, confirmed } from 'vee-validate/dist/rules'
// import { required, email } from 'vee-validate/dist/rules'

extend('requiredMember', {
    ...required,
    message: 'เลขที่สมาชิกไม่ถูกต้องกรุณาระบุใหม่อีกครั้ง'
})

extend('accept', {
  ...required,
  message: 'กรุณากดเพื่อยอมรับเงื่อนไข'
})

extend('required', {
  ...required,
  message: 'กรุณาระบุ'
})

extend('requiredFile', {
  ...required,
  message: 'กรุณาเลือกไฟล์'
})

extend('requiredSelect', {
  ...required,
  message: 'กรุณาเลือก'
})

extend('email', {
  ...email,
  message: 'รูปแบบอีเมลไม่ถูกต้อง'
})

extend('min', {
  ...min,
  message: 'ต้องมีความยาวอย่างน้อย {length} ตัวอักษร'
})

extend('max', {
  ...max,
  message: 'ต้องมีความยาวไม่เกิน {length} ตัวอักษร'
})

extend('numeric', {
  ...numeric,
  message: 'ระบุตัวเลขเท่านั้น'
})

extend('ext', {
  ...ext,
  message: 'ต้องใช้ไฟล์นามสกุล pdf เท่านั้น'
})

extend('extpic', {
  ...ext,
  message: 'ต้องใช้ไฟล์นามสกุล jpg หรือ jpeg เท่านั้น'
})

extend('size1MB', {
  ...size,
  message: 'ขนาดไฟล์มีขนาดใหญ่เกินที่กำหนด ต้องใช้ไฟล์ขนาดไม่เกิน 1 MB'
})

extend('alpha_numPass', {
  // eslint-disable-next-line camelcase
  ...alpha_num,
  message: 'กรุณากรอก ภาษาอังกฤษ หรือ ตัวเลข'
})
extend('alpha_num', {
  // eslint-disable-next-line camelcase
  ...alpha_num,
  message: 'กรุณาระบุเป็นภาษาอังกฤษและตัวเลขเท่านั้น'
})
extend('confirmed', {
  ...confirmed,
  message: 'Password ไม่ตรงกัน'
})

extend('exact_length', {
  params: ['length', 'message'],
  validate (val, { length, message }) {
    if (val.length !== Number(length)) {
      return message
    }
    return true
  }
})

extend('decimal', {
  validate (value) {
    const painText = value.replaceAll(',', '')
    const num = /^-?\d+(\.\d+)?$/.test(painText)
    const twoDot = painText.split('.')
    if (num && twoDot.length) {
      if (twoDot.length > 1) {
        return twoDot[1].length === 2 ? true : 'กรุณาระบุทศนิยม 2 ตำแหน่ง'
      }
      return true
    }
    return 'กรุณาระบุเป็นตัวเลขหรือตัวเลขทศนิยม 2 ตำแหน่ง'
  }
})

extend('thaiID', {
  validate (value) {
    let sum = 0
    for (let i = 0; i < 12; i++) {
      sum += parseFloat(value.charAt(i)) * (13 - i)
    }
    if ((11 - sum % 11) % 10 !== parseFloat(value.charAt(12))) { return 'เลขบัตรประชาชนไม่ถูกต้อง' }
    return true
  }
})

extend('passwordRule', {
  validate (value) {
    const includedUpperCase = !!value.match(/([A-z])/)
    // const includedLowerCase = !!value.match(/([a-z])/)
    const includedNumber = !!value.match(/\d/)

    if (includedUpperCase && includedNumber) {
      return true
    }
    return 'กรุณากรอกรหัสผ่านใหม่อีกครั้ง'
  }
})


Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
