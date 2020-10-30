const token = process.env.FIGMA_API_TOKEN
const getFigmaFile = async (file) => {
    const res = await fetch(
        `https://api.figma.com/v1/files/${file}`,
        {
            headers: { 'X-FIGMA-TOKEN': token }
        })
    const response = res.json()
    return response

}
export default async () => {
    const res = await getFigmaFile("z4320bSlVq82crphF12RTZ")
    return res
}

