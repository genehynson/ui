// Libraries
import React, {
  useContext,
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react'

// Components
import {Overlay} from '@influxdata/clockface'
import ClientCodeCopyPage from 'src/writeData/components/ClientCodeCopyPage'

// Constants
import {CLIENT_DEFINITIONS} from 'src/writeData'

// Utils
import {CopyToClipboardContext} from 'src/flows/context/panel'
import ExecuteCodeBlockProvider from 'src/writeData/components/ExecuteCodeBlock'
import WriteDataDetailsProvider from 'src/writeData/components/WriteDataDetailsContext'
import {Provider as TemplateProvider} from 'src/shared/components/CodeSnippet'
import {FlowQueryContext, Stage} from 'src/flows/context/flow.query'

interface Props {
  panelId: string
}

const TOKEN_PLACEHOLDER = '<INFLUXDB_TOKEN>'

const PanelQueryOverlay: FC<Props> = ({panelId}) => {
  // FIXME: Remove this to use a dropdown or similar so we can select the contentID/language
  const contentID = 'python'

  const {generateMap} = useContext(FlowQueryContext)
  const {visible, setVisibility} = useContext(CopyToClipboardContext)

  const getPanelQuery = useCallback(
    (panelId: string): string => {
      const stage = generateMap().find((stage: Stage) => {
        return !!stage.instances.find(instance => instance.id == panelId)
      })

      return stage?.text ?? ''
    },
    [generateMap]
  )

  return (
    <Overlay visible={visible}>
      <Overlay.Container>
        <Overlay.Header
          title={`Export to ${CLIENT_DEFINITIONS[contentID].name} Client Library`}
          onDismiss={() => setVisibility(!visible)}
        />
        <Overlay.Body>
          <TemplateProvider variables={{token: TOKEN_PLACEHOLDER}}>
            <WriteDataDetailsProvider>
              <ExecuteCodeBlockProvider contentID={contentID} query={getPanelQuery(panelId)}>
                <ClientCodeCopyPage
                  contentID={contentID}
                  query={getPanelQuery(panelId)}
                />
              </ExecuteCodeBlockProvider>
            </WriteDataDetailsProvider>
          </TemplateProvider>
        </Overlay.Body>
      </Overlay.Container>
    </Overlay>
  )
}

export default PanelQueryOverlay
