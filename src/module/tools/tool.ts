
// import auth from "./auth";
// import dataJson from "../data";

// import fs from "fs";


// const fs = require('fs');

export default {
    // Reading local text file into a JavaScript array
    // readLocalFile(filePath: string, defaultVal?: any): any {
    //     if (!fs.existsSync(filePath)) {
    //         if (defaultVal) {
    //             fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 4));
    //         } else {
    //             return null;
    //         }
    //     }

    //     const data = fs.readFileSync(filePath, "utf8");
    //     return JSON.parse(data);
    // },

    download(url: string, filename: string) {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                link.click();
            })
            .catch(console.error);
    },

    saveData(key: string, value: any): Promise<void> {
        return chrome.storage.sync.set({ [`${key}`]: value });
    },

    async saveAddArray(key: string, newValue: any) {
        let values = (await this.readData(key))[key] || [];
        console.log(values)
        values.push(newValue);
        this.saveData(key, values);
        return values;
        // chrome.storage.local.get({userKeyIds: []}, function (result) {
        //     // the input argument is ALWAYS an object containing the queried keys
        //     // so we select the key we need
        //     var userKeyIds = result.userKeyIds;
        //     userKeyIds.push({keyPairId: keyPairId, HasBeenUploadedYet: false});
        //     // set the new array value to the same key
        //     chrome.storage.local.set({userKeyIds: userKeyIds}, function () {
        //         // you can use strings instead of objects
        //         // if you don't  want to define default values
        //         chrome.storage.local.get('userKeyIds', function (result) {
        //             console.log(result.userKeyIds)
        //         });
        //     });
        // });
    },


    async saveRemoveArray(key: string, delValue: any) {
        let values = (await this.readData(key))[key] || [];
        console.log(values)
        values = values.filter((v) => { v != delValue });
        this.saveData(key, values);
        return values;
    },

    readData(key: string | string[] | null = null): Promise<{ [key: string]: any; }> {
        return chrome.storage.sync.get(key);
    },

    removeData(key: string | string[]): Promise<void> {
        return chrome.storage.sync.remove(key);
    },

    readURL(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => res.text())
                .then(text => {
                    resolve(text);
                })
                .catch(err => { reject(err) });
        })
    },

    async readUrlLines(url: string): Promise<string[]> {
        return (await this.readURL(url)).split('\n')
    },

    // stringArray2regex(arr: string[], filterRegex: boolean = true) {
    //     if (filterRegex) {
    //         arr = arr.filter((v) => (/^[0-9a-z]/.test(v)) && (!/[\^\$\*\+\?\|]/.test(v)));
    //     }

    // },

    domainName(url: string) {
        if (!url || url.startsWith("chrome://") || url.startsWith("chrome-extension://"))
            return undefined;
        try { return new URL(url).hostname.replace('www.', ''); }
        catch (e) {
            return undefined;
        }
    },

    stringArraySetHeader(arr: string[], headerTail: number = 6, filter: boolean = true) {
        if (arr.length < headerTail) {
            throw new Error('Argument headerTail set Error');
            // return {
            //     Header: null,
            //     Data: []
            // }

        }
        return {
            Header: arr.slice(0, headerTail),
            Data: arr.slice(headerTail).filter((d) => this.IsDomainlegal(d))
        }
    },

    IsDomainlegal(domain: string): boolean {
        return (/^[0-9a-z]/.test(domain)) && (!/[\^\$\*\+\?\|]/.test(domain))
    }


}