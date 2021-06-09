<template>
    <div>
        <select v-model="category_id" class="form-control w-3 mt-1 selectWidth">
            <option value="" selected>-- choose category --</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
        <table class="table">
            <thead>
                <tr>
                    <th>
                        <a href="javascript:" @click.prevent="change_sort('title')">Title</a>
                        <span v-if="this.sort_field == 'title' && this.sort_direction == 'asc'">&uarr;</span>
                        <span v-if="this.sort_field == 'title' && this.sort_direction == 'desc'">&darr;</span>
                    </th>
                    <th>
                        <a href="javascript:" @click.prevent="change_sort('post_text')">Post Text</a>
                        <span v-if="this.sort_field == 'post_text' && this.sort_direction == 'asc'">&uarr;</span>
                        <span v-if="this.sort_field == 'post_text' && this.sort_direction == 'desc'">&darr;</span>
                    </th>
                    <th>
                        <a href="javascript:" @click.prevent="change_sort('category_id')">Category</a>
                        <span v-if="this.sort_field == 'category_id' && this.sort_direction == 'asc'">&uarr;</span>
                        <span v-if="this.sort_field == 'category_id' && this.sort_direction == 'desc'">&darr;</span>
                    </th>
                    <th style="width: 130px;">
                        <a href="javascript:" @click.prevent="change_sort('created_at')" style="max-width:250px">Created Date</a>
                        <span v-if="this.sort_field == 'created_at' && this.sort_direction == 'asc'">&uarr;</span>
                        <span v-if="this.sort_field == 'created_at' && this.sort_direction == 'desc'">&darr;</span>
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(post, index) in posts.data" :key="index.id">
                    <td>{{ post.title }}</td>
                    <td>{{ post.post_text.substring(0,100) }}</td>
                    <td>{{ post.category_id }}</td>
                    <td>{{ post.created_at }}</td>
                    <td>
                        <router-link :to="{ name: 'editPost', params: { id: post.id } }">Edit</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <div style="overflow-x: auto;">
            <pagination :data="posts" @pagination-change-page="getResults"></pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            posts: {},
            categories: {},
            category_id: '',
            sort_field: 'created_at',
            sort_direction: 'asc',
        }
    },
    mounted() {
        axios.get('/api/categories')
            .then(response => {
                this.categories = response.data.data;
            });
        this.getResults();
    },
    watch: {
        category_id() { this.getResults() }
    },
    methods: {
        change_sort(field) {
            if (this.sort_field === field) {
                this.sort_direction = this.sort_direction === 'asc' ? 'desc' : 'asc';
            } else {
                this.sort_field = field;
                this.sort_direction = 'asc';
            }
            this.getResults();
        },
		// Our method to GET results from a Laravel endpoint
		getResults(page = 1) {
			axios.get('/api/posts?page=' + page
                + '&category_id=' + this.category_id
                + '&sort_field=' + this.sort_field
                + '&sort_direction=' + this.sort_direction)
				.then(response => {
					this.posts = response.data;
				});
		}
	}
};
</script>
