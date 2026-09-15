<script lang="ts" setup>
  const {
    width = '2rem',
    height = '2rem',
    color = 'var(--secondary-color)',
  } = defineProps({
    width: String,
    height: String,
    color: String,
  });
</script>

<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.52 3.84V19.2M19.2 11.52L3.84003 11.52"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</template>
