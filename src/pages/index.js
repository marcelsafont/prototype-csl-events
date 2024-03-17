import * as React from "react"
import { graphql } from 'gatsby';

const IndexPage = ({ data: {allExternalEvent} }) => {
  return (
   <main>
    <h1>hola</h1>
    {
      allExternalEvent.nodes.map((event) => (
        <div>
          <div key={event.id}>{event.title}</div>
          <RegistrationForm slug={event.id} />
        </div>
      ))
    }
   </main>
  )
}

const RegistrationForm = ({ slug }) => {
  return (
    <div>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )

}

export const EventsQuery = graphql`
  query{
    allExternalEvent {
      nodes {
        id
        title
      }
    }
  }
`

export default IndexPage

export const Head = () => <title>Home Page</title>
