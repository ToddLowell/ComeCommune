import React from 'react'
import Layout from '../components/layout.js'

const NotFound = () => (
  <Layout>
    <div className="error404">
      <div className="center align-center">
        <p className="error404--text">Oops, there&apos;s nothing here! That&apos;s okay, everyone makes mistakes.</p>
        <p className="error404--text">Click the button to return to the home page:</p>
        <a href="index.html" className="btn">
          Go Home
        </a>
      </div>
    </div>
  </Layout>
)

export default NotFound
