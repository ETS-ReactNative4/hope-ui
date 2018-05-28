// Dependencias
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import {
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  Avatar,
} from 'material-ui';

// Component
import cls from './MenuBar.css';
import Logo from './img/logo.svg';

import Profile from '../../components/Client/Jobs/Job/img/0.jpeg';

class MenuAppBar extends Component {
  state = {
    anchorEl: null
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    let menu = null; 
    if (this.props.auth) {
      menu = (
        <AppBar topfixed="true" className={cls.AppBar} elevation={0}>
          <Toolbar className={cls.Toolbar}>
            <Typography variant="title" color="secondary" className={cls.flex}>
              <AnchorLink className={cls.styleAnchor} href="#main">
                <img src={Logo} className={cls.Applogo} alt="logo" />
              </AnchorLink>
            </Typography>
            <MenuItem component={Link} to="/">
              Agendar servicio
            </MenuItem>
            <MenuItem>
              Mis Trabajos
            </MenuItem>
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
              <Avatar
                src={Profile}/>
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
                <MenuItem onClick={this.handleClose}>Mi Perfil</MenuItem>
                <MenuItem onClick={this.props.logout} component={Link} to="/cliente/login">
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
                <AnchorLink className={cls.styleAnchor} href="#main">
                  <img src={Logo} className={cls.Applogo} alt="logo" />
                </AnchorLink>
              </Typography>
              <MenuItem>
                <AnchorLink className={cls.styleAnchor} href="##">Agendar servicio</AnchorLink>
              </MenuItem>
              <MenuItem>
                <AnchorLink className={cls.styleAnchor} href="##">Nosotros</AnchorLink>
              </MenuItem>
              <MenuItem>
                <AnchorLink className={cls.styleAnchor} href="#works">¿Cómo Funciona?</AnchorLink>
              </MenuItem>
              <MenuItem>
                <AnchorLink className={cls.styleAnchor} href="##">Únete a Noc Noc</AnchorLink>
              </MenuItem>
              <MenuItem>
                <Button className={cls.styleAnchor} component={Link} to="/cliente/login" >Iniciar Sesión</Button>
              </MenuItem>
            </Toolbar>
          </AppBar>
        );
      }
    return (
      <div className={cls.root}>
        {menu}
      </div>
    );
  }
}

export default MenuAppBar;