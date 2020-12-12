import React, { useState } from "react";

import MapView, { Marker } from "react-native-maps";

const App = () => {
    const [region, setRegion] = useState({
        latitude: 51.5078788,
        longitude: -0.0877321,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009
    });

    return (
        <MapView
            style={{ flex: 1 }}
            region={region}
            onRegionChangeComplete={region => setRegion(region)}
        >
            <Marker coordinate={{ latitude: 51.5078788, longitude: -0.0877321 }} />
        </MapView>
    );
};

export default App;