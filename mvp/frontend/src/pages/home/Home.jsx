import { useState, useEffect } from 'react';
import "./Home.css";

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  const userName = localStorage.getItem("userName") || "Utilisateur";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const posts = Array(20).fill().map((_, i) => ({
    id: i + 1,
    username: userName,
    title: i % 2 === 0 ? 'Design Update' : 'Code Review',
    content: i % 2 === 0 
      ? 'Just completed the new dashboard interface with improved accessibility and responsive layout. Excited to share more soon!'
      : 'Reviewed the latest pull request — great work on optimizing the component rendering. Added a few suggestions for further improvements in error handling.',
    comments: [
      { text: 'Great work, very clean design!', user: 'alice_w', img: 'https://via.placeholder.com/32' },
      { text: 'I agree, the layout is intuitive.', user: 'bob_m', img: 'https://via.placeholder.com/32' },
      { text: 'Looking forward to the next update.', user: 'carol_t', img: 'https://via.placeholder.com/32' }
    ]
  }));

  return (
    <div className={`outer-card ${isVisible ? 'fade-in' : ''}`}>
      <div className="inner-content">
        {posts.map(post => (
          <div key={post.id} className="inner-card">
            <div className="post-header">
              <div className="profile-pic"></div>
              <div className="user-info">
                <div className="username">{post.username}</div>
                <div className="post-title">
                  {post.title}
                  <div className="action-buttons">
                    <button className="action-btn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#666">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </button>
                    <button className="action-btn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#666">
                        <path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                      </svg>
                    </button>
                    <button className="action-btn">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#666">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="post-content-wrapper">
              <div className="post-field">{post.content}</div>
              <div className="top-comments">
                {post.comments.map((comment, index) => (
                  <div key={index} className="comment-line">
                    <div className="comment-header">
                      <div className="comment-profile-pic" style={{backgroundImage: `url(${comment.img})`}}></div>
                      <div className="comment-username">{comment.user}</div>
                    </div>
                    <div className="comment-text">{comment.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
