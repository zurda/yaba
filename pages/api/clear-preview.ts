import { NextApiResponse } from 'next'

const codePreview = (req, res: NextApiResponse) => {
  res.clearPreviewData()
  res.end('Preview mode disabled')
}

export default codePreview
