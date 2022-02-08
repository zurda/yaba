import { Pane, Button, SmallPlusIcon } from 'evergreen-ui'
import { FC } from 'react'

const FolderList: FC<{ folders: any[] }> = ({ folders }) => {
  return (
    <Pane>
      <Button iconBefore={SmallPlusIcon} appearance="minimal" height={48}>
        new folder
      </Button>
    </Pane>
  )
}

FolderList.defaultProps = {
  folders: [],
}

export default FolderList