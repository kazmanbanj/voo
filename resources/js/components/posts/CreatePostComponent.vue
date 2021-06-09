<template>
    <div>
        <form @submit.prevent="submit_form" class="form-control">
            <br>
            <div class="form-group">
                <label for="">Post title</label>
                <input type="text" v-model="fields.title" class="form-control">
            </div>
            <br>
            <div class="form-group">
                <label for="">Post text</label>
                <textarea rows="10" v-model="fields.post_text" class="form-control"></textarea>
            </div>
            <br>
            <div class="form-group">
                <label>Category</label>
                <select class="form-control" v-model="fields.category_id">
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
            </div>
            <br>
            <input type="submit" value="Save Post" class="form-control btn btn-primary">
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
            }
        }
    },
    mounted() {
        axios.get('/api/categories')
            .then(response => {
                this.categories = response.data.data;
            });
    },
    methods: {
        submit_form() {
            axios.post('/api/posts', this.fields)
            .then(response => {
                this.$router.push('/');
            });
        }
    },
};
</script>
