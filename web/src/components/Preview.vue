<template>
  <div>
    <b-container class="bv-example-row">
      <b-row class="justify-content-md-center">
          <b-col col lg="1"></b-col>
          <b-col cols="12">
            <b-button id="generate-button" variant="success" @click="generateNewsletter">
            Generate <b-icon icon="play-fill"></b-icon>
            </b-button>
            <br/>
            <b-form-textarea
              id="textarea"
              v-model="newsletterMarkup"
              placeholder="Hit the Generate button!"
              rows="10"
              max-rows="16"
            ></b-form-textarea>
          </b-col>
          <b-col col lg="1"></b-col>
      </b-row>
    </b-container>
    <b-card no-body class="mt-3 text-center" :header="last_updated"></b-card>
  </div>
</template>

<style>
#generate-button {
  margin-bottom: 25px;
}
</style>

<script>
  import { store, mutations } from "./store";
  export default {
    computed: {
      newsletters() {
        return store.newsletters;
      },
      newsletterMarkup() {
        return store.newsletter_markup;
      },
      last_updated() {
        return store.newsletter_markup_updated;
      }
    },
    methods: {
      setNewsletterMarkup: mutations.setNewsletterMarkup,
      setNewsletterMarkupLastUpdated: mutations.setNewsletterMarkupLastUpdated,
      generateNewsletter(evt) {
        evt.preventDefault()
        this.setNewsletterMarkup(JSON.stringify(this.newsletters))
        this.updateLastUpdated()
      },
      updateLastUpdated() {
        var local_time = new Date().toLocaleTimeString()
        this.setNewsletterMarkupLastUpdated("Last updated: " + local_time)
      }
    }
  }
</script>
