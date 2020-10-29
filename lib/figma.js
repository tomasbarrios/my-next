const getFigmaFile = async (file) => {
    console.log({ pr: process.env.FIGMA_API_TOKEN })
    const token = process.env.FIGMA_API_TOKEN
    console.log({ token })
    const req = fetch(
        `https://api.figma.com/v1/files/${file}`,
        {
            headers: { 'X-FIGMA-TOKEN': token }
        })
    const { status, ...res } = await req
    if (status != 200) {
        throw Error("Unable to reach API, Error" + status)
    }
    console.log({ res })
    return res

}
export default async (req, res) => {
    console.log()
    console.log({ req })
    const styles = await getFigmaFile("z4320bSlVq82crphF12RTZ")

    console.log({ styles })
    return styles
}
