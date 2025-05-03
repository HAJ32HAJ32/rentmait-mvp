# MVP Progressive To-Do List ✅

## ⚙️ Initial Setup
- [x] **1. Setup Next.js Project**
  - [x] **1.1** Install Next.js using Cursor.
  - [x] **1.2** Set up basic folder structure.

- [x] **2. Tailwind CSS Setup**
  - [x] **2.1** Install and configure Tailwind CSS.

- [x] **3. Install Shadcn UI**
  - [x] **3.1** Integrate Shadcn UI component library.

## Database Setup
- [x] **4. Set up Database**
  - [x] **4.1** Choose a database provider (Supabase/Firebase).
  - [x] **4.2** Create a new database project.

- [x] **5. Database Schema**
  - [x] **5.1** Define schema to store extracted contract text.
  - [x] **5.2** Define schema fields for key terms: start/end dates, break clauses, notice periods.

## 📤 File Handling & Parsing
- [x] **6. Frontend File Upload**
  - [x] **6.1** Add file upload UI component (PDF/DOC file selection).

- [x] **7. Backend File Upload Endpoint**
  - [x] **7.1** Create API endpoint to handle file uploads.
  - [x] **7.2** Implement file type validation and size limits.

- [x] **8. Extract Text from Uploaded Files**
  - [x] **8.1** Setup parsing tools (`pdf-parse` for PDFs, `mammoth` for DOC files).
  - [x] **8.2** Extract key terms (dates, break clauses).
  - [x] **8.3** Immediately delete original file after extraction.

- [x] **9. Store Extracted Text**
  - [x] **9.1** Save extracted text and key terms to database.

## 🤖 OpenAI Integration & Chatbot Backend
- [x] **10. OpenAI API Setup**
  - [x] **10.1** Securely store your OpenAI API key.

- [x] **11. Create OpenAI Prompt Endpoint**
  - [x] **11.1** Backend endpoint that queries database for relevant data.
  - [x] **11.2** Format and send prompt to OpenAI.
  - [x] **11.3** Return OpenAI response to frontend.

## 💬 Chatbot Frontend & Response Display
- [x] **12. Chatbot Interface**
  - [x] **12.1** Create chatbot UI to clearly show user inputs and AI responses.
  - [x] **12.2** Always include disclaimer with responses:
    > "_Responses provided are for informational purposes only and do not constitute legal advice._"

## ⚠️ Basic Error Handling
- [ ] **13. Frontend Error Messaging**
  - [ ] **13.1** Display clear message prompting user to retry if something goes wrong.

## 🎨 Landing Page & Content
- [ ] **14. Header & Footer**
  - [ ] **14.1** Add logo and simple navigation links (Header).
  - [ ] **14.2** Add contact info, legal/privacy links, social icons (Footer).

- [ ] **15. Hero Section**
  - [ ] **15.1** Add compelling hook statement.
  - [ ] **15.2** Clear CTA button to start uploading tenancy agreement.

- [ ] **16. How It Works Section**
  - [ ] **16.1** Clearly explain the process in three simple steps.

- [ ] **17. Social Proof**
  - [ ] **17.1** Placeholder area for testimonials/user quotes.

## 🚀 Deployment & Testing
- [ ] **18. Initial Deployment**
  - [ ] **18.1** Deploy MVP on Vercel.

- [ ] **19. Basic Testing**
  - [ ] **19.1** Upload dummy files.
  - [ ] **19.2** Ask test questions via chatbot to verify responses.

---

# 🗓️ Post-MVP (V2 tasks)
- [ ] **20. User Authentication**
  - [ ] **20.1** Implement user signup/login functionality.
  - [ ] **20.2** Allow users to manage document history.

- [ ] **21. Data Privacy & Retention**
  - [ ] **21.1** Allow user-initiated data deletion.
  - [ ] **21.2** Establish clear data retention policy.

- [ ] **22. User Feedback**
  - [ ] **22.1** Implement thumbs up/down for chatbot feedback.
  - [ ] **22.2** Capture and track user feedback in database.

- [ ] **23. Continuous Deployment (Optional)**
  - [ ] **23.1** Set up GitHub for continuous backups.
  - [ ] **23.2** Configure automatic deployment from GitHub to Vercel. 