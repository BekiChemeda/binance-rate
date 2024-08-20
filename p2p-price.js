const { Telegraf }= require("telegraf")
const axios = require("axios")
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN)


bot.start((ctx) => {
    ctx.reply("Hello, This bot is Binance P2P price shower bot.\n sending rate...")
    getData()
    .then((result) => {
        ctx.telegram.sendMessage(ctx.chat.id, result, {
            parse_mode : "HTML",
            link_preview_options: { is_disabled: true }
        } )
    })
    

})


bot.help((ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, `<b> List Of Available Commands </b>

/start to check buying and Selling Rate on Binance
/help to get help
/convUSDT to convert USDT to ETB 
/convETB to convert ETB to USDT `, {
    parse_mode: "HTML"
})
})







bot.command("convusdt", (ctx) =>{
    
    
    if (ctx.payload) {
        arr = ctx.payload.split(" ")
        first = parseFloat(arr[0])
        
        if (typeof(first) == "number") {
            getData()
            .then(() => {
                buyPrice = first * buyRate;
                sellPrice = first * sellRate;
                ctx.reply(`Converting ${first} USDT to ETB... `)
                ctx.telegram.sendMessage(ctx.chat.id, 
                    `
                    Binance Exchange USDT Rate \n Buying Rate: ${buyPrice} ETB \n Selling Rate ${sellPrice} ETB`, {
                    parse_mode : "HTML",
                    link_preview_options: { is_disabled: true }
                } )
            })
        } else {
            ctx.telegram.sendMessage(ctx.chat.id, 
                ` Please use this form \n /conv amount of USDT you want to convert `, {
                parse_mode : "HTML",
                link_preview_options: { is_disabled: true }
            } )
        }
    }
     else {
        ctx.telegram.sendMessage(ctx.chat.id, 
            ` * Please use this form \n /conv amount of USDT you want to convert `, {
            parse_mode : "HTML",
            link_preview_options: { is_disabled: true }
        } )
    }
    
})






bot.command("convUSDT", (ctx) =>{
    
    
    if (ctx.payload) {
        arr = ctx.payload.split(" ")
        first = parseFloat(arr[0])
        
        if (typeof(first) == "number") {
            getData()
            .then(() => {
                buyPrice = first * buyRate;
                sellPrice = first * sellRate;
                ctx.reply(`Converting ${first} USDT to ETB... `)
                ctx.telegram.sendMessage(ctx.chat.id, 
                    `
                    Binance Exchange USDT Rate \n Buying Rate: ${buyPrice} ETB \n Selling Rate ${sellPrice} ETB`, {
                    parse_mode : "HTML",
                    link_preview_options: { is_disabled: true }
                } )
            })
        } else {
            ctx.telegram.sendMessage(ctx.chat.id, 
                ` Please use this form \n /conv amount of USDT you want to convert `, {
                parse_mode : "HTML",
                link_preview_options: { is_disabled: true }
            } )
        }
    }
     else {
        ctx.telegram.sendMessage(ctx.chat.id, 
            ` * Please use this form \n /conv amount of USDT you want to convert `, {
            parse_mode : "HTML",
            link_preview_options: { is_disabled: true }
        } )
    }
    
})



bot.hears("Binance", (ctx) => {
    ctx.reply("I'm Here to tell you today's Binance Rate")
    getData()
    .then((result) => {
        ctx.telegram.sendMessage(ctx.chat.id, result, {
            parse_mode : "HTML",
            link_preview_options: { is_disabled: true }
        } )
    })
})

bot.command("convETB", (ctx) =>{
    
    if (ctx.payload) {
        arr = ctx.payload.split(" ")
        first = parseFloat(arr[0])
        
        if (typeof(first) == "number") {
            getData()
            .then(() => {
                buyPrice = first / buyRate;
                sellPrice = first / sellRate;
                ctx.reply(`Converting ${first} ETB to USDT... `)
                ctx.telegram.sendMessage(ctx.chat.id, 
                    `
                    Binance Exchange USDT Rate \n You can buy: ${buyPrice} USDT with it Or\n You Sold ${sellPrice} USDT for ${first}`, {
                    parse_mode : "HTML",
                    link_preview_options: { is_disabled: true }
                } )
            })
        } else {
            ctx.telegram.sendMessage(ctx.chat.id, 
                ` Please use this form \n /convETB x where x amount of ETB you want to convert `, {
                parse_mode : "HTML",
                link_preview_options: { is_disabled: true }
            } )
        }
    }
     else {
        ctx.telegram.sendMessage(ctx.chat.id, 
            ` * Please use this form \n /convETB amount of ETB you want to convert `, {
            parse_mode : "HTML",
            link_preview_options: { is_disabled: true }
        } )
    }
    
})




bot.command("convetb", (ctx) =>{
    
    
    if (ctx.payload) {
        arr = ctx.payload.split(" ")
        first = parseFloat(arr[0])
        
        if (typeof(first) == "number") {
            getData()
            .then(() => {
                buyPrice = first / buyRate;
                sellPrice = first / sellRate;
                ctx.reply(`Converting ${first} ETB to USDT... `)
                ctx.telegram.sendMessage(ctx.chat.id, 
                    `
                    Binance Exchange USDT Rate \n You can buy: ${buyPrice} USDT with it Or\n You Sold ${sellPrice} USDT for ${first}`, {
                    parse_mode : "HTML",
                    link_preview_options: { is_disabled: true }
                } )
            })
        } else {
            ctx.telegram.sendMessage(ctx.chat.id, 
                ` Please use this form \n /convETB x where x amount of ETB you want to convert `, {
                parse_mode : "HTML",
                link_preview_options: { is_disabled: true }
            } )
        }
    }
     else {
        ctx.telegram.sendMessage(ctx.chat.id, 
            ` * Please use this form \n /convETB amount of ETB you want to convert `, {
            parse_mode : "HTML",
            link_preview_options: { is_disabled: true }
        } )
    }
    
})



async function getData(){
    let url = "https://ethiopian-currency-exchange.vercel.app/"
    let res = await axios.get(url);
    const name = res.data.bestRates[3].bank
    baseCurrency = res.data.bestRates[3].baseCurrency
    currencyCode = res.data.bestRates[3].currencyCode
    buyRate = res.data.bestRates[3].buyRate
    sellRate = res.data.bestRates[3].sellRate
    buySellDifference = -1 * res.data.bestRates[3].buySellDifference
    lastUpdated = res.data.lastUpdated ;
    const results = `<b> Platform : <a href="www.binance.com"> ${name} </a></b> 
Base Currency : <b> ${baseCurrency} </b>
Currency Code : <b> ${currencyCode} </b>

Buy Rate: ${buyRate} ETB
Sell Rate: ${sellRate} ETB

Buy Sell Difference: ${buySellDifference} ETB
Last Updated : ${lastUpdated}
Created by Bright Techs
    ` 
    return results;
}



bot.launch()