<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { fetchComponentTemplate, sendComponentTemplate } from '@/utils/fetch'
import { vue } from '@codemirror/lang-vue'
import { css } from '@codemirror/lang-css'
import { oneDark } from '@codemirror/theme-one-dark'
import { Either } from '@/utils/result.js'
import { extractTemplate, extractStyle } from '@/utils/functions'
import Button from './Button.vue';


export default defineComponent({
  components: {
    Codemirror,
    Button
  },
  setup() {

    const editorStyles = reactive({ 
      height: '170px', 
      width: '260px', 
      'margin-bottom': '10px', 
      border: '2px solid var(--color-second)' 
    });

    const customTemplate = ref('');
    const customStyle = ref('');

    const extensionsTemplate = [vue(), oneDark]
    const extensionsStyle = [css(), oneDark]

    function saveSFC() {
      const req = `
      <template>\n${customTemplate.value}\n</template>\n\n<style>\n${customStyle.value}\n</style>
      `

      sendComponentTemplate(req)
        .then(res => {
          res.mapErr(console.error)
        })
    }

    onMounted(async () => {
      const templateResult: Either<string> = await fetchComponentTemplate();
      
      templateResult
        .map(extractTemplate)
        .mapOk((item) => {
          customTemplate.value = item;
        })
        .mapErr(console.error);

      templateResult
        .map(extractStyle)
        .mapOk(item => {
          customStyle.value = item;
        })
        .mapErr(console.error)

    })

    return {
      customTemplate,
      customStyle,
      extensionsTemplate,
      extensionsStyle,
      saveSFC: saveSFC,
      editorStyles
    }
  }
})


</script>

<template>
  <div class="edit-area">
    <codemirror v-model="customTemplate" placeholder="Vuejs code" :style="editorStyles" :autofocus="true" :indent-with-tab="true"
      :tab-size="2" :extensions="extensionsTemplate" />

    <codemirror v-model="customStyle" placeholder="CSS code"
      :style="editorStyles" :autofocus="true" :indent-with-tab="true"
      :tab-size="2" :extensions="extensionsStyle" />
    <Button :text="'Save'" @onClick="saveSFC" />
  </div>
</template>


<style scoped>
.edit-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.editor {
  height: '170px';
  width: '260px';
  marginBottom: '10px';
  border: '2px solid red'
}
</style>