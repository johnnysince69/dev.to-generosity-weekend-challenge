# Aura: The Transparent Voice of Generosity

Aura is a decentralized platform that amplifies charitable causes through AI-enhanced storytelling, accessible audio, transparent blockchain micro-donations, and open data analytics. Built for the DEV Weekend Challenge: Generosity Edition.

## Tech Stack & Integrations

- **Google AI (Gemini):** Expands raw campaign notes into compelling, multi-lingual stories.
- **ElevenLabs:** Generates high-quality, emotional audio voiceovers to make campaigns accessible.
- **Solana:** Powers near-instant, transparent blockchain micro-donations (USDC/SOL).
- **Snowflake:** Aggregates transparent analytics and global generosity trends.
- **Next.js & Tailwind CSS:** Frontend application framework.

*Note: For the scope of this hackathon, external services are simulated via mock API interfaces in `src/lib/mocks`.*

## Detailed Workflow (How to use Aura)

Whether you are here to raise funds or to support a cause, Aura makes the process seamless and transparent. Here is how you can use the app:

### 1. Creating a Campaign (For Organizers)
Have a cause you care about but struggle to tell the story?
- Click on **"Start a Campaign"** from the home page.
- Enter a title and some rough notes or bullet points about your cause.
- Click **"Generate Story with Gemini"**. The AI will transform your rough notes into a compelling, empathetic story.
- Click **"Generate Audio with ElevenLabs"** to create a high-quality voiceover of your story, making your campaign accessible to everyone.
- Click **"Publish Campaign"** to make it live!

### 2. Donating to a Cause (For Donors)
Want to support a campaign transparently?
- Browse the featured campaigns on the home page and click **"View details"**.
- Read the AI-generated story or listen to the audio voiceover.
- Enter the amount you wish to donate in USDC on the right side of the page.
- Click **"Donate with Solana"**. This triggers a fast, low-fee blockchain transaction, ensuring your money goes directly to the cause.

### 3. Tracking Impact (For Everyone)
Wondering how your generosity adds up globally?
- Click on **"View Analytics"** or navigate to the **Transparency Dashboard**.
- Here, you can view global metrics powered by Snowflake. You'll see total global donations, active campaigns, top categories, and monthly trends. All data is aggregated anonymously from the Solana blockchain to ensure absolute transparency.

## Local Development Setup

If you want to run this project locally on your machine, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies:
   \`npm install\`
3. Run the development server:
   \`npm run dev\`
4. Open your web browser and go to http://localhost:3000 to see the app running.
