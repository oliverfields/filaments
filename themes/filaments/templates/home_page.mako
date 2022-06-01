<%inherit file="base.mako"/>

<%block name="content">
	<h1>${page.title}</h1>

	<div class="sidebar">
	${page.html}
	</div><!-- /sidebar -->

	<ul>
	% for key, c in site.categories.items():
		<li><a href="${c['url']}">${c['name']}</a></li>
	% endfor
	</ul>
</%block>

