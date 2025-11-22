import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon
const createCustomIcon = (color = '#4A90E2') => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
};

// Component to update map center
function MapUpdater({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, map]);
  
  return null;
}

const MapView = ({ 
  center, 
  zoom = 13, 
  markers = [], 
  showUserLocation = true,
  userLocation,
  showPath = false,
  pathCoordinates = []
}) => {
  const mapRef = useRef(null);

  // Default center (Austin, TX)
  const defaultCenter = center || [30.2672, -97.7431];

  return (
    <div className="map-container">
      <MapContainer
        center={defaultCenter}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={defaultCenter} zoom={zoom} />

        {/* User location marker */}
        {showUserLocation && userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={createCustomIcon('#4A90E2')}
          >
            <Popup>
              <div className="map-popup">
                <strong>Your Location</strong>
                <p>{userLocation.address || 'Current location'}</p>
                {userLocation.timestamp && (
                  <small>{new Date(userLocation.timestamp).toLocaleTimeString()}</small>
                )}
              </div>
            </Popup>
          </Marker>
        )}

        {/* Additional markers */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.lat, marker.lng]}
            icon={createCustomIcon(marker.color || '#FF9500')}
          >
            <Popup>
              <div className="map-popup">
                <strong>{marker.title || 'Location'}</strong>
                {marker.description && <p>{marker.description}</p>}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Path polyline (if needed) */}
        {showPath && pathCoordinates.length > 1 && (
          <Polyline
            positions={pathCoordinates.map(coord => [coord.lat, coord.lng])}
            color="#4A90E2"
            weight={4}
            opacity={0.7}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;

