<%inherit file="base.mako"/>

<%block name="content">
	<ul>
	% for tag_name, tag in site.tags.items():
		<li><a href="${tag['url']}">${tag_name}</a></li>
	% endfor
	</ul>
</%block>

