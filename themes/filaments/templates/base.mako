<!DOCTYPE html>
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
      <a href="/" class="home-link"><h1>Filaments.</h1></a>
      <a href="thoughts">Thoughts</a>
      <a href="inbox">Inbox</a>
      <a href="references">References</a>
    </nav>
    <article class="note-wide">
      <%block name="content" />
    </article>
  </body>
</html>
