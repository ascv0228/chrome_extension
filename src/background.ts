
import tool from "./module/tools/tool"
import { M_Message } from "./structures/model";
// const {spawn} = require('child_process')
// import {spawn} from 'child_process';
// import tf from "@tensorflow/tfjs"



let client_white = [], client_black = [], public_white = [], public_black = [];

startExtension()

chrome.tabs?.onUpdated.addListener(function (tabId: number, changeInfo: object, tab: chrome.tabs.Tab) {
    let domain = tool.domainName(tab.url);
    if (!domain) return;
    console.log("domainName:", domain)
    if (client_white.includes(domain) && (!public_black.includes(domain))) { }
    else if (client_black.includes(domain) || public_black.includes(domain)) {
        let priority = client_black.includes(domain) ? 1 : 2;
        // console.log((priority == 1))
        chrome.declarativeNetRequest?.updateDynamicRules(
            {
                addRules: [{
                    "id": priority,
                    "priority": priority,
                    // "action": { "type": chrome.declarativeNetRequest.RuleActionType.BLOCK },
                    action: { type: chrome.declarativeNetRequest.RuleActionType.REDIRECT, redirect: { extensionPath: '/404.html' + `?url=${tab.url}` } },
                    "condition": {
                        "urlFilter": domain,
                        "resourceTypes": ([
                            'csp_report', 'font', 'image', 'main_frame', 'media', 'object', 'other', 'ping', 'script',
                            'stylesheet', 'sub_frame', 'webbundle', 'websocket', 'webtransport', 'xmlhttprequest'
                        ] as chrome.declarativeNetRequest.ResourceType[])
                    }
                }],
                removeRuleIds: [1],   // 一定要remove
            }, function () {
                console.log("block url:", tab.url);
                // chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
                //     tab = tabs[0]
                //     chrome.tabs.update(tab.id, { url: chrome.runtime.getURL("/404.html") });
                // });

            }
        )
    }
    else if (public_white.includes(domain)) {

    }
    else {
        // 進行預測
    }
})
// ERR_BLOCKED_BY_CLIENT
async function startExtension() {
    client_white.push(chrome.runtime.id);
    public_black.push(
        ...tool.stringArraySetHeader(await tool.readUrlLines("https://malware-filter.gitlab.io/malware-filter/phishing-filter.txt")).Data)

    console.log("public_black length:", public_black.length)
    console.log("public_black first:", public_black[0])
    console.log("public_black last:", public_black[public_black.length - 1])

    // tool.removeData("client_white") // 開始清除
    // tool.removeData("client_black") // 開始清除

    client_white = (await tool.readData("client_white"))["client_white"] || []
    client_black = (await tool.readData("client_black"))["client_black"] || []

    console.log("client_white", client_white)
    console.log("client_black", client_black)


}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(sender);
    let obj = JSON.parse(message.content) as M_Message
    if (!obj.type) return;
    switch (obj.type) {
        case "EditData":
            editData(obj);
            break;

        default:
            break;
    }

    // 無法取得回復
    sendResponse({ content: "來自事件腳本的回覆" });
    return true;
});

async function editData(obj: M_Message) {
    let domain: string;
    switch (obj.key) {
        case "client_black":
            domain = tool.domainName(obj.data["url"]);
            if (!domain) break;
            if (!client_black.includes(domain)) {
                client_black = await tool.saveAddArray("client_black", domain)
                console.log(`Add ${domain} to client_black`)
                console.log(`client_black: ${client_black}`)
            }
            if (client_white.includes(domain)) {
                client_white = await tool.saveRemoveArray("client_white", domain)
                console.log(`remove ${domain} from client_white`)
                console.log(`client_black: ${client_black}`)
            }
            chrome.tabs.update(Number(obj.data["tabId"]), { url: chrome.runtime.getURL("/404.html") + `?url=${obj.data["url"]}` });
            break;


        case "client_white":
            domain = tool.domainName(obj.data["url"]);
            if (!domain) break;
            if (!client_white.includes(domain)) {
                client_white = await tool.saveAddArray("client_white", domain)
                console.log(`Add ${domain} to client_white`)
                console.log(`client_white: ${client_white}`)
            }
            if (client_black.includes(domain)) {
                client_black = await tool.saveRemoveArray("client_black", domain)
                console.log(`remove ${domain} from client_black`)
                console.log(`client_black: ${client_black}`)
            }
            chrome.tabs.update(Number(obj.data["tabId"]), { url: obj.data["url"] });
            break;
    }

}


// // import {spawn} from 'child_process';
// const temperatures = []; // Store readings

// const sensor = spawn('python', ['sensor.py']);
// sensor.stdout.on('data', function(data) {

//     // convert Buffer object to Float
//     temperatures.push(parseFloat(data));
//     console.log(temperatures);
// });



// import { PythonShell } from 'python-shell';
// PythonShell.defaultOptions = { scriptPath: './module/py' };
// let pyshell = new PythonShell('script.py');

// // sends a message to the Python script via stdin
// pyshell.send("-123 " + JSON.stringify({
//     "type": 13,
//     "data": "you"
// }));

// pyshell.on('message', function (message) {
//     // received a message sent from the Python script (a simple "print" statement)
//     console.log(message);
// });

// // end the input stream and allow the process to exit
// pyshell.end(function (err, code, signal) {
//     if (err) throw err;
//     console.log('The exit code was: ' + code);
//     console.log('The exit signal was: ' + signal);
//     console.log('finished');
// });
