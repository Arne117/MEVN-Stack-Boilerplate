<template>
  <div class="posts">
    <h1>Edit Post</h1>
      <div class="form">
        <div>
          <input type="text" name="title" placeholder="TITLE" @keyup='confirmLeave = true' v-model="title">
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="DESCRIPTION" @keyup='confirmLeave = true' v-model="description"></textarea>
        </div>
        <div>
          <button class="app_post_btn btn" @click="updatePost" :disabled='confirmLeave === false'>Update</button>
        </div>
      </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
  name: 'Editpost',
  data () {
    return {
      title: '',
      description: '',
      confirmLeave: false
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.confirmLeave) {
      this.$swal({
        title: 'You did not saved your chanegs!',
        text: 'All changes will be lost',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes it is ok'
      }).then((res) => {
        res.value === true ? next() : next(false)
      })
    } else next()
  },
  mounted () {
    this.getPost()
  },
  methods: {
    async getPost () {
      const response = await PostsService.getPost({
        id: this.$route.params.id
      })
      this.title = response.data.title
      this.description = response.data.description
      // this.$router.push({ name: 'Posts' })
    },
    async updatePost () {
      this.confirmLeave = false
      await PostsService.updatePost({
        id: this.$route.params.id,
        title: this.title,
        description: this.description
      })
      this.$swal(
        'Great!',
        `Your post has been updated!`,
        'success'
      )
      this.$router.push({ name: 'Posts' })
    }
  },
  beforeRouteEnter (to, from, next) {
    let loggedIn = true
    if (loggedIn) next()
    // else next(false)
    next()
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
