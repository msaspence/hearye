import { Skeleton } from '../../components/Skeleton'
export default function Bbb() {
  return (
    <>
      <h1>bbb</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1 }}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    </>
  )
}
