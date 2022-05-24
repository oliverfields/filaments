<%inherit file="base.mako"/>
<%block name="content">
	<h1>${page.title}</h1>

	<div class="taxonomy">
	% if page.headers['tags']:
		<div>
		<a class="taxonomy-title" href="/${site.tag_dir}">Tagged</a>
		% for t in page.headers['tags']:
			<a href="/${site.tag_dir}/${t}">${t}</a>
		% endfor
		</div>
	% endif
	% if page.headers['categories']:
		<div>
		<a class="taxonomy-title" href="${site.category_dir}">Categorized</a>
		% for c in page.headers['categories']:
			<a href="/${site.category_dir}/${c}">${c}</a>
		% endfor
		</div>
	% endif
	</div>

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
