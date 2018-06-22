// Dependencias
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { withStyles } from 'material-ui/styles';
import {
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  Avatar,
  Modal,
  Grid
} from 'material-ui';

// Component
import cls from './MenuBar.css';
import Logo from './img/logo.svg';
import Login from '../../components/Client/Login/Login';

const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
});

class AppBarMenu extends Component {
  state = {
    anchorEl: null,
    openLogin: false,
    open: false
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleOpen = (modal) => {
    if (localStorage.getItem('signInAs') === 'customer') {
      this.props.history.push('/cliente')
    }
    if (localStorage.getItem('signInAs') === 'agent') {
      this.props.history.push('/agente')
    }
    this.setState({ openLogin: true });
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    this.setState({ open: false });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;
    let menu = null;
    if (this.props.auth) {
      menu = (
        <AppBar topfixed="true" className={cls.AppBar} elevation={0}>
          <Toolbar className={cls.Toolbar}>
            <Typography variant="title" color="secondary" className={cls.flex}>
              <Link to="/cliente">
                <img src={Logo} className={cls.Applogo} alt="logo" />
              </Link>
            </Typography>
            <MenuItem component={Link} to="/cliente">
              Dashboard
            </MenuItem>
            <MenuItem component={Link} to="/cliente/trabajos">
              Mis Trabajos
            </MenuItem>
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
              {this.props.profile === null ? (
                <Avatar>
                  {localStorage.getItem('first_name').charAt(0)}{localStorage.getItem('last_name').charAt(0)}
                </Avatar>
              ) : (
                <Avatar
                  src={this.props.profile}/>
              )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose} component={Link} to="/cliente/perfil/info">Mi Perfil</MenuItem>
                <MenuItem onClick={this.props.logout} component={Link} to="/">
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>        
      )
      } else {
        menu = (
          <AppBar topfixed="true" className={cls.AppBar} elevation={2}>
            <Toolbar className={cls.Toolbar}>
              <Typography variant="title" color="secondary" className={cls.flex}>
                <AnchorLink href="#main">
                  <img src={Logo} className={cls.Applogo} alt="logo" />
                </AnchorLink>
              </Typography>
              <MenuItem>
                <AnchorLink className={cls.styleAnchor} href="#works">¿Cómo Funciona?</AnchorLink>
              </MenuItem>
              <MenuItem>
                <AnchorLink className={cls.styleAnchor} href="#Services">Servicios</AnchorLink>
              </MenuItem>
              <MenuItem>
                <AnchorLink className={cls.styleAnchor} href="#Download">Descarga</AnchorLink>
              </MenuItem>
              <MenuItem>
                <Button className={cls.styleAnchor} onClick={() => this.handleOpen("login")} >Iniciar Sesión</Button>
              </MenuItem>
            </Toolbar>
          </AppBar>
        );
      }
    return (
      <div className={cls.root}>
        {menu}
        <Grid container justify="center" className={cls.style}>
          <Grid item xs={12} md={8} sm={12}>
            <Grid container align="center">
              <Grid item xs={12} sm={4} align="right">
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <div className={`${cls.Modal} ${classes.paper}`}>
                    <Login close={this.handleClose} />
                  </div>
                </Modal>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const MenuAppBar = withStyles(styles)(AppBarMenu);

export default withRouter(MenuAppBar);