# AI-Powered Chat Interface (Cognizant Technical Assessment)

A high-performance, responsive AI chat application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This project demonstrates clean architecture, custom hooks for state management, and secure API integration.

## 🚀 Key Features
- **AI Integration**: Powered by Google Gemini (v1 Stable) via server-side API routes.
- **Session Management**: Supports multiple chat sessions with dynamic titles.
- **Persistence (Bonus +10)**: Chat history is persisted using `localStorage`.
- **CRUD Operations**: Ability to create new chats, switch between sessions, and delete specific history items.
- **UX/UI**: 
  - Responsive Sidebar for desktop/mobile navigation.
  - Auto-scroll to latest messages.
  - Professional "ChatGPT-like" aesthetics using Tailwind CSS and Lucide icons.

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI SDK**: @google/generative-ai

## ⚙️ Local Setup & Submission Token
To run this project, you will need a Gemini API Key.

1. **Clone the repository**:
   ```bash
   git clone <your-repo-link>
   cd cognizant-ai-challenge
Install dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env.local file in the root directory and add your Gemini API Key:

Code snippet
GEMINI_API_KEY=your_api_key_here
Run the development server:

Bash
npm run dev
🏗️ Architecture Decisions
Custom Hook Layer: All chat logic (persistence, API calls, session switching) is encapsulated in useChat.ts to keep components pure and presentational.

Security: AI calls are proxied through Next.js Route Handlers to prevent exposing API keys in the client-side network tab.

Modular Components: Separation of concerns between ChatHistory, ChatInput, and MessageBubble.

Built with ❤️ by Ravi Sharma
