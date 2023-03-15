// ERR_BLOCKED_BY_CLIENT
import tool from "../module/tools/tool"
import { M_Message } from "../structures/model";
// document.addEventListener('DOMContentLoaded', function () {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    let param = "url"
    let url: string;
    if(urlParams.has(param)) {
        url = urlParams.get(param)
        console.log("url:", url);
        var descriptionBlock = document.getElementById("urlText");
        descriptionBlock.innerHTML = url;
    }
    else{
        url = ""
        console.log('no find url')
    }
    var checkPageButton = document.querySelector('div button');
    let tab: chrome.tabs.Tab;
    checkPageButton?.addEventListener('click', async function () {
        
        // location.href = '404.html';
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
            console.log(123456)
            tab = tabs[0]
            console.log("window.location.search", window.location.search);
            // // alert(`${JSON.stringify(tabs, null, 4)}`);
            // alert(`Blocked: ${tab.url}`);
            // // alert(`Blocked: ${tab}`);
            let content = {
                content: JSON.stringify({
                    type: "EditData",
                    key: "client_white",
                    data: {
                        url: url,
                        tabId: `${tab.id}`
                    }
                } as M_Message)
            }
            chrome.runtime.sendMessage(content, function (response) {
                console.log(response);
                // alert(response)
            });
        });
    });
// })
// const page_type = urlParams.get('page_type')

// console.log(page_type);