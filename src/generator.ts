import {
  generatorHandler,
  GeneratorOptions,
} from '@prisma/generator-helper'
import { logger } from '@prisma/sdk'
import { GENERATOR_NAME } from './constants'
import { ConverContent, CustomConfig } from './utils/types'
import { resolveAllInOnePath } from './utils/resolvePath'
import {
  converEnumText,
  converInputText,
  converModelText,
} from './utils/converts'
import { writeFile } from './wiriteFile'

const { version } = require('../package.json')

const defaultConfig: CustomConfig = { allInOnePath: 'generated_types' }
generatorHandler({
  onManifest() {
    logger.info(`${GENERATOR_NAME}:Registered`)
    return {
      version,
      prettyName: GENERATOR_NAME,
    }
  },
  onGenerate: async (options: GeneratorOptions) => {
    const config = Object.assign({}, defaultConfig, options.generator.config)

    const modelStrs: ConverContent = {}
    options.dmmf.datamodel.models.forEach(
      (v) => (modelStrs[v.name] = { content: converModelText(v) }),
    )

    const enumStrs: ConverContent = {}
    options.dmmf.datamodel.enums.forEach(
      (v) => (enumStrs[v.name] = { content: converEnumText(v) }),
    )
      console.log(JSON.stringify(options.dmmf.schema.inputObjectTypes.prisma[0]))
    // const InputStrs: ConverContent = {}
    // options.dmmf.datamodel.types.forEach((v) => console.log(v))

    if (config.allInOnePath && config.allInOnePath !== '') {
      const path = resolveAllInOnePath(
        config.allInOnePath,
        options.schemaPath,
        options.generator.output?.value ? options.generator.output.value : '',
        /*config.fileType || */'graphql',
      )
      const content = Object.values(
       Object.assign({}, modelStrs, enumStrs)
      ).map(v=>v.content).join('\n')
      console.log(path)
      await writeFile(path, content)
        .catch((e) => console.log(e.message))
    } else {
      console.log("please use 'allInOnePath: foldername-foldername...-filename', other ways is developing...")
    }
  },
})
