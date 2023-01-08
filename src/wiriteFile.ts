import fs from 'fs/promises'
import path from 'path'

export async function writeFile(location: string, data: string) {
  await fs
    .mkdir(path.dirname(location), {
      recursive: true,
    })
    .catch((e) => {
      throw new Error(
        `Create Path Failed[${e.message}]: ${path.dirname(location)}`,
      )
    })
  await fs.writeFile(location, data, { encoding: 'utf-8' }).catch((e) => {
    throw new Error(`Write File Failed[${e.message}]: Path:${location}`)
  })
}
