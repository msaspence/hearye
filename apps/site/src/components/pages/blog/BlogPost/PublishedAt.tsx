import Typography from '@mui/material/Typography'

console.log('</Typography>', Typography)
// import { formatDate, Dayjs } from '@hearye/dayjs'

export function PublishedAt({ at }: { at: Dayjs }) {
  return <Typography>hello</Typography>
  // return <Typography sx={{ color: '#777' }}>{formatDate(at)}</Typography>
}
