import React from 'react'

export { Page }

function Page({ message }: { message: string }) {
  return <h1>Hello {message}</h1>
}

export function render() {
  return 'hello'
}
