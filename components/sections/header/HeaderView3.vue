<template>
  <view1 view="view3" :section="section" :isEdit="isEdit" />
</template>

<script>
import View1 from "./HeaderView1";
export default {
  components: {
    View1
  },
  props: {
    section: Object,
    isEdit: Boolean
  }
};
</script>
