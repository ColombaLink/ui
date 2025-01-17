import { useState } from 'react'
import {
  color,
  BasedIcon,
  AttachmentIcon,
  Text,
  MoreIcon,
  useContextMenu,
  ContextItem,
  DeleteIcon,
  EditIcon,
  ExternalLinkAltIcon,
  DownloadIcon,
  ZoomInIcon,
} from '~'
import { styled } from 'inlines'

const StyledUploadedFile = styled('div', {
  display: 'flex',
  overflow: 'hidden',
  border: `1px solid ${color('border')}`,
  backgroundColor: color('background'),
  paddingLeft: 12,
  borderRadius: 8,
  alignItems: 'center',
  gap: 12,
  marginBottom: 8,
  position: 'relative',
  cursor: 'auto',
})

const StyledMoreIcon = styled('div', {
  position: 'absolute',
  width: 24,
  height: 24,
  right: 16,
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (hover: hover)': {
    '&:hover': {
      cursor: 'pointer',
      background: color('background2'),
    },
  },
})

const CacheBackground = ({ file }) => {
  if (!file.src) {
    file.src = URL.createObjectURL(file)
  }
  const [url, setUrl] = useState(file.src)

  return (
    <div
      style={{
        height: 62,
        width: 62 + 4,
        marginLeft: -12,
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
      }}
    >
      <img
        style={{ display: 'none' }}
        src={file.src}
        onLoad={() => {
          setUrl(file.src)
        }}
      />
    </div>
  )
}

export const UploadedFileItem = ({
  file,
  handleClickUpload,
  deleteSpecificFile,
  openInNewTab,
  id,
  replaceSpecificFile,
  duplicateFile,
  downloadFile,
  renameFile,
  fullScreenView,
}) => {
  const contextHandler = useContextMenu(
    ContextOptions,
    {
      handleClickUpload,
      deleteSpecificFile,
      id,
      replaceSpecificFile,
      openInNewTab,
      duplicateFile,
      downloadFile,
      renameFile,
      fullScreenView,
    },
    { placement: 'right' }
  )

  // console.log(file, 'file??')

  // screenshot
  // console.log(getImageSrcFromId(file?.id))
  // console.log('-------------______>', file)

  return (
    <StyledUploadedFile>
      {/* image */}
      {file?.type?.includes('image') && <CacheBackground file={file} />}
      {/* movie */}
      {file?.type?.includes('video') && (
        <div
          style={{
            height: 62,
            width: 62,
            backgroundColor: color('background2'),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BasedIcon size={20} />
        </div>
      )}
      {/* audio */}
      {file?.type?.includes('audio') && (
        <div
          style={{
            height: 62,
            width: 62,
            backgroundColor: color('background2'),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BasedIcon size={20} />
        </div>
      )}

      {file?.type?.includes('image') ||
        file?.type?.includes('video') ||
        file?.type?.includes('audio') ? null : (
        <AttachmentIcon />
      )}
      <Text
        style={{
          minHeight: '20px',
          marginTop: 6,
          marginBottom: 6,
          // maxWidth: '25vw',
          maxWidth: '90%',
          flexShrink: 0,
        }}
        weight={400}
      >
        {file?.name}
      </Text>

      <StyledMoreIcon onClick={contextHandler}>
        <MoreIcon />
      </StyledMoreIcon>
    </StyledUploadedFile>
  )
}

const ContextOptions = ({
  // handleClickUpload,
  deleteSpecificFile,
  id,
  openInNewTab,
  downloadFile,
  renameFile,
  fullScreenView,
}) => {
  return (
    <>
      {/* TODO if multiple file upload works or if multiple file then option to duplicate */}
      {/* <ContextItem onClick={() => duplicateFile()} icon={CopyIcon}>
        Duplicate
      </ContextItem> */}
      <ContextItem onClick={() => fullScreenView()} icon={ZoomInIcon}>
        Expand
      </ContextItem>
      <ContextItem onClick={() => openInNewTab()} icon={ExternalLinkAltIcon}>
        Open in new tab
      </ContextItem>
      <ContextItem onClick={() => renameFile()} icon={EditIcon}>
        Rename
      </ContextItem>
      {/* TODO if multiple file upload works or if multiple file then option to replace specific id file */}
      {/* <ContextItem onClick={() => replaceSpecificFile(id)} icon={ReplaceIcon}>
        Replace
      </ContextItem> */}
      <ContextItem onClick={() => downloadFile()} icon={DownloadIcon}>
        Download
      </ContextItem>
      <ContextItem
        onClick={() => deleteSpecificFile(id)}
        icon={DeleteIcon}
        style={{ borderTop: `1px solid ${color('border')}` }}
      >
        Delete
      </ContextItem>
    </>
  )
}
