<script setup>
import { ref } from 'vue'
import api from '~/api/request'

const username = ref('')
const password = ref('')
const rememberMe = ref(true)
const errorMessage = ref()

// 登录
function login() {
  api.post('/login', {
    username: username.value,
    password: password.value,
  }).then((response) => {
    // 登录成功，获取令牌
    const { token, userId } = response.data
    // 根据用户是否选择“记住我”存储令牌
    if (rememberMe.value) {
      localStorage.setItem('token', token)
      localStorage.setItem('userId', userId)
    }
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('userId', userId)
    // 跳转到主页
    window.location.href = '/'
  }).catch((error) => {
    // 清除 SessionStorage 中的 JWT token
    errorMessage.value = '登录失败：用户名或密码错误'
    console.error('登录失败:', error)
  })
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div class="m-5 max-w-md w-full rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
      <h2 class="mb-6 text-center text-2xl font-bold">
        登录
      </h2>
      <InputGroup class="mb-4">
        <InputGroupAddon>
          <i class="i-carbon-user" />
        </InputGroupAddon>
        <FloatLabel variant="on">
          <InputText id="on_username" v-model="username" />
          <label for="on_username">用户名</label>
        </FloatLabel>
      </InputGroup>

      <InputGroup class="mb-4">
        <InputGroupAddon>
          <i class="i-carbon-unlocked" />
        </InputGroupAddon>
        <FloatLabel variant="on">
          <InputText id="on_password" v-model="password" type="password" />
          <label for="on_password">密码</label>
        </FloatLabel>
      </InputGroup>
      <div class="mb-2 flex items-center">
        <label for="rememberMe"> 记住我 </label>
        <Checkbox id="rememberMe" v-model="rememberMe" class="ml-2" binary value="记住我" />
      </div>
      <div v-if="errorMessage" class="mb-2 text-red-500">
        {{ errorMessage }}
      </div>

      <Button
        class="w-full rounded py-2"
        label="登录"
        @click="login"
      />
    </div>
  </div>
</template>
