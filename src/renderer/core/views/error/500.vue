<template>
  <Error type="500" @error-click="push('/')" />
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

defineOptions({ name: 'Error500' })
const { push } = useRouter()
</script>
