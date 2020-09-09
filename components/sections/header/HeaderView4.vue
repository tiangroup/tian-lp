<template>
  <view2 :showTopBlock="false" :section="section" :isEdit="isEdit" />
</template>

<script>
import View2 from "./HeaderView2";
export default {
  components: {
    View2
  },
  props: {
    section: Object,
    isEdit: Boolean
  }
};
</script>
