import { Box, Typography, IconButton } from '@mui/material';
import { GitHub, LinkedIn, Facebook, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box mt={4} textAlign="center" className="MuiBox-root">
      <Typography variant="caption" className="MuiTypography-caption">© 2025 SwapSmart</Typography>
      <Box mt={1}>
        <IconButton href="https://github.com" className="MuiIconButton-root">
          <GitHub />
        </IconButton>
        <IconButton href="https://linkedin.com" className="MuiIconButton-root">
          <LinkedIn />
        </IconButton>
        <IconButton href="https://facebook.com" className="MuiIconButton-root">
          <Facebook />
        </IconButton>
        <IconButton href="https://instagram.com" className="MuiIconButton-root">
          <Instagram />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;