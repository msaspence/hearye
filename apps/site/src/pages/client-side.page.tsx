import { useState } from 'react'

export function Page() {
  const [value, setValue] = useState(0)
  return (
    <>
      <h1>Client Side</h1>
      <div>{value}</div>
      <a href="/">Home</a>
      <div onClick={() => setValue((x) => x + 1)}>Increment</div>
    </>
  )
}
