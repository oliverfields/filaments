<%inherit file="base.mako"/>

<%block name="content">
	<h1>${page.title}</h1>

	<h2>Categories</h2>
	<ul>
	% for key, c in site.categories.items():
		<li><a href="${c['url']}">${c['name']}</a></li>
	% endfor
	</ul>

	${page.html}
</%block>

