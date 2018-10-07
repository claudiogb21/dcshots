import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {

    state = {
        navMenu: null,
        isNavMenuVisible: true,
        transitionOn: false,
        show: false
    }

    componentDidMount() {
        this.setState({
            navMenu: document.querySelector(".nav"),
        }, () => {
            if (window.outerWidth <= 1024) {
                this.setState({
                    isNavMenuVisible: false,
                })
            } else {
                this.setState({
                    show: true,
                })
            }
        });

        window.addEventListener('resize', () => {
            if (window.outerWidth > 1024) {
                this.setState({
                    isNavMenuVisible: true,
                    show: true
                })
            } else {
                this.setState({
                    isNavMenuVisible: false,
                    show: false
                });

                const grill = document.getElementById("menu-grill");
                grill.classList.remove("cross");
                grill.classList.remove("dot");
            }
        })
    }

    onClick(event) {
        const { transitionOn } = this.state;
        const links = document.querySelectorAll('.nav a');

        if (window.outerWidth <= 1024) {
            this.toggleMenu()
        }

        Array.from(links).map(link => {
            link.classList.remove("active")
        })
        event.target.classList.add("active")
    }

    toggleMenu() {
        const { transitionOn } = this.state;
        const grill = document.getElementById("menu-grill");

        if (!transitionOn) {
            this.setState(prev => ({
                transitionOn: !prev.transitionOn
            }), () => {

                this.showHideNavMenu();

                if (!grill.classList.contains("dot")) {
                    grill.classList.add("dot");

                    setTimeout(() => {
                        grill.classList.add("cross")
                    }, 450);

                    setTimeout(() => {
                        this.setState(prev => ({
                            transitionOn: !prev.transitionOn
                        }))
                    }, 900);

                } else {

                    grill.classList.remove("cross");
                    grill.classList.add("crossToDot");

                    setTimeout(() => {
                        grill.classList.remove("dot");
                        grill.classList.remove("crossToDot");
                        grill.classList.add("spread")
                    }, 500);

                    setTimeout(() => {
                        grill.classList.remove("spread");
                        this.setState(prev => ({
                            transitionOn: !prev.transitionOn
                        }))
                    }, 700);

                }
            })

        }
    }

    showHideNavMenu() {

        if (!this.state.show) {
            this.setState(prev => ({
                isNavMenuVisible: !prev.isNavMenuVisible,
                show: true
            }));

        } else {
            this.setState(prev => ({
                isNavMenuVisible: !prev.isNavMenuVisible,
            }));

            setTimeout(() => {
                this.setState(prev => ({
                    show: !prev.show
                }));
            }, 900);
        }

    }

    render() {
        const { toggleModal } = this.props;
        const { isNavMenuVisible, show } = this.state;
        const self = this;

        return (
            <header className="header">
                <div className="logo">
                    <a href="#">
                        <img src="img/ui/dcshots.png" />
                    </a>
                </div>

                <div className="btn-menu-grill" id="menu-grill">
                    <span className="clickableArea" onClick={this.toggleMenu.bind(this)}></span>
                    <div className="one"></div>
                    <div className="two"></div>
                    <div className="three"></div>
                    <div className="four"></div>
                    <div className="five"></div>
                    <div className="six"></div>
                    <div className="seven"></div>
                    <div className="eight"></div>
                    <div className="nine"></div>
                </div>

                {show && <div className={isNavMenuVisible ? "nav showMenu" : "nav hideMenu"}>
                    <ul className={isNavMenuVisible ? "slideIn" : "slideOut"}>
                        <li><Link to="/home" onClick={this.onClick.bind(this)}>home <i className="fas fa-home"></i></Link></li>
                        <li><Link to="/gallery" onClick={this.onClick.bind(this)}>fotos <i className="fas fa-camera-retro"></i></Link></li>
                        <li><a href="#" onClick={(self) => { toggleModal(); this.onClick(self) }}>contacto <i className="fas fa-envelope"></i></a></li>
                        <li><a href="#" onClick={this.onClick.bind(this)}>acerca de <i className="fas fa-user-alt"></i></a></li>
                    </ul>
                </div>}
            </header>
        )
    }
}