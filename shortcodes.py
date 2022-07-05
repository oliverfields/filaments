def figure(site, page, caption, alternative_text, src_path):

    html = '<figure>\n'
    html += '<img src="' + src_path + '" alt="' + alternative_text + '">\n'
    html += '<figcaption>' + caption + '</figcaption>\n'
    html += '</figure>\n'

    return html
