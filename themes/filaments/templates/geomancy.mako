<%inherit file="base.mako"/>
<%block name="content">
	<h1>${page.title}</h1>
	<%include file="article-meta.mako" args="**context.kwargs" />

	${page.html}
	<script>alert("hola");</script>
</%block>
