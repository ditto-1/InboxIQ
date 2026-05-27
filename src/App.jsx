import { useEffect, useState } from "react";
import EmailCard from "./EmailCard";
function App(){
  const [filter, setFilter] = useState("All");
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=> {
    const fetchEmails = async()=> {
      try{
        const response = await fetch("http://localhost:3000/emails");
        const data = await response.json();
        console.log(data);
        setEmails(data);
      } catch(error){
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmails();

  }, []);
  
  const analyzeEmail = (email) => {
    const text = `${email.sender} ${email.subject} ${email.snippet}`.toLowerCase();
    if (
      text.includes("interview") ||
      text.includes("exam") || 
      text.includes("deadline") ||
      text.includes("application")||
      text.includes("schedule") ||
      text.includes("placement")
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold animate-pulse">
          Loading emails...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 dont-sans">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-gray-900">InboxIQ</h1>
        <p className="text-gray-600 mt-2 text-lg">Check these emails out right now!!</p>
      </div>

      <div
        className="mb-8 rounded-2xl bg-white p-3 shadow-sm border border-gray-200"
      >
      <h2 className="text-1xl font-semibold text-gray-900">{count_emails} important emails found </h2>
      </div>

      <div className="mb-6 flex gap-3">
        <button 
          onClick={()=>setFilter("All")}
          className={
            `rounded-full px-5 py-2 font-medium transition ${
              filter === "All" ? "bg-black text-white":
              "bg-white text-gray-700 border border-gray-300"
            }`
          }

        >All</button>
        <button
          onClick={() => setFilter("High")}
          className={
            `rounded-full px-5 py-2 font-medium transition ${
              filter === "High"?"bg-red-500 text-white":
              "bg-white text-gray-700 border-gray-300"
            }`
          }
        >High</button>
        <button
          onClick={() => setFilter("Low")}
          className={
            `rounded-full px-5 py-2 font-medium transition ${
              filter === "Low"?"bg-green-500 text-white":
              "bg-white text-gray-700 border-gray-300"
            }`
          }
        >Low</button>
      </div>

      {sortedEmails.map((email, index) => (
        <EmailCard key={index} email={email}/>
      ))}
    </div>
  );
}

export default App;