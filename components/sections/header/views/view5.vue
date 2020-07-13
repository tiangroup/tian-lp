<template>
  <view1 view="view5" :section="section" :isEdit="isEdit" />
</template>

<script>
export default {
  components: {
    View1: () => import("./view1")
  },
  props: {
    section: Object,
    isEdit: Boolean
  }
};
</script>
