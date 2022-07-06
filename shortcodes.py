def figure(site, page, src_path, caption):

    html = '<figure>\n'
    html += '<img src="/media/' + src_path + '">\n'
    html += '<figcaption>' + caption + '</figcaption>\n'
    html += '</figure>\n'

    return html
