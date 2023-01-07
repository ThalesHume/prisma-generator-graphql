import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper'
import { logger } from '@prisma/sdk'
import { GENERATOR_NAME } from './constants'
import { generate } from './utils/generate'

const { version } = require('../package.json')

generatorHandler({
  onManifest() {
    logger.info(`${GENERATOR_NAME}:Registered`)
    return {
      version,
      defaultOutput: '../generated',
      prettyName: GENERATOR_NAME,
    }
  },
  onGenerate: generate
})
