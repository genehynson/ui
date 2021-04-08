import React, {FC, useContext} from 'react'
import {Form, Input, InputType, ComponentSize} from '@influxdata/clockface'

import {PipeContext} from 'src/flows/context/pipe'

const Slack: FC = () => {
  const {data, update} = useContext(PipeContext)

  const updateUrl = text => {
    update({
      endpointData: {
        ...data.endpointData,
        url: text,
      },
    })
  }

  if (data.endpoint !== 'slack') {
    return
  }

  return (
    <Form.Element label="Incoming Webhook URL" required={true}>
      <Input
        name="url"
        type={InputType.Text}
        placeholder="ex: https://hooks.slack.com/services/X/X/X"
        value={data.endpointData.url}
        onChange={updateUrl}
        size={ComponentSize.Medium}
      />
    </Form.Element>
  )
}

export default Slack
