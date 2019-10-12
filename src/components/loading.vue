<template>
  <div>
    <section v-loading="loading"></section>
  </div>
</template>

<script>
    export default {
        name: "loading",
        data(){
            return{
              loading: false
            };
        },
        mounted() {
            this.loading = true
        }
    }
</script>

<style scoped>

</style>
