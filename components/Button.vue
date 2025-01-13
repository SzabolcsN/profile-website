<script setup lang="ts">
interface Props {
  size?: "md" | "lg";
  block?: boolean;
  styleName?: "outline" | "primary" | "inverted";
  className?: string;
  [x: string]: any;
}

withDefaults(defineProps<Props>(), {
  size: "md",
  styleName: "primary",
});

const styles = {
  outline: "border-2 border-black hover:bg-slate-200 text-black",
  primary:
    "bg-black text-white hover:bg-slate-900  border-2 border-transparent",
};
</script>

<template>
  <button
    :class="[
      'rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 py-1 px-3',
      block && 'w-full',
      styles[styleName],
      className,
    ]"
  >
    <slot />
  </button>
</template>
