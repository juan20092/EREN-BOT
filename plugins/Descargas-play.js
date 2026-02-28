import yts from "yt-search"
import fetch from "node-fetch"

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(" `Ingresa el nombre del video de YouTube`.")

  await m.react("🕘")

  try {
    let url = text
    let title = "Desconocido"
    let authorName = "Desconocido"
    let durationTimestamp = "Desconocida"
    let views = "Desconocidas"
    let thumbnail = ""

    if (!text.startsWith("https://")) {
      const res = await yts(text)
      if (!res?.videos?.length) return m.reply("🚫 No encontré nada.")
      const video = res.videos[0]
      title = video.title
      authorName = video.author?.name
      durationTimestamp = video.timestamp
      views = video.views
      url = video.url
      thumbnail = video.thumbnail
    }

    const vistas = formatViews(views)

    const res3 = await fetch("https://files.catbox.moe/wfd0ze.jpg")
    const thumb3 = Buffer.from(await res3.arrayBuffer())

    const fkontak = {
      key: { fromMe: false, participant: "0@s.whatsapp.net" },
      message: {
        documentMessage: {
          title: `『 ${title} 』`,
          fileName: global.botname || "🪡 𝐄𝐑𝐄𝐍 𝐁𝐎𝐓 🪡",
          jpegThumbnail: thumb3
        }
      }
    }

    const caption = `
✧━『 𝙸𝚗𝚏𝚘 𝚍𝚎𝚕 𝚊𝚞𝚍𝚒𝚘 』━✧

🎼 𝚃𝚒𝚝𝚞𝚕𝚘: ${title}
📺 𝙲𝚊𝚗𝚊𝚕: ${authorName}
👁️ 𝚅𝚒𝚜𝚝𝚊𝚜: ${vistas}
⏳ 𝙳𝚞𝚛𝚊𝚌𝚒ó𝚗: ${durationTimestamp}
🌐 𝙴𝚗𝚕𝚊𝚌𝚎: ${url}

✧━『 🪡 𝐄𝐑𝐄𝐍 𝐁𝐎𝐓 🪡 』━✧

🎵 𝙳𝚎𝚜𝚌𝚊𝚛𝚐𝚊𝚗𝚍𝚘 𝙰𝚞𝚍𝚒𝚘...
`

    const thumb = (await conn.getFile(thumbnail)).data

    // Enviar primero la info del video
    await conn.sendMessage(
      m.chat,
      {
        image: thumb,
        caption,
        footer: "🪡 𝐄𝐑𝐄𝐍 𝐁𝐎𝐓 🪡",
        headerType: 4
      },
      { quoted: fkontak }
    )

    // Descargar y enviar el audio automáticamente
    await downloadAudio(conn, m, url)

  } catch (e) {
    m.reply("❌ Error: " + e.message)
    m.react("⚠️")
  }
}

const fetchBuffer = async (url) => {
  const response = await fetch(url)
  return await response.buffer()
}

const downloadAudio = async (conn, m, url) => {
  try {
    const sent = await conn.sendMessage(m.chat, { text: "🎵 Descargando audio, por favor espera..." }, { quoted: m })

    const apiUrl = `https://api-adonix.ultraplus.click/download/ytaudio?url=${encodeURIComponent(url)}&apikey=KEYGOHANBOT`

    const r = await fetch(apiUrl)
    const data = await r.json()

    if (!data?.status || !data?.data?.url) {
      await conn.sendMessage(
        m.chat,
        { text: "🚫 No se pudo descargar el audio.", edit: sent.key }
      )
      return
    }

    const fileUrl = data.data.url
    const fileTitle = cleanName(data.data.title || "audio")

    // Descargar el buffer del audio
    const audioBuffer = await fetchBuffer(fileUrl)

    // Enviar el audio
    await conn.sendMessage(
      m.chat,
      { 
        audio: audioBuffer, 
        mimetype: "audio/mpeg", 
        fileName: fileTitle + ".mp3",
        caption: `✅ Audio descargado\n\n🎼 Título: ${fileTitle}` 
      },
      { quoted: m }
    )

    // Actualizar mensaje de estado
    await conn.sendMessage(
      m.chat,
      { text: `✅ Audio descargado con éxito`, edit: sent.key }
    )

    await m.react("✅")
  } catch (e) {
    console.error(e)
    await conn.sendMessage(
      m.chat,
      { text: "❌ Error al descargar el audio: " + e.message }
    )
    await m.react("💀")
  }
}

const cleanName = (name) => name.replace(/[^\w\s-_.]/gi, "").substring(0, 50)

const formatViews = (views) => {
  if (views === undefined || views === null) return "No disponible"
  if (views >= 1000000000) return `${(views / 1000000000).toFixed(1)}B`
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
  return views.toString()
}

handler.command = ["play",]
handler.tags = ["descargas"]
handler.help = ["play"]
handler.register = false

export default handler
