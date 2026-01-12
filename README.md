# AgriGuard 🌾

AgriGuard is an advanced AI-powered application designed to assist farmers and agricultural enthusiasts in diagnosing crop diseases, providing treatment recommendations, and offering general agricultural advice. With a focus on accessibility, it features multilingual support and a voice-activated assistant.

![AgriGuard Demo](./public/Screenshot%202026-01-13%20000036.png)


## 🚀 Features

- **🌱 AI Crop Diagnosis**: Upload a photo or take a picture of a crop to instantly identify diseases and receive treatment plans using Google's Gemini AI.
- **🗣️ Voice Assistant**: Hands-free interaction! Speak to the assistant to ask questions about farming, weather, or crop care. It replies with voice output in your preferred language.
- **🌍 Multilingual Support**: Fully localized interface and AI responses in multiple Indian languages (Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Bengali, Gujarati, Punjabi, Odia).
- **📱 Responsive Design**: Optimized for both desktop and mobile devices, ensuring farmers can use it in the field.
- **⚡ Fast & Efficient**: Built with Next.js for high performance and SEO optimization.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **AI Integration**: [Google Gemini API](https://ai.google.dev/) (gemini-flash-latest)
- **State Management**: React Hooks & Context API
- **Icons**: [Lucide React](https://lucide.dev/)
- **Speech**: Web Speech API (Speech Recognition & Synthesis)

## 🏁 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google Gemini API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Soumen-dev-ux/Agrigaurd.git
    cd agrigaurd
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add your Gemini API Key:
    ```env
    GEMINI_API_KEY=your_actual_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the app:**
    Visit `http://localhost:3000` in your browser.

## 📖 Usage

1.  **Diagnosis**:
    *   Click on "Upload Image" or use the Camera icon.
    *   (Optional) Add a text description of the problem.
    *   Click "Analyze" to get a detailed diagnosis and cure.
2.  **Voice Assistant**:
    *   Click the microphone icon in the bottom right corner.
    *   Grant microphone permissions.
    *   Speak your query (e.g., "How do I grow tomatoes?").
    *   The assistant will respond with text and voice.
3.  **Change Language**:
    *   Use the language selector in the header to switch the entire app interface and AI responses to your local language.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 👨‍💻 Developer

Created and Maintained by **Soumen Pore**.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.