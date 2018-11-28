<template>
  <div class="blog-posts">
    <Loader v-if="!hasBlogPosts" :text="'Loading posts...'" />
    
    <div class="blog-posts " v-if="hasBlogPosts">
      <div class="summary">
        {{ $texts.numberOfPosts }}: {{ numberOfPosts }}
      </div>

      <Post
        v-for="post in blogPosts"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loader from "@/components/Loader";
import Post from "@/components/blog/Post";
export default {
  components: {
    Loader,
    Post
  },
  computed: {
    ...mapGetters("blog", ["blogPosts", "hasBlogPosts", "numberOfPosts"])
  },
  mounted() {
    this.$store.dispatch("blog/getBlogPosts");
  }
};
</script>

<style scoped>
.blog-posts {
  max-width: 800px;
  margin: 0 auto;
}
</style>