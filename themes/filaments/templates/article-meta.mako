<div class="article-meta">
% if page.headers['tags']:
	<div>
	<a class="article-meta-title" href="/${site.tag_dir}">Tagged</a>
	% for t in page.headers['tags']:
		<a href="/${site.tag_dir}/${t}">${t}</a>${'' if loop.last else ', '}
	% endfor
	</div>
% endif
% if page.headers['categories']:
	<div>
	<a class="article-meta-title" href="${site.category_dir}">Categorized</a>
	% for c in page.headers['categories']:
		<a href="/${site.category_dir}/${c}">${c}</a>${'' if loop.last else ', '}
	% endfor
	</div>
% endif
% if 'author' in page.custom_headers:
	<div><span class="article-meta-title">Author</span> ${page.custom_headers['author']}</div>
% endif
% if 'published' in page.custom_headers:
	<div><span class="article-meta-title">Published</span> ${page.custom_headers['published']}</div>
% endif
% if 'publisher' in page.custom_headers:
	<div><span class="article-meta-title">Publisher</span> ${page.custom_headers['publisher']}</div>
% endif
% if 'format' in page.custom_headers:
	<div><span class="article-meta-title">Format</span> ${page.custom_headers['format']}</div>
% endif
% if 'accessed' in page.custom_headers:
	<div><span class="article-meta-title">Accessed</span> ${page.custom_headers['accessed']}</div>
% endif
% if 'url' in page.custom_headers:
	<div><span class="article-meta-title">URL</span> <a href="${page.custom_headers['url']}">${page.custom_headers['url']}</a></div>
% endif
% if 'page' in page.custom_headers:
	<div><span class="article-meta-title">Page</span> ${page.custom_headers['page']}</div>
% endif
</div><!-- /article-meta -->
