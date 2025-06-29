import type { Feed } from 'lib/types'
import browser from 'webextension-polyfill'

console.log('Hello from the background!')

browser.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed:', details)
})

function isEmpty(obj: object) {
  return Object.keys(obj).length === 0
}

browser.runtime.onMessage.addListener(async (msg: any) => {
  if (msg && msg.name === 'NEW_FEED') {
    const feed = msg.args as Feed
    console.debug('New feed', feed)
    const alreadyExists = await browser.storage.local.get(feed.href)
    console.debug(alreadyExists)
    if (!isEmpty(alreadyExists)) return

    browser.storage.local.set({
      [feed.href]: feed,
    })
  }
})
