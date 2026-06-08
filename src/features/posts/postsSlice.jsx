import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  posts: [{ id: 1, title: 'Example Post', content: 'This is an example post.' },
        { id: 2, title: 'Another Post', content: 'This is another example post.' }
  ]
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
    reducers: {}
});

export default postsSlice.reducer;