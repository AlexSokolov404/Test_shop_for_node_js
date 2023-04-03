const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const expressHandlebars = require('express-handlebars')
const shop_of_gamesRouter = require('./routes/shop_of_games')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const Handlebars = require('handlebars')

const PORT = process.env.PORT || 3000

const app = express()

const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs',
    allowedProtoMethods: true,
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors())


app.use('/styles', express.static('style'))
app.use('/fonts', express.static('font'))
app.use('/icons', express.static('icon'))
app.use('/images', express.static('images'))


app.use(shop_of_gamesRouter)

async function start() {
    try {
        await mongoose.connect('mongodb+srv://alexeysokolik:Error404@cluster0.mnue5vj.mongodb.net/shop_of_games', {
            useNewUrlParser: true
        })        
        app.listen(PORT, () => {
            console.log('Server has been started!!!')
        })
    } catch (e) {
        console.log(e)
    }
}

start()