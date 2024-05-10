<script lang="ts">

import { defineComponent, ref, h, onMounted } from 'vue'
import type ComponentData from "../models/componentData"
import { fetchComponentData, fetchComponentTemplate } from '@/utils/fetch'
import { Either } from '@/utils/result'
import {extractTemplate, extractStyle} from '@/utils/functions'

let defaultTemplate = `
  <div >
    <div class="default-layout">
      <h1>{{componentData.title}}</h1>
      <img class="image" :src="componentData.imageUrl">
      <p>{{componentData.text}}</p>
    </div>
  </div>
`

export default defineComponent({
  setup () {

    const customTemplate = ref(defaultTemplate);
    const componentData = ref({
      title: 'Card Title',
      imageUrl: 'https://example.com/image.jpg',
      text: 'Some text'
    } as ComponentData);


    onMounted( async () => {
      const dataResult: Either<ComponentData> = await fetchComponentData();

      dataResult
        .mapOk((item) => {
          componentData.value = item;
        })
        .mapErr((msg) => {
          console.error(msg);
        })

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
          var styleSheet = document.createElement("style");
          styleSheet.innerText = item;
          document.head.appendChild(styleSheet);
        })
        .mapErr(console.error)
    })


    return () => h({
      data () {
      
        return {
          componentData
        }
      },
      template: customTemplate.value || defaultTemplate,
    })

  },


  watch: {
    customTemplate (val, _oldVal) {
      defaultTemplate = val
    }
  },
  
  template: defaultTemplate,
})

</script>
