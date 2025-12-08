"use client";
import { AutoComplete } from "@/components/Autocomplete/Autocomplete";
import Map from "@/components/Map";
import StationCard from "@/components/StationCard";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFetchAddresses } from "@/hooks/use-fetch-addresses";
import { AddressForm, addressSchema } from "@/schema/adress-schema";
import { Point, PointDisplay } from "@/types/map";
import { Stations } from "@/types/stations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const StationsPage = () => {
  const [stations, setStations] = useState<Stations>([]);
  const [initialStations, setInitialStations] = useState<Stations>([]);
  const [addressSearchValue, setAddressSearchValue] = useState<string>("");
  const [zoomLevel, setZoomLevel] = useState<number>(13);
  const [centerCoordinates, setCenterCoordinates] = useState<{ lat: number; lng: number }>({ lat: 44.837789, lng: -0.57918 });
  const [reviewAverages, setReviewAverages] = useState<Record<string, number>>({});

  const form = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: "",
      wishes: "rent",
    },
  })
  const { data: fetchedAddresses = [], isLoading } = useFetchAddresses(addressSearchValue);

  const {
    control,
    handleSubmit,
    reset,
  } = form

  const handleScrollToStation = useCallback((stationId: string) => {
    const element = document.getElementById(`station-${stationId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const points = useMemo(() => {
    const parsedStations = stations.map((station) => ({
      lat: station.latitude,
      lng: station.longitude,
      address: station.extra.address,
      freebikes: station.free_bikes,
      empty_slots: station.empty_slots,
      reviewAverage: reviewAverages[station.id] ?? undefined,
      onClick: () => handleScrollToStation(station.id),
      display: PointDisplay.MARKER
    })) as Point[];

    if (!centerCoordinates) {
      parsedStations.unshift({
        lat: 44.837789,
        lng: -0.57918,
      } as Point);
    } else {
      parsedStations.unshift({
        lat: centerCoordinates.lat,
        lng: centerCoordinates.lng,
        display: PointDisplay.CIRCLE,
        radius: 5,
      } as Point);
    }

    return parsedStations as Point[];
  }, [stations, centerCoordinates, reviewAverages, handleScrollToStation]);

  const fetchStations = async () => {
    const res = await fetch("/api/stations");
    if (!res.ok) {
      throw new Error("Failed to fetch stations");
    }
    return await res.json();
  }

  const fetchReviewAverages = async () => {
    const res = await fetch("/api/reviews/stations/avg");
    if (!res.ok) {
      throw new Error("Failed to fetch review averages");
    }
    return await res.json();
  }

  const onSubmit = (data: FieldValues) => {
    const address = data.address as string;
    const wishes = data.wishes as string;
    fetch(`/api/stations/search?address=${encodeURIComponent(address)}&wishes=${wishes}`).then(async (res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch stations for address");
      }
      const data = await res.json();
      setStations(data.stations);
      setCenterCoordinates({
        lat: data.centerCoordinates.latitude,
        lng: data.centerCoordinates.longitude,
      });
      setZoomLevel(17);
      reset({
        address: address,
        wishes: wishes as "rent" | "return",
      })
    })
  }

  const handleReset = () => {
    setStations(initialStations);
    setAddressSearchValue("");
    setZoomLevel(13);
  }

  useEffect(() => {
    Promise.all([fetchStations(), fetchReviewAverages()]).then(([stationsData, reviewsData]) => {
      setStations(stationsData);
      setInitialStations(stationsData);
      setReviewAverages(reviewsData);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  return (
    <div className="container m-auto w-full h-screen flex flex-col items-center py-10 gap-10 overflow-hidden">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center justify-center gap-2">
          <div className="flex flex-row gap-2">
            <p>Je veux :</p>
            <FormField
              control={control}
              name="wishes"
              render={({ field: { onChange, value } }) => (
                <FormControl className="w-full">
                  <Select onValueChange={onChange} value={value as string ?? ""} defaultValue="rent">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sélectionner votre choix" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">Louer un vélo</SelectItem>
                      <SelectItem value="return">Une place de vélo</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              )}
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <FormField
              control={control}
              name="address"
              render={({ field: {
                onChange, value
              } }) => (
                <FormControl>
                  <AutoComplete
                    selectedValue={value as string ?? undefined}
                    onSelectedValueChange={(value) => {
                      if (value !== '') {
                        onChange(value)
                      }
                    }}
                    items={fetchedAddresses.map((address) => {
                      return { value: address.fulltext, label: address.fulltext, data: address };
                    })}
                    searchValue={addressSearchValue}
                    onSearchValueChange={setAddressSearchValue}
                    placeholder="Ex : 23 rue des longjumeaux, Nice"
                    emptyMessage="Aucune adresse."
                    isLoading={isLoading}
                    className="min-w-[300px]"
                  />
                </FormControl>
              )}
            />
            <Button type="submit">Rechercher</Button>
            <Button type="button" variant="outline" onClick={handleReset}>Réinitialiser</Button>
          </div>
        </form>
      </Form>
      <div className="w-full flex flex-row gap-10">
        <Map points={points ?? []} zoom={zoomLevel} className="aspect-square" />
        <ul className="w-full h-[80vh] flex flex-col items-center gap-2 overflow-scroll">
          {(stations).map((station) => (
            <StationCard key={station.id} station={station} reviewAverage={reviewAverages[station.id] ?? undefined} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StationsPage;