<template>
    <div>
        <b-container class="bv-example-row">
            <b-row>
                <b-col cols="6">
                    <b-dropdown text="Select Newsletter ">
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

                        <b-form-group label-for="input-issue-number">
                            <b-input-group readonly prepend="Issue #" class="mt-3">
                                <b-form-input
                                id="input-issue-number"
                                v-model="form.issue_number"
                                type="number"
                                required
                                >
                                </b-form-input>
                            </b-input-group>
                        </b-form-group>

                        <b-form-group label-for="input-version">
                            <b-input-group prepend="Version" class="mt-3">
                                <b-form-input
                                id="input-version"
                                v-model="form.version"
                                type="text"
                                >
                                </b-form-input>
                            </b-input-group>
                        </b-form-group>

                        <b-form-group label-for="input-date">
                            <b-input-group prepend="Date" class="mt-3">
                                <b-form-input
                                id="input-date"
                                v-model="form.date"
                                type="date"
                                >
                                </b-form-input>
                            </b-input-group>
                        </b-form-group>

                        <b-form-group label="Intro paragraph:" label-for="input-intro">
                            <b-form-textarea
                                id="input-intro"
                                v-model="form.intro"
                                placeholder="Say something thought provoking.."
                                rows="5"
                                max-rows="6"
                            ></b-form-textarea>
                        </b-form-group>

                        <b-container class="bv-example-row">
                            <b-row>
                                <b-col cols="5">
                                </b-col>
                                <b-col cols="2">
                                  <b-button-group>
                                    <b-button type="submit" variant="primary">Save</b-button>
                                    <Keypress
                                      v-for="keypressEvent in keypressEvents"
                                      :key="keypressEvent.id"
                                      :key-event="keypressEvent.keyEvent"
                                      :multiple-keys="keypressEvent.multipleKeys"
                                      @success="saveNewsletter"
                                    />
                                  </b-button-group>
                                </b-col>
                                <b-col cols="5">
                                  <b-alert
                                    :show="dismissCountDown"
                                    fade
                                    variant="success"
                                    @dismiss-count-down="countDownChanged"
                                    >
                                    Issue #{{ selected_issue_number }} updated
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
      selected_issue_number() {
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
        show: true,
        dismissSecs: 2,
        dismissCountDown: 0,
        keypressEvents: [
          {
            keyEvent: 'keydown',
            multipleKeys: [
              {
                keyCode: 90, // Z
                modifiers: ['metaKey'],
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
        this.saveNewsletter()
      },
      saveNewsletter() {
        this.newsletters[this.selected_issue_number].version = this.form.version
        this.newsletters[this.selected_issue_number].date = this.form.date
        this.newsletters[this.selected_issue_number].intro = this.form.intro
        this.showAlert()
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
        this.setNewsletter(next_issue_number)
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
      updateFormFields() {
        this.form.issue_number = this.selected_issue_number
        this.form.version = this.newsletters[this.selected_issue_number].version
        this.form.date = this.newsletters[this.selected_issue_number].date
        this.form.intro = this.newsletters[this.selected_issue_number].intro
      },
      newsletterSelected(evt) {
        evt.preventDefault()
        var issue_number = evt.target.text.split("#")[1]
        this.setNewsletter(issue_number)
        this.setArticle(0)
        this.updateFormFields()
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
    },
    mounted() {
      this.updateFormFields()
    }
  }
</script>
