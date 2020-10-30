import Head from 'next/head'
import styles from '../styles/Home.module.css'
import figmaClient, { getFigmaNode } from '../lib/figma'

const FigmaDoc = ({ element }) => {
    console.log({ element })
    return <>
        {element.children.map((el) => <FigmaEl element={el}></FigmaEl>)}
        {<FigmaColors document={element} />}
    </>
}

const ColorSample = ({ rgb: { r, g, b, a }, ...rest }) => {
    const f = (num) => parseFloat(num) * 255
    console.log({ r, g, b, a })
    console.log({ res: `rgb(${f(r)}, ${g}, ${b}, ${a})` })
    return <div style={{ width: 10, height: 10, backgroundColor: `rgb(${f(r)}, ${f(g)}, ${f(b)}, ${a})` }}></div >
}

const FigmaColors = ({ document }) => {
    const colors = document.children.filter((el) => el.type === "RECTANGLE")
    console.log({ colors })
    return colors.map((color) => <ColorSample rgb={color.fills[0].color}></ColorSample>)
}
const FigmaEl = ({ element }) => {
    console.log({ element })
    return <>{element.name}</>
}
export default function Home({ figma }) {
    console.log("HOME", { figma })

    return (
        <div className={styles.container}>
            <div className={styles.container}>
                {figma.document.children.map((el) => {
                    return <FigmaDoc element={el}></FigmaDoc>
                })}
            </div>
            <Head>
                <title><span className="tribute">Created from a</span> Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>

                <p className={styles.description}>
                    Get started by editing{' '}
                    <code className={styles.code}>pages/index.js</code>
                </p>

                <div className={styles.grid}>
                    <a href="https://nextjs.org/docs" className={styles.card}>
                        <h3>Documentation &rarr;</h3>
                        <p>Find in-depth information about Next.js features and API.</p>
                    </a>

                    <a href="https://nextjs.org/learn" className={styles.card}>
                        <h3>Learn &rarr;</h3>
                        <p>Learn about Next.js in an interactive course with quizzes!</p>
                    </a>

                    <a
                        href="https://github.com/vercel/next.js/tree/master/examples"
                        className={styles.card}
                    >
                        <h3>Examples &rarr;</h3>
                        <p>Discover and deploy boilerplate example Next.js projects.</p>
                    </a>

                    <a
                        href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                    >
                        <h3>Deploy &rarr;</h3>
                        <p>
                            Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
                    </a>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
                </a>
            </footer>
        </div>
    )
}

export async function getStaticProps() {
    const res = await figmaClient()
    return {
        props: {
            figma: res,
        },
    }
}
