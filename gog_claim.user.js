// ==UserScript==
// @name            自动领取GOG限免游戏
// @namespace       https://bbs.tampermonkey.net.cn/
// @version         0.0.1-dev
// @author          Elm Forest
// @description     自动领取GOG限免游戏, Modify from https://github.com/HCLonely/user.js/blob/master/Claim_GOG_Giveaway.user.js
// @icon            https://www.gog.com/favicon.ico
// @grant           GM_log
// @grant           GM_xmlhttpRequest
// @connect         www.gog.com
// @license         MIT
// @crontab         * * once * *
// ==/UserScript==

return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
        url: 'https://www.gog.com/giveaway/claim',
        method: 'POST',
        timeout: 10000,
        onload: async (xhr) => {
            let res = JSON.parse(xhr.responseText);
            if (xhr.status === 201 || (xhr.status === 409 && res.message === 'Already claimed')) {
                resolve("领取成功")
            } else {
                reject("领取失败:" + res)
            }
        }
    })
})
