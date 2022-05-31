<%inherit file="base.mako"/>
<%block name="content">
	<h1>${page.title}</h1>

	<%include file="article-meta.mako" args="**context.kwargs" />

	<blockquote>
		${page.html}
	</blockquote>

</%block>
