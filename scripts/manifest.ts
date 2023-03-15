var manifest = {
	"name": "Orange It Up!",
	"description": "This extension is created for changing the background color of the page orange.",
	"version": "1.0.0.0",
	"manifest_version": 3,
	"action": {
		// "default_icon": {
		// 	"16": "images/icon16.png",
		// 	"24": "images/icon24.png", 
		// 	"32": "images/icon32.png" 
		// },
		"default_title": "Click Me",
		"default_popup": "popup.html"
	},
	"key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq8UVEhcxsRYrElbGiOqgcPRVwxH3kcEv5cQv3I9Bc7v3h7BF0CZAsFRpMmLWWTPrD49jaEDaFHcMWOtXY+YyZOZM4heiGkUsfaDz4sl8i1OEdIMx90V6sCBVk0ZCiUbB3w9AtWzn0UyF2mAE2+uG3hHQOxSXEEFyx8hrRvNE1br8L78xNkzhxnuGbfopQUex3V/YYJw1W9y6oBeO3iTCE99Idak0SQgzNNNPOHUwY++cQIqWDFeIv3vNSp7vzTC7EncfWQX0fHR0Ap5UizNvrotO7/zu5Xwy7Nb1YvhzdegzxjNdZB2D/KBnMKTMfp0St5PXJoc2UxRvVxoaLw5eeQIDAQAB",
	"web_accessible_resources": [
		{
			"resources": [
				""
			],
			"matches": [
				"<all_urls>"
			]
		}
	],
	"declarative_net_request": {
		"rule_resources": [
			{
				"id": "ruleset_1",
				"enabled": true,
				"path": "rules.json"
			}
		]
	},
	"permissions": [
		"activeTab",
		"scripting",
		"contentSettings",
		"declarativeNetRequestWithHostAccess",
		"declarativeNetRequestFeedback",
		"declarativeNetRequest",
		"unlimitedStorage",
		"storage",
		"tabs",
		"cookies"
	],
	"host_permissions": [
		"<all_urls>"
	],
	"background": {
		"service_worker": "background.js",
		// "persistent": true,
		// "scripts": ["background.js", "plugins\\popup.ts"]
	},
	"content_scripts": [
		{
			"matches": [
				"https://*/*",
				"http://*/*"
			],
			"js": [
				"background.js"
			]
		}
	],
	"content_security_policy": {
		// "extension_pages": "script-src 'self' 'unsafe-eval'; object-src 'self'; script-src-elem 'self' 'unsafe-inline' https://pyscript.net;"
		// "extension_pages": "script-src 'self' https://pyscript.net; object-src 'self'"
	}
	// "content_security_policy": "script-src 'self' https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest 'unsafe-eval'; object-src 'self'"
}
// const fs = require('fs');
import fs from "fs"
const path = require('path');
const tools = require('./tools');

// const dirPath = path.resolve(__dirname, `../src`);
// const dirPath = path.resolve(__dirname, `../src`);
function addResources(dirPath: string) {
	let resources = [] as string[]
	tools.readDirAll(dirPath, (file: string) => {
		if (file.match(/(\.js|\.ts)$/)) {
			resources.push(path.relative(dirPath, file))
		}
	});
	manifest.web_accessible_resources[0].resources = resources
	// manifest.content_scripts[0].js = resources
}

async function setVersion() {
	let now = (new Date().toLocaleString().match(/(\d+)\/(\d+)\/(\d+)/) as string[]).slice(1)
	let filename = __dirname + "/version"
	if (!fs.existsSync(filename)) {
		fs.writeFile(filename, '0', () => { });
		now.push('0');
	}
	else {
		let lastVersion = Number(fs.readFileSync(filename, 'utf-8'))
		let flag = await new Promise<boolean>((resolve, reject) => {
			fs.stat(filename, (err, stats) => {
				if (err) {
					resolve(false);
				}
				let mtime = stats.mtime.toLocaleString().match(/(\d+)\/(\d+)\/(\d+)/)?.slice(1);
				if (mtime && JSON.stringify(mtime) == JSON.stringify(now)) {
					resolve(true);
				} else
					resolve(false);
			})
		})
		let v = (flag) ? `${lastVersion + 1}` : '0'
		now.push(v)
		fs.writeFile(filename, v, () => { });
	}
	
	manifest.version = now.join('.')
	console.log("version:", manifest.version)

	return
}


async function execute(argvs: string[]) {
	for (let argv of argvs) {
		let dir = __dirname + `/../${argv}`;
		await setVersion();
		addResources(dir);
		const content = JSON.stringify(manifest, null, 4);
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true })
		}
		fs.writeFile(dir + '/manifest.json', content, err => {
			if (err) {
				console.error("manifest.json", err);
			}
		});
	}
}
console.log(process.argv.slice(2))
execute(process.argv.slice(2));

// const fs = require("fs");
// Then use the following lines:



// fs.readFile("demo.txt", (err, data) => {
// 	if (err) throw err;

// 	console.log(data.toString());
// });



// https://www.plasmo.com/blog/posts/how-to-create-a-consistent-id-for-your-chrome-extension
// nckcenejbjniakpigmdbnoajidibdgbg

// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq8UVEhcxsRYrElbGiOqgcPRVwxH3kcEv5cQv3I9Bc7v3h7BF0CZAsFRpMmLWWTPrD49jaEDaFHcMWOtXY+YyZOZM4heiGkUsfaDz4sl8i1OEdIMx90V6sCBVk0ZCiUbB3w9AtWzn0UyF2mAE2+uG3hHQOxSXEEFyx8hrRvNE1br8L78xNkzhxnuGbfopQUex3V/YYJw1W9y6oBeO3iTCE99Idak0SQgzNNNPOHUwY++cQIqWDFeIv3vNSp7vzTC7EncfWQX0fHR0Ap5UizNvrotO7/zu5Xwy7Nb1YvhzdegzxjNdZB2D/KBnMKTMfp0St5PXJoc2UxRvVxoaLw5eeQIDAQAB

// -----BEGIN PRIVATE KEY-----
// MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCrxRUSFzGxFisS
// VsaI6qBw9FXDEfeRwS/lxC/cj0Fzu/eHsEXQJkCwVGkyYtZZM+sPj2NoQNoUdwxY
// 61dj5jJk5kziF6IaRSx9oPPiyXyLU4R0gzH3RXqwIFWTRkKJRsHfD0C1bOfRTIXa
// YATb64beEdA7FJcQQXLHyGtG80TVuvwvvzE2TOHGe4Zt+ilBR7HdX9hgnDVb3Lqg
// F47eJMIT30h1qTRJCDM00084dTBj75xAipYMV4i/e81Knu/NMLsSdx9ZBfR8dHQC
// nlSLM2+ui07v/O7lfDLs1vVi+HN16DPGM11kHYP8oGcwpMx+nRK3k9cmhzZTFG9X
// GhovDl55AgMBAAECggEAJNxLaAEtsvaSoiIYgze0W+D3CYAwzCi0nl4yNibQ0ST4
// WrgnVyJqVdybYYpnvKdBTWrEFpJ6KhOdBPTl4UR8Mn5gZ9FSAkivYjs4swVxclWn
// Eji4L3vLtwGNU6grbZmPT46OoJBBE/9TpxfdWxNJMx0H/jGuNDkTSE+YQ9a/Ag0+
// 5dFq6avEW5Mtyx807c/n6eF/l1b/sSZHTT6C4fqtzGLQhO08i1i7WaSKypiNkr39
// FHHKvntyLVyZv1+JKKjocBJ3JO7xDiyLtBTUyPW4Ogi0FA6imUwcHF6pqyyU1PPS
// blNJLp0h14txBEhfGxkK4yoDoujBDBveh5z3WLfs3QKBgQDcZ3y6gidE8ur+4eaD
// lAWA38dXluAPCBlL1rMRNpgLTtxefPEUJxcTvoCVm8HK8FujQk1eqFWiZbr0bpRy
// c0a74KW1KtjL9uxExWGdWyddUZLXR1aSSxEp2FpJTHZxfA0/FsVCcYVI1v5fImse
// uigRxY1IvM4fY8PV0cxpoE8kNQKBgQDHgtQLsl+Y4RkDGjx7+nNd4yA4JLvadILF
// zOLnETYeODg1gRzn7zShCWiS/geRUJ5NKgmW9/0HFAbhZ/9SVsSvD8MmHzGkFI3l
// 3H45tdZ9Akfji/eoQopIRFeAWE53X9/yDDg4X9Qh/x/OrRoDL0qRkVIBj5dn8vF6
// cbsgNLFRtQKBgANGjnX/JTJDIfbzyIdAFezaZo4Isf/HMQkNgc/JrezNGT1WQgb4
// pcEnXaXbkL/BXrtIavnzKoKlXGfxlMc2q2BzcEMHBf3SB6TmAhNinW0nnzUP3FuE
// PhcPHhhkyIXbQB8l6XyZT0/L0i/7xPfJ8HqDIxxnofCZfPmaip0vQr3ZAoGBAMBz
// kPwfelvMdwYpHsMxGmwslX3S4WqfDS6krxPZ5GxOKtphy3JnqkrU+o0ggkhIjgs9
// S7bXTLqxNNnmKcJRdLSx7bsuSAJQ2Xgrs48Tuu0ncBUthR5H4YBIfGePx1EbqLih
// 1PF8bvLEWPhSvk7oJXQ5y/M5ggGBtjI41xr/+TQpAoGBAMf/LFu2KM+DftGZRdCp
// gykYsMAJWFkf+yhCCUZNiE8cdpL+E34uImy/HombKiI9HRH0jV7i7d5odv4U1XWe
// WU21xJhyYy4YuFSsQj18bFsjHP4KbjuWF7YWNV38Hg5NT0WSQ7V4OjOaggypmogi
// 1/B69RBRLjjxqvp6Lz7/neQT
// -----END PRIVATE KEY-----
