<template>
    <div>
        <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <b-button disabled>Article {{this.selected_article + 1}}/{{this.newsletters[this.selected_newsletter].articles.length}}</b-button>
                </b-col>
                <b-col> 
                    <b-button-group class="mx-1">
                        <b-button @click="changeArticle('first')">&laquo;</b-button>
                        <b-button @click="changeArticle('previous')">&lsaquo;</b-button>
                        <b-button @click="changeArticle('next')">&rsaquo;</b-button>
                        <b-button @click="changeArticle('last')">&raquo;</b-button>
                    </b-button-group>
                </b-col>
                <b-col>
                    <b-button variant="success" @click="newArticle">
                        <b-icon icon="plus"></b-icon>
                    </b-button>
                </b-col>
            </b-row>
        </b-container>

        <br/>

        <b-container class="bv-example-row">
            <b-row class="justify-content-md-center">
                <b-col col lg="1"></b-col>
                <b-col cols="10">
                    <b-form @submit="saveArticle" @reset="onReset" v-if="show">
                        <b-form-group
                            id="input-group-1"
                            label-for="input-1"
                        >
                            <b-input-group prepend="URL" class="mt-3">
                                <b-form-input
                                id="input-1"
                                v-model="form.url"
                                type="text"
                                required
                                placeholder="Article URL"
                                >
                                </b-form-input>
                                <b-input-group-append>
                                    <b-button :href="this.form.url" target="_blank">Open URL</b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Author:" label-for="input-2">
                            <b-form-input
                            id="input-2"
                            v-model="form.author"
                            type="text"
                            placeholder="Article author"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-3" label="Description:" label-for="input-3">
                            <b-form-textarea
                            id="input-3"
                            v-model="form.description"
                            placeholder="Short description"
                            ></b-form-textarea>
                        </b-form-group>

                        <b-form-group id="input-group-4" label="Image URL:" label-for="input-4">
                            <b-form-input
                            id="input-4"
                            v-model="form.image_url"
                            placeholder="Image URL (optional)"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-5" label="Category:" label-for="input-5">
                            <b-form-select
                            id="input-5"
                            v-model="form.category"
                            :options="categories"
                            ></b-form-select>
                        </b-form-group>

                        <b-form-group id="input-group-6">
                            <b-form-checkbox v-model="form.top_cream">Top cream?</b-form-checkbox>
                        </b-form-group>

                        <b-button-group class="mx-1">
                            <b-button type="reset" variant="warning">Reset</b-button>
                            <b-button type="submit" variant="primary">Save</b-button>
                        </b-button-group>
                    </b-form>

                </b-col>
                <b-col col lg="1"></b-col>
            </b-row>
        </b-container>

        <b-card class="mt-3" header="Not up to snuff?">
            <b-button variant="danger" @click="deleteArticle"><b-icon icon="trash"></b-icon></b-button>
        </b-card>

    </div>
</template>

<script>
  import { store, mutations } from "./store";
  export default {
    computed: {
      newsletters() {
        return store.newsletters;
      },
      selected_newsletter() {
        return store.selected_newsletter;
      },
      selected_article() {
        return store.selected_article;
      }
    },
    data() {
      return {
        show: true,
        form: {
          url: null,
          author: null,
          description: null,
          image_url: null,
          category: null,
          top_cream: false
        },
        categories: [
            { text: 'Select One', value: null },
            'Society',
            'DevOps',
            'Kubernetes',
            'Security',
            'Programming',
            'Linux',
            'Hardware',
            'Leadership',
            'AWS',
            'Azure',
            'GCP'
        ]
      }
    },
    methods: {
      setNewsletter: mutations.setNewsletter,
      setArticle: mutations.setArticle,
      saveArticle(evt) {
        evt.preventDefault()
        this.newsletters[this.selected_newsletter].articles[this.selected_article].url = this.form.url
        this.newsletters[this.selected_newsletter].articles[this.selected_article].author = this.form.author
        this.newsletters[this.selected_newsletter].articles[this.selected_article].description = this.form.description
        this.newsletters[this.selected_newsletter].articles[this.selected_article].image_url = this.form.image_url
        this.newsletters[this.selected_newsletter].articles[this.selected_article].category = this.form.category
        this.newsletters[this.selected_newsletter].articles[this.selected_article].top_cream = this.form.top_cream
        alert("Newsletter #" + this.selected_newsletter + " Article #" + parseInt(this.selected_article + 1) + " successfully updated")
      },
      resetFormFields() {
        this.form.url = null
        this.form.author = null
        this.form.description = null
        this.form.image_url = null
        this.form.category = null
        this.form.top_cream = false
      },
      onReset(evt) {
        evt.preventDefault()
        this.resetFormFields()
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      changeArticle(action) {
        if (action == "first") {
            this.setArticle(0)
        } else if (action == "previous") {
            if (this.selected_article > 0) {
                this.setArticle(this.selected_article - 1)
            }
        } else if (action == "next") {
            if (this.selected_article < this.newsletters[this.selected_newsletter].articles.length - 1) {
                this.setArticle(this.selected_article + 1)
            }
        } else if (action == "last") {
            this.setArticle(this.newsletters[this.selected_newsletter].articles.length - 1)
        } else {
            console.log("Unexpecteed action")
        }
        this.updateFormFields()
      },
      newArticle() {
        this.newsletters[this.selected_newsletter].articles.push({
            url: null,
            author: null,
            description: null,
            image_url: null,
            category: null,
            top_cream: false
        })
        this.changeArticle('last')
      },
      deleteArticle() {
        if (this.newsletters[this.selected_newsletter].articles.length > 0) {
          var deleted_article_url = this.newsletters[this.selected_newsletter].articles[this.selected_article].url
          this.newsletters[this.selected_newsletter].articles.splice(this.selected_article, 1)
          alert("Article #" + parseInt(this.selected_article + 1) + " (with URL " + deleted_article_url + ") successfully deleted")
          if (this.selected_article != 0) {
            this.setArticle(this.selected_article - 1)
          }
          this.updateFormFields()
        }
        if (this.newsletters[this.selected_newsletter].articles.length == 0) {
          this.resetFormFields()
        }
      },
      updateFormFields() {
        if (this.newsletters[this.selected_newsletter].articles.length > 0) {
          this.form.url = this.newsletters[this.selected_newsletter].articles[this.selected_article].url
          this.form.author = this.newsletters[this.selected_newsletter].articles[this.selected_article].author
          this.form.description = this.newsletters[this.selected_newsletter].articles[this.selected_article].description
          this.form.image_url = this.newsletters[this.selected_newsletter].articles[this.selected_article].image_url
          this.form.category = this.newsletters[this.selected_newsletter].articles[this.selected_article].category
          this.form.top_cream = this.newsletters[this.selected_newsletter].articles[this.selected_article].top_cream   
        }
      }
    },
    mounted() {
      this.updateFormFields()
    }
  }
</script>
