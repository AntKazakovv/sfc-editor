<script setup lang="ts">
import CustomComponent from './components/CustomComponent.vue'
import Editor from './components/Editor.vue'
</script>

<template>
  <main>
    <div class="wrapper">
      <div class="block">
        <Editor/>
      </div>
      <div class="block sfc-border">
        <CustomComponent/>
      </div>
    </div>
  </main>
</template>

<style scoped>
  main {
    display: flex;
    place-items: center;
    padding: 10% 37%;
  }

  .wrapper {
    display: flex;
    background-color: var(--color-first);
    border: 2px solid var(--color-second);
    border-radius: 10px;
  }

  .block {
    display: flex;
    min-width: 250px;
    margin: 10px 15px;
    height: 400px;
  }
  
  .sfc-border {
    border: 2px solid var(--color-second);
    border-radius: 10px;
  }

  .editor {
    height: 100%;
  }

  .btn {
    padding: 5px;
    margin: 10px 5px;
  }
</style>
