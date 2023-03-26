import React from 'react'
import Layout from '../components/layout.js'
import Form from '../components/contactForm.js'

const Contact = () => (
  <Layout>
    <div className="container">
      <section className="section-form">
        <h1 className="heading__secondary color-primary">Contact</h1>
        <h2 className="heading__tertiary">Send Me a Message</h2>

        <Form />
      </section>
      <section className="section-email">
        <h2 className="heading__tertiary">Want to contribute your artcile?</h2>
        <br />
        <p>Get in touch with me here: bsll2@cam.ac.uk</p>
      </section>
    </div>
  </Layout>
)

export default Contact
