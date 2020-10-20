<template>
  <div v-html="$ym_code(ym)"></div>
</template>

<script>
export default {
  props: {
    ym: String
  }
};
</script>
