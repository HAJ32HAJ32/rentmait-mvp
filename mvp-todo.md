# MVP Progressive To-Do List ✅

## ⚙️ Initial Setup
- [x] **1. Setup Next.js Project**
  - [x] **1.1** Install Next.js using Cursor.
  - [x] **1.2** Set up basic folder structure.

- [x] **2. Tailwind CSS Setup**
  - [x] **2.1** Install and configure Tailwind CSS.

- [x] **3. Install Shadcn UI**
  - [x] **3.1** Integrate Shadcn UI component library.

## �� Database Setup
- [x] **4. Set up Database**
  - [x] **4.1** Choose a database provider (Supabase/Firebase).
  - [x] **4.2** Create a new database project.

- [ ] **5. Database Schema**
  - [ ] **5.1** Define schema to store extracted contract text.
  - [ ] **5.2** Define schema fields for key terms: start/end dates, break clauses, notice periods.

## 📤 File Handling & Parsing
- [ ] **6. Frontend File Upload**
  - [ ] **6.1** Add file upload UI component (PDF/DOC file selection).

- [ ] **7. Backend File Upload Endpoint**
  - [ ] **7.1** Create backend API to receive uploaded files.

- [ ] **8. Extract Text from Uploaded Files**
  - [ ] **8.1** Setup parsing tools (`pdf-parse` for PDFs, `mammoth` for DOC files).
  - [ ] **8.2** Extract key terms (dates, break clauses).
  - [ ] **8.3** Immediately delete original file after extraction.

- [ ] **9. Store Extracted Text**
  - [ ] **9.1** Save extracted text and key terms to database.

## 🤖 OpenAI Integration & Chatbot Backend
- [ ] **10. OpenAI API Setup**
  - [ ] **10.1** Securely store your OpenAI API key.

- [ ] **11. Create OpenAI Prompt Endpoint**
  - [ ] **11.1** Backend endpoint that queries database for relevant data.
  - [ ] **11.2** Format and send prompt to OpenAI.
  - [ ] **11.3** Return OpenAI response to frontend.

## 💬 Chatbot Frontend & Response Display
- [ ] **12. Chatbot Interface**
  - [ ] **12.1** Create chatbot UI to clearly show user inputs and AI responses.
  - [ ] **12.2** Always include disclaimer with responses:
    > "_Responses provided are for informational purposes only and do not constitute legal advice._"

- [ ] **13. Frontend to Backend Connection**
  - [ ] **13.1** Connect chatbot frontend to backend API.

## ⚠️ Basic Error Handling
- [ ] **14. Frontend Error Messaging**
  - [ ] **14.1** Display clear message prompting user to retry if something goes wrong.

## 🎨 Landing Page & Content
- [ ] **15. Header & Footer**
  - [ ] **15.1** Add logo and simple navigation links (Header).
  - [ ] **15.2** Add contact info, legal/privacy links, social icons (Footer).

- [ ] **16. Hero Section**
  - [ ] **16.1** Add compelling hook statement.
  - [ ] **16.2** Clear CTA button to start uploading tenancy agreement.

- [ ] **17. How It Works Section**
  - [ ] **17.1** Clearly explain the process in three simple steps.

- [ ] **18. Social Proof**
  - [ ] **18.1** Placeholder area for testimonials/user quotes.

## 🚀 Deployment & Testing
- [ ] **19. Initial Deployment**
  - [ ] **19.1** Deploy MVP on Vercel.

- [ ] **20. Basic Testing**
  - [ ] **20.1** Upload dummy files.
  - [ ] **20.2** Ask test questions via chatbot to verify responses.

---

# 🗓️ Post-MVP (V2 tasks)
- [ ] **21. User Authentication**
  - [ ] **21.1** Implement user signup/login functionality.
  - [ ] **21.2** Allow users to manage document history.

- [ ] **22. Data Privacy & Retention**
  - [ ] **22.1** Allow user-initiated data deletion.
  - [ ] **22.2** Establish clear data retention policy.

- [ ] **23. User Feedback**
  - [ ] **23.1** Implement thumbs up/down for chatbot feedback.
  - [ ] **23.2** Capture and track user feedback in database.

- [ ] **24. Continuous Deployment (Optional)**
  - [ ] **24.1** Set up GitHub for continuous backups.
  - [ ] **24.2** Configure automatic deployment from GitHub to Vercel. 