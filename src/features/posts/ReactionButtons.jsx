import { useDispatch } from 'react-redux';
import { reactionAdded } from './postsSlice';

const reactionEmoji = {
  thumbsUp: 'G',
  hooray: 'hOO',
  heart: 'C',
  rocket: 'R',
  eyes: 'O'
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const handleReactionClick = (reaction) => {
    dispatch(reactionAdded({ postId: post.id, reaction }));
  };

  return (
    <div>
      {Object.entries(reactionEmoji).map(([reaction, emoji]) => (
        <button key={reaction} onClick={() => handleReactionClick(reaction)}>
          {emoji} {post.reactions[reaction]}
        </button>
      ))}
    </div>
  );
};

export default ReactionButtons;