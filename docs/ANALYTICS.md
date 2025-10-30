# Analytics Event Map

Events fire through `window.gajoTrack`, forwarding payloads to Google Tag (`gtag`) and Meta Pixel (`fbq`) when the respective IDs are provided.

| Area | Event | Payload | Notes |
| --- | --- | --- | --- |
| Global | `PageView` (automatic via pixels) | — | Fired when the external libraries initialize. |
| Global | `ScrollDepth` | `{ depth: 25 | 50 | 75 }` | Implement via your analytics platform if desired. |
| Navigation | `cta_click_nav` | `{}` | Fired when the nav CTA is clicked (desktop + mobile). |
| Hero | `cta_click_primary` | `{}` | Primary CTA button. |
| Hero | `cta_click_secondary` | `{}` | Secondary CTA button. |
| Timeline | `timeline_phase_cta` | `{ phase }` | Triggered when phase CTA links are used. |
| Scoreboard | `scoreboard_open_details` | `{}` | When the detail toggle opens. |
| Pricing Calculator | `calc_tab_change` | `{ metric }` | Metric slug for the selected tab. |
| Pricing Calculator | `calc_value_change` | `{ value }` | Slider value on change. |
| Pricing Calculator | `calc_example_copy` | `{}` | Copy to clipboard action. |
| Consent | `consent_accept` | `{}` | User accepted tracking. |
| Consent | `consent_decline` | `{}` | User declined tracking. |
| Consent | `consent_manage` | `{}` | Manage link clicked. |
| Lead Form | `lead_step_view` | `{ step }` | Step ID when form appears. |
| Lead Form | `lead_submit` | `{}` | When the final submission occurs. |
| Lead Form | `lead_success` | `{}` | Successful webhook response. |
| Lead Form | `lead_error` | `{}` | Failed submission attempt. |

## Extending Events

Add new events by invoking `window.gajoTrack('<event-name>', { ...payload })` from client components. The helper forwards the event to both analytics providers when available.
