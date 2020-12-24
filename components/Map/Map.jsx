import React from "react";
import GoogleMapReact from "google-map-react";

import styles from "./Map.module.scss";

const Map = ({ location, zoomLevel }) => (
    <div className={styles["map"]}>
        <GoogleMapReact
            bootstrapURLKeys={{
                key: "AIzaSyDrZlTdB3xp8gCOQ_qn3JhgAmsoP852Szs",
            }}
            defaultCenter={location}
            defaultZoom={zoomLevel}
        >
            <LocationPin
                lat={location.lat}
                lng={location.lng}
                text={location.address}
            />
        </GoogleMapReact>
    </div>
);

const LocationPin = ({ text }) => (
    <div className={styles["pin"]}>
        <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="map-marker-alt"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            className={styles["pin-icon"]}
        >
            <path
                fill="currentColor"
                d="M192 0C85.903 0 0 86.014 0 192c0 71.117 23.991 93.341 151.271 297.424 18.785 30.119 62.694 30.083 81.457 0C360.075 285.234 384 263.103 384 192 384 85.903 297.986 0 192 0zm0 464C64.576 259.686 48 246.788 48 192c0-79.529 64.471-144 144-144s144 64.471 144 144c0 54.553-15.166 65.425-144 272zm-80-272c0-44.183 35.817-80 80-80s80 35.817 80 80-35.817 80-80 80-80-35.817-80-80z"
            ></path>
        </svg>
        <p className={styles["pin-text"]}>{text}</p>
    </div>
);

export default Map;
