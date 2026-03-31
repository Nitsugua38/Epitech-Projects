import { useState } from 'react';
import "./newpost.css";

function Newpost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [likecount, setLikecount] = useState(0);
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);

  const userName = localStorage.getItem("userName") || "Utilisateur";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setMessage("Veuillez remplir tous les champs !");
      return;
    }

    try {
      const userId = 1; 

      const res = await fetch(`post/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description: content, likecount })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Erreur serveur");

      setPosts([{ 
        id: data.post_id,
        username: userName,
        title,
        content,
        comments: []
      }, ...posts]);

      setMessage("Post créé avec succès !");
      setTitle("");
      setContent("");
      setLikecount(0);
    } catch (err) {
      setMessage("Erreur : " + err.message);
    }
  };

  return (
    <div className="outer-card">
      <div className="inner-content">
        <div className="inner-card">
          <h2>Créer un nouveau post</h2>
          <form className="newpost-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Titre"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Contenu"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Like count"
              value={likecount}
              onChange={e => setLikecount(parseInt(e.target.value))}
              min={0}
              required
            />
            <button type="submit">Create a new post</button>
          </form>
          {message && <p className="newpost-message">{message}</p>}
        </div>

        {posts.map(post => (
          <div key={post.id} className="inner-card">
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
                {post.comments.map((comment, i) => (
                  <div key={i} className="comment-line">
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

export default Newpost;
