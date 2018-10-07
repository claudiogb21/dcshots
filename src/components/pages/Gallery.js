import React, { Component } from 'react'

import ImageViewer from '../elements/ImageViewer';
import MansoryGallery from '../elements/MansoryGallery';

let pics = [
    {
        title: 'session 23, image 5',
        src: 'img/gallery/DSC_0035.jpg',
        active: true
    },
    {
        title: 'image 2',
        src: 'img/gallery/slider2.jpg',
        active: false
    },
    {
        title: 'image 3',
        src: 'img/gallery/DSC_0102.jpg',
        active: false
    },
    {
        title: 'image 4',
        src: 'img/gallery/DSC_0228.jpg',
        active: false
    },
    {
        title: 'image 5',
        src: 'img/gallery/IMG_6296.jpg',
        active: false
    },
    {
        title: 'image 6',
        src: 'img/gallery/IMG_6374.jpg',
        active: false
    },
    {
        title: 'image 7',
        src: 'img/gallery/IMG_6480.jpg',
        active: false
    },
    {
        title: 'image 8',
        src: 'img/gallery/IMG_6520.jpg',
        active: false
    },
    {
        title: 'image 9',
        src: 'img/gallery/IMG_6528.jpg',
        active: false
    },
    {
        title: 'image 10',
        src: 'img/gallery/IMG_6555.jpg',
        active: false
    },
    {
        title: 'image 11',
        src: 'img/gallery/IMG_6272.jpg',
        active: false
    },
    {
        title: 'image 12',
        src: 'img/gallery/DSC_0055.jpg',
        active: false
    },
    {
        title: 'image 13',
        src: 'img/gallery/DSC_0250.jpg',
        active: false
    }
];

export default class Gallery extends Component {

    state = {
        activeImageIndex: 0,
        activeImageSrc: pics[0].src,
        readyImagesCounter: 0,
        windowSize: 0
    }

    componentWillMount() {
        this.props.toggleLoading(true)
    }

    componentDidMount() {
        this.checkWindowSize();

        window.addEventListener('resize', () => {
            this.checkWindowSize();
        })

        this.loadImages();
    }

    componentDidUpdate() {
        const { readyImagesCounter } = this.state;
        readyImagesCounter === pics.length && this.props.toggleLoading(false)
    }


    loadImages() {
        pics.map(pic => {
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

    selectImage(index) {
        pics[this.state.activeImageIndex].active = false;
        pics[index].active = true;
        this.setState({
            activeImageIndex: index,
            activeImageSrc: pics[index].src
        })
    }

    checkWindowSize() {
        this.setState({
            windowSize: window.outerWidth
        })
    }

    render() {
        const { windowSize } = this.state;
        return (
            <div className="gallery">
                {windowSize >= 1024 && <ImageViewer toggleHud={this.props.toggleHud} activeImageSrc={this.state.activeImageSrc}></ImageViewer>}
                <MansoryGallery selectImage={this.selectImage.bind(this)} activeImageSrc={this.state.activeImageSrc} pics={pics}></MansoryGallery>
            </div>
        )
    }
}
