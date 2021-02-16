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
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                        <b-form-group label-for="input-url">
                            <b-input-group prepend="URL" class="mt-3">
                                <b-form-input
                                  id="input-url"
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

                        <b-form-group label-for="input-title">
                            <b-form-input
                              id="input-title"
                              v-model="form.title"
                              type="text"
                              placeholder="Article title"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group label-for="input-author">
                            <b-form-input
                              id="input-author"
                              v-model="form.author"
                              type="text"
                              placeholder="Article author"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group label-for="input-description">
                            <b-form-textarea
                              id="input-description"
                              v-model="form.description"
                              placeholder="Short description"
                              max-rows="3"
                            ></b-form-textarea>
                        </b-form-group>

                        <b-form-group label-for="input-category">
                          <b-form-select
                            id="input-category"
                            v-model="form.category"
                            required
                            :options="categories"
                          ></b-form-select>
                        </b-form-group>

                        <b-form-group label-for="input-image-url">
                            <b-form-input
                              id="input-image-url"
                              v-model="form.image_url"
                              placeholder="Image URL (optional)"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group label-for="input-image-filename">
                            <b-form-input
                              id="input-image-filename"
                              v-model="form.image_filename"
                              placeholder="Image filename (optional)"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group label-for="input-image-width">
                            <b-form-input
                              id="input-image-width"
                              v-model="form.image_width"
                              placeholder="Image width (pixels, optional)"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group>
                            <b-form-checkbox v-model="form.top_cream">Top cream?</b-form-checkbox>
                        </b-form-group>

                        <b-container class="bv-example-row">
                            <b-row>
                              <b-col cols="4">
                                <b-button @click="changeArticleIndex('previous')"><b-icon icon="arrow-bar-left"></b-icon></b-button>
                              </b-col>
                              <b-col cols="4">
                                <b-button-group class="mx-1">
                                  <b-button type="reset" variant="warning">Reset</b-button>
                                  <b-button type="submit" variant="primary">Save</b-button>
                                </b-button-group>
                                <br/>
                                <b-button id="delete-button" variant="danger" @click="deleteArticle"><b-icon icon="trash"></b-icon></b-button>
                                <Keypress
                                  v-for="keypressEvent in keypressEvents"
                                  :key="keypressEvent.id"
                                  :key-event="keypressEvent.keyEvent"
                                  :multiple-keys="keypressEvent.multipleKeys"
                                  @success="saveArticle"
                                />
                              </b-col>
                              <b-col cols="4">
                                <b-button @click="changeArticleIndex('next')"><b-icon icon="arrow-bar-right"></b-icon></b-button>
                                <b-alert
                                  :show="dismissCountDown"
                                  fade
                                  variant="success"
                                  @dismiss-count-down="countDownChanged"
                                  >
                                  Article #{{ this.selected_article + 1 }} updated
                                </b-alert>
                              </b-col>
                            </b-row>
                        </b-container>

                    </b-form>

                </b-col>
                <b-col col lg="1"></b-col>
            </b-row>
        </b-container>

    </div>
</template>

<style>
#delete-button {
  margin-top: 25px;
  margin-bottom: 25px;
}
</style>

<script>
  import { store, mutations } from "./store";
  export default {
    components: {
      Keypress: () => import('vue-keypress')
    },
    computed: {
      newsletters() {
        return store.newsletters;
      },
      selected_newsletter() {
        return store.selected_newsletter;
      },
      selected_article() {
        return store.selected_article;
      },
      categories() {
        return store.article_categories;
      }
    },
    data() {
      return {
        show: true,
        form: {
          url: null,
          title: null,
          author: null,
          description: null,
          image_url: null,
          image_filename: null,
          image_width: null,
          category: null,
          top_cream: false
        },
        dismissSecs: 2,
        dismissCountDown: 0,
        keypressEvents: [
          {
            keyEvent: 'keydown',
            multipleKeys: [
              {
                keyCode: 83, // S
                modifiers: ['shiftKey'],
                preventDefault: false,
              },
            ],
          }
        ]
      }
    },
    methods: {
      setNewsletter: mutations.setNewsletter,
      setArticle: mutations.setArticle,
      onSubmit(evt) {
        evt.preventDefault()
        this.saveArticle()
      },
      saveArticle() {
        this.newsletters[this.selected_newsletter].articles[this.selected_article].url = this.form.url
        this.newsletters[this.selected_newsletter].articles[this.selected_article].title = this.form.title
        this.newsletters[this.selected_newsletter].articles[this.selected_article].author = this.form.author
        this.newsletters[this.selected_newsletter].articles[this.selected_article].description = this.form.description
        this.newsletters[this.selected_newsletter].articles[this.selected_article].category = this.form.category
        this.newsletters[this.selected_newsletter].articles[this.selected_article].image_url = this.form.image_url
        this.newsletters[this.selected_newsletter].articles[this.selected_article].image_filename = this.form.image_filename
        this.newsletters[this.selected_newsletter].articles[this.selected_article].image_width = this.form.image_width
        this.newsletters[this.selected_newsletter].articles[this.selected_article].top_cream = this.form.top_cream
        this.showAlert()
      },
      resetFormFields() {
        this.form.url = null
        this.form.title = null
        this.form.author = null
        this.form.description = null
        this.form.category = null
        this.form.image_url = null
        this.form.image_filename = null
        this.form.image_width = null
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
            title: null,
            author: null,
            description: null,
            category: null,
            image_url: null,
            image_filename: null,
            image_width: null,
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
        if (typeof this.newsletters[this.selected_newsletter].articles[this.selected_article] !== 'undefined') {
          this.form.url = this.newsletters[this.selected_newsletter].articles[this.selected_article].url
          this.form.title = this.newsletters[this.selected_newsletter].articles[this.selected_article].title
          this.form.author = this.newsletters[this.selected_newsletter].articles[this.selected_article].author
          this.form.description = this.newsletters[this.selected_newsletter].articles[this.selected_article].description
          this.form.category = this.newsletters[this.selected_newsletter].articles[this.selected_article].category
          this.form.image_url = this.newsletters[this.selected_newsletter].articles[this.selected_article].image_url
          this.form.image_filename = this.newsletters[this.selected_newsletter].articles[this.selected_article].image_filename
          this.form.image_width = this.newsletters[this.selected_newsletter].articles[this.selected_article].image_width
          this.form.top_cream = this.newsletters[this.selected_newsletter].articles[this.selected_article].top_cream
        }
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      },
      changeArticleIndex(direction) {
        if (this.newsletters[this.selected_newsletter].articles.length > 0) {
          if (direction == "previous" && this.selected_article != 0) {
            var previous_article = this.newsletters[this.selected_newsletter].articles[this.selected_article - 1]
            this.newsletters[this.selected_newsletter].articles[this.selected_article - 1] = this.newsletters[this.selected_newsletter].articles[this.selected_article]
            this.newsletters[this.selected_newsletter].articles[this.selected_article] = previous_article
            this.changeArticle("previous")
          } else if (direction == "next" && this.selected_article < this.newsletters[this.selected_newsletter].articles.length - 1) {
            var next_article = this.newsletters[this.selected_newsletter].articles[this.selected_article + 1]
            this.newsletters[this.selected_newsletter].articles[this.selected_article + 1] = this.newsletters[this.selected_newsletter].articles[this.selected_article]
            this.newsletters[this.selected_newsletter].articles[this.selected_article] = next_article
            this.changeArticle("next")
          } else {
            console.log("Unexpecteed direction")
          }
        }
      }
    },
    mounted() {
      this.updateFormFields()
    }
  }
</script>
