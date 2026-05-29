# InboxIQ

InboxIQ is a full-stack email prioritization web app that connects with Gmail using Google OAuth2 and the Gmail API. It intelligently analyzes incoming emails and highlights important messages based on urgency-related keywords.

## Features

* Google OAuth2 authentication
* Gmail API integration
* Fetch and display real Gmail emails
* Intelligent email prioritization
* High / Low importance filtering
* Dark mode support
* Loading state handling
* Responsive modern UI

## Tech Stack

### Frontend

* React
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* Google Gmail API
* OAuth2 Authentication

## How It Works

1. User logs in with Google
2. OAuth2 authentication grants Gmail read access
3. Backend fetches recent Gmail messages
4. Emails are analyzed using keyword-based prioritization
5. Frontend displays sorted and categorized emails

## Important Email Detection

InboxIQ currently marks emails as high priority if they contain keywords such as:

* interview
* deadline
* application
* exam
* placement
* schedule

## Screenshots
### Log-In
<img src="https://github.com/ditto-1/InboxIQ/blob/main/Screenshot/sign-in.png" width="700"/>

### Light Mode
<img src="https://github.com/ditto-1/InboxIQ/blob/main/Screenshot/light-mode.png" width="700"/>

### Dark Mode
<img src="https://github.com/ditto-1/InboxIQ/blob/main/Screenshot/dark-mode.png" width="700"/>


## Installation

### Clone Repository

```bash
git clone https://github.com/ditto-1/InboxIQ.git
cd InboxIQ
```

### Install Root Dependencies

```bash
npm install
```

### Install Backend Dependencies

```bash
cd server
npm install
```

## Environment Variables

Create a `.env` file inside the `server` folder:

```env
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
```

## Running the Project

Return to the root directory:

```bash
cd ..
```

Then run:

```bash
npm run dev
```

## Google OAuth Setup

1. Create a project in Google Cloud Console
2. Enable Gmail API
3. Configure OAuth consent screen
4. Add authorized redirect URI:

```txt
http://localhost:3000/auth/google/callback
```

## Future Improvements

* AI-based email summarization
* Persistent user sessions
* Multi-account support
* Better email categorization
* Search functionality
* Mobile optimization
