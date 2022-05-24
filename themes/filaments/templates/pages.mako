<%inherit file="base.mako"/>
<%block name="content">
	% if page.headers['tags']:
		<div class="taxonomy">
		<h2>Tagged</h2>
		% for t in page.headers['tags']:
			<a href="/${site.tag_dir}/${t}">${t}</a>
		% endfor
		</div>
	% endif
	% if page.headers['categories']:
		<div class="taxonomy">
		<h2>Categorized</h2>
		% for c in page.headers['categories']:
			<a href="/${site.category_dir}/${c}">${c}</a>
		% endfor
		</div>
	% endif

	<h1>${page.title}</h1>

	% if page.toc:
		<ol id="toc">
		% for t in page.toc:
			% if t['level'] < 4:
				<li class="toc-h${t['level']}"><a href="#${t['id']}">${t['title']}</a></li>
			% endif
		% endfor
		</ol>
	% endif
	${page.html}
</%block>
