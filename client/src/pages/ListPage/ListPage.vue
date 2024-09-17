<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import SocketApi from './requests'
import FilterComponent from '@/components/FilterComponent.vue'

const listItems = ref<string[]>([])
const rowsCount = ref(10)
const newRow = ref('')

const connectSocket = () => {
  SocketApi.createConnection()

  SocketApi.socket?.on('client-path', (data: string[]) => {
    listItems.value = data
  })
}

const getLogs = (): void => {
  SocketApi.socket?.emit('server-path', { rowsCount: rowsCount.value })
}

const setLogString = () => {
  SocketApi.socket?.emit('server-path-add', {
    rowsCount: Number(rowsCount.value),
    value: newRow.value
  })
}

const handleUpdateRowsCount = (value: string): void => {
  rowsCount.value = Number(value)
}

const handleUpdateRow = (value: string): void => {
  newRow.value = value
}

connectSocket()

onUnmounted(() => {
  SocketApi.socket?.close()
})
</script>

<template>
  <header class="header">Журнал</header>
  <div class="wrapper">
    <FilterComponent
      :value="rowsCount"
      label="Укажите необходимое количество строк, начиная с конца журнала"
      @onUpdate:apply="getLogs"
      @onUpdate:value="handleUpdateRowsCount"
    />
    <FilterComponent
      :value="newRow"
      label="Добавьте в лог строку, чтобы она появилась внизу"
      @onUpdate:apply="setLogString"
      @onUpdate:value="handleUpdateRow"
    />
    <div class="list__wrapper">
      <ul class="list">
        <li v-for="(item, index) in listItems" v-bind:key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 50vw;
  gap: 16px;
  padding: 32px;
}

.header {
  font-size: large;
  color: rgb(195, 36, 137);
  font-weight: bold;
}

.list__wrapper {
  margin-top: 32px;
}

.list {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  user-select: none;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
