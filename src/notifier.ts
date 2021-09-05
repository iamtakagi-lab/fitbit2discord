import { WebhookClient, MessageEmbed } from 'discord.js'
import Cache from './cache'
import env from './env'

const makeEmbed = ({ heartrate, miles, calories, floors, sleep }: Cache) => {
    return Promise.resolve(
        new MessageEmbed()
            .setTitle(`${env.NAME} - 人体`)
            .setDescription("現在のアクティビティを表示しています")
            .setThumbnail("https://i.imgur.com/OZ2w8gQ.png")
            .addField(":heart: 心拍数", heartrate, true)
            .addField(":fire: 消費済みカロリー", calories, true)
            .addField(":athletic_shoe: 歩いた距離", miles, true)
            .addField(":triangular_ruler: 歩いた階数", floors, true)
            .addField(":zzz: 睡眠時間", sleep, true)
    )
}

const notify = async ({id, token}: any, cache: Cache) => {
    makeEmbed(cache).then(async (embed) => {
        await new WebhookClient({id, token}).send({
			embeds: [embed],
        })
    })
}

export default notify
