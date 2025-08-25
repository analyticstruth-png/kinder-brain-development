import { useState } from "react";

export default function Resources() {
  const [resources] = useState([
    {
      title: "Memory Match Game",
      description: "Printable card game to boost working memory",
      image: "🃏",
      link: "/printables/memory-worksheet.html",
      category: "Cognitive Skills"
    }
  ]);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial" }}>
      <h1>📚 Learning Resources</h1>
      <p>Printable worksheets, activities, and guides</p>
      
      <div style={{ display: "grid", gap: "20px" }}>
        {resources.map((resource, index) => (
          <div key={index} style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px" }}>
            <h2>{resource.image} {resource.title}</h2>
            <p>{resource.description}</p>
            <span style={{ background: "#e6f7ff", padding: "5px 10px", borderRadius: "10px" }}>
              {resource.category}
            </span>
            <div style={{ marginTop: "15px" }}>
              <a 
                href={resource.link} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ padding: "10px 15px", background: "#6db5ff", color: "white", textDecoration: "none", borderRadius: "5px" }}
              >
                View Worksheet
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}