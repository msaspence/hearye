import Box from '@mui/material/Box'

type Role = 'close' | 'min' | 'max'
export function WindowControl({ role }: { role: Role }) {
  return (
    <Box
      sx={{
        background: BACKGROUNDS[role],
        height: '6px',
        width: '6px',
        marginX: '2px',
        borderRadius: '10px',
      }}
    ></Box>
  )
}

const BACKGROUNDS: Record<Role, string> = {
  close: '#FF595A',
  min: '#FFBA42',
  max: '#1BC84E',
}
