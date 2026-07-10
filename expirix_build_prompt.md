# Expirix — Build Prompt

Use this alongside the attached dashboard screenshot. The screenshot is the source of truth for layout, spacing, and component shapes — this document specifies the design rules, data logic, and interactions the image can't show.

## 1. What this product is

Expirix is a record-intelligence tool for compliance-heavy organizations (audit firms, manufacturing, enterprises) to track expiring business records — vendor contracts, licenses, certificates, insurance policies, inspection reports. The core promise: a manager should never discover a record has lapsed by accident. Every design and interaction decision should serve that promise — surfacing what's urgent fast, and staying quiet about what isn't.

## 2. Tech stack

Build as a React app (Vite) with Tailwind CSS. Use a component-per-widget structure (Sidebar, Topbar, MetricStrip, ExpiryTimeline, NeedsAttention, QuickActions, CategoryBreakdown). State can be local/mock for now — structure data through a single `records` array so it's trivial to swap in a real API or database later.

## 3. Design system

### Color — this is the most important rule in this brief
Color is a severity signal, not decoration. Do not apply the brand green to anything that isn't explicitly "brand" or "positive action."

- **Brand green** (`#12492f` / similar deep forest tone): reserved for the logo mark, primary buttons ("+ Add Record"), and the "Today" marker on the timeline. Nothing else.
- **Neutral graphite/slate**: the default state for everything else — sidebar nav (active state uses a subtle gray/dark background, not green), "Active"/"Up to Date" status, "Total Records," category bars, icons.
- **Amber** (`#c4821a` / similar): "Expiring Soon" only.
- **Red** (`#c9463a` / similar): "Expired" only.
- Before shipping any screen, audit it: if more than 2–3 elements are colored, something has drifted back to decoration. A calm screen should look calm; only real urgency should be loud.

### Typography
- Headings: a slightly editorial/serif display face (e.g. Fraunces) — gives it a "registry/filing" feel rather than generic SaaS.
- Body text: Inter.
- Dates, counts, and record IDs: a monospace face (e.g. IBM Plex Mono) — gives numeric data a precise, document-like weight.

### Spacing & shape
- Card radius: 16–18px. Generous internal padding (20–26px).
- Sidebar: grouped into "MENU" and "GENERAL" sections with an active-item left accent bar.
- Cards should feel breathy — don't add a card unless it earns its place; prefer fewer, larger widgets over many small ones.

## 4. Page structure (Dashboard)

1. **Sidebar** — logo + product name/tagline, nav (Dashboard, Records, Categories, Calendar, Analytics, Team / Settings, Help, Logout), a bottom card reserved for a product-relevant nudge (e.g. "3 records need action this week") — not a generic app-download CTA.
2. **Topbar** — search input with a keyboard shortcut hint, mail icon, notification bell (with unread dot), profile chip.
3. **Header** — page title + one-line subtitle summarizing state ("X records need attention today"), primary button ("+ Add Record") and secondary button ("Import Data").
4. **Metric strip** — Total Records, Expiring Soon, Expired Records, Active Records as four compact stat cards, each with a small icon, the count, and a one-line qualifier. Only Expiring Soon and Expired carry color.
5. **Expiry Timeline** — horizontal scrollable timeline with real calendar dates, a fixed "Today" marker, and dots colored by status (expired = red, expiring soon = amber, up to date = neutral). Left/right arrows page the visible window.
6. **Needs Attention** — list of only non-active records (expired + expiring soon), sorted most-urgent first, each row showing name, category, expiry date/relative time, and a status pill. "View All" link goes to the full Records page.
7. **Quick Actions** — a small set of shortcut cards (Add Record, Bulk Upload, Upcoming Renewals, Export Report) plus a "View Calendar" link.

## 5. Data model

```
Record {
  id: string
  name: string              // e.g. "Vendor Contract - ABC Corp"
  category: string          // Contract | Certificate | Inspection | Insurance | License
  expiryDate: Date
  status: computed          // see logic below, never stored directly
  createdAt: Date
  notes?: string
}
```

### Status computation (single source of truth — compute, don't hardcode)
```
daysRemaining = expiryDate - today

if daysRemaining < 0        → "Expired"
else if daysRemaining <= 30 → "Expiring Soon"
else                        → "Active" / "Up to Date"
```
Make the 30-day threshold a configurable constant, not a magic number, since different record types (e.g. licenses vs. insurance) may eventually need different lookahead windows.

## 6. Functional requirements

- **Search** (topbar): filters records by name/category in real time; should work from any page, not just Records.
- **Add Record**: modal/form with name, category (select), expiry date (date picker), optional notes. On submit, status is computed automatically — never let the user manually set status.
- **Import Data**: accepts a CSV with at least name/category/expiryDate columns; show a preview + validation step before committing (flag rows with unparseable dates rather than silently dropping them).
- **Timeline navigation**: arrows shift the visible date window; clicking a dot opens that record's detail view.
- **Needs Attention row click**: opens the record detail page (see below).
- **Quick Actions**: Add Record and Bulk Upload open their respective modals; Upcoming Renewals filters Records to the next-30-days view; Export Report generates a CSV/PDF summary of current status counts.
- **Empty states**: if there are zero expiring/expired records, the Needs Attention panel should say so plainly ("Nothing needs attention right now") rather than showing an empty list — this is a genuinely good state and the copy should read that way.

## 7. Record detail page (not shown in the wireframe, but implied by "Needs Attention" rows)
Each record should have its own page showing:
- Name, category, expiry date, status pill
- A "life remaining" visual — a horizontal bar or mini-timeline (reuse the same visual language as the dashboard's Expiry Timeline, just zoomed to one record) that fills/erodes as the expiry date approaches, colored by the same severity rule.
- Edit and delete actions
- Optional: renewal history if the record has been renewed before

## 8. Responsive behavior
- Below ~1024px: sidebar collapses to icon-only with a toggle; metric strip wraps to 2x2; timeline remains horizontally scrollable (it already is).
- Below ~640px: sidebar becomes an off-canvas drawer; Quick Actions stack full-width.

## 9. What to avoid
- Don't add decorative charts, progress rings, or gamified elements that aren't tied to expiry/urgency — every visual on this dashboard should answer "what needs attention" or "how much time is left," nothing else.
- Don't let brand green creep onto neutral/active states — this was a deliberate fix from an earlier design pass and is easy to regress on.
- Don't hardcode record status; always derive it from the expiry date so the dashboard stays accurate as time passes.
