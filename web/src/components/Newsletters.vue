<template>
    <div>  
        <b-container class="bv-example-row">
            <b-row>
                <b-col cols="6">
                    <b-dropdown id="dropdown-1" text="Select Newsletter" class="m-md-2">
                        <b-dropdown-item @click="newsletterSelected" v-for="n in newsletters" :key="n.issue_number">Issue #{{n.issue_number}}</b-dropdown-item>
                    </b-dropdown>
                </b-col>
                <b-col cols="6">
                    <b-button variant="success">
                        <b-icon icon="plus"></b-icon>
                    </b-button>
                </b-col>
            </b-row>
        </b-container>

        <br/>

        <b-row class="justify-content-md-center">
            <b-col col lg="1"></b-col>
            <b-col cols="12" md="auto">
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">

                    <b-form-group
                    id="input-group-1" label-for="input-1">
                        <b-input-group prepend="Issue #" class="mt-3">
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
                            rows="3"
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

    </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          issue_number: null,
          version: null,
          date: null,
          intro: null
        },
        show: true,
        newsletters: [
            {
                issue_number: 0,
                version: "1.1.0",
                date: "2020-04-15",
                intro: "Welcome to issue #0"
            },
            {
                issue_number: 1,
                version: "1.0.0",
                date: "2020-04-30",
                intro: "Welcome to issue #1"
            },
            {
                issue_number: 2,
                version: "0.1.0",
                date: "2020-05-15",
                intro: "Welcome to issue #2"
            }
        ],
        selected_newsletter: 0
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      newsletterSelected(evt) {
        evt.preventDefault()
        console.log(evt.toElement.text)
        var issue_number = evt.toElement.text.split("#")[1]
        this.form.issue_number = issue_number
        this.form.version = this.newsletters[issue_number].version
        this.form.date = this.newsletters[issue_number].date
        this.form.intro = this.newsletters[issue_number].intro
      }
    }
  }
</script>
