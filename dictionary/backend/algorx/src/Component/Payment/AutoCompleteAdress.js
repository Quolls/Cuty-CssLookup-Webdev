import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { useState } from "react";
import "./AutoCompleteAdress.css";
const placesLibrary = ["places"];

const AutoCompleteAddress = ({
  paymentAdress = {},
  setPaymentAdress = () => {},
  isUpdateInfo = false,
}) => {
  const [searchResult, setSearchResult] = useState("");
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_HOSTURL,
    libraries: placesLibrary,
  });

  // conditional class to google autoselection dropdown
  if (isLoaded) {
    const pacContainer = document?.querySelector(".pac-container");
    if (pacContainer) {
      pacContainer.style.backgroundColor = isUpdateInfo ? "#fff" : "#F4F4F5";
    }
  }

  // aotucomplete on load
  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  // onplaced change
  function onPlaceChanged() {
    if (searchResult) {
      const place = searchResult?.getPlace();
      const tempAdresssObj = {
        address: place?.formatted_address,
        country: "",
        state: "",
        suburb: "",
        postcodeZip: "",
        street: "",
      };
      place?.address_components?.forEach((item) => {
        const types = item.types;
        const longName = item.long_name;

        if (types.includes("postal_code")) {
          tempAdresssObj.postcodeZip = longName;
        }

        if (types.includes("country")) {
          tempAdresssObj.country = longName;
        }
        if (types.includes("locality")) {
          tempAdresssObj.suburb = longName;
        }
        if (types.includes("administrative_area_level_1")) {
          tempAdresssObj.state = longName;
        }
        if (types.includes("street_number")) {
          localStorage.setItem("streetNumber", longName);
        }
        if (types.includes("route")) {
          const streetNumber = localStorage.getItem("streetNumber");
          tempAdresssObj.street = streetNumber
            ? `${streetNumber} ${longName}`
            : longName;
          localStorage.removeItem("streetNumber");
        }
      });
      setPaymentAdress({ ...paymentAdress, ...tempAdresssObj });
    } else {
      alert("Please enter text");
    }
  }

  return (
    <>
      <div
        style={{ textAlign: "left" }}
        className="namecard mt-4 text-[#18181B]"
      >
        Enter Address
      </div>
      <Autocomplete
        onPlaceChanged={onPlaceChanged}
        onLoad={onLoad}
        options={{ componentRestrictions: { country: "AU" } }}
      >
        <input
          type="text"
          placeholder="Search address"
          className={
            isUpdateInfo
              ? "updateInfoInput text-[#18181B]"
              : "nameinput mt-2 text-[#18181B]"
          }
          defaultValue={paymentAdress?.address}
          style={{ border: "1px solid #18181B" }}
        />
      </Autocomplete>
    </>
  );
};
export default AutoCompleteAddress;
