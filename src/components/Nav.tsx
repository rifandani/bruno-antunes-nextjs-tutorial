import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function Nav() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" className={classes.title}>
          Cars
        </Typography>

        <Button color="inherit">
          <Link href="/">
            <a style={{ color: 'orange' }}>
              <Typography color="inherit">Home</Typography>
            </a>
          </Link>
        </Button>

        <Button color="inherit">
          <Link href="/person">
            <a style={{ color: 'white' }}>
              <Typography color="inherit">Person</Typography>
            </a>
          </Link>
        </Button>

        <Button color="inherit">
          <Link href="/ssgcars">
            <a style={{ color: 'white' }}>
              <Typography color="inherit">SSGCars</Typography>
            </a>
          </Link>
        </Button>

        <Button color="inherit">
          <Link href="/signup">
            <a style={{ color: 'white' }}>
              <Typography color="inherit">Signup</Typography>
            </a>
          </Link>
        </Button>

        <Button color="inherit">
          <Link href="/login">
            <a style={{ color: 'white' }}>
              <Typography color="inherit">Login</Typography>
            </a>
          </Link>
        </Button>

        <Button color="inherit">
          <Link href="/faq">
            <a style={{ color: 'orange' }}>
              <Typography color="inherit">FAQ</Typography>
            </a>
          </Link>
        </Button>

        <Button color="inherit">
          <Link href="/people">
            <a style={{ color: 'white' }}>
              <Typography color="inherit">People</Typography>
            </a>
          </Link>
        </Button>

        <Button color="inherit">
          <Link href="/ssrcars">
            <a style={{ color: 'white' }}>
              <Typography color="inherit">SSRCars</Typography>
            </a>
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
