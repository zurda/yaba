import { FC } from 'react'
import { Pane, Heading, Paragraph, Button, majorScale } from 'evergreen-ui'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

const PostPreview: FC<{ post: { title: string; summary: string; slug: string; publishedOn: string } }> = ({ post }) => {
  return (
    <Pane padding={majorScale(2)} border borderRadius={4}>
      <Heading size={700} marginBottom={majorScale(2)}>
        {post.title}
      </Heading>
      <Paragraph marginBottom={majorScale(2)}>{post.summary}</Paragraph>
      <Paragraph marginBottom={majorScale(2)}>{format(parseISO(post.publishedOn), 'LLL do, yyyy')}</Paragraph>
      <Pane textAlign="right">
        <Link href={`/blog/${post.slug}`}>
          <a>
            <Button appearance="minimal" intent="success" height={48}>
              Read
            </Button>
          </a>
        </Link>
      </Pane>
    </Pane>
  )
}
export default PostPreview
