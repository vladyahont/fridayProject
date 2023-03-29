
export const fileConverter = (files: any): FileReader | string => {
  if (files && files.length) {
    const file = files[0]
    console.log('file: ', file)

    if (file.size < 4000000) {
      // https://developer.mozilla.org/ru/docs/Web/API/FileReader/FileReader
      const reader = new FileReader();

      reader.onloadend = () => {
        const file64 = reader.result as string
        //console.log('file64: ', file64)

      }
      reader.readAsDataURL(file)
      console.log('reader', reader.result)
      return reader
      // https://developer.mozilla.org/ru/docs/Web/API/FileReader/readAsDataURL
    } else {
      return 'Файл слишком большого размера'
      //console.error('Error: ', 'Файл слишком большого размера')
    }
  }
  return ''
};