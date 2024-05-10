<template>
  <div class="custom-btn" @click="$emit('onClick')">{{ text }}</div>
</template>

<script setup lang="ts">

defineProps({
  text: String,
})

</script>


<style scoped>
  .custom-btn {
    background: var(--color-second);
    border-radius: 5px;
    color: var(--color-third);
    padding: 5px;
    text-align: center;
  }

  .custom-btn:hover {
    background: var(--color-third);
    color: white;
    cursor: pointer;
  }
</style>