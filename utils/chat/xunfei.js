import CryptoJS from 'crypto-js'

function getChatInfo() {
  try {
    const appID = process.env.NEXT_PUBLIC_CHAT_XF_APPID
    const apiKey = process.env.NEXT_PUBLIC_CHAT_XF_APIKey
    const apiSecret = process.env.NEXT_PUBLIC_CHAT_XF_APISecret
    const httpUrl = new URL(process.env.NEXT_PUBLIC_CHAT_XF_URL)
    if (!appID || !apiKey || !apiSecret || !httpUrl) {
      throw new Error('缺少必要chat参数——讯飞模型')
    }

    let algorithm = 'hmac-sha256'
    let headers = 'host date request-line'
    let host = location.host
    let date = new Date().toGMTString()

    let signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${httpUrl.pathname} HTTP/1.1`
    let signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
    let signature = CryptoJS.enc.Base64.stringify(signatureSha)
    let authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
    let authorization = btoa(authorizationOrigin)
    let resUrl = `${'wss://' + httpUrl.host + httpUrl.pathname}?authorization=${authorization}&date=${date}&host=${host}`
    return { httpUrl, resUrl, appID }
  } catch (e) {
    throw e
  }
}

function getModelDomain(httpUrl) {
  let modelDomain
  switch (httpUrl.pathname) {
    case '/v1.1/chat':
      modelDomain = 'general'
      break
    case '/v2.1/chat':
      modelDomain = 'generalv2'
      break
    case '/v3.1/chat':
      modelDomain = 'generalv3'
      break
    case '/v3.5/chat':
      modelDomain = 'generalv3.5'
      break
  }
  return modelDomain
}

class ChatAI {
  constructor({ 
    userId,
    beforeStatusChange,
    onMessage,
    onClose
  }) {
    try {
      this.appId = ''
      this.userId = userId
      this.modelDomain = ''
      this.status = 'init'
      this.ttsWS = void 0

      this.message = ''
      this.totalRes = ''
      this.isFirst = true

      this.beforeStatusChange = beforeStatusChange
      this.onMessage = onMessage
      this.onWsClose = onClose
    } catch (e) {
      console.log(e);
    }
  }

  init(initMsg) {
    let { resUrl: url, httpUrl, appID } = getChatInfo()

    this.totalRes = ''
    this.appId = appID
    this.modelDomain = getModelDomain(httpUrl)
    if (this.ttsWS) return this.ttsWS.open()

    let ttsWS
    if ('WebSocket' in window) {
      ttsWS = new WebSocket(url)
    } else if ('MozWebSocket' in window) {
      ttsWS = new window.MozWebSocket(url)
    } else {
      alert('浏览器不支持WebSocket')
      return
    }
    this.ttsWS = ttsWS

    ttsWS.onopen = () => {
      this.setStatus('connecting')
      this.send(initMsg)
    }
    ttsWS.onmessage = (e) => {
      this.handleResult(e.data)
    }
    ttsWS.onerror = (e) => {
      clearTimeout(this.playTimeout)
      this.setStatus('error')
      this.onWsClose?.()
      alert('WebSocket报错，请f12查看详情')
      console.error(`详情查看：${encodeURI(url.replace('wss:', 'https:'))}`)
    }
    ttsWS.onclose = (e) => {
      console.log(e)
      this.onWsClose?.()
    }
  }

  send(msg) {
    this.resetMessage()
    let params = {
      header: {
        app_id: this.appId,
        uid: this.userId,
      },
      parameter: {
        chat: {
          domain: this.modelDomain,
          temperature: 0.5,
          max_tokens: 1024,
        },
      },
      payload: {
        message: {
          text: msg,
        },
      },
    }
    this.ttsWS.send(JSON.stringify(params))
  }

  resetMessage() {
    this.message = ''
    this.isFirst = true
  }

  setStatus(status) {
    this.beforeStatusChange && this.beforeStatusChange(this.status, status)
    this.status = status
  }

  handleResult(data) {
    let jsonData = JSON.parse(data)
    this.totalRes = this.totalRes + data
    // 提问失败
    if (jsonData.header.code !== 0) {
      alert(`提问失败: ${jsonData.header.code}:${jsonData.header.message}`)
      console.log(jsonData.header)
      console.error(`${jsonData.header.code}:${jsonData.header.message}`)
      return
    }
    if (jsonData.header.code === 0 && jsonData.header.status === 2) {
      this.ttsWS.close()
      this.setStatus('init')
    }
    this.message += jsonData.payload.choices.text[0].content
    this.onMessage(this.message, this.isFirst)
    if (this.isFirst) {
      this.isFirst = false
    }
  }

  open() {
    this.ttsWS?.open?.()
  }

  close() {
    this.ttsWS?.close?.()
  }

}

export default ChatAI