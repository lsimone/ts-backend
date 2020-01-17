import fs from 'fs'
import { join } from 'path'
import merge from 'lodash/merge'

const readJson = (path: string) => {
    const rawdata = fs.readFileSync(join(__dirname, path))
    return JSON.parse(rawdata.toString())
}

const DEV_CFG = readJson('../../config/base.config.json')
const PROD_CFG = readJson('../../config/prod.config.json')

const devMode = process.env.NODE_ENV !== 'production'

export default devMode ? { ...DEV_CFG, devMode } : merge(DEV_CFG, PROD_CFG)
