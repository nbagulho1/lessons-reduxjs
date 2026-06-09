import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, title: 'Example Post', content: 'This is an example post.' },
  { id: 2, title: 'Another Post', content: 'This is another example post.' }
];

const postsSlice = createSlice({
  name: 'artigos',
  initialState,
    reducers: {
        postsAdded: {
          reducer(state, action) {
            state.push(action.payload)
          },
          prepare( title, content, userId ) {
            return {
              payload: {
                id: nanoid(),
                title,
                content,
                userId
              }
            };
          }
        }
    }
});

export const selectAllPosts = (state) => state.artigos;
export const { postsAdded } = postsSlice.actions;

export default postsSlice.reducer;