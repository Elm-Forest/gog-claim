// ==UserScript==
// @name            自动领取GOG限免游戏
// @namespace       https://bbs.tampermonkey.net.cn/
// @version         1.0.0
// @author          Elm Forest
// @description     自动领取GOG限免游戏
// @icon            https://www.gog.com/favicon.ico
// @grant           GM_log
// @grant           GM_xmlhttpRequest
// @connect         www.gog.com
// @license         MIT
// @crontab         * * once * *
// @homepage        https://github.com/Elm-Forest/gog-claim
// @supportURL      https://github.com/Elm-Forest/gog-claim/issues
// ==/UserScript==

return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
        url: 'https://www.gog.com/giveaway/claim',
        method: 'POST',
        timeout: 10000,
        onload: async (xhr) => {
            let res = JSON.parse(xhr.responseText);
            if (xhr.status === 201) {
                GM_log("领取成功")
                resolve('Claim success')
            } else if (xhr.status === 409 && res.message === 'Already claimed') {
                GM_log("已经领过了")
                reject('Repeate Claim')
            } else if (xhr.status === 401) {
                GM_log("尚未登陆或登录已过期")
                reject('Login timeout')
            } else {
                GM_log("领取失败")
                GM_log("Response status:" + xhr.status)
                reject('Claim failed:' + res)
            }
        }
    })
})
