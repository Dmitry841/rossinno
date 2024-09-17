<script setup lang="ts">
interface IProps {
  value: string | number
  label: string
}
const props = withDefaults(defineProps<IProps>(), {})

interface IEmits {
  (event: 'onUpdate:value', value: string): void
  (event: 'onUpdate:apply'): void
}
const emit = defineEmits<IEmits>()

const handleUpdate = (event: Event) => {
  emit('onUpdate:value', (event.target as HTMLInputElement).value)
}

const handleApply = (): void => {
  if (!props.value) {
    alert('Введите значение')
    return
  }
  emit('onUpdate:apply')
}
</script>

<template>
  <div class="filter">
    <input type="text" :value="value" @change="handleUpdate" />
    <p>{{ label }}</p>
    <button @click="handleApply">Применить</button>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  justify-content: space-between;
}
</style>
