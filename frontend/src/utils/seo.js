/**
 * Lightweight SPA SEO utilities.
 * Updates document title and meta tags without external dependencies.
 */

export function setPageTitle(title) {
  document.title = title ? `${title} | LMS Dashboard` : "LMS Dashboard";
}

export function setPageMeta(name, content) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}

export function setPageDescription(desc) {
  setPageMeta("description", desc);
}

/**
 * Helper to set both title and description at once.
 */
export function setPageSEO({ title, description }) {
  if (title) setPageTitle(title);
  if (description) setPageDescription(description);
}
