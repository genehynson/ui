// Libraries
import React, {FC, lazy, Suspense, useContext} from 'react'
import {
  RemoteDataState,
  SpinnerContainer,
  TechnoSpinner,
} from '@influxdata/clockface'
import classnames from 'classnames'

// Components
import {MarkdownRenderer} from 'src/shared/components/views/MarkdownRenderer'
import {PipeContext} from 'src/flows/context/pipe'
import {PipeProp} from 'src/types/flows'

import {
  MARKDOWN_PIPE_PLACEHOLDER,
} from 'src/flows/pipes/Markdown/index'

const MarkdownMonacoEditor = lazy(() =>
  import('src/shared/components/MarkdownMonacoEditor')
)

const MarkdownPanel: FC<PipeProp> = ({Context}) => {
  const {data, update} = useContext(PipeContext)

  const handlePreviewClick = (): void => {
    update({mode: 'edit'})
  }

  const controls = [
    {
      title: 'Markdown',
      actions: [
        {
          title: () => data.mode === 'edit' ? 'Preview' : 'Edit',
          action: () => {
            update({mode: data.mode === 'edit' ? 'preview' : 'edit'})
          },
        },
              ],
    },
  ]

  const handleChange = (text: string): void => {
    update({text})
  }

  let panelContents = (
    <Suspense
      fallback={
        <SpinnerContainer
          loading={RemoteDataState.Loading}
          spinnerComponent={<TechnoSpinner />}
        />
      }
    >
      <MarkdownMonacoEditor
        script={data.text}
        onChangeScript={handleChange}
        autogrow
      />
    </Suspense>
  )

  if (data.mode === 'preview') {
    const markdownClassname = classnames(
      'flow-panel--markdown markdown-format',
      {
        'flow-panel--markdown__placeholder':
          data.text === MARKDOWN_PIPE_PLACEHOLDER,
      }
    )
    panelContents = (
      <div className={markdownClassname} onClick={handlePreviewClick}>
        <MarkdownRenderer text={data.text} />
      </div>
    )
  }

  return <Context>{panelContents}</Context>
}

export default MarkdownPanel
