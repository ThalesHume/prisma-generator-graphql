export type ConverContent = {
  [key: string]: {
    path?: string
    content?: string
  }
}
export type FileType = 'gql.ts' | 'gql.js' | 'graphql'

export type CustomConfig = {
  allInOnePath?: string
  modelPath?: string
  inputPath?: string
  enumPath?: string
  fileType?: FileType
}

export enum PrismaSclar {
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
export enum GraphqlSclar {
  'Int' = 'Int',
  'Float' = 'Float',
  'String' = 'String',
  'Boolean' = 'Boolean',
  'ID' = 'ID',
}