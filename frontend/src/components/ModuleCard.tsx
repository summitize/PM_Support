import { Box, Chip, Card, CardContent, Stack, Typography } from '@mui/material'

interface ModuleProps {
  module: {
    title: string
    description: string
    tags: string[]
  }
}

export default function ModuleCard({ module }: ModuleProps) {
  return (
    <Card elevation={2} sx={{ borderRadius: 3, height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {module.title}
        </Typography>
        <Typography color="text.secondary" paragraph>
          {module.description}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {module.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" color="primary" />
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}
