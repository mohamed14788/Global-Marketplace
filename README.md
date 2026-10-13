# Global-Marketplace
Hybrid e-commerce marketplace with affiliate engine (Amazon, Noon) and advanced ad system
## Production publish — what I added and next steps

I prepared the repository for a "final publish" flow. I cannot create Supabase or Stripe accounts or configure your hosting for you, but I've added the required CI/CD and server templates so you can publish safely and securely.

What I added in the feature branch `feature/integrations/supabase-stripe`:

- .github/workflows/deploy-gh-pages.yml — GitHub Actions workflow that builds the Vite app and deploys the `dist/` folder to GitHub Pages when this branch is pushed. This provides a fast way to publish a static frontend.

- api/create-checkout.ts — A Vercel serverless function template (TypeScript) that creates Stripe Checkout sessions using `STRIPE_SECRET_KEY`. Deploy this file to Vercel (or adapt for Netlify) and set the secret in the hosting environment.

- Updated README with deploy instructions and an `.env.example` (already present) showing required env vars.

What you need to do now (to finish publish):

1) Choose hosting strategy (pick one):
   - GitHub Pages (static frontend only). Good if you only need the frontend and Stripe checkout handled via a separate serverless deploy.
   - Vercel (recommended for frontend + serverless functions). Lets you deploy `api/create-checkout.ts` as a serverless function and set `STRIPE_SECRET_KEY` securely.
   - Netlify (similar to Vercel; adapt the `api/` function into Netlify Functions).

2) Create a Supabase project (if you haven't):
   - Create tables: products, orders, users (see README SQL snippet).
   - Enable Supabase Auth for customers and sellers.
   - Add Row Level Security (RLS) policies for safety.

3) Add repository secrets (or provider env vars):
   - VITE_SUPABASE_URL — your Supabase project URL
   - VITE_SUPABASE_ANON_KEY — anon/public key (used by the frontend)
   - STRIPE_PUBLIC_KEY — Stripe publishable key (set as VITE_STRIPE_PUBLIC_KEY in .env for local)
   - STRIPE_SECRET_KEY — Stripe secret key (store this in your serverless host environment, not in repo)

4) Deploy options:
   - GitHub Pages: push branch and the workflow will publish `dist/` to Pages. Visit your repo settings → Pages to enable the branch if needed.
   - Vercel: connect the repo in Vercel dashboard and enable automatic deploys from your branch. Add the environment variables in Vercel and Vercel will build and publish including serverless `api/` functions.

5) Domain and SSL:
   - Add your custom domain to Vercel or GitHub Pages and follow provider DNS steps. SSL is provisioned automatically by Vercel and GitHub Pages (via Let's Encrypt).

6) Production checklist I recommend before switching DNS:
   - Test Supabase reads/writes and auth flows locally (use test keys).
   - Test Stripe Checkout end-to-end using test keys and the `api/create-checkout` function.
   - Add order and payment server-side verification (webhooks) for final order fulfillment.
   - Set up monitoring/logging and backup policies for the database.

If you want, I can continue with any of these automated steps now:
- "Deploy to GitHub Pages now" — I will merge branch (after your confirmation) and push the branch to trigger the GitHub Actions deployment.
- "Deploy to Vercel" — I can prepare a Vercel-ready branch and help with env variable names; you'll still need to connect the repo in Vercel and add secrets.
- "Create PR and merge to main" — I will open a PR from `feature/integrations/supabase-stripe` into `main` and merge it once you confirm.

Which action do you want me to take now?
