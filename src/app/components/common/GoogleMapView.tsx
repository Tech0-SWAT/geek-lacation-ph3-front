import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

type GoogleMapViewProps = {
  lat: number;
  lng: number;
  zoom?: number;
};

export const GoogleMapView = ({ lat, lng, zoom = 15 }: GoogleMapViewProps) => {
  const center = { lat, lng };

  return (
    <>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={center}
          zoom={zoom}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </>
  );
};