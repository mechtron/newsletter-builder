<template>
  <div>
    <b-button id="generate-button" variant="success">
        Generate <b-icon icon="play-fill"></b-icon>
    </b-button>

    <br/>

    <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Hit the Generate button!"
      rows="10"
      max-rows="20"
    ></b-form-textarea>
  </div>
</template>

<style>
#generate-button {
  margin-bottom: 25px;
}
</style>

<script>
  export default {
    data() {
      return {
        text: ''
      }
    }
  }
</script>
