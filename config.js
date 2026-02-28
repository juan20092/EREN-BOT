import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.owner = [
  ['165043362652249', '𝙹𝚄𝙰𝙽 𝙾𝙵𝙲', true]
]

global.mods = []
global.prems = []

global.namebot = '🪡 𝐄𝐑𝐄𝐍 𝐁𝐎𝐓 🪡'
global.packname = '🪡 𝐄𝐑𝐄𝐍 𝐁𝐎𝐓 🪡'
global.author = '𝙹𝚄𝙰𝙽 𝙾𝙵𝙲 | © 𝟸𝟶𝟸𝟼 '
global.moneda = '🪡 𝐄𝐑𝐄𝐍 𝐁𝐎𝐓 🪡'

global.libreria = 'Baileys'
global.baileys = 'V 6.7.16'
global.vs = '2.2.0'
global.sessions = 'sessions'
global.jadi = 'erenjadi'
global.yukiJadibts = true

global.namecanal = '🪡'
global.idcanal = '120363419404216418@newsletter'
global.idcanal2 = '120363419404216418@newsletter'
global.canal = 'https://whatsapp.com/channel/0029VbARAwbEgGfOsCN1T10V'
global.canalreg = '120363419404216418@newsletter'

global.ch = {
  ch1: '120363419404216418@newsletter'
}

global.multiplier = 69
global.maxwarn = 2

global.APIs = {
  adonix: { url: "https://api-adonix.ultraplus.click", key: "Yuki-WaBot" },
  vreden: { url: "https://api.vreden.web.id", key: null },
  nekolabs: { url: "https://api.nekolabs.web.id", key: null },
  siputzx: { url: "https://api.siputzx.my.id", key: null },
  delirius: { url: "https://api.delirius.store", key: null },
  ootaizumi: { url: "https://api.ootaizumi.web.id", key: null },
  stellar: { url: "https://api.stellarwa.xyz", key: "YukiWaBot", key2: '1bcd4698ce6c75217275c9607f01fd99' },
  apifaa: { url: "https://api-faa.my.id", key: null },
  xyro: { url: "https://api.xyro.site", key: null },
  yupra: { url: "https://api.yupra.my.id", key: null }
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("🪡 Se actualizó 'config.js'"))
  import(`file://${file}?update=${Date.now()}`)
})
