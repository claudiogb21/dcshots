import React, { Component } from 'react';

export default class Header extends Component {

    state = {
        currentSlide: 0,
        slides: [
            {
                title: 'session 23, image 1, 16/06/2018 ',
                src: 'img/slider/slider1.jpg',
                active: true
            },
            {
                title: 'image 2',
                src: 'img/slider/slider2.jpg',
                active: false
            },
            {
                title: 'image 3',
                src: 'img/slider/slider3.jpg',
                active: false
            },
            {
                title: 'image 4',
                src: 'img/slider/slider4.jpg',
                active: false
            }
        ],
        currentTimmer: null,
        currentSecondaryTimmer: null,
        currentInterval: null,
        hold: false,
        readyImagesCounter: 0
    }

    componentWillMount() {
        this.props.toggleLoading(true)
    }

    componentDidMount() {
        this.loadImages();
        setTimeout(() => {
            this.autoSizer();
            this.autoChangeSlide();
        }, 50);
        window.addEventListener('resize', () => {
            this.autoSizer();
        });

    }

    componentDidUpdate() {
        const { readyImagesCounter } = this.state;
        if (readyImagesCounter === this.state.slides.length) {
            this.props.toggleLoading(false)
            this.autoSizer();
        }
    }

    loadImages() {
        this.state.slides.map(pic => {
            let img = new Image();
            img.src = pic.src;

            img.onload = () => {
                pic.loaded = true;
                this.setState(prevState => ({
                    readyImagesCounter: prevState.readyImagesCounter + 1
                }))
            }
        })
    }

    changeSlideTransition(action) {
        let { currentTimmer, currentSecondaryTimmer, hold } = this.state;

        if (!hold) {
            this.setState({
                hold: true
            });

            currentTimmer && currentSecondaryTimmer && this.setState(prevState => ({
                currentTimmer: clearTimeout(prevState.currentTimmer),
                currentSecondaryTimmer: clearTimeout(prevState.currentSecondaryTimmer)
            }));

            document.querySelector('.slider .singleSlide').classList.add('fadeOutIn');

            this.setState({
                currentTimmer: setTimeout(() => {
                    this.changeSlide(action);
                    this.autoChangeSlide()
                }, 600),
                currentSecondaryTimmer: setTimeout(() => {
                    document.querySelector('.slider .singleSlide').classList.remove('fadeOutIn');
                    this.setState({
                        hold: false
                    })
                }, 1200)
            })

        }
    }

    autoChangeSlide() {
        let { currentInterval } = this.state;

        currentInterval && this.setState({
            currentInterval: clearInterval(this.state.currentInterval)
        })

        this.setState({
            currentInterval: setInterval(() => {
                this.changeSlide('next');
            }, 20000)
        })
    }

    changeSlide(action) {
        const { slides, currentSlide } = this.state;
        let newSlides = slides;

        if (action === "next" && currentSlide < (slides.length - 1)) {
            newSlides[currentSlide].active = false;
            newSlides[(currentSlide + 1)].active = true;

            this.setState(prevState => ({
                slides: newSlides,
                currentSlide: prevState.currentSlide + 1
            }), () => { this.autoSizer() })

        } else if (action === "next" && currentSlide === (slides.length - 1)) {
            newSlides[currentSlide].active = false;
            newSlides[0].active = true;

            this.setState(prevState => ({
                slides: newSlides,
                currentSlide: 0
            }), () => { this.autoSizer() })

        } else if (action === "prev" && currentSlide > 0) {
            newSlides[currentSlide].active = false;
            newSlides[(currentSlide - 1)].active = true;

            this.setState(prevState => ({
                slides: newSlides,
                currentSlide: prevState.currentSlide - 1
            }), () => { this.autoSizer() })

        } else if (action === "prev" && currentSlide === 0) {
            newSlides[currentSlide].active = false;
            newSlides[slides.length - 1].active = true;

            this.setState(prevState => ({
                slides: newSlides,
                currentSlide: (slides.length - 1)
            }), () => { this.autoSizer() })

        } else {
            newSlides[currentSlide].active = false;
            newSlides[action].active = true;

            this.setState(prevState => ({
                slides: newSlides,
                currentSlide: action
            }), () => { this.autoSizer() })
        }

    }

    autoSizer() {
        let images = Array.from(document.querySelectorAll('.slider img'));
        const wW = window.innerWidth;
        const wH = window.innerHeight;

        images.map(img => {
            let iW = img.offsetWidth;
            let iH = img.offsetHeight;

            // Set Height and Width
            if (iW < wW) {
                img.style.marginLeft = 0;
                img.style.height = 'auto';
                img.style.width = '100%';
                iW = img.offsetWidth;
                iH = img.offsetHeight;
            }
            if (iH < wH) {
                img.style.marginTop = 0;
                img.style.height = '100vh';
                img.style.width = 'auto';
                iW = img.offsetWidth;
                iH = img.offsetHeight;
            }

            // Set Y and X position
            if (iH > wH) {
                img.style.marginTop = parseInt(- (iH - wH) / 2) + 'px';
            }
            if (iW > wW) {
                img.style.marginLeft = parseInt(- (iW - wW) / 2) + 'px';
            }
        })

    }

    render() {
        let { slides } = this.state;
        const { showModal } = this.props;

        return (
            <div className={"slider" + (showModal ? " blurry" : "")}>
                <ul className="slideIndicator">
                    {slides.map((slide, index) => {
                        return <li key={slide.title} className={slide.active ? 'active' : ''} onClick={() => this.changeSlideTransition(index)}>0{index + 1}</li>
                    })}
                </ul>
                {/* <span className="arrow left" onClick={() => this.changeSlideTransition('prev')}></span>
                <span className="arrow right" onClick={() => this.changeSlideTransition('next')}></span> */}
                <div className="mesh"></div>
                <div className="gradient"></div>
                <div className="singleSlide">
                    {slides.map(slide => {
                        return <img src={slide.src} alt={slide.title} key={slide.title} className={slide.active ? 'active zoomIn' : ''} />
                    })}
                </div>
            </div>
        )
    }
}