// importing the required libraries and packages
import React from 'react'
import { Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'

export default function PdfViewer(props) {
  return <Viewer fileUrl={`${process.env.REACT_APP_SERVER_BASE_URL}/cv/${props.CV}`} />
}
