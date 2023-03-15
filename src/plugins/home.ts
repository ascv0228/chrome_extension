import tool from "../module/tools/tool"
import { M_Message } from "../structures/model";


document.addEventListener('DOMContentLoaded', function () {
    let GETButton = document.getElementById('GET');
    let POSTButton = document.getElementById('POST');
    let getCookieButton = document.getElementById('getCookie');
    let url: string;

    GETButton?.addEventListener('click', async function () {
        let urlText = (document.getElementById('urlText') as HTMLTextAreaElement).value;
        let requestText = (document.getElementById('requestText') as HTMLTextAreaElement).value;
        let reponse = await sendRequest("GET", urlText, requestText);
        let responseText = document.getElementById('responseText');
        responseText.setAttribute('style', 'white-space: pre;')
        // responseText.textContent =
        //     ['GET', urlText, requestText, reponse].map(x => `${x[0]} | `).join('\r\n');
        responseText.innerHTML =
            `<table border=border-collapse:collapse style="font-size:20px;"> <tr> <th>項目</th><th>資料</th></tr>`
            + [['method', 'GET'], ["url", urlText], ["request", requestText], ["reponse", reponse]]
                .map(x => `<tr><td>${x[0]}</td><td>${x[1]}</td></tr>`).join('') +
            `</table>`
    });

    POSTButton?.addEventListener('click', async function () {
        let urlText = (document.getElementById('urlText') as HTMLTextAreaElement).value;
        let requestText = (document.getElementById('requestText') as HTMLTextAreaElement).value;
        let reponse = await sendRequest("POST", urlText, requestText);
        let responseText = document.getElementById('responseText');
        responseText.setAttribute('style', 'white-space: pre;')
        responseText.innerHTML =
            `<table border=border-collapse:collapse style="font-size:20px;"> <tr> <th>項目</th><th>資料</th></tr>`
            + [['method', 'POST'], ["url", urlText], ["request", requestText], ["reponse", reponse]]
                .map(x => `<tr><td>${x[0]}</td><td>${x[1]}</td></tr>`).join('') +
            `</table>`
    });

    getCookieButton?.addEventListener('click', async function () {
        // location.href = '404.html';

    });




}, false);


async function sendRequest(method: string, url: string, params: string,) {
    // document.write("Sending request");
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open(method, url, true);
        req.setRequestHeader('Content-type', 'application/json')
        req.send(JSON.stringify(params));
        req.onload = function () {
            if (req.status == 200) {
                // resolve(JSON.parse(req.responseText))
                resolve(req.responseText)
            }
            else
                reject(req.responseText)
        }
    })
} 