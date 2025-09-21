<template>
  <Error type="403" @error-click="push('/')" />
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

defineOptions({ name: 'Error403' })

const { push } = useRouter()
</script>
