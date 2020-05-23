'use strict'

import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { Fragment }=wp.element;
const { Button, TextControl } = wp.components;

registerBlockType( 'my-block/profile-box', {
	title: __( 'profile-box' ), 
	icon: 'welcome-write-blog',
	category: 'common', 
	attributes: {
		imageUrl: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src'
		},
		imageAlt:{
			type: 'string'
		},
		imageId: {
			type: 'number'
		},
		year: {
			type: 'string',
			source: 'text',
			selector: 'profile-box__year'
		},
		nameJp: {
			type: 'string',
			selector: 'profile-box__name-jp'
		},
		nameEng: {
			type: 'string',
			selector: 'profile-box__name-eng'
		},
		content: {
			type: 'array',
			source: 'children',
			selector: 'profile-box__content'
		}
	},

	edit: ( {attributes, className, setAttributes} ) => {
		const {
			imageUrl,
			imageAlt,
			imageId,
			year,
			nameJp,
			nameEng,
			title,
			content
		} = attributes;

		const renderImage = (openEvent) => {
      if(imageUrl) {
        return (
          <img 
            src={ imageUrl }
            onClick={ openEvent }
          />
        );
      }
      else {
        return (
          <div className="profile-box__button">
            <Button 
              onClick={ openEvent }
            >
              画像を選択
            </Button>
          </div>
        );
      }
    };

		const onSelectImage = ( media ) => {
			setAttributes({
				imageUrl: media.url,
				imageAlt: media.alt,
				imageId: media.id
			})
			console.log(media)
		};

		const onChangeYear = ( value ) => 
			setAttributes({ 
				year: value
			});

		const onChangeNameJp = ( value ) => 
			setAttributes({ 
				nameJp: value
			});

		const onChangeNameEng = ( value ) => 
			setAttributes({ 
				nameEng: value
			});

		const onChangeTitle = ( value ) => 
			setAttributes({ 
				title: value
			});

		const onChangeContent = ( value ) => 
			setAttributes({ 
				content: value
			});

		return (
			<div className={ 'profile-box ' + className }>
				<div className='profile-box__image'>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectImage }
							value={ imageId }
							render={ ({ open }) => renderImage(open) }
						/>
					</MediaUploadCheck>
				</div>
				<div className='profile-box__texts'>
					<TextControl
						onChange={ onChangeYear }
						value={ year }
						className='profile-box__year'
						placeholder='2018年 中途入社'
					/>
					<div className='profile-box__name'>
						<TextControl
							onChange={ onChangeNameJp }
							value={ nameJp }
							className='profile-box__name-jp'
							placeholder='鈴木 恵理'
						/>
						<TextControl
							onChange={ onChangeNameEng }
							value={ nameEng }
							className='profile-box__name-eng'
							placeholder='ERI SUZUKI'
						/>
					</div>
					<TextControl
						onChange={ onChangeTitle }
						value={ title }
						className='profile-box__title'
						placeholder='〇〇部 / チーフマネージャー'
					/>
					<RichText
						onChange={ onChangeContent }
						value={ content }
						className='profile-box__content'
						multiline='p'
						placeholder='入社の動機や簡単な自己紹介など。テキストテキストテキストテキストテキストテキストテキストテキスト。'
					/>
				</div>
			</div>
		);
	},

	save: ( {attributes, className} ) => {
		const {
			imageUrl,
			imageAlt,
			imageId,
			year,
			nameJp,
			nameEng,
			title,
			content
		} = attributes;

		const profileImage = () => {
			if(!imageUrl) {
				return nul;
			} else {
				return (
					<img 
						src={ imageUrl }
						alt={ imageAlt }
					/>
				);
			}
		}

		return (
			<div className='profile-box'>
				<div className='profile-box__image'>
					<img
						src={ imageUrl }
						alt={ imageAlt}
					/>
				</div>
				<div className='profile-box__texts'>
					<div className='profile-box__year'>{ year }</div>
					<div className='profile-box__name'>
						<div className='profile-box__name-jp'>{ nameJp }</div>
						<div className='profile-box__name-eng'>{ nameEng }</div>
					</div>
					<div className='profile-box__title'>{ title }</div>
					<div className='profile-box__content'>{ content }</div>
				</div>
			</div>
		);
	},
} );