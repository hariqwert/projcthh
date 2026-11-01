const axios = require('axios');

async function findMetaTokensUsage() {
    const res = await axios.get('https://comix.to/assets/build/35595e3de3c99889c1aa70/dist/apicore-tnkkoz-CwGT_SNA.js');
    const js = String(res.data);
    let idx = 0;
    while ((idx = js.indexOf('1399', idx)) !== -1) {
        console.log('Match at', idx, ':', js.slice(Math.max(0, idx - 80), idx + 120));
        idx += 4;
    }
}

findMetaTokensUsage();
