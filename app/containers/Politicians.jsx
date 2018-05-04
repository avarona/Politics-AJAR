import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GridList, GridTile } from 'material-ui';

import Politician from '../components/Politician.jsx';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    overflowY: 'auto',
  },
  gridTile: {
    margin: '1%',
  }
}

class Politicians extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {politicians} = this.props;
    // console.log(politicians, 'politicians array')
    return (
      <div>
        <GridList
          style={styles.gridList}
          cellHeight={'auto'}
          cols={3}
        >
          {
            politicians.map(politician => {
              return (
                <GridTile
                  style={styles.gridTile}
                  key={politician.id}
                >
                  <Politician
                    politician={politician}
                  />
                </GridTile>
              )
            })
          }
        </GridList>
      </div>
    )
  }
}

/* REDUX CONTAINER */

export default connect()(Politicians);
