import {
  DMMF,
  generatorHandler,
  GeneratorOptions,
} from '@prisma/generator-helper'
import { logger } from '@prisma/sdk'
import { GENERATOR_NAME } from './constants'

const { version } = require('../package.json')
enum PrismaSclar {
  'String' = 'String',
  'Boolean' = 'Boolean',
  'Int' = 'Int',
  'BigInt' = 'BigInt',
  'Float' = 'Float',
  'Decimal' = 'Decimal',
  'DateTime' = 'DateTime',
  'Json' = 'Json',
  'Bytes' = 'Bytes',
  'Unsupported' = 'Unsupported',
  'object' = 'object',
}
enum GraphqlSclar {
  'Int' = 'Int',
  'Float' = 'Float',
  'String' = 'String',
  'Boolean' = 'Boolean',
  'ID' = 'ID',
}
function converModelField(field: DMMF.Field): string {
  const defaultConvert = (f: DMMF.Field) => {
    switch (f.kind) {
      case 'enum':
        return f.type
      case 'object':
        return f.type
      case 'scalar':
        switch (f.type) {
          case PrismaSclar.BigInt:
            return GraphqlSclar.Int
          case PrismaSclar.Boolean:
            return GraphqlSclar.Boolean
          case PrismaSclar.Bytes:
            return 'Bytes'
          case PrismaSclar.DateTime:
            return 'DateTime'
          case PrismaSclar.Decimal:
            return GraphqlSclar.Float
          case PrismaSclar.Float:
            return GraphqlSclar.Float
          case PrismaSclar.Int:
            return GraphqlSclar.Int
          case PrismaSclar.Json:
            return field.name
          case PrismaSclar.String:
            return GraphqlSclar.String
          default:
            throw new Error(`Unrecognized field type: ${f.type}`)
        }
      case 'unsupported':
        return `${f.name.toUpperCase()}`
      default:
        throw new Error(`Unrecognized field kind: ${f.kind}`)
    }
  }
  const docs = converDocs(field.documentation)
  if (docs?.type['Hide'] === 'true') {
    return ''
  }
  if (field.isList) {
    return `${docs?.doc}    ${field.name}: [${
      docs?.type['Type'] && docs.type['Type'] !== ''
        ? docs.type['Type']
        : defaultConvert(field)
    }${field.isRequired ? '!' : ''}]\n`
  } else {
    return `${docs?.doc}    ${field.name}: ${
      docs?.type['Type'] && docs.type['Type'] !== ''
        ? docs.type['Type']
        : defaultConvert(field)
    }${field.isRequired ? '!' : ''}\n`
  }
}
function converDocs(doc?: string | null) {
  const arrToobj = (arr?: [string, string | null][] | null) => {
    const obj: { [key: string]: string | null | undefined } = {}
    if (arr) {
      arr.forEach(([k, v]) => (obj[k] = v))
    }
    return obj
  }
  if (!doc) {
    return null
  } else {
    const docs = doc.split('\n')
    return {
      doc:
        docs
          .filter((v) => !v.startsWith('@'))
          .map((v) => `    "${v}"`)
          .join('\n') + '\n',
      type: arrToobj(
        docs
          .filter((v) => v.startsWith('@'))
          .map((v) => {
            const typeArr = v.split(':')
            return [
              typeArr[0].replace('@', ''),
              typeArr.length > 1 ? typeArr[1].trim() : null,
            ]
          }),
      ),
    }
  }
}
generatorHandler({
  onManifest() {
    logger.info(`${GENERATOR_NAME}:Registered`)
    return {
      version,
      defaultOutput: '../generated',
      prettyName: GENERATOR_NAME,
    }
  },
  onGenerate: async (options: GeneratorOptions) => {
    console.log(options)
    const modelStrs: string[] = []
    const enumStrs: string[] = []
    options.dmmf.datamodel.models.forEach((m) => {
      const modelStr: string[] = []
      modelStr.push(`"${m.documentation}"`, `type ${m.name} {\n`)
      m.fields.forEach((f) => {
        modelStr.push(converModelField(f))
      })
      modelStr.push('}')
      modelStrs.push(modelStr.join('\n'))
    })
    options.dmmf.datamodel.enums.forEach((e) => {
      const enumStr: string[] = []
      enumStr.push(`"${e.documentation}"`, `enum ${e.name} {\n`)
      e.values.forEach(v=>{
        enumStr.push(`    ${v.name}\n`)
      })
      enumStr.push('}')
      enumStrs.push(enumStr.join('\n'))
    });
    console.log(modelStrs.concat(enumStrs).join('\n'))
  },
})
