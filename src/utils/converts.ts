import { DMMF } from '@prisma/generator-helper'
import { ConverContent, GraphqlSclar, PrismaSclar } from './types'

export function converInputText(input: DMMF.InputType){
  console.log(input)
  return ''
}
export function converModelText(model: DMMF.Model) {
  const modelStr: string[] = []
  modelStr.push(`"${model.documentation}"`, `type ${model.name} {\n`)
  model.fields.forEach((f) => {
    modelStr.push(converModelField(f))
  })
  modelStr.push('}')
  return modelStr.join('\n')
}
export function converEnumText(em: DMMF.DatamodelEnum) {
  const enumStr: string[] = []
  enumStr.push(`"${em.documentation}"`, `enum ${em.name} {\n`)
  em.values.forEach((v) => {
    enumStr.push(`    ${v.name}\n`)
  })
  enumStr.push('}')
  return enumStr.join('\n')
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
