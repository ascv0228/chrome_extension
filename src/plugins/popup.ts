import tool from "../module/tools/tool"
import { M_Message } from "../structures/model";


document.addEventListener('DOMContentLoaded', function () {
    var checkPageButton = document.getElementById('clickIt');
    let url: string;

    let tab: chrome.tabs.Tab;
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
        tab = tabs[0]

        if (!tab) {
            alert(`Undefined tab`);
        }
        var descriptionBlock = document.getElementById("description");
        descriptionBlock.innerHTML = tool.domainName(tab.url);
    });
    checkPageButton?.addEventListener('click', async function () {
        // location.href = '404.html';
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
            tab = tabs[0]
            // alert(`${JSON.stringify(tabs, null, 4)}`);
            alert(`Blocked: ${tab.url}`);
            // alert(`Blocked: ${tab}`);
            let content = {
                content: JSON.stringify({
                    type: "EditData",
                    key: "client_black",
                    data: {
                        url: tab.url,
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

    

    var homePageButton = document.getElementById('homeButton');
    homePageButton?.addEventListener('click', async function () {
        // console.log("homePage");
        // sendRequest("http://127.0.0.1:8000/")
        chrome.tabs.create({ url: chrome.runtime.getURL("/home.html") });

    });

}, false);


// function sendRequest(url: string) {
//     // document.write("Sending request");
//     var req = new XMLHttpRequest();
//       req.open("GET", url, true);
//       req.onreadystatechange = function() {
//           if (req.readyState == 4) {
//             if (req.status == 200) {
//               alert(req.responseText);
//             //   document.write("OK");
//             }
//           }
//         };
//       req.send();
// } 