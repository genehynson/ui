// Libraries
import React, {FC, ChangeEvent, useContext} from 'react'

// Contexts
import {FlowContext} from 'src/flows/context/flow.current'

// Components
import {Icon, IconFont} from '@influxdata/clockface'

interface Props {
  id: string
}

const FlowPanelTitle: FC<Props> = ({id}) => {
  const {flow} = useContext(FlowContext)
  const title = flow.meta.get(id).title
  const onTitleChange = (value: string) => {
    flow.meta.update(id, {
      title: value,
    })
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onTitleChange(e.target.value)
  }

  return (
    <div className="flow-panel--title">
      <input
        type="text"
        value={title}
        onChange={onChange}
        placeholder="Enter an ID"
        className="flow-panel--title-input"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
      <Icon glyph={IconFont.Pencil} className="flow-panel--title-icon" />
    </div>
  )
}

export default FlowPanelTitle
