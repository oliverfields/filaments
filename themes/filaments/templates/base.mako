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
    <div class="prev-next-links">
      % if page.previous_page:
      <div id="previous-link"><a href="${page.previous_page.url_path}">&#9664; ${page.previous_page.title}</a></div>
      % endif
      % if page.next_page:
      <div id="next-link"><a href="${page.next_page.url_path}">${page.next_page.title} &#9654;</a></div>
      % endif
    </div><!-- /prev-next-links -->
    <footer>Build ${datetime.now().strftime('%Y-%m-%d %H:%M')} UTC</footer>
    <script>
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
    </script>
  </body>
</html>
