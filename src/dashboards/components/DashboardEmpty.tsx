import React, {Component} from 'react'
import {Cell} from 'src/types/dashboard'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import uuid from 'uuid'

import {addDashboardCellAsync} from 'src/dashboards/actions'
import {GRAPH_TYPES} from 'src/dashboards/graphics/graph'

interface Dashboard {
  id: string
  cells: Cell[]
}

interface Props {
  dashboard: Dashboard
  addDashboardCell: (dashboard: Dashboard, cell?: Cell) => void
}

const mapDispatchToProps = dispatch => ({
  addDashboardCell: bindActionCreators(addDashboardCellAsync, dispatch),
})

@connect(null, mapDispatchToProps)
class DashboardEmpty extends Component<Props> {
  constructor(props) {
    super(props)
  }

  public handleAddCell = type => () => {
    const {dashboard, addDashboardCell} = this.props
    addDashboardCell(dashboard, type)
  }

  public render() {
    return (
      <div className="dashboard-empty">
        <p>
          This Dashboard doesn't have any <strong>Cells</strong>,<br />why not
          add one?
        </p>
        <div className="dashboard-empty--menu">
          {GRAPH_TYPES.map(graphType => (
            <div key={uuid.v4()} className="dashboard-empty--menu-option">
              <div onClick={this.handleAddCell(graphType.type)}>
                {graphType.graphic}
                <p>{graphType.menuOption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default DashboardEmpty
