// 账号登录表单验证规则
export const rules = {
  name: [
    {
      required: true,
      message: '用户名是必填项',
      trigger: 'blur'
    },
    {
      min: 5,
      max: 10,
      message: '用户名必须是 5 到 10 个字母或数字~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必填项',
      trigger: 'blur'
    },
    {
      min: 5,
      max: 10,
      message: '密码必须是 5 到 10 个字母或数字~',
      trigger: 'blur'
    }
  ]
}

// phone的验证规则
export const phoneRules = {
  number: [
    {
      required: true,
      message: '手机号是必填项',
      trigger: 'blur'
    },
    {
      pattern:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: '手机号必须是11位数字~',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    },
    {
      pattern: /^\d{6}$/,
      message: '验证码必须是6位数字~',
      //
      trigger: 'blur'
    }
  ]
}
