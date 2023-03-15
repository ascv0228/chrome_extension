const path = require("path");  
const fs = require('fs');  

module.exports = {
    readDirAll(dir, fileHandler = null, dirHandler= null){
        const dirents = fs.readdirSync(dir, { withFileTypes: true });
    
        return Promise.all(dirents.map((dirent) => {
            const res = path.resolve(dir, dirent.name);
    
            if (dirent.isDirectory()) {
                if (dirHandler) {
                    dirHandler(res);
                }
    
                return this.readDirAll(res, fileHandler, dirHandler);
            } else {
                if (fileHandler) {
                    fileHandler(res);
                }
    
                return res;
            }
        }));
    }
}