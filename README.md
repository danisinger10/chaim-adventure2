# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Build for Production

To create a production build, run:
   `npm run build`

This outputs a bundled version of your app in the `dist/` directory. Serve the contents of `dist/` instead of relying on import maps. The bundled build avoids mobile fetch and streaming incompatibilities.
