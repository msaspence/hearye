import { useSkeletonWidth } from '../SkeletonWidth'

export function Skeleton() {
  const width = useSkeletonWidth()
  return (
    <div
      style={{
        height: '20px',
        width,
        marginBottom: '5px',
        background: 'grey',
      }}
    />
  )
}
