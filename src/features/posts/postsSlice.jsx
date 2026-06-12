import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';


const initialState = {
    posts: [],
    status: 'idle',
    error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
});

const postsSlice = createSlice({
  name: 'artigos',
  initialState,
    reducers: {
        postsAdded: {
          reducer(state, action) { // O reducer é a função que processa a ação e atualiza o estado. Neste caso, ele simplesmente adiciona o novo post ao array de posts.
            state.posts.push(action.payload)
          },
          prepare( title, content, userId ) { // A função prepare é usada para criar a ação. Ela recebe os argumentos necessários para criar um novo post e retorna um objeto com a propriedade payload, que contém o novo post formatado.
            return {
              payload: {
                id: nanoid(),
                title,
                content,
                date: new Date().toISOString(),
                userId,
                reactions: {
                  thumbsUp: 0,
                  hooray: 0, 
                  heart: 0,
                  rocket: 0,
                  eyes: 0
                }
              }
            };
          }
        },
        reactionAdded(state, action) { // Este reducer é responsável por atualizar as reações de um post específico. Ele recebe a ação com o postId e o tipo de reação, encontra o post correspondente no estado e incrementa a contagem da reação.
          const { postId, reaction } = action.payload;
          const existingPost = state.posts.find(post => post.id == postId);
          if (existingPost) {
            existingPost.reactions[reaction]++;
          }
        }
      },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        hooray: 0,
                        heart: 0,
                        rocket: 0,
                        eyes: 0
                    };
                    return post;
                });
                state.posts = state.posts.concat(loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    } 
});

export const selectAllPosts = (state) => state.artigos.posts;
export const getPostsStatus = (state) => state.artigos.status;
export const getPostsError = (state) => state.artigos.error;
export const { postsAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;