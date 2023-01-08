import { resolve } from 'path'
import { ConverContent, CustomConfig, FileType } from './types'



function clearPath(path: string) {
  return path.replaceAll('/({|})/g', '')
}
function fileExtension(fileType: FileType) {
  switch (fileType) {
    case 'gql.js':
      return '.js'
    case 'gql.ts':
      return '.ts'
    case 'graphql':
      return '.graphql'
  }
}
export function resolveAllInOnePath(
  path: string,
  schemaPath: string,
  outputPath: string,
  type: FileType,
): string {
  const arr = clearPath(path).split('-')
  const fileName = arr.pop() + fileExtension(type)
  return resolve(schemaPath, outputPath, ...arr, fileName)
}
export function resolvePath(obj:ConverContent, config:CustomConfig){

}