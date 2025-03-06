import app from './config/express'
import { appPort } from './config/env'


app.listen(appPort, () => {
    console.log(`App is running ${appPort}`)
})