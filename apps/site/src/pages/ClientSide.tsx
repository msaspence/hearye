import { useState } from 'react'

export default function ClientSide() {
  const [value, setValue] = useState(0)
  return (
    <>
      <h1>Client Side</h1>
      <div>{value}</div>
      <div onClick={() => setValue((x) => x + 1)}>Increment</div>
    </>
  )
}
