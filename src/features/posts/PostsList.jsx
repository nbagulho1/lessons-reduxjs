import { useSelector,useDispatch } from 'react-redux';
import { selectAllPosts, getPostsError,getPostsStatus,fetchPosts } from './postsSlice';
import { useEffect } from 'react';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const postError = useSelector(getPostsError);
    const dispatch = useDispatch();
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    const renderedPosts = () => {
        return orderedPosts.map((post) => (
            <article key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p className="postCredit">
                    <PostAuthor userId={post.userId} />
                    <TimeAgo timestamp={post.date} />
                </p>
                <ReactionButtons post={post} />
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