import { useState, useEffect } from "react";
import "./Profile.css";

function Profile() {
  const [activeTab, setActiveTab] = useState("posts");
  const [userName, setUserName] = useState("Utilisateur");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("post/", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Erreur lors du fetch des posts");

        const data = await res.json();

        const formattedPosts = data.map((post) => ({
          ID: post.ID,
          username: post.userName || "Utilisateur",
          title: post.title,
          content: post.description,
          comments: post.comments || [],
        }));

        setPosts(formattedPosts);
      } catch (err) {
        console.error("Erreur lors du fetch des posts :", err);
      }
    };

    fetchPosts();
  }, []);

  const jobs = [
    {
      role: "Senior UI/UX Designer",
      company: "Creative Studio",
      date: "2022 - Present",
      description:
        "Led the redesign of multiple SaaS platforms, focusing on accessibility and design systems.",
    },
  ];

  return (
    <div className="profile-page">
      <div className="profile-banner">
        <div className="banner-username">{userName}</div>
      </div>

      <div className="profile-divider"></div>

      <div className="profile-header">
        <div className="profile-avatar"></div>
        <div className="profile-handle">
          @{userName.toLowerCase().replace(/\s+/g, "_")}
        </div>
      </div>

      <div className="profile-sections">
        <h2
          className={activeTab === "posts" ? "active" : ""}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </h2>
        <h2
          className={activeTab === "jobs" ? "active" : ""}
          onClick={() => setActiveTab("jobs")}
        >
          Job History
        </h2>
      </div>

      {activeTab === "posts" && (
        <div className="profile-horizontal-scroll">
          {posts.length === 0 ? (
            <p>Aucun post pour le moment.</p>
          ) : (
            posts.map((post) => (
              <div key={post.ID} className="inner-card profile-post-card">
                <div className="post-header">
                  <div className="profile-pic"></div>
                  <div className="user-info">
                    {/* Affiche le vrai nom de l'utilisateur */}
                    <div className="username">{userName}</div>
                    <div className="post-title">{post.title}</div>
                  </div>
                </div>

                <div className="post-content-wrapper">
                  <div className="post-field">{post.content}</div>
                </div>

                {post.comments.length > 0 && (
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
                )}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "jobs" && (
        <div className="job-history">
          {jobs.map((job, index) => (
            <div key={index} className="job-card">
              <h3>{job.role}</h3>
              <span className="job-meta">
                {job.company} • {job.date}
              </span>
              <p>{job.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
