<template>
  <view2 view="view3" :section="section" :isEdit="isEdit" />
</template>

<script>
export default {
  components: {
    View2: () => import("./ContactsView2"),
  },
  props: {
    section: Object,
    isEdit: Boolean,
  },
};
</script>