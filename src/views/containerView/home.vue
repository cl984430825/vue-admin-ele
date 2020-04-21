<template>
  <div id="home">
    <div>{{ a | CYB }}</div>
    <div>{{ a | CS }}</div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      a: 10000
    };
  }
};
</script>
