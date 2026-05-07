import { act, useState } from "react";
import EmailCard from "./EmailCard";
function App(){
  const [filter, setFilter] = useState("All");
  const emails = [{
    sender: "example@gmail.com",
    subject: "Intern application update",
    snippet: "We would like to arrange a metting this week.",
  },
  {
    sender: "newsletter@techdaily.com",
    subject: "This week in tech",
    snippet: "Here are the latest updates from the tech world.",
  },
  {
    sender: "professor@university.edu",
    subject: "Exam schedule update",
    snippet: "Please check the updated exam timing for next week.",
  }
];
  
  const analyzeEmail = (email) => {
    const text = `${email.sender} ${email.subject} ${email.snippet}`.toLowerCase();
    if (
      text.includes("Interview") ||
      text.includes("exam") || 
      text.includes("deadline") ||
      text.includes("application")||
      text.includes("schedule")
    ) {
      return {
        importance: "High",
        action: "Read now"
      };
    }

    return {
        importance: "Low",
        action: "Read later"
    };
  };

  const processed_emails = emails.map(email => ({
    ...email,
    ...analyzeEmail(email)
  }));

  const filteredEmail =
    filter === "All"
      ? processed_emails
      : processed_emails.filter((email) => email.importance === filter);

  const sortedEmails = [...filteredEmail].sort((a, b) => {
    const a_analysis = analyzeEmail(a);
    const b_analysis = analyzeEmail(b);
    if (a_analysis.importance === "High" && b_analysis.importance === "Low"){
      return -1;
    }
    if (a_analysis.importance === "Low" && b_analysis.importance === "High"){
      return 1;
    }

    return 0;
  });

  const count_emails = emails.filter((email) => {
    return analyzeEmail(email).importance === "High";
  }).length;


  return (
    <div style={{padding: "30px", fontFamily: "Arial"}}>
      <h1>InboxIQ</h1>
      <p>Check these emails out right now!!</p>

      <div
        style={{
          backgroundColor: "#f5f5f521",
          marginTop: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
          fontSize: "18px",
          color: "#ddd"
        }}
      >
        {count_emails} important emails found
      </div>

      <div style={{marginTop:"20px", marginBottom: "20px"}}>
        <button onClick={()=>setFilter("All")}>All</button>
        <button
          onClick={() => setFilter("High")}
          style={{marginLeft: "10px"}}
        >High</button>
        <button
          onClick={() => setFilter("Low")}
          style={{marginLeft: "10px"}}
        >Low</button>
      </div>

      {sortedEmails.map((email, index) => (
        <EmailCard key={index} email={email}/>
      ))}
    </div>
  );
}

export default App;