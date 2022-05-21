# Filaments

Site content in Dropbox, on update Dropbox webhook triggers build script for site deployment. 

## Deployment setup

1. Copy scripts/dropbox-webhook.cgi to www
2. Create virtual environment:
	$ mkdir venv
	$ virtualenv venv
	$ pip install pagegen
3. Setup htpasswd
4. Create build.conf, see build.conf_example


## Dropbox setup

1. Open Dropbox App console
2. Create App
3. Scoped app
4. Add webhook URL (to dropbox-webhook.cgi)
5. Add App secret to build.conf
6. Click Generate access token


# Notes

Inbox -> Freeform notes that need processing

Referneces -> List of stuff where I have found thoughts worth keeping
	<author-yyyy,domain-yyyymmdd,source> 1..N

Thoughts -> Thoughts in own words, linked, tagged, referenced and categoriesd
	Filaments
		<yyyymmdd-string> note1..N
	Ambulate
	Løsningsansvarlig
		<yyyymmdd-string> note1..N
	Know thyself/The great work
		<yyyymmdd-string> note1..N


Note template:
	Title: (string)
	Tags: (one or more)
	Categories: (optional)
	References: (one or more, to both thoughts and references)

	Single thought written in own words

Filaments authorative source is dropbox, filaments.phnd.net updates on webhook from Dropbox
