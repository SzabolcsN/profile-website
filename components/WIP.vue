<template>
    <div class="max-w-3xl mx-auto">
        <div class="text-white rounded-lg overflow-hidden">
            <pre>
            <code
              ref="codeBlock"
              class="language-javascript"
            >{{ codeSnippet }}</code>
          </pre>
        </div>
    </div>
</template>

<script>
import hljs from "highlight.js";
import "highlight.js/styles/dark.css";

export default {
    name: "CodePreview",
    data() {
        return {
            codeSnippet: `<template>
  <Container>
    <h1>WORK IN PROGRESS</h1>
  </Container>
</template>`
        };
    },
    mounted() {
        this.highlightCode();
    },
    methods: {
        highlightCode() {
            this.$nextTick(() => {
                const blocks = this.$refs.codeBlock;
                if (blocks) hljs.highlightElement(blocks);
            });
        }
    }
};
</script>