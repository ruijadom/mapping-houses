import { useRef, useState } from "react";
import Link from "next/link";
import { Image } from "cloudinary-react";
import ReactMapGL, {
  Marker,
  Popup,
  ViewState,
  Source,
  Layer,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocalState } from "src/utils/useLocalState";
import { HousesQuery_houses } from "src/generated/HousesQuery";
import { SearchBox } from "./searchBox";

interface IProps {
  setDataBounds: (bounds: string) => void;
  houses: HousesQuery_houses[];
  hightlightedId: string | null;
}

export default function Map({ setDataBounds, houses, hightlightedId }: IProps) {
  const [selected, setSelected] = useState<HousesQuery_houses | null>(null);

  const mapRef = useRef<ReactMapGL | null>(null);
  const [viewport, setViewport] = useLocalState<ViewState>("viewport", {
    latitude: 40,
    longitude: -74.5,
    zoom: 10,
  });

  return (
    <div className="relative text-black">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="calc(100vh - 64px)"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
        ref={(instance) => (mapRef.current = instance)}
        minZoom={5}
        maxZoom={15}
        mapStyle="mapbox://styles/ruijadomingues/ckm14hy5v8f4p17o4saythp9p"
        onLoad={() => {
          if (mapRef.current) {
            const bounds = mapRef.current.getMap().getBounds();
            setDataBounds(JSON.stringify(bounds.toArray()));
          }
        }}
        onInteractionStateChange={(extra) => {
          if (!extra.isDragging && mapRef.current) {
            const bounds = mapRef.current.getMap().getBounds();
            setDataBounds(JSON.stringify(bounds.toArray()));
          }
        }}
      >
        <div className="absolute top-0 z-10 w-full p-4">
          <SearchBox
            defaultValue=""
            onSelectAddress={(_address, latitude, longitude) => {
              if (latitude && longitude) {
                setViewport((old) => ({
                  ...old,
                  latitude,
                  longitude,
                  zoom: 12,
                }));
                if (mapRef.current) {
                  const bounds = mapRef.current.getMap().getBounds();
                  setDataBounds(JSON.stringify(bounds.toArray()));
                }
              }
            }}
          />
        </div>

        {houses.map((house) => (
          <Marker
            key={house.id}
            latitude={house.latitude}
            longitude={house.longitude}
            offsetLeft={-15}
            offsetTop={-15}
            className={hightlightedId === house.id ? "marker-active" : ""}
          >
            <button
              style={{ width: "30px", height: "30px", fontSize: "30px" }}
              type="button"
              className="focus:outline-none"
              onClick={() => setSelected(house)}
            >
              <img
                src={
                  hightlightedId === house.id
                    ? "/home-color.svg"
                    : "/home-solid.svg"
                }
                alt="house"
                className="w-8"
              />
            </button>
          </Marker>
        ))}

        {selected && (
          <Popup
            latitude={selected.latitude}
            longitude={selected.longitude}
            onClose={() => setSelected(null)}
            closeOnClick={false}
          >
            <div className="text-center">
              <h3 className="px-4">{selected.address.substr(0, 30)}</h3>
              <Image
                className="mx-auto my-4"
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                publicId={selected.publicId}
                secure
                dpr="auto"
                quality="auto"
                width={200}
                height={Math.floor((9 / 16) * 200)}
                crop="fill"
                gravity="auto"
                alt={selected.address}
              />
              <Link href={`/houses/${selected.id}`}>
                <a>View House</a>
              </Link>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
