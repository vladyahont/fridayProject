export const fileConverter = (files: any, callBack: (value: string) => void) => {
    if (files && files.length) {
        const file = files[0]

        const reader = new FileReader();

        reader.onloadend = () => {
            const file64 = reader.result as string
            console.log(file64)
            callBack(file64)
        }
        reader.readAsDataURL(file)
    } else {
        console.log('Error: file is very big for loading')
    }
}