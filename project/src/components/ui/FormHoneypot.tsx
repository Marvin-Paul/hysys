/** Hidden honeypot field — bots that fill it are silently rejected on submit. */
export function FormHoneypot() {
  return (
    <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
      <label htmlFor="company-website">Company website</label>
      <input id="company-website" type="text" name="website_url" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
