<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
            <b-button variant="outline-success" @click="downloadNewsletter">
            Download <b-icon icon="download"></b-icon>
            </b-button>
        </b-col>
        <b-col>
            <b-button id="generate-button" variant="success" @click="generateNewsletter">
            Generate <b-icon icon="play-fill"></b-icon>
            </b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-tabs content-class="mt-3" justified>
      <b-tab title="Preview" active>
        <b-row>
            <b-col col lg="3"></b-col>
            <b-col cols lg="6">
              <div v-html="newsletterMarkup"></div>
            </b-col>
            <b-col col lg="3"></b-col>
        </b-row>
      </b-tab>
      <b-tab title="Jekyll Markdown">
        <b-row class="justify-content-md-center">
            <b-col col lg="1"></b-col>
            <b-col cols="10">
              <b-form-textarea
                v-model="newsletterMarkdown"
                placeholder="Hit the Generate button!"
                rows="10"
                max-rows="20"
              ></b-form-textarea>
            </b-col>
            <b-col col lg="1"></b-col>
        </b-row>
      </b-tab>
    </b-tabs>
    <b-card no-body class="mt-3 text-center" :header="last_updated"></b-card>
  </div>
</template>

<style>
#generate-button {
  margin-bottom: 25px;
}
</style>

<script>
  import axios from 'axios';
  import showdown from 'showdown';
  import common from "./common";
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
      newsletterMarkdown: {
        get: function () {
          return store.newsletter_markdown
        },
        set: function (newValue) {
          mutations.setNewsletterMarkdown(newValue)
        },
      },
      last_updated() {
        return "Last updated: " + store.newsletter_markup_updated;
      }
    },
    data() {
      return {
        exported_filename: null
      }
    },
    methods: {
      setNewsletterMarkdown: mutations.setNewsletterMarkdown,
      setNewsletterMarkup: mutations.setNewsletterMarkup,
      setNewsletterMarkupLastUpdated: mutations.setNewsletterMarkupLastUpdated,
      updateLastUpdated() {
        var local_time = new Date().toLocaleTimeString()
        this.setNewsletterMarkupLastUpdated(local_time)
      },
      generateNewsletter(evt) {
        evt.preventDefault()
        var newsletter_markdown = this.generateNewsletterMarkdown(false)
        this.setNewsletterMarkdown(newsletter_markdown)
        var converter = new showdown.Converter()
        var newsletter_markdown_preview = this.generateNewsletterMarkdown(true)
        var newsletter_markdown_html = converter.makeHtml(newsletter_markdown_preview)
        this.setNewsletterMarkup(newsletter_markdown_html)
        this.updateLastUpdated()
      },
      getCategoryArticles(category) {
        var newsletter_articles = this.newsletters[this.selected_newsletter].articles
        var return_articles = []
        for (var k = 0; k < newsletter_articles.length; k++) {
          if (newsletter_articles[k].category == category) {
            return_articles.push(newsletter_articles[k])
          }
        }
        return return_articles
      },
      generateNewsletterMarkdown(preview_mode=false, email_mode=false) {
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
          var category_articles = this.getCategoryArticles(this.article_categories[j])
          if (category_articles.length == 0) {
            continue
          }
          articles += `## ${this.article_categories[j]} \n\n`
          for (var k = 0; k < category_articles.length; k++) {
            if (
              category_articles[k].image_url != null &&
              category_articles[k].image_url != ""
            ) {
              var image_filename = category_articles[k].image_url.split("/").pop()
              if (
                category_articles[k].image_filename != null &&
                category_articles[k].image_filename != ""
              ) {
                image_filename = category_articles[k].image_filename
              }
              var image_width = "600" // pixels
              if (email_mode) {
                image_width = "300"
              }
              if (
                category_articles[k].image_width != null &&
                category_articles[k].image_width != ""
              ) {
                if (email_mode) {
                  image_width = "300"
                } else {
                  image_width = category_articles[k].image_width
                }
              }
              if (preview_mode) {
                articles += `<p align="center"><img src="${category_articles[k].image_url}" width="${image_width}"></p>\n`
              } else {
                articles += `<p align="center"><img src="{{ site.url }}/images/diu-${this.selected_newsletter}/${image_filename}" width="${image_width}"></p>\n`
              }
            }
            articles += `- [${category_articles[k].title}](${category_articles[k].url}){:target="_blank"}`
            if (
              category_articles[k].author != null &&
              category_articles[k].author != ""
            ) {
              articles += ` by ${category_articles[k].author}`
            }
            if (
              category_articles[k].description != null &&
              category_articles[k].description != ""
            ) {
              articles += `: ${category_articles[k].description}`
            }
            articles += `\n\n`
          }
          articles += `\n`
        }
        var newsletter_header_markdown = ""
        if (preview_mode) {
          newsletter_header_markdown = `# DevOps Industry Updates #${this.selected_newsletter}`
        } else if (email_mode) {
          newsletter_header_markdown = String.raw`---
layout: post
title: "DevOps Industry Updates #0000"
---`
        } else {
          newsletter_header_markdown = String.raw`---
layout: post
title: "DevOps Industry Updates #${this.selected_newsletter}"
---`
        }
        // Put it all together
        var newsletter_markdown = String.raw`${newsletter_header_markdown}

${this.newsletters[this.selected_newsletter].intro}

## 🔥 Top Cream

This issue's top ${top_cream_count} stories:

${top_cream}
${articles}
*Article version: ${this.newsletters[this.selected_newsletter].version}*
`;
        if (preview_mode) {
          newsletter_markdown = newsletter_markdown.replaceAll('{:target="_blank"}', '')
        }
        return newsletter_markdown
      },
      downloadNewsletterImages(exported_filename) {
        axios({
          method: 'post',
          url: "../api/generate-newsletter",
          // url: 'http://localhost/api/generate-newsletter', // For local dev
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          crossdomain: true,
          data: {
            newsletter_id: this.selected_newsletter,
            newsletter_data: this.newsletters[this.selected_newsletter],
          },
          dataType: "binary",
          responseType: "blob"
        })
        .then(response => {
          common.downloadFile(response.data, exported_filename, "application/zip");
        })
        .catch(error => {
          console.log("Error downloading zip file:");
          console.log(error);
        })
      },
      downloadNewsletter(evt) {
        evt.preventDefault()
        var newsletter_markdown = this.generateNewsletterMarkdown(false)
        var newsletter_markdown_email = this.generateNewsletterMarkdown(false, true)
        this.exported_filename_prefix = `${this.newsletters[this.selected_newsletter].date}-DevOps-Industry-Updates`
        common.downloadFile(newsletter_markdown, `${this.exported_filename_prefix}-${this.selected_newsletter}.md`, "text/markdown")
        common.downloadFile(newsletter_markdown_email, `${this.exported_filename_prefix}-0000.md`, "text/markdown")
        this.downloadNewsletterImages(`${this.exported_filename_prefix}-${this.selected_newsletter}.zip`)
      }
    }
  }
</script>
