import { useMemo, useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import ModuleCard from './components/ModuleCard'
import './App.css'

const modules = [
  {
    title: 'Strategy & Roadmap',
    description: 'Align vision, OKRs, release planning, and strategic business goals in one command center.',
    tags: ['Roadmap', 'Goals', 'Plans'],
  },
  {
    title: 'RAID & Risk Management',
    description: 'Track risks, assumptions, issues, and dependencies with status, owners, and mitigation actions.',
    tags: ['RAID', 'Risks', 'Dependencies'],
  },
  {
    title: 'Action Items & Delivery',
    description: 'Manage delivery tasks, owners, due dates and team handoffs from retrospective to launch.',
    tags: ['Actions', 'Tasks', 'Delivery'],
  },
  {
    title: 'Handbook & Knowledge Base',
    description: 'Create playbooks, decision logs, stakeholder briefs, and knowledge articles in reusable templates.',
    tags: ['Guides', 'Templates', 'Knowledge'],
  },
  {
    title: 'AI Copilot & Insights',
    description: 'Ask the assistant for status summaries, decision rationale, and meeting action item suggestions.',
    tags: ['AI', 'Assistant', 'Insights'],
  },
]

function App() {
  const [darkMode, setDarkMode] = useState(true)

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: { main: '#4f46e5' },
          background: {
            default: darkMode ? '#0f172a' : '#f8fafc',
            paper: darkMode ? '#111827' : '#ffffff',
          },
        },
      }),
    [darkMode],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="main" sx={{ minHeight: '100vh', pb: 8 }}>
        <AppBar position="sticky" color="primary" elevation={4} sx={{ mb: 4 }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: '#ffffff', color: '#1e293b' }}>PM</Avatar>
              <Typography variant="h6" component="div">
                PM Central
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={() => setDarkMode((prev) => !prev)}
                    color="secondary"
                  />
                }
                label={darkMode ? <DarkModeIcon /> : <LightModeIcon />}
              />
              <Button variant="contained" color="secondary" href="#modules">
                Explore modules
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg">
          <Box className="hero-section">
            <Typography variant="overline" color="primary.light" gutterBottom>
              Product management platform
            </Typography>
            <Typography variant="h2" component="h1" gutterBottom>
              PM Central — decision-ready management, collaboration, and AI assistance
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Build faster, keep stakeholders aligned, and surface program insights with a centralized handbook, RAID tracker, action planner, and AI Copilot.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3 }}>
              <Button variant="contained" size="large" href="#modules">
                View workflow
              </Button>
              <Button variant="outlined" size="large" href="#roadmap">
                Phase roadmap
              </Button>
            </Box>
          </Box>

          <Box className="section-preview" sx={{ mt: 6 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box className="preview-card">
                  <Typography variant="subtitle2" color="primary.main" gutterBottom>
                    Core value
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    Single source of truth for program decisions
                  </Typography>
                  <Typography color="text.secondary">
                    Unify strategy, stakeholder context, team actions, and lessons learned with built-in knowledge templates and traceable decisions.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box className="preview-card">
                  <Typography variant="subtitle2" color="primary.main" gutterBottom>
                    AI guidance
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    Generate status summaries and meeting action plans
                  </Typography>
                  <Typography color="text.secondary">
                    Surface the right next steps with NLP summaries, prompt-driven assistants, and AI-based RAID risk recommendations.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box className="preview-card">
                  <Typography variant="subtitle2" color="primary.main" gutterBottom>
                    Collaboration
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    Keep stakeholders aligned across launches
                  </Typography>
                  <Typography color="text.secondary">
                    Create decision logs, PRDs, and stakeholder briefs with templates built for PMOs and product organizations.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box id="modules" sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom>
              Foundational modules
            </Typography>
            <Typography color="text.secondary" paragraph>
              The frontend scaffold is designed for rapid expansion: dashboard, major PM modules, AI conversation canvas, and secure user workflows.
            </Typography>
            <Grid container spacing={3}>
              {modules.map((module) => (
                <Grid item xs={12} md={6} key={module.title}>
                  <ModuleCard module={module} />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box id="roadmap" sx={{ mt: 8, mb: 8 }}>
            <Typography variant="h4" gutterBottom>
              Phase 1 roadmap
            </Typography>
            <Grid container spacing={3}>
              {[
                { title: 'Launch-ready UI', body: 'Design dashboard, modules, responsive navigation, and dark mode support.' },
                { title: 'Core workflows', body: 'Implement handbook templates, RAID tracking, action item workflows, and status summaries.' },
                { title: 'AI assistant', body: 'Add prompt-driven copilots, context-aware recommendations, and API integration hooks.' },
              ].map((item) => (
                <Grid item xs={12} md={4} key={item.title}>
                  <Box className="roadmap-card">
                    <Typography variant="subtitle2" color="primary.main" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography>{item.body}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
