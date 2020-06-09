<template>
  <div>
    <b-container class="bv-example-row">
      <b-container class="bv-example-row">
          <b-row>
              <b-col>
                <input type="file" ref="fileInput" style="display: none" v-on:change="importData(this)">
                <b-button variant="outline-primary" @click="$refs.fileInput.click()">Import Data</b-button>
              </b-col>
              <b-col> 
                <b-button variant="outline-primary" @click="exportData">Export Data</b-button>
              </b-col>
              <b-col>
                  <b-button id="generate-button" variant="success" @click="generateNewsletter">
                  Generate <b-icon icon="play-fill"></b-icon>
                  </b-button>
              </b-col>
              <b-col>
                  <b-button id="download-button" variant="outline-success" @click="downloadNewsletter">
                  Download <b-icon icon="download"></b-icon>
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
              max-rows="30"
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
      article_categories() {
        return store.article_categories.slice(1);
      },
      selected_newsletter() {
        return store.selected_newsletter;
      },
      newsletterMarkup: {
        get: function () {
          return store.newsletter_markup
        },
        set: function (newValue) {
          mutations.setNewsletterMarkup(newValue)
        },
      },
      last_updated() {
        return "Last updated: " + store.newsletter_markup_updated;
      }
    },
    methods: {
      setNewsletterMarkup: mutations.setNewsletterMarkup,
      setNewsletterMarkupLastUpdated: mutations.setNewsletterMarkupLastUpdated,
      updateNewsletterData: mutations.updateNewsletterData,
      updateLastUpdated() {
        var local_time = new Date().toLocaleTimeString()
        this.setNewsletterMarkupLastUpdated(local_time)
      },
      generateNewsletter(evt) {
        evt.preventDefault()
        var newsletter_markdown = this.generateNewsletterMarkdown()
        this.setNewsletterMarkup(newsletter_markdown)
        this.updateLastUpdated()
      },
      downloadFile(json, name, type) {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([json], { type: type }));
        a.download = name;
        a.click();
      },
      exportData(evt) {
        evt.preventDefault()
        this.generateNewsletter(evt)
        var exported_data = JSON.stringify(this.newsletters)
        var exported_filename =  "newsletter-data-" + Date.now() + ".json"
        this.downloadFile(exported_data, exported_filename, "text/json")
      },
      importData() {
        var input_file = this.$refs.fileInput.files[0]
        var reader = new FileReader();
        reader.onload = (event) => {
          this.updateNewsletterData(JSON.parse(event.target.result))
        }
        reader.readAsText(input_file)
      },
      generateNewsletterMarkdown() {
        var newsletter_articles = this.newsletters[this.selected_newsletter].articles
        // Top Cream
        var top_cream = ""
        var top_cream_count = 0
        for (var i = 0; i < newsletter_articles.length; i++) {
          if (newsletter_articles[i].top_cream) {
            top_cream += `1. [${newsletter_articles[i].title}](${newsletter_articles[i].url}){:target="_blank"}\n`
            top_cream_count += 1
          }
        }
        // Articles
        var articles = ""
        for (var j = 0; j < this.article_categories.length; j++) {
          articles += `## ${this.article_categories[j]} \n\n`
          for (var k = 0; k < newsletter_articles.length; k++) {
            if (newsletter_articles[k].category == this.article_categories[j]) {
              if (newsletter_articles[k].image_url != null) {
                // var image_filename = newsletter_articles[k].image_url.split("/").pop()
                // articles += `<p align="center"><img src="{{ site.url }}/images/diu-${this.selected_newsletter}/${image_filename}//${newsletter_articles[k].image_url}" width="600"></p>\n`
                articles += `<p align="center"><img src="${newsletter_articles[k].image_url}" width="600"></p>\n`
              }
              articles += `- [${newsletter_articles[k].title}](${newsletter_articles[k].url}){:target="_blank"}`
              if (newsletter_articles[k].author != null) {
                articles += ` by ${newsletter_articles[k].author}`
              }
              articles += `: ${newsletter_articles[k].description}\n\n`
            }
          }
          articles += `\n`
        }
        // Put it all together
        var newsletter_markdown = String.raw`---
layout: post
title: "DevOps Industry Updates #${this.selected_newsletter}"
---

${this.newsletters[this.selected_newsletter].intro}

## 🔥 Top Cream

This issue's top ${top_cream_count} stories:

${top_cream}
${articles}
*Article version: ${this.newsletters[this.selected_newsletter].version}*
`;
        return newsletter_markdown
      },
      downloadNewsletter(evt) {
        evt.preventDefault()
        var newsletter_markdown = this.generateNewsletterMarkdown()
        var exported_filename = `${this.newsletters[this.selected_newsletter].date}-DevOps-Industry-Updates-${this.selected_newsletter}.md`
        this.downloadFile(newsletter_markdown, exported_filename, "text/markdown")
      }
    }
  }
</script>
