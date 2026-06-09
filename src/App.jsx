import './App.css'
import PostsList from './features/posts/PostsList.jsx'
import AddPostForm from './features/posts/AddPostForm.jsx'


function App() {
  
  return (
    <div className="App">
      <AddPostForm />
      <PostsList />
    </div>
  )
}

export default App
