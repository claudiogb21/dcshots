import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import { Scrollbars } from 'react-custom-scrollbars';
import Palette from 'react-palette';

const masonryOptions = {
	transitionDuration: 0,
	stagger: 0
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }

export default class MansoryGallery extends Component {

	render() {
		const { pics, selectImage, activeImageSrc } = this.props;

		const childElements = pics.map(function (pic, index) {
			return (
				<li key={pic.title} className={pic.active ? 'single-pic active' : 'single-pic'} onClick={() => selectImage(index)}>
					<div className="detail">
						<p>{pic.title}</p>
						<Palette image={pic.src}>
							{palette => (
								<div className="palette">
									<div style={{ background: palette.vibrant }}></div>
									<div style={{ background: palette.darkVibrant }}></div>
									<div style={{ background: palette.lightVibrant }}></div>
									<div style={{ background: palette.muted }}></div>
									<div style={{ background: palette.darkMuted }}></div>
									<div style={{ background: palette.lightMuted }}></div>
								</div>
							)}
						</Palette>
					</div>
					<img src={pic.src} />
				</li>
			);
		});

		return (
			<div className="mansory-gallery">
				<div className="mansory-gallery-outer">
					<Scrollbars>
						<Masonry
							className={'mansory-gallery-inner'} // default ''
							elementType={'ul'} // default 'div'
							options={masonryOptions} // default {}
							disableImagesLoaded={false} // default false
							updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
							imagesLoadedOptions={imagesLoadedOptions} // default {}
						>
							{childElements}
						</Masonry>
					</Scrollbars>
				</div>
				<div id="blur-bg" className="blur-bg" style={{ backgroundImage: `url(${activeImageSrc})` }}></div>
			</div>
		);
	}
}
