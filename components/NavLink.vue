<script setup lang="ts">
interface Props {
  href: string;
  block?: boolean;
  styleName?: "outline" | "primary" | "inverted" | "muted";
  className?: string;
  [x: string]: any;
  isBlank?: boolean;
}

withDefaults(defineProps<Props>(), {
  size: "lg",
  styleName: "primary",
});

const styles = {
  outline: "bg-white border-2 border-gray-800 hover:bg-gray-200 text-gray-800 rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-2 py-1",
  primary: "bg-black text-white hover:bg-gray-800  border-2 border-transparent rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-2 py-1",
  default: "flex lg:px-3 py-2 text-gray-600 hover:text-gray-900"
};
</script>

<template>
  <NuxtLink :to="href" :target="isBlank ? '_blank' : '_self'" :class="[block && 'w-full', styles[styleName]]">
    <slot />
  </NuxtLink>
</template>
