import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {ExternalLink, Loader2, MapPin, Navigation} from 'lucide-react';
import {useEffect, useState} from 'react';
import {buildWhatsAppUrl} from '../data/harmoniaData';

interface LatLngLiteral {
  lat: number;
  lng: number;
}

interface GroundedPlace {
  key: 'office' | 'ipb';
  label: string;
  displayName: string;
  formattedAddress: string;
  location: LatLngLiteral;
  googleMapsURI?: string;
}

function PlacesGroundedContent({
  selectedKey,
  onPlacesResolved,
  places,
  activePlace,
  onSelectPlace,
}: {
  selectedKey: 'office' | 'ipb';
  onPlacesResolved: (resolved: GroundedPlace[]) => void;
  places: GroundedPlace[];
  activePlace: GroundedPlace | null;
  onSelectPlace: (place: GroundedPlace) => void;
}) {
  const placesLib = useMapsLibrary('places');
  const map = useMap();
  const [officeMarkerRef, officeMarker] = useAdvancedMarkerRef();
  const [ipbMarkerRef, ipbMarker] = useAdvancedMarkerRef();

  useEffect(() => {
    if (!placesLib) return;
    let cancelled = false;

    const loadGroundedLocations = async () => {
      try {
        const {Place} = placesLib;
        const [officeRes, ipbRes] = await Promise.all([
          Place.searchByText({
            textQuery: 'Jalan Alternatif IPB Dramaga Bogor',
            fields: ['displayName', 'formattedAddress', 'location', 'googleMapsURI'],
            language: 'id',
            region: 'id',
            maxResultCount: 1,
          }),
          Place.searchByText({
            textQuery: 'IPB University Kampus Dramaga Bogor',
            fields: ['displayName', 'formattedAddress', 'location', 'googleMapsURI'],
            language: 'id',
            region: 'id',
            maxResultCount: 1,
          }),
        ]);

        if (cancelled) return;

        const nextPlaces: GroundedPlace[] = [];

        const firstOffice = officeRes.places?.[0];
        if (firstOffice?.location) {
          nextPlaces.push({
            key: 'office',
            label: 'Kantor & Kawasan Harmonia',
            displayName: 'Kantor Pemasaran Harmonia Student House',
            formattedAddress:
              firstOffice.formattedAddress || 'Kawasan Jl. Alternatif IPB, Dramaga, Bogor',
            location: firstOffice.location.toJSON(),
            googleMapsURI: firstOffice.googleMapsURI ?? undefined,
          });
        }

        const firstIpb = ipbRes.places?.[0];
        if (firstIpb?.location) {
          nextPlaces.push({
            key: 'ipb',
            label: 'Kampus IPB Dramaga',
            displayName: firstIpb.displayName || 'Kampus IPB Dramaga',
            formattedAddress: firstIpb.formattedAddress || 'Dramaga, Bogor, Jawa Barat',
            location: firstIpb.location.toJSON(),
            googleMapsURI: firstIpb.googleMapsURI ?? undefined,
          });
        }

        if (nextPlaces.length > 0) {
          onPlacesResolved(nextPlaces);
        }
      } catch {
        // Handled cleanly by parent state if quota or network issue occurs
      }
    };

    loadGroundedLocations();

    return () => {
      cancelled = true;
    };
  }, [placesLib, onPlacesResolved]);

  useEffect(() => {
    if (!map) return;
    const target = places.find((p) => p.key === selectedKey) ?? places[0];
    if (target) {
      map.panTo(target.location);
      map.setZoom(15);
    }
  }, [map, places, selectedKey]);

  const officePlace = places.find((p) => p.key === 'office');
  const ipbPlace = places.find((p) => p.key === 'ipb');

  const activeMarker =
    activePlace?.key === 'office'
      ? officeMarker
      : activePlace?.key === 'ipb'
        ? ipbMarker
        : null;

  return (
    <>
      {officePlace && (
        <AdvancedMarker
          ref={officeMarkerRef}
          position={officePlace.location}
          title={officePlace.displayName}
          onClick={() => onSelectPlace(officePlace)}
        >
          <Pin
            background="#0E3B2E"
            borderColor="#C49328"
            glyphColor="#E2B34B"
            scale={1.2}
          />
        </AdvancedMarker>
      )}

      {ipbPlace && (
        <AdvancedMarker
          ref={ipbMarkerRef}
          position={ipbPlace.location}
          title={ipbPlace.displayName}
          onClick={() => onSelectPlace(ipbPlace)}
        >
          <Pin
            background="#C49328"
            borderColor="#0E3B2E"
            glyphColor="#FFFFFF"
            scale={1.05}
          />
        </AdvancedMarker>
      )}

      {activePlace && activeMarker && (
        <InfoWindow
          anchor={activeMarker}
          maxWidth={260}
          onCloseClick={() => onSelectPlace(activePlace)}
        >
          <div className="p-1 text-slate-900">
            <div className="text-xs font-bold text-[#0E3B2E]">{activePlace.displayName}</div>
            <div className="mt-1 text-xs leading-snug text-slate-600">
              {activePlace.formattedAddress}
            </div>
            {activePlace.googleMapsURI && (
              <a
                href={activePlace.googleMapsURI}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#0E3B2E] underline"
              >
                <span>Buka Rute di Google Maps</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export function InteractiveOfficeMap({quotaExceeded}: {quotaExceeded: boolean}) {
  const [apiKey, setApiKey] = useState<string>(
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  );
  const [keyLoading, setKeyLoading] = useState<boolean>(!apiKey);
  const [places, setPlaces] = useState<GroundedPlace[]>([]);
  const [selectedKey, setSelectedKey] = useState<'office' | 'ipb'>('office');
  const [infoOpenPlace, setInfoOpenPlace] = useState<GroundedPlace | null>(null);

  useEffect(() => {
    if (apiKey) {
      setKeyLoading(false);
      return;
    }
    let active = true;
    fetch('/api/config')
      .then((res) => res.json())
      .then((data: {googleMapsApiKey?: string}) => {
        if (!active) return;
        if (data.googleMapsApiKey) {
          setApiKey(data.googleMapsApiKey);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setKeyLoading(false);
      });

    return () => {
      active = false;
    };
  }, [apiKey]);

  const handlePlacesResolved = (resolved: GroundedPlace[]) => {
    setPlaces(resolved);
    if (!infoOpenPlace && resolved[0]) {
      setInfoOpenPlace(resolved[0]);
    }
  };

  const currentPlace = places.find((p) => p.key === selectedKey) ?? places[0] ?? null;

  return (
    <div className="mt-10 rounded-2xl border border-slate-200/90 bg-[#F7F8F6] p-4 sm:p-6 dark:border-emerald-900/80 dark:bg-[#0E201B]">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0E3B2E] uppercase dark:text-[#E2B34B]">
            <Navigation className="h-4 w-4" />
            <span>Peta Interaktif Lokasi Kantor Fisik</span>
          </div>
          <h3 className="mt-1 font-display text-xl font-bold text-slate-900 dark:text-white">
            Kantor Pemasaran &amp; Galeri Unit Harmonia — Dramaga, Bogor
          </h3>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            {currentPlace
              ? currentPlace.formattedAddress
              : 'Kawasan Jl. Alternatif IPB, Dramaga, Kabupaten Bogor, Jawa Barat'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectedKey('office');
              const office = places.find((p) => p.key === 'office');
              if (office) setInfoOpenPlace(office);
            }}
            className={`min-h-[38px] rounded-lg px-3.5 text-xs font-semibold transition-colors ${
              selectedKey === 'office'
                ? 'bg-[#0E3B2E] text-white dark:bg-[#C49328] dark:text-[#071310]'
                : 'border border-slate-200 bg-white text-slate-700 dark:border-emerald-900 dark:bg-[#071310] dark:text-slate-200'
            }`}
          >
            Kantor Harmonia
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedKey('ipb');
              const ipb = places.find((p) => p.key === 'ipb');
              if (ipb) setInfoOpenPlace(ipb);
            }}
            className={`min-h-[38px] rounded-lg px-3.5 text-xs font-semibold transition-colors ${
              selectedKey === 'ipb'
                ? 'bg-[#0E3B2E] text-white dark:bg-[#C49328] dark:text-[#071310]'
                : 'border border-slate-200 bg-white text-slate-700 dark:border-emerald-900 dark:bg-[#071310] dark:text-slate-200'
            }`}
          >
            Kampus IPB (±4 Mnt)
          </button>
        </div>
      </div>

      {/* Explicit Sized Container for Google Map (CF2 prevention) */}
      <div className="relative mt-4 h-[360px] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 sm:h-[420px] dark:border-emerald-900 dark:bg-[#071310]">
        {keyLoading ? (
          <div className="flex h-full w-full items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Memuat peta interaktif...</span>
          </div>
        ) : !apiKey || quotaExceeded ? (
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
            <MapPin className="h-8 w-8 text-[#C49328]" />
            <p className="mt-2 font-display text-base font-bold text-slate-900 dark:text-white">
              Kantor Pemasaran Harmonia Student House
            </p>
            <p className="mt-1 max-w-md text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Kawasan Ring 1 Kampus IPB, Jl. Alternatif IPB, Dramaga, Bogor. Hubungi admin kami
              untuk kiriman titik lokasi survei langsung via WhatsApp.
            </p>
            <a
              href={buildWhatsAppUrl(
                'Assalamualaikum Admin Harmonia, mohon share link titik Google Maps kantor pemasaran & lokasi proyek di Dramaga Bogor.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-[#0E3B2E] px-4 text-xs font-semibold text-white dark:bg-[#C49328] dark:text-[#071310]"
            >
              <span>Minta Share Lokasi via WhatsApp</span>
            </a>
          </div>
        ) : (
          <APIProvider apiKey={apiKey} libraries={['marker', 'places']} language="id" region="ID">
            <GoogleMap
              mapId="DEMO_MAP_ID"
              defaultZoom={15}
              defaultCenter={
                currentPlace?.location ?? {lat: -6.555, lng: 106.726}
              }
              gestureHandling="greedy"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              style={{width: '100%', height: '100%'}}
            >
              <PlacesGroundedContent
                selectedKey={selectedKey}
                onPlacesResolved={handlePlacesResolved}
                places={places}
                activePlace={infoOpenPlace}
                onSelectPlace={(p) =>
                  setInfoOpenPlace((prev) => (prev?.key === p.key ? null : p))
                }
              />
            </GoogleMap>
          </APIProvider>
        )}
      </div>

      <div className="mt-3 flex flex-col justify-between gap-2 text-xs text-slate-500 sm:flex-row sm:items-center dark:text-slate-400">
        <span>
          Jam Layanan Kantor &amp; Survei Lokasi: Senin – Ahad, 09.00 – 17.00 WIB
        </span>
        {currentPlace?.googleMapsURI && (
          <a
            href={currentPlace.googleMapsURI}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#0E3B2E] underline-offset-4 hover:underline dark:text-[#E2B34B]"
          >
            <span>Petunjuk Arah di Google Maps</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
