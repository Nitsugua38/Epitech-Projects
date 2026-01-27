import "./Profile.css";

function Profile() {

  // Same post structure as Home (reduced count for profile)
  const posts = Array(6).fill().map((_, i) => ({
    id: i + 1,
    username: "jane_doe",
    title: "Design Update",
    content:
      "Just completed the new dashboard interface with improved accessibility and responsive layout.",
    comments: [
      { text: "Looks amazing!", user: "alice_w", img: "https://via.placeholder.com/32" },
      { text: "Clean and modern.", user: "bob_m", img: "https://via.placeholder.com/32" }
    ]
  }));

  return (
    <div className="profile-page">

      {/* HEADER */}
      <div className="profile-header">
        <div className="profile-avatar"></div>
        <div className="profile-divider"></div>
      </div>

      {/* SECTION TITLES */}
      <div className="profile-sections">
        <h2>Posts</h2>
        <h2>Job History</h2>
      </div>

      {/* POSTS SCROLL */}
      <div className="profile-horizontal-scroll">
        {posts.map(post => (
          <div key={post.id} className="inner-card profile-post-card">
            
            <div className="post-header">
              <div className="profile-pic"></div>
              <div className="user-info">
                <div className="username">{post.username}</div>
                <div className="post-title">{post.title}</div>
              </div>
            </div>

            <div className="post-content-wrapper">
              <div className="post-field">{post.content}</div>

              <div className="top-comments">
                {post.comments.map((comment, index) => (
                  <div key={index} className="comment-line">
                    <div className="comment-header">
                      <div
                        className="comment-profile-pic"
                        style={{ backgroundImage: `url(${comment.img})` }}
                      ></div>
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

export default Profile;
