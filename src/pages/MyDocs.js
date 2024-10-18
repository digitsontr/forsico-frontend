import React from "react";
import "../styles/mydocs.css";


const DocumentCard = ({ title, time, comments, tags }) => (
  <div className="document-card">
    <div className="card-header">
      <h3 className="document-title">{title}</h3>
      <i className="send-icon">✈️</i>
    </div>
    <p className="document-time">Last updated: {time}</p>
    <div className="document-info">
      <span className="comments">
        <i className="comment-icon">💬</i> {comments}
      </span>
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} className={`tag tag-${tag.toLowerCase()}`}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const MyDocs = () => {
  const documents = [
    {
      title: "Artificial intelligence for everyone",
      time: "Today at 10:03 pm",
      comments: 4,
      tags: ["UI Design", "Marketing"],
    },
    {
      title: "How to design better UIs",
      time: "Yesterday at 5:30 pm",
      comments: 3,
      tags: ["Design", "UI"],
    },
    {
      title: "Effective Marketing Strategies",
      time: "Today at 8:00 am",
      comments: 5,
      tags: ["Marketing", "SEO"],
    },
    {
      title: "Building Scalable Applications",
      time: "3 days ago at 2:15 pm",
      comments: 8,
      tags: ["Development", "Backend"],
    },
  ];

  return (
    <div className="my-docs">
      <header className="header">
        <h1 className="header-title">My Docs</h1>
        <div className="view-toggle">
          <button className="btn-view">📋 List</button>
          <button className="btn-view">📂 Board</button>
        </div>
      </header>
      <div className="documents-grid">
        {documents.map((doc, index) => (
          <DocumentCard key={index} {...doc} />
        ))}
      </div>
      <button className="add-docs-btn">Add Docs ➕</button>
    </div>
  );
};

export default MyDocs;