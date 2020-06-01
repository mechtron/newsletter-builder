<template>
  <div>
    <b-container class="bv-example-row">
      <b-container class="bv-example-row">
          <b-row>
              <b-col>
                <b-button variant="outline-primary" @click="importData">Import Data</b-button>
              </b-col>
              <b-col> 
                <b-button variant="outline-primary" @click="exportData">Export Data</b-button>
              </b-col>
              <b-col>
                  <b-button id="generate-button" variant="success" @click="generateNewsletter">
                  Generate <b-icon icon="play-fill"></b-icon>
                  </b-button>
              </b-col>
          </b-row>
      </b-container>
      <b-row class="justify-content-md-center">
          <b-col col lg="1"></b-col>
          <b-col cols="12">
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
        return "Last updated: " + store.newsletter_markup_updated;
      }
    },
    methods: {
      setNewsletterMarkup: mutations.setNewsletterMarkup,
      setNewsletterMarkupLastUpdated: mutations.setNewsletterMarkupLastUpdated,
      updateLastUpdated() {
        var local_time = new Date().toLocaleTimeString()
        this.setNewsletterMarkupLastUpdated(local_time)
      },
      generateNewsletter(evt) {
        evt.preventDefault()
        this.setNewsletterMarkup(JSON.stringify(this.newsletters))
        this.updateLastUpdated()
      },
      importData(evt) {
        evt.preventDefault()
      },
      downloadJsonFile(json, name) {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([json], { type: "text/json" }));
        a.download = name;
        a.click();
      },
      exportData(evt) {
        evt.preventDefault()
        this.generateNewsletter(evt)
        var exported_data = JSON.stringify(this.newsletters)
        var exported_filename =  "newsletter-data-" + Date.now() + ".json"
        this.downloadJsonFile(exported_data, exported_filename)
      }
    }
  }
</script>
