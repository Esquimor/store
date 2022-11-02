const fs = require("fs/promises");
const path = require("path");

export const saveFile = async (file: string, name: string) => {
  try {
    await fs.writeFile(path.join(__dirname, `../files/${name}.png`), file, 'base64')
    return true
  } catch {
    return false
  }
}

export const imageToBase64 = async (name: string) => {
  try {
    const image = await fs.readFile(path.join(__dirname, `../files/${name}.png`), 'base64')
    return image;
  } catch {
    return null
  }
}