import React from 'react';
import { connect } from 'react-redux';
import { downloadInit } from '../actions';
import { MODE_ZIP } from '../constants';

import BuildToolbar from './BuildToolbar';
import IconDownload from 'react-icons/md/file-download';

@connect(
  state => ({
    mode: state.build.mode,
  }),
  {
    downloadInit,
  }
)
class BuildDownload extends React.Component {
  render() {
    return do {
      if (this.props.mode === MODE_ZIP) {
        <BuildToolbar>
          <button className="btn btn-success" onClick={this.props.downloadInit}>
            <IconDownload /> DOWNLOAD ZIP
          </button>
        </BuildToolbar>;
      } else {
        null;
      }
    };
  }
}

export default BuildDownload;
