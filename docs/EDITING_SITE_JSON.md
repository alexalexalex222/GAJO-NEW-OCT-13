# Editing `data/site.json`

1. Open [`data/site.json`](../data/site.json) in your editor.
2. Update copy values as needed. Keep quotation marks and commas in place — JSON syntax is strict.
3. For lists (e.g., `trust`, `deliverables`, `faq`), add or remove items by duplicating existing lines and adjusting the text.
4. To update pricing rates or calculator copy, edit the objects under `pricing.tabs` and the supporting labels in the same section.
5. When changing CTA targets, make sure the `href` values still match section IDs defined in the components (e.g., `#pricing`, `#lead`).
6. Save the file and restart the dev server if it is running so the new content reloads.
7. Run `npm run lint` or `npm run type-check` to validate the update before deploying.

If you break JSON formatting, the Next.js dev server will surface the error. Use a JSON formatter or validator to confirm structure when unsure.
