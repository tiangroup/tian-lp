<template>
  <view2
    :showTopBlock="false"
    :section="section"
    :isEdit="isEdit"
    :fix-header="fixHeader"
  />
</template>

<script>
import View2 from "./HeaderView2";
export default {
  components: {
    View2
  },
  props: {
    section: Object,
    isEdit: Boolean,
    fixHeader: Boolean
  }
};
</script>
