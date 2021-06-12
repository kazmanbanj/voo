<template>
    <div>
        <div class="d-flex">
            <select v-model="params.category_id" class="form-control w-3 mt-1 selectWidth">
                <option value="" selected>-- choose category --</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
            <input type="search" class="form-control mt-1 search" placeholder="Search (min 4 letters)" v-model="search">
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>
                        <a href="javascript:" @click.prevent="change_sort('title')">Title</a>
                        <span v-if="this.params.sort_field == 'title' && this.params.sort_direction == 'asc'">&uarr;</span>
                        <span v-if="this.params.sort_field == 'title' && this.params.sort_direction == 'desc'">&darr;</span>
                    </th>
                    <th>
                        <a href="javascript:" @click.prevent="change_sort('post_text')">Post Text</a>
                        <span v-if="this.params.sort_field == 'post_text' && this.params.sort_direction == 'asc'">&uarr;</span>
                        <span v-if="this.params.sort_field == 'post_text' && this.params.sort_direction == 'desc'">&darr;</span>
                    </th>
                    <th>
                        <a href="javascript:" @click.prevent="change_sort('category_id')">Category</a>
                        <span v-if="this.params.sort_field == 'category_id' && this.params.sort_direction == 'asc'">&uarr;</span>
                        <span v-if="this.params.sort_field == 'category_id' && this.params.sort_direction == 'desc'">&darr;</span>
                    </th>
                    <th style="width: 130px;">
                        <a href="javascript:" @click.prevent="change_sort('created_at')" style="max-width:250px">Created Date</a>
                        <span v-if="this.sort_field == 'created_at' && this.sort_direction == 'asc'">&uarr;</span>
                        <span v-if="this.sort_field == 'created_at' && this.sort_direction == 'desc'">&darr;</span>
                    </th>
                    <th>Actions</th>
                </tr>
                <tr>
                    <th><input type="search" class="form-input w-100" v-model="params.title"></th>
                    <th><input type="search" class="form-input w-100" v-model="params.post_text"></th>
                    <th><input type="search" class="form-input w-100" v-model="params.category_id"></th>
                    <th><input type="search" class="form-input w-100" v-model="params.created_at"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(post, index) in posts.data" :key="index.id">
                    <td>{{ post.title }}</td>
                    <td>{{ post.post_text.substring(0,100) }}</td>
                    <td>{{ post.category_id }}</td>
                    <td>{{ post.created_at }}</td>
                    <td>
                        <div class="d-flex">
                        <router-link class="btn btn-info btn-sm" :to="{ name: 'editPost', params: { id: post.id } }">Edit</router-link>
                        <button @click="delete_post(post.id)" class="btn btn-danger btn-sm">Delete</button></div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div style="overflow-x: auto;">
            <pagination :data="posts" @pagination-change-page="getResults"></pagination>
        </div>
    </div>
</template>

<style scoped>
.search {
    margin-left:auto;
    width:250px;
}
</style>

<script>
export default {
    data() {
        return {
            posts: {},
            categories: {},
            params: {
                category_id: '',
                sort_field: 'created_at',
                sort_direction: 'desc',
                title: '',
                post_text: '',
                created_at: ''
            },
            search: ''
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
        params: {
            handler() {
                this.getResults();
            },
            deep: true
        },
        search (val, old) {
            if (val.length >= 4 || old.length >= 4) {
                this.getResults();
            }
        },
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
			axios.get('/api/posts', {
                params: {
                    page,
                    search: this.search.length >= 4 ? this.search  : '',
                    ...this.params
                }
            })
				.then(response => {
					this.posts = response.data;
				});
		},
        delete_post(post_id) {
            swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    axios.delete('/api/posts/' + post_id)
                    .then(response => {
                    swal("Your post has been deleted!", {
                    icon: "success"
                    });
                    this.getResults();
                    })
                }  else {
                swal("Your post is safe!");
            }
            });
        }
	}
};
</script>
