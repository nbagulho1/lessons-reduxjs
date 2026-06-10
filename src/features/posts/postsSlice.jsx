import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

/* const initialState = [
  { id: 1,
    title: 'Example Post',
    content: 'This is an example post.',
    userId: 1,
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0, 
      heart: 0,
      rocket: 0,
      eyes: 0
    }
  },
  { id: 2,
    title: 'Another Post',
    content: 'This is another example post.',
    userId: 3,
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0, 
      heart: 0,
      rocket: 0,
      eyes: 0
    }
  }
]; */

const initialState = {
    posts: [],
    status: 'idle',
    error: null
};

const postsSlice = createSlice({
  name: 'artigos',
  initialState,
    reducers: {
        postsAdded: {
          reducer(state, action) { // O reducer é a função que processa a ação e atualiza o estado. Neste caso, ele simplesmente adiciona o novo post ao array de posts.
            state.push(action.payload)
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
          const existingPost = state.find(post => post.id == postId);
          if (existingPost) {
            existingPost.reactions[reaction]++;
          }
        }
      }
});

export const selectAllPosts = (state) => state.artigos;
export const { postsAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;