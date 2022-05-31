<%inherit file="base.mako"/>

<%block name="content">
	<h1>${page.title}</h1>
	${page.html}
	<ul class="directory-list">
	% for c in sorted(page.children, key=lambda i: i.url_path, reverse=True):
		<li>
		% if c.headers['template'] == 'web-ref.mako':
			<a href="${c.url_path}">${c.title}, ${c.custom_headers['author']}</a> <a href="${c.custom_headers['url']}">🕸️</a>
		% elif c.headers['template'] == 'book-ref.mako':
			<a href="${c.url_path}">${c.title}, ${c.custom_headers['author']}, ${c.custom_headers['published']}</a> 📗
		% else:
			${c.title} ??
		% endif
		</li>
	% endfor
	</ul>
</%block>

