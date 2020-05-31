<template>
  <div>
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center">
          <b-col col lg="1"></b-col>
          <b-col cols="12">
            <b-button id="generate-button" variant="success">
            Generate <b-icon icon="play-fill"></b-icon>
            </b-button>
            <br/>
            <b-form-textarea
              id="textarea"
              v-model="text"
              placeholder="Hit the Generate button!"
              rows="10"
              max-rows="16"
            ></b-form-textarea>
          </b-col>
          <b-col col lg="1"></b-col>
      </b-row>
    </b-container>
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
