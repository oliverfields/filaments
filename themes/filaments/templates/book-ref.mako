<%inherit file="base.mako"/>

<%block name="content">
	<h1>${page.title}</h1>

	<%include file="article-meta.mako" args="**context.kwargs" />

	${page.html}

	<ul class="directory-list">
	% for c in sorted(page.children, key=lambda i: i.custom_headers['page']):
		<li><a href="${c.url_path}">${c.title}, p${c.custom_headers['page']}</a></li>
	% endfor
	</ul>
</%block>

