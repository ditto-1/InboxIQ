function EmailCard({email}){
    const getBadgeColor = (importance) => {
    if (importance === "High"){
      return "#a82929";
    }
    return "#5d9c26";
  };

  const isUrgent = email.importance ==="High";

  return (
    <div
        className="rounded-2xl mb-6 border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
      >
        <h2>{email.subject}</h2>
        <p>From: {email.sender}</p>
        <p>{email.snippet}</p>
        <div
          style={{
            backgroundColor: getBadgeColor(email.importance),
            color: "white",
            display: "inline-block",
            padding: "6px 12px",
            borderRadius: "20px",
            marginTop: "10px"
          }}
        >
          {email.importance}
        </div>
        {isUrgent ? (
            <p style={{color: "red"}}>
                This email needs attention soon.
            </p>
        ): (
            <p style={{color: "green"}}>
                This email is not urgent.
            </p>
        )}
        <p>Action: {email.action}</p>
      </div>
  );
}

export default EmailCard;