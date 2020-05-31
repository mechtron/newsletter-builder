<template>
    <div>  
        <b-container class="bv-example-row">
            <b-row>
                <b-col cols="6">
                    <b-dropdown id="dropdown-1" text="Select Newsletter " class="m-md-2">
                        <b-dropdown-item @click="newsletterSelected" v-for="(key, n) in newsletters" :key="n">Issue #{{n}}</b-dropdown-item>
                    </b-dropdown>
                </b-col>
                <b-col cols="6">
                    <b-button variant="success"  @click="newNewsletter">
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
                    <b-form @submit="onSubmit" v-if="show">

                        <b-form-group
                        id="input-group-1" label-for="input-1">
                            <b-input-group readonly prepend="Issue #" class="mt-3">
                                <b-form-input
                                id="input-1"
                                v-model="form.issue_number"
                                type="number"
                                required
                                >
                                </b-form-input>
                            </b-input-group>
                        </b-form-group>

                        <b-form-group id="input-group-2" label-for="input-4">
                            <b-input-group prepend="Version" class="mt-3">
                                <b-form-input
                                id="input-2"
                                v-model="form.version"
                                type="text"
                                >
                                </b-form-input>
                            </b-input-group>
                        </b-form-group>

                        <b-form-group id="input-group-3" label-for="input-3">
                            <b-input-group prepend="Date" class="mt-3">
                                <b-form-input
                                id="input-3"
                                v-model="form.date"
                                type="date"
                                >
                                </b-form-input>
                            </b-input-group>
                        </b-form-group>

                        <b-form-group id="input-group-4" label="Intro paragraph:" label-for="input-4">
                            <b-form-textarea
                                id="textarea"
                                v-model="form.intro"
                                placeholder="Say something thought provoking.."
                                rows="5"
                                max-rows="6"
                            ></b-form-textarea>
                        </b-form-group>

                        <b-button-group class="mx-1">
                        <b-button type="submit" variant="primary">Save</b-button>
                        </b-button-group>
                    </b-form>
                </b-col>
                <b-col col lg="1"></b-col>
            </b-row>
        </b-container>
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
      }
    },
    data() {
      return {
        form: {
          issue_number: null,
          version: null,
          date: null,
          intro: null
        },
        show: true
      }
    },
    methods: {
      setNewsletter: mutations.setNewsletter,
      setArticle: mutations.setArticle,
      onSubmit(evt) {
        evt.preventDefault()
        this.newsletters[this.selected_newsletter].version = this.form.version
        this.newsletters[this.selected_newsletter].date = this.form.date
        this.newsletters[this.selected_newsletter].intro = this.form.intro
        alert("Issue #" + this.selected_newsletter + " successfully updated")
      },
      newNewsletter(evt) {
        evt.preventDefault()
        var issues_numbers = Object.keys(this.newsletters).sort()
        var next_issue_number = 0
        if (issues_numbers.length > 0) {
            next_issue_number = parseInt(issues_numbers[issues_numbers.length - 1]) + 1
        }
        this.newsletters[next_issue_number] = {
            version: null,
            date: null,
            intro: null,
            articles: []
        }
        alert("Successfully created Issue #" + next_issue_number)
        this.selected_newsletter = next_issue_number
        // Reset our form values
        this.form.issue_number = next_issue_number
        this.form.version = null
        this.form.date = null
        this.form.intro = null
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      newsletterSelected(evt) {
        evt.preventDefault()
        var issue_number = evt.target.text.split("#")[1]
        this.setNewsletter(issue_number)
        this.setArticle(0)
        this.form.issue_number = issue_number
        this.form.version = this.newsletters[issue_number].version
        this.form.date = this.newsletters[issue_number].date
        this.form.intro = this.newsletters[issue_number].intro
      }
    }
  }
</script>
