import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import SwiperJs from "../../swiper/SwiperJs";
import MarketingCard from "./MarketingCard";
import "./style.scss";
const Marketing = () => {
	const navigate = useNavigate();

	const [image, setImage] = useState("");
	const imageRef = useRef();
	const onDrop = useCallback((acceptedFiles) => {
		const url = URL.createObjectURL(acceptedFiles[0]);
		if (image) {
			URL.revokeObjectURL(image);
		}
		imageRef.current = acceptedFiles[0];
		setImage(url);
	}, []);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
	});
	return (
		<div className="marketing">
			<div className="marketing_swiper">
				<SwiperJs />
			</div>
			<div className="marketing_card">
				<div className="marketing_card_create">
					<div className="movie_drop_zone">
						<div className="movie_drop_zone_wrap" {...getRootProps()}>
							<input {...getInputProps()} />
							<i className="fa-regular fa-image"></i>
							<div className="image_create_container">
								<img src={image} />
							</div>
						</div>
					</div>
				</div>
				<MarketingCard />
				<MarketingCard />
				<MarketingCard />
				<MarketingCard />
				<MarketingCard />
				<MarketingCard />
				<MarketingCard />
				<MarketingCard />
			</div>
		</div>
	);
};

export default Marketing;
