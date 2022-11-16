import { Skeleton } from '../../components/Skeleton'
export default function Aaa() {
  return (
    <>
      <h1>aaa</h1>
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
