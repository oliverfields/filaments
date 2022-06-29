<%inherit file="base.mako"/>

<%block name="content">
	<h1>${page.title}</h1>

	<%include file="article-meta.mako" args="**context.kwargs" />

	<div id="article-content">
	${page.html}
	</div><!-- /article-content -->

	<ul class="directory-list">
	% for c in sorted(page.children, key=lambda i: i.url_path, reverse=True):
		<li><a href="${c.url_path}">${c.title}</a></li>
	% endfor
	</ul>
</%block>

