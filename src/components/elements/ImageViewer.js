import React, { Component } from 'react';

let settings = {
	frame: '',
	img: '',
	imgSrc: '',
	frameW: 0,
	frameH: 0,
	imgW: 0,
	imgH: 0,
	diffWPx: 0,
	diffHPx: 0
};

export default class ImageViewer extends Component {
	state = {
		frame: '',
		frameW: 0,
		img: '',
		imgW: 0,
		diffWPx: 0
	};

	componentDidMount() {

		settings.frame = document.querySelector('#frame');
		settings.img = document.querySelector('#frame img');
		settings.imgSrc = document.querySelector('#frame img').getAttribute('src');

		setTimeout(() => {
			this.setSizes();

			settings.frame.addEventListener('mouseout', ($event) => {
				this.centerImage()
			});

			settings.frame.addEventListener('mouseover', () => {
				this.props.toggleHud(false)
			});

			settings.frame.addEventListener('mouseout', () => {
				this.props.toggleHud(true)
			});
		}, 0);
	}

	componentDidUpdate() {
		this.setSizes();
	}

	setSizes() {
		const imgObj = new Image();
		imgObj.src = settings.imgSrc;

		imgObj.onload = () => {

			settings.frameW = settings.frame.offsetWidth;
			settings.frameH = settings.frame.offsetHeight;
			settings.imgW = settings.img.offsetWidth;
			settings.imgH = settings.img.offsetHeight;
			settings.diffWPx = settings.frame.offsetWidth - settings.img.offsetWidth;
			settings.diffHPx = settings.frame.offsetHeight - settings.img.offsetHeight;

			setTimeout(() => {
				this.centerImage();
				settings.frame.addEventListener('mousemove', ($event) => {
					// 1) fX: posición X del mouse sobre el frame
					this.getPercentage($event.clientY, $event.clientX);
				});
			}, 0);

		};

		// window.addEventListener('resize', () => {
		//     imgW = img.offsetWidth
		// })
	}

	getPercentage(fY, fX) {
		const { frameW, frameH, img, diffWPx, diffHPx } = settings;

		const posXPer = diffWPx * (fX * 100) / frameW / 100;
		const posYPer = diffHPx * (fY * 100) / frameH / 100;

		img.style.left = `${posXPer}px`;
		img.style.top = `${posYPer}px`;
	}

	centerImage() {
		const { img, imgW, frameW, imgH, frameH } = settings;

		img.style.left = `-${(imgW - frameW) / 2}px`;
		img.style.top = `-${(imgH - frameH) / 2}px`;
	}

	render() {
		const { activeImageSrc } = this.props;

		return (
			<div className="image-viewer" id="frame">
				<img src={activeImageSrc} className="img-inner" />
			</div>
		);
	}
}
