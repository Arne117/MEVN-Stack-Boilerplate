<template lang='pug'>
  .posts.p-md-5.m-md-3
    <h1>Posts</h1>
    <div v-if="posts.length > 0" class="table-wrap">
      <div>
        <router-link :to="{ name: 'Addpost' }" class="">Add Post</router-link>
      </div>
      <table>
        <tr>
          <td>Title</td>
          <td width="550">Description</td>
          <td width="100" align="center">Action</td>
        </tr>
        <tr v-for="post in posts">
          <td>{{ post.title }}</td>
          <td>{{ post.description }}</td>
          <td align="center">
            <router-link :to="{ name: 'Editpost', params: { id: post._id } }">Edit</router-link> |
            <a href="#" @click="deletePost(post._id)">Delete</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      p There are no posts.. Lets add one now <br /><br />
      <router-link :to="{ name: 'Addpost' }" class="add_post_link">Add Post</router-link>
    </div>
    transition(name='fade' mode='out-in')
      router-view
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'posts',
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.posts = response.data.posts
    },
    async deletePost (id) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      }).then((res) => {
        if (res.value) {
          PostsService.deletePost(id)
          $this.$router.go({ name: 'Posts' })
        }
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate')
    this.getPosts()
    next()
  }
}
</script>

<style lang="stylus">
.table-wrap {
  width 60%
  margin 0 auto
  text-align center
}
table th, table tr {
  text-align left
}
table thead {
  background #f2f2f2
}
table tr td {
  padding 10px
}
table tr:nth-child(odd) {
  background #f2f2f2
}
table tr:nth-child(1) {
  background #4d7ef7
  color #fff
}
a {
  color #4d7ef7
  text-decoration none
}
a.add_post_link {
  background #4d7ef7
  color #fff
  padding 10px 80px
  text-transform uppercase
  font-size 12px
  font-weight bold
}
</style>
