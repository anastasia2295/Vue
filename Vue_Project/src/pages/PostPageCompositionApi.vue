<template>
    <div >
        <h1>Страница с постами</h1>
        <my-input
        v-focus
          v-model="searchQuery"
          placeholder="Поиск..."
        />
        
        <div class="app__btns">
          <my-button 
          @click="showDialog">
          Создать пост
        </my-button>  
        <my-select 
        v-model="selectedSort"
        :options="sortOptions"
        />
        </div>
        
        <my-dialog v-model:show="dialogVisivle">
          <post-form
        @create="createPost"
        />  
        </my-dialog>
        <post-list 
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
        />
        <div v-else>Идет загрузка</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
    
    </div>
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import MyButton from "@/components/Ul/MyButton.vue";
import axios from "axios"
import MySelect from "@/components/Ul/MySelect"
import MyInput from "@/components/Ul/MyInput"
import usePosts from "@/hooks/usePosts"
import useSortedPosts from "@/hooks/useSortedPosts"
import useSortedAndSearchPosts from "@/hooks/useSortedAndSearchPosts"
export default {
    components: {
        PostList, PostForm, MyButton, MySelect, MyInput
    },
    data() {
        return{
            dialogVisivle: false,
            sortOptions: [
                {value: "title", name: "По названию"},
                {value: "body", name: "По содержимому"}
            ]
        }
    },
    setup(props) {
        const{totalPages, isPostsLoading, posts} = usePosts(10)
        const {sortedPosts, selectedSort} = useSortedPosts(posts)
        const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchPosts(sortedPosts)

        return {
            posts,
            totalPages,
            isPostsLoading,
            sortedPosts,
            selectedSort,
            searchQuery,
            sortedAndSearchedPosts
        }
    }
}
</script>

<style scoped>

.app__btns{
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}
.page__wrapper{
    display: flex;
    margin-top: 15px;
}
.page{
    border: 1px solid black;
    padding: 10px;
}
.current-page{
    border: 2px solid green;
}
.observer{
    height: 30px;
}
</style>