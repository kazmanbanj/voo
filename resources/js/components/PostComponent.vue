<template>
    <div class="container">
        <div class="row justify-content-center mt-2">
            <div class="col-md-10">
                <div class="card">
                    <div class="card-header">Posts</div>

                    <div class="card-body">
                        <select name="" id="" class="form-control col-md-4">
                            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                        </select>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Post text</th>
                                    <th>Created date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="post in posts.data" :key="post.id">
                                    <td>{{ post.title }}</td>
                                    <td>{{ post.post_text.substring(0,100) }}</td>
                                    <td>{{ post.created_at }}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination :data="posts" @pagination-change-page="getResults"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            posts: {},
            categories: {}
        }
    },
    mounted() {
        axios.get('/api/categories')
            .then(response => {
                this.categories = response.data.data;
            });
        this.getResults();
    },
    methods: {
		// Our method to GET results from a Laravel endpoint
		getResults(page = 1) {
			axios.get('/api/posts?page=' + page)
				.then(response => {
					this.posts = response.data;
				});
		}
	}
};
</script>
