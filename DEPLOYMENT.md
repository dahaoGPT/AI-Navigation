# Deployment and AdSense Checklist

This project is moving from a simple AI tools directory toward a content-first AI tools guide. Before applying for Google AdSense or deploying to production, review the checklist below.

## Required Environment Variables

Copy `.env.example` to your deployment provider and fill in real values there. Do not commit production secrets.

- `NEXT_PUBLIC_SITE_URL`: the public domain, for example `https://example.com`.
- `NOTION_KEY`: optional Notion integration token for the remote tools database.
- `NOTION_PAGE_ID`: optional Notion database id.
- `GOOGLE_ADSENSE_PUBLISHER_ID`: your AdSense publisher id, for example `pub-0000000000000000`.
- `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT`: your AdSense client id, for example `ca-pub-0000000000000000`.

## Security

- Rotate the old Notion token if it was ever exposed in git history or shared logs.
- Keep `.env` and `.env.local` out of git.
- Use `.env.example` only for placeholder values.
- Do not paste private company data, user data, or paid customer material into third-party AI tools unless their terms and your local policy allow it.

## AdSense Readiness

- Keep About, Contact, Privacy Policy, Terms, Disclaimer, and Advertising pages reachable from the footer.
- Add enough original content before applying. A safer starting point is at least 30-50 useful pages across tool guides, comparisons, and practical tutorials.
- Do not place ads where they can be mistaken for navigation, download buttons, tool cards, or system messages.
- Keep ads visually separate from editorial content.
- Configure `GOOGLE_ADSENSE_PUBLISHER_ID` before relying on `/ads.txt`. Without it, `/ads.txt` intentionally returns 404 to avoid publishing a fake publisher id.

## Content Quality

- Each tool page should explain who the tool is for, what it is good at, where it is limited, and what to verify before paying or using it commercially.
- Each guide should include concrete steps, warnings, and practical examples.
- Each comparison should end with a clear recommendation for different user types.
- Review prices and product features regularly because AI tools change quickly.
