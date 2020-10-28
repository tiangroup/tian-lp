<template>
  <view1
    view="view6"
    :section="section"
    :isEdit="isEdit"
    :fix-header="fixHeader"
  />
</template>

<script>
import View1 from "./HeaderView1";
export default {
  components: {
    View1
  },
  props: {
    section: Object,
    isEdit: Boolean,
    fixHeader: Boolean
  }
};
</script>
