import Discord, { WebhookClient, MessageEmbed } from 'discord.js'
import Cache from './cache'

const makeEmbed = ({ heartrate, miles, calories, floors, sleep }: Cache) => {
    return Promise.resolve(
        new MessageEmbed()
            .setTitle("takagi - 人体")
            .setDescription("現在のアクティビティを表示しています")
            .setThumbnail("https://irishtechnews.ie/wp-content/uploads/2016/08/fitbit-logo.png")
            .addField(":heart: 心拍数", heartrate + "bpm", true)
            .addField(":fire: 消費済みカロリー", calories.toString(), true)
            .addField(":athletic_shoe: 歩いた距離", miles + "mi", true)
            .addField(":triangular_ruler: 歩いた階数", floors.toString(), true)
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