<template>
    <div>
        <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <b-button>Article 6/9</b-button>
                </b-col>
                <b-col>
                    <b-button-group class="mx-1">
                        <b-button>&laquo;</b-button>
                        <b-button>&lsaquo;</b-button>
                        <b-button>&rsaquo;</b-button>
                        <b-button>&raquo;</b-button>
                    </b-button-group>
                </b-col>
                <b-col>
                    <b-button variant="success">
                        <b-icon icon="plus"></b-icon>
                    </b-button>
                </b-col>
            </b-row>
        </b-container>

        <br/>

        <b-container class="bv-example-row">
            <b-row class="justify-content-md-center">
                <b-col col lg="1"></b-col>
                <b-col cols="12" md="auto">
                    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                        <b-form-group
                            id="input-group-1"
                            label-for="input-1"
                        >
                            <b-input-group prepend="URL" class="mt-3">
                                <b-form-input
                                id="input-1"
                                v-model="form.email"
                                type="email"
                                required
                                placeholder="Article URL"
                                >
                                </b-form-input>
                                <b-input-group-append>
                                    <b-button>Open URL</b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Author:" label-for="input-2">
                            <b-form-input
                            id="input-2"
                            v-model="form.name"
                            required
                            placeholder="Article author"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-3" label="Description:" label-for="input-3">
                            <b-form-input
                            id="input-3"
                            v-model="form.description"
                            required
                            placeholder="Short description"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-4" label="Image URL:" label-for="input-4">
                            <b-form-input
                            id="input-4"
                            v-model="form.image_url"
                            required
                            placeholder="Image URL (optional)"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-5" label="Category:" label-for="input-5">
                            <b-form-select
                            id="input-5"
                            v-model="form.category"
                            :options="categories"
                            required
                            ></b-form-select>
                        </b-form-group>

                        <b-form-group id="input-group-6">
                            <b-form-checkbox-group v-model="form.checked" id="checkboxes-6">
                            <b-form-checkbox value="me">Top cream?</b-form-checkbox>
                            </b-form-checkbox-group>
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

        <!--
        <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form }}</pre>
        </b-card>
        //-->

        <b-card class="mt-3" header="Not worthy?">
            <b-button variant="danger"><b-icon icon="trash"></b-icon></b-button>
        </b-card>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
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
        ],
        show: true
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
      }
    }
  }
</script>
