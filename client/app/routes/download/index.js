import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import BuildStatus from '../../components/BuildStatus'

export default class DownloadRoute extends React.Component {

  render() {
    return (
      <main>
        <Helmet
          title="Download"
          meta={[
            {
              "name": "description",
              "content": "Download release, stable, or nightly builds of LWJGL 3"
            }
          ]}
        />
        <section className="container">
          <h1>Download LW<b>JGL</b> 3</h1>
          <p>The following zip bundles include LWJGL core plus all available bindings.</p>
          <div className="row">
            <div className="col-md-4 col-xs-12">
              <h2>Release</h2>
              <hr />
              <BuildStatus name="lwjgl_Release" />
              <p><a className="btn btn-outline-primary" href="http://build.lwjgl.org/release/latest/lwjgl.zip">DOWNLOAD RELEASE</a></p>
              <p>Latest official release.
              <br /><a href="https://github.com/LWJGL/lwjgl3/blob/master/doc/notes/latest.md">Release notes</a></p>
            </div>
            <div className="col-md-4 col-xs-12">
              <h2>Stable (newer)</h2>
              <hr />
              <BuildStatus name="LwjglReleases_NightlyToStable" />
              <p><a className="btn btn-outline-primary" href="http://build.lwjgl.org/stable/lwjgl.zip">DOWNLOAD STABLE</a></p>
              <p>Latest build that has been verified to work.</p>
            </div>
            <div className="col-md-4 col-xs-12">
              <h2>Nightly (newest)</h2>
              <hr />
              <BuildStatus name="lwjgl_Bundle" />
              <p><a className="btn btn-outline-primary" href="http://build.lwjgl.org/nightly/lwjgl.zip">DOWNLOAD NIGHTLY</a></p>
              <p>Bleeding edge, possibly broken.
              <br /><a href="https://github.com/LWJGL/lwjgl3/commits/master">Changelog</a></p>
            </div>
          </div>
        </section>

        <div className="area-dark p-y-2">
            <section className="container">
              <h3>Build from source?</h3>
              <p>Click below if you prefer to build from source:</p>
              <p>
                <Link className="btn btn-outline-info" to="/source">Source</Link>
                &nbsp;
                <a className="btn btn-outline-info" href="/guide#build-instructions">Build instructions</a>
              </p>
            </section>
        </div>

        <section className="container p-t-2">
          <p>Broken download? Let us know at the <a href="http://forum.lwjgl.org/">forums</a>.</p>

          <h2>Looking for LWJGL 2?</h2>

          <p>LWJGL 2 has moved but is still available. Please follow the links below to find what you're looking for:</p>
          <p>
            <a className="btn btn-outline-primary" href="http://legacy.lwjgl.org/">LWJGL 2 WEBSITE</a>
            &nbsp;
            <a className="btn btn-outline-primary" href="http://wiki.lwjgl.org/">LWJGL 2 WIKI</a>
          </p>
        </section>
      </main>
    )
  }

};