import React, { useReducer } from 'react'
import { css } from '@emotion/react'

const INITIAL_STATE = {
  name: '',
  email: '',
  newsletter: false,
  subject: '',
  message: '',
  status: 'IDLE'
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateField':
      return { ...state, [action.field]: action.value }

    case 'updateStatus':
      return { ...state, status: action.status }

    case 'reset':
    default:
      return INITIAL_STATE
  }
}

const Form = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const setStatus = (status) =>
    dispatch({
      type: 'updateStatus',
      status
    })

  const updateFieldValue = (field) => (e) => {
    let value
    if (field === 'newsletter') value = e.target.checked
    else value = e.target.value

    dispatch({
      type: 'updateField',
      field,
      value
    })
  }

  const submitForm = (e) => {
    e.preventDefault()
    setStatus('PENDING')

    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(state)
    })
      .then((res) => {
        if (!res.ok) throw Error(res.statusText)

        return res.json()
      })
      .then((res) => {
        // console.log(res);
        setStatus('SUCCESS')
      })
      .catch((_err) => {
        // console.error(err);
        setStatus('ERROR')
      })
  }

  if (state.status === 'SUCCESS') {
    return (
      <>
        <p
          css={css`
            padding: 0.5em 2em;
            border: 1px solid green;
            border-radius: 200px;
            background: rgba(50, 205, 50, 0.9);
            text-align: center;
            font-weight: 600;
            letter-spacing: 0.1rem;
            font-size: 2rem;
            color: white;

            @media (max-width: 1000px) {
              margin: 0 2rem;
            }
          `}
        >
          Message Sent!
        </p>
        <button
          type="reset"
          onClick={() => dispatch({ type: 'reset' })}
          css={css`
            display: block;
            margin-top: 2rem;
            margin-left: auto;
            padding: 10px 30px;
            text-transform: uppercase;
            border-radius: 200px;
            background-color: var(--color-primary);
            border: 1px solid currentColor;
            color: #fff;
            transition: all 0.2s;

            &:hover {
              background-color: #0d45b7;
            }

            &:active {
              transform: translateY(2px);
              outline: none;
            }

            @media (max-width: 1000px) {
              margin-right: 2rem;
            }
          `}
        >
          Reset
        </button>
      </>
    )
  }

  return (
    <>
      {state.status === 'ERROR' && (
        <p
          css={css`
            padding: 0.5em 2em;
            margin: 0 0 2rem;
            border: 1px solid red;
            border-radius: 200px;
            background: rgba(255, 200, 200, 0.9);
            text-align: center;
            font-weight: 600;
            letter-spacing: 0.1rem;
            font-size: 2rem;
            // color: white;

            @media (max-width: 1000px) {
              margin: 0 2rem;
            }
          `}
        >
          Something went wrong. Please try again.
          <span role="img" aria-label="sad face">
            😟
          </span>
        </p>
      )}
      <form className={`contact-form ${state.status === 'PENDING' && 'pending'}`} name="contact" onSubmit={submitForm}>
        <div className="contact-form--row">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your name"
            value={state.name}
            onChange={updateFieldValue('name')}
            required
          />
        </div>
        <div className="contact-form--row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
            value={state.email}
            onChange={updateFieldValue('email')}
            required
          />
        </div>
        <div className="contact-form--row">
          <label htmlFor="news">Newsletter?</label>
          <input
            type="checkbox"
            name="news"
            id="news"
            value={state.newsletter}
            onChange={updateFieldValue('newsletter')}
          />
        </div>
        <div className="contact-form--row">
          <label htmlFor="email">Subject</label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Email Subject"
            value={state.subject}
            onChange={updateFieldValue('subject')}
          />
        </div>
        <div className="contact-form--row">
          <label htmlFor="message">Send Me A Message</label>
          <textarea
            name="message"
            id="message"
            placeholder="Your message"
            value={state.message}
            onChange={updateFieldValue('message')}
            required
          />
        </div>
        <input type="submit" value="Send" />
      </form>
    </>
  )
}

export default Form
