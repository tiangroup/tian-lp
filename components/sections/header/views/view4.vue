<template>
  <view2 :showTopBlock="false" :section="section" :isEdit="isEdit" />
</template>

<script>
export default {
  components: {
    View2: () => import("./view2")
  },
  props: {
    section: Object,
    isEdit: Boolean
  }
};
</script>
