# Deployment

## Vercel environment variables

Add these variables in the Vercel project settings under **Settings -> Environment Variables**, for the Production environment:

```env
GROQ_API_KEY=your_groq_key
GEMINI_API_KEY=your_gemini_key
YOUTUBE_API_KEY=your_youtube_data_api_key
# Optional alias accepted by NEXORA for the same YouTube Data API key
GOOGLE_API_KEY=your_youtube_data_api_key
```

Redeploy after adding or changing the variables. Server route handlers read them at runtime/build time; changing `.env.local` on the laptop does not update the hosted deployment.

`YOUTUBE_API_KEY` or `GOOGLE_API_KEY` must belong to a Google Cloud project with **YouTube Data API v3** enabled. A Gemini API key alone is not enough unless that same Google key also has YouTube Data API v3 enabled. Set only one of the two YouTube variable names, then redeploy.

The key is intentionally absent from GitHub. `.env.local` is ignored by Git, while `.env.example` documents the required names.
