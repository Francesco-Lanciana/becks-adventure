import Map from "../components/Map/Map";

const location = {
    address: "Olivé's Abode",
    lat: -37.819548,
    lng: 144.945871,
};
const TestPage = () => {
    return <Map location={location} zoomLevel={17} />;
};

export default TestPage;
