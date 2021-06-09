<template>
    <div>
        <form @submit.prevent="submit_form" class="form-control">
            <br>
            <div class="form-group">
                <label for="">Post title</label>
                <input type="text" v-model="fields.title" class="form-control">
            </div>
            <p class="alert alert-danger" v-if="errors && errors.title">{{ errors.title[0] }}</p>
            <br>
            <div class="form-group">
                <label for="">Post text</label>
                <textarea rows="10" v-model="fields.post_text" class="form-control"></textarea>
            </div>
            <p class="alert alert-danger" v-if="errors && errors.title">{{ errors.title[0] }}</p>
            <br>
            <div class="form-group">
                <label>Category</label>
                <select class="form-control" v-model="fields.category_id">
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
            </div>
            <p class="alert alert-danger" v-if="errors && errors.category_id">{{ errors.category_id[0] }}</p>
            <br>
            <input type="submit" :value="form_submitting ? 'Saving Post...' : 'Save Post'" class="form-control btn btn-primary" :disabled="form_submitting">
            <br>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categories: {},
            fields: {
                'title': '',
                'post_text': '',
                'category_id': '',
            },
            errors: {},
            form_submitting: false
        }
    },
    mounted() {
        axios.get('/api/categories')
            .then(response => {
                this.categories = response.data.data;
            });

        axios.get('/api/posts/' + this.$route.params.id)
            .then(response => {
                this.fields = response.data.data;
            });
    },
    methods: {
        submit_form() {
            this.form_submitting = true;
            axios.put('/api/posts/' + this.$route.params.id, this.fields)
            .then(response => {
                this.$swal('Post Updated Successfully');
                this.$router.push('/');
                this.form_submitting = false;
            }).catch(error => {
                this.$swal({icon: 'error', title: 'Error happened'});
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors;
                }
                this.form_submitting = false;
            });
        }
    },
};
</script>
