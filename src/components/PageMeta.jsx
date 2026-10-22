// A page's <title> and meta description. React 19 moves these into <head>
// wherever they're rendered, and swaps them as the visitor moves between
// pages. `noindex` keeps a page (login, admin, ...) out of search results.
const PageMeta = ({ title, description, noindex = false }) => (
  <>
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
    {noindex && <meta name="robots" content="noindex" />}
  </>
);

export default PageMeta;
