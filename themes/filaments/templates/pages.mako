<%inherit file="base.mako"/>
<%block name="content">
	<h1>${page.title}</h1>
	<%include file="article-meta.mako" args="**context.kwargs" />
	<div id="article-content">
	${page.html}
	</div><!-- /article-content -->
</%block>
