<template>
  <Error @error-click="push('/')" />
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

defineOptions({ name: 'Error404' })
const { push } = useRouter()
</script>
