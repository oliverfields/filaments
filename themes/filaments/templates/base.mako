<%! from datetime import datetime %><!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.title}</title>
    <base href="${site.base_url}" />
    <meta name="Generator" content="Pagegen" />
    <link rel="shortcut icon" href="${site.base_url}/assets/theme/images/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="${site.base_url}/assets/theme/css/site.css" type="text/css" />
  </head>
  <body>
    <nav class="note-wide">
      <a href="/" class="home-link-large">Filaments.</a>
      <a href="/" class="home-link-small">F.</a>
      <a href="/thoughts" title="Thoughts">💭</a>
      <a href="/journaling" title="Journaling">✍️</a>
      <a href="/divination" title="Divination">🔮</a>
      <a href="/inbox" title="Inbox">📭</a>
      <a href="/references" title="References">📚</a>
    </nav>
    % if len(page.crumb_trail) > 2:
      <ol id="crumb-trail">
        % for p in page.crumb_trail:
          % if not loop.first and not loop.last:
            <li><a href="${p.url_path}">${p.title}</a></li>
          % endif
        % endfor
      </ol>
    % endif
    <article class="note-wide">
      <%block name="content" />
    </article>
    <footer>Build ${datetime.now().strftime('%Y-%m-%d %H:%M')} UTC</footer>
    <script>
function addSearchForm() {
  // Site search
  search_query_text = '';
  query_string = window.location.search.substring(1).split('&');
  for (let i = 0; i < query_string.length; i++) {
    let key_value = query_string[i].split('=');
    if(key_value[0] == 'q') {
      search_query_text = key_value[1];
      break;
    }
  }

  const nav = document.getElementsByTagName('nav')[0];

  const form = document.createElement('form');
  form.setAttribute('action', '/search');
  form.setAttribute('method', 'GET');

  const query_field = document.createElement('input');
  query_field.setAttribute('type', 'text');
  query_field.setAttribute('name', 'q');
  query_field.setAttribute('id', 'search-query');
  query_field.setAttribute('value', search_query_text);

  const submit_query = document.createElement('input');
  submit_query.setAttribute('type', 'submit');
  submit_query.setAttribute('value', '🔍');
  submit_query.setAttribute('id', 'search-button');

  form.appendChild(query_field);
  form.appendChild(submit_query);

  nav.appendChild(form);
}
addSearchForm();


function copyLinkMarkdownIcon(linkText, linkUrl) {
  let copyIcon = document.createElement("img");
  copyIcon.setAttribute("src", "/assets/theme/images/markdown-logo.svg");
  copyIcon.setAttribute("style", "cursor: pointer; opacity: .7;");
  copyIcon.setAttribute("width", "16");
  copyIcon.setAttribute("height", "16");
  copyIcon.setAttribute("alt", "Copy");
  copyIcon.addEventListener('click', function() {
    navigator.clipboard.writeText("[" + linkText + "](" + linkUrl + ")");
  });
  return copyIcon;
}

function addCopyLinkAsMarkdown(element) {
  // Add an icon to copy link as Markdown syntax to all links found in the element

  if (element === null) {
    return;
  }

  let links = element.getElementsByTagName("A");
  Array.prototype.slice.call(links).forEach(l => {
    l.parentNode.insertBefore(copyLinkMarkdownIcon(l.innerHTML, l.href), l.nextSibling)
  });
}
addCopyLinkAsMarkdown(document.getElementById("article-content"));

function addCopyLinkToFirstH1(){
  let h1s = document.getElementsByTagName("H1");

  if (h1s.length > 0) {
    //h1s[0].parentNode.insertBefore(copyLinkMarkdownIcon(h1s[0].innerHTML, window.location.href), h1s[0].nextSibling);
    h1s[0].append(copyLinkMarkdownIcon(h1s[0].innerHTML, window.location.href));
  }
}
addCopyLinkToFirstH1();

    </script>
  </body>
</html>
