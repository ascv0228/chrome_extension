// const fullPath = await import.meta.resolve("package_name");
// const path = fullPath?.match(/(\/node_modules.*)/)[0];
// console.log(path);
import {resolve} from 'import-meta-resolve'

// A file:
console.log(await resolve('./index.js', import.meta.url))
//=> file:///Users/tilde/Projects/oss/import-meta-resolve/index.js

// // A CJS package:
// console.log(await resolve('builtins', import.meta.url))
// //=> file:///Users/tilde/Projects/oss/import-meta-resolve/node_modules/builtins/index.js

// // A scoped CJS package:
// console.log(await resolve('@eslint/eslintrc', import.meta.url))
// //=> file:///Users/tilde/Projects/oss/import-meta-resolve/node_modules/@eslint/eslintrc/lib/index.js

// // A package with an export map:
// console.log(await resolve('tape/lib/test', import.meta.url))
// //=> file:///Users/tilde/Projects/oss/import-meta-resolve/node_modules/tape/lib/test.js

// A node builtin:
console.log(await resolve('fs', import.meta.url))
//=> node:fs


// "path": "node --experimental-import-meta-resolve .\\scripts\\path.js"