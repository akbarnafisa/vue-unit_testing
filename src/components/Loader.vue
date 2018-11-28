<template>
  <div class="loader">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    text: { type: String, default: "Loading..." }
  }
};
</script>

<style  scoped>
.loader {
  max-width: 300px;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 10px;
}
.loader-icon {
  width: 40px;
  height: 40px;
  margin-right: 20px;
}
</style>