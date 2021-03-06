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
            <br/>
            <b-row class="justify-content-md-center">
                <b-col col lg="1"></b-col>
                <b-col cols="10">
                  <b-card title="Data management" sub-title="Import and export JSON data files containing all newsletter data.">
                    <b-row>
                      <b-col>
                        <input type="file" ref="fileInput" style="display: none" v-on:change="importData(this)">
                        <b-button variant="outline-primary" @click="$refs.fileInput.click()">Import Data</b-button>
                      </b-col>
                      <b-col> 
                        <b-button variant="outline-primary" @click="exportData">Export Data</b-button>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
                <b-col col lg="1"></b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
  import common from "./common";
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
      updateNewsletterData: mutations.updateNewsletterData,
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
        var issues_numbers = Object.keys(this.newsletters)
        var next_issue_number = 0
        if (issues_numbers.length > 0) {
            next_issue_number = parseInt(issues_numbers[issues_numbers.length - 1]) + 1
        }
        var now = new Date()
        var day = ("0" + now.getDate()).slice(-2)
        var month = ("0" + (now.getMonth() + 1)).slice(-2)
        var today = now.getFullYear() + "-" + (month) + "-" + (day)
        this.newsletters[next_issue_number] = {
            version: "1.0.0",
            date: today,
            intro: null,
            articles: []
        }
        alert("Successfully created Issue #" + next_issue_number)
        this.setNewsletter(next_issue_number)
        // Reset our form values
        this.form.issue_number = next_issue_number
        this.form.version = this.newsletters[next_issue_number]["version"]
        this.form.date = this.newsletters[next_issue_number]["date"]
        this.form.intro = this.newsletters[next_issue_number]["intro"]
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
      },
      exportData(evt) {
        evt.preventDefault()
        var exported_data = JSON.stringify(this.newsletters)
        var exported_filename =  "newsletter-data-" + Date.now() + ".json"
        common.downloadFile(exported_data, exported_filename, "text/json")
      },
      importData() {
        var input_file = this.$refs.fileInput.files[0]
        var reader = new FileReader();
        reader.onload = (event) => {
          var newsletters = JSON.parse(event.target.result);
          this.updateNewsletterData(newsletters)
          this.setNewsletter(Object.keys(newsletters).length - 1)
          this.setArticle(0)
          this.updateFormFields()
        }
        reader.readAsText(input_file)
      }
    },
    mounted() {
      this.updateFormFields()
    }
  }
</script>
