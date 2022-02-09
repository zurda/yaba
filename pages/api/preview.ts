import { NextApiResponse } from 'next'

const preview = (req, res: NextApiResponse) => {
  res.setPreviewData({})
  // redirect the user back to the page they wanted to see the preview on
  res.redirect(req.query.route)
}

export default preview
