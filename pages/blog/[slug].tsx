import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {serialize} from 'next-mdx-remote/serialize'
import {MDXRemote} from 'next-mdx-remote'
import Head from 'next/head'
import { Pane, Heading, majorScale, Spinner } from 'evergreen-ui'
import { useRouter } from 'next/router'

import Container from '../../components/Container'
import HomeNav from '../../components/HomeNav'


export default function BlogPost( {source, frontMatter} ): InferGetStaticPropsType<typeof getStaticProps> {
  const router = useRouter()

  // in case of fallback state: true
  // if someone requests a page that wasn't statically rendered
  // show spinner
  if (router.isFallback) {
    return (
      <Pane width="100%" height="100%">
        <Spinner size={48} />
      </Pane>
    )
  }
  return (
  <Pane>
    <Head>
      <title>{`Yaba Blog | ${frontMatter.title}`}</title>
      <meta name="description" content={frontMatter.summary} />
    </Head>
    <header>
      <HomeNav />
    </header>
    <main>
      <Container>
        <Heading fontSize="clamp(2rem, 8vw, 6rem)" lineHeight="clamp(2rem, 8vw, 6rem)" marginY={majorScale(3)}>
          {frontMatter.title}
        </Heading>
        <img src={frontMatter.mainImageUrl} width='500' />
        <Pane>
          <MDXRemote {...source} />
        </Pane>
      </Container>
    </main>
  </Pane>
  )
}

// The returned value from `getStaticPaths` gets passed into `getStaticProps`
// Gets the slug so we know the slug and path of the blog post
// Async because reading and mapping through files take time but this is done at build time
export const getStaticPaths: GetStaticPaths = async () => {
    // Get the posts folder from `/posts` at the root directory
    const postsDirectory = path.join(process.cwd(), 'posts')
    const filenames = fs.readdirSync(postsDirectory)

    // Map through the files, for each fileName return a params object which includes the slug
    // remove the `mdx` extension
    const paths = filenames.map((name) => ({ params: { slug: name.replace('.mdx', '') } }))

    // Fallback purpose: if the `slug` doesn't exist -> 404 page
    // if fallback is true, the slug will be passed to getStaticProps
    // and attempt to find this blogpost
    return { paths, fallback: false }
}

type Params = {
    [param: string]: any
}

// The returned value from `getStaticProps` gets passed into the BlogPost
// Gets the content of the blog post
// Async because reading files take time but this is done at build time
export const getStaticProps: GetStaticProps<Params> = async ({ params: { slug } }: Params) => {
    // Get the file of the current slug
    const postPath = path.join(process.cwd(), 'posts', `${slug}.mdx`)
    const postFile = fs.readFileSync(postPath, 'utf-8')

    // Use the gray-matter and next-mdx-remote to read the metadata and content
    const { content, data } = matter(postFile)

    const mdxSource = await serialize(content, { scope: data })

    return { props: { source: mdxSource, frontMatter: data } }
}
