# HTML - Fetch

| [Home](./README.md) | [Vs Code](./002_vs-code.md) | [HTML Fetch](./006_html_fetch.md) | [Comandos Git](./004_git.md) | [Extensões Chrome](./003_extensoes_chrome.md) |

```html
<!DOCTYPE html>
<html lang="pt-br">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Fetch</title>
	</head>
	<body>
		<input type="button" class="bt" value="ok" />
		<script type="text/javascript">
			const ini = async () => {
				try {
					let headersList = {
						Accept: '*/*',
						'User-Agent':
							'Thunder Client (https://www.thunderclient.com)'
					};

					let bodyContent = new FormData();
					bodyContent.append('nome', 'mairolaz');
					bodyContent.append('idade', 45);

					let response = await fetch('http://localhost:88/json', {
						method: 'DELETE',
						body: bodyContent,
						headers: headersList
					});

					let data = await response.text();
					console.log(data);
				} catch (er) {
					console.error(er);
				}
			};
			const bt = document.querySelector('.bt');
			bt.addEventListener('click', ini);
		</script>
	</body>
</html>
```

| [Home](./README.md) | [Vs Code](./002_vs-code.md) | [HTML Fetch](./006_html_fetch.md) | [Comandos Git](./004_git.md) | [Extensões Chrome](./003_extensoes_chrome.md) |
