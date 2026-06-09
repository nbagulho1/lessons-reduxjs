import { useSelector } from 'react-redux';
import { selectAllPosts } from './postsSlice';

const PostsList = () => {
    const posts = useSelector(selectAllPosts);

    const renderedPosts = () => {
        return posts.map((post) => (
            <article key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
            </article>
        ));
    };

    return (
        <div>
            <h2>Posts</h2>
            {renderedPosts()}
        </div>
    );
};

export default PostsList;