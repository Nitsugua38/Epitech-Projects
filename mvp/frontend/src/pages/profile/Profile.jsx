import { useState, useEffect } from "react";
import "./Profile.css";

function Profile() {
  const [activeTab, setActiveTab] = useState("posts");
  const [userName, setUserName] = useState("Utilisateur");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  const posts = Array(6)
    .fill()
    .map((_, i) => ({
      id: i + 1,
      username: userName,
      title: "Design Update",
      content:
        "Just completed the new dashboard interface with improved accessibility and responsive layout.",
      comments: [
        { text: "Looks amazing!", user: "alice_w", img: "https://via.placeholder.com/32" },
        { text: "Clean and modern.", user: "bob_m", img: "https://via.placeholder.com/32" }
      ]
    }));

  const jobs = [
    {
      role: "Senior UI/UX Designer",
      company: "Creative Studio",
      date: "2022 - Present",
      description:
        "Led the redesign of multiple SaaS platforms, focusing on accessibility and design systems."
    }
  ];

  return (
    <div className="profile-page">
      <div className="profile-banner">
        <div className="banner-username">{userName}</div>
      </div>
      <div className="profile-divider"></div>
      <div className="profile-header">
        <div className="profile-avatar"></div>
        <div className="profile-handle">@{userName.toLowerCase().replace(/\s+/g, "_")}</div>
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
          {posts.map((post) => (
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
              </div>
            </div>
          ))}
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
