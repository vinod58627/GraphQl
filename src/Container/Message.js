import React, { useState} from 'react'
import { useQuery ,gql } from '@apollo/client';

const GET_BOOKS = gql`
query GetBooks {
  books {
    title
    author
    age
  }
  name {
    titl
    aurthor
  }
  user{
    id
    name
    username
    address {
      city
      street
      suite
      zipcode
    }
  }
}
`;
const Message = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {data.books.map((book, index) => (
          <li key={index}>
            <strong>{book.title}</strong> by {book.author}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Message