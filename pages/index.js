import Head from 'next/head'
import React, { useState, useEffect } from "react";
import MapContainer from './MapContainer'
import firebase from '../firebase.js';
import {useDispatch} from 'react-redux'; 
import { map_click } from "../actions";  
import ContactForm from './ContactForm';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Image from 'next/image'

export default function Home() {

  let sidebarRef = React.useRef();
  let aboutPageRef = React.useRef();
  let contactPageRef = React.useRef();
  let rightsPageRef = React.useRef();
  let mapRef = React.useRef();
  let gridRef = React.useRef();
  let menuButtonRef = React.useRef();
  let reportButtonRef = React.useRef();
  let positionButtonRef = React.useRef();
  let deleteButtonRef = React.useRef();

  const [hasReported, setHasReported] = useState(false);
  const [userInfo, setUserInfo] = useState(["Empty"]);
  const [createdDocId, setCreatedDocId] = useState(null);
  const [successPush, setSuccessPush] = useState(false);
  const [copied, setCopied] = useState(false)

  const copyClick = () => {setCopied(true);};

  const dispatch = useDispatch();

  const dispatchLink = () => {
      dispatch(map_click());
  };

  const useCurrentLocation = () => {
    // store location in state
    const [location, setLocation] = useState();
    // store error message in state
    const [error, setError] = useState();
  
    // Success handler for geolocation's `getCurrentPosition` method
    const handleSuccess = (pos) => {
      const { latitude, longitude } = pos.coords;
  
      setLocation({
        latitude,
        longitude,
      });
    };
  
    // Error handler for geolocation's `getCurrentPosition` method
    const handleError = (error) => {
      setError(error.message);
    };
  
    useEffect(() => {
      const { geolocation } = navigator;
      // If the geolocation is not defined in the used browser we handle it as an error
      if (!geolocation) {
        setError("Geolocation is not supported.");
        return;
      }
  
      // Call Geolocation API
      geolocation.getCurrentPosition(handleSuccess, handleError, {
        enableHighAccuracy: true,
        timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
        maximumAge: 1000 * 3600 * 24, // 24 hour
      });
    }, [{
      enableHighAccuracy: true,
      timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
      maximumAge: 1000 * 3600 * 24, // 24 hour
    }]);
  
    return { location, error };
  };

  const location = useCurrentLocation();

  const openAboutPage = () => {
    if (aboutPageRef.current.classList.contains(("-translate-x-full"))){
    aboutPageRef.current.classList.toggle("-translate-x-full");
    }
  }

  const openRightsPage = () => {
    if (rightsPageRef.current.classList.contains(("-translate-x-full"))){
      rightsPageRef.current.classList.toggle("-translate-x-full");
    }
  }

  const openContactPage = () => {
    if (contactPageRef.current.classList.contains(("-translate-x-full"))){
      contactPageRef.current.classList.toggle("-translate-x-full");
      }
  }

  const openSidebar = () => {
    if (sidebarRef.current.classList.contains(("-translate-x-full"))){
      sidebarRef.current.classList.toggle("-translate-x-full");
      gridRef.current.classList.add("bg-opacity-50");
  
      menuButtonRef.current.classList.add("pointer-events-none");
      menuButtonRef.current.classList.remove("pointer-events-auto");
      menuButtonRef.current.classList.add("bg-opacity-20");
  
      if (reportButtonRef.current != null){
      reportButtonRef.current.classList.add("pointer-events-none");
      reportButtonRef.current.classList.remove("pointer-events-auto");
      reportButtonRef.current.classList.add("bg-opacity-20");
      }
  
      if (deleteButtonRef.current != null){
      deleteButtonRef.current.classList.add("pointer-events-none");
      deleteButtonRef.current.classList.remove("pointer-events-auto");
      deleteButtonRef.current.classList.add("bg-opacity-20");
      }
  
      positionButtonRef.current.classList.remove("pointer-events-auto");
      positionButtonRef.current.classList.add("pointer-events-none");
      positionButtonRef.current.classList.add("bg-opacity-20");
    }
  };

  const backToSidebar = () => {
    if (!aboutPageRef.current.classList.contains(("-translate-x-full"))){
      aboutPageRef.current.classList.toggle("-translate-x-full");
      }
    if (!contactPageRef.current.classList.contains(("-translate-x-full"))){
      contactPageRef.current.classList.toggle("-translate-x-full");
      }
    if (!rightsPageRef.current.classList.contains(("-translate-x-full"))){
      rightsPageRef.current.classList.toggle("-translate-x-full");
      }

      if (sidebarRef.current.classList.contains(("-translate-x-full"))){
        sidebarRef.current.classList.toggle("-translate-x-full");
        gridRef.current.classList.add("bg-opacity-50");
    
        menuButtonRef.current.classList.add("pointer-events-none");
        menuButtonRef.current.classList.remove("pointer-events-auto");
        menuButtonRef.current.classList.add("bg-opacity-20");
    
        if (reportButtonRef.current != null){
        reportButtonRef.current.classList.add("pointer-events-none");
        reportButtonRef.current.classList.remove("pointer-events-auto");
        reportButtonRef.current.classList.add("bg-opacity-20");
        }
    
        if (deleteButtonRef.current != null){
        deleteButtonRef.current.classList.add("pointer-events-none");
        deleteButtonRef.current.classList.remove("pointer-events-auto");
        deleteButtonRef.current.classList.add("bg-opacity-20");
        }
    
        positionButtonRef.current.classList.remove("pointer-events-auto");
        positionButtonRef.current.classList.add("pointer-events-none");
        positionButtonRef.current.classList.add("bg-opacity-20");
      }
  }

  const goToMap = () => {
    if (!sidebarRef.current.classList.contains(("-translate-x-full"))){
    sidebarRef.current.classList.toggle("-translate-x-full");
    }
    if (!aboutPageRef.current.classList.contains(("-translate-x-full"))){
      aboutPageRef.current.classList.toggle("-translate-x-full");
      }
    if (!contactPageRef.current.classList.contains(("-translate-x-full"))){
      contactPageRef.current.classList.toggle("-translate-x-full");
      }
    if (!rightsPageRef.current.classList.contains(("-translate-x-full"))){
      rightsPageRef.current.classList.toggle("-translate-x-full");
      }

    gridRef.current.classList.remove("bg-opacity-50");

    menuButtonRef.current.classList.remove("pointer-events-none");
    menuButtonRef.current.classList.add("pointer-events-auto");
    menuButtonRef.current.classList.remove("bg-opacity-20");

    if (reportButtonRef.current != null){
      reportButtonRef.current.classList.remove("pointer-events-none");
      reportButtonRef.current.classList.add("pointer-events-auto");
      reportButtonRef.current.classList.remove("bg-opacity-20");
    }
    if (deleteButtonRef.current != null){
      deleteButtonRef.current.classList.remove("pointer-events-none");
      deleteButtonRef.current.classList.add("pointer-events-auto");
      deleteButtonRef.current.classList.remove("bg-opacity-20");
    }

    positionButtonRef.current.classList.remove("pointer-events-none");
    positionButtonRef.current.classList.add("pointer-events-auto");
    positionButtonRef.current.classList.remove("bg-opacity-20");
  };

  const getUserGeolocationDetails = () =>{
    fetch(process.env.NEXT_PUBLIC_GEOLOCATION)
    .then(response => response.json())
    .then(data => saveUserData(data));
  }


  const saveUserData = (data) => {
      setUserInfo(data);
      handleSubmitButton();
  }

  const deleteItem = () => {
    if(successPush){
      createdDocId.remove();
      setHasReported(false);
      setCreatedDocId(null);
      setSuccessPush(false);
      }
    }
  

  // loadBlacklist = () => {
  //   const itemsRef = firebase.database().ref('blacklist');
  //   let newState = [];
  //   itemsRef.on('value', (snapshot) => {
  //     let items = snapshot.val();
  //     for (let item in items) {
  //         newState.push(items[item]);
  //     }
  //   });
  //   return newState;
  // }

  const handleSubmitButton = () => {
    console.log("Start pushing marker to firebase ..");
    let formatTwoDigits = (digit) => ("0" + digit).slice(-2);
    var tempDate = new Date();
    var getDate = `${tempDate.getFullYear()}-${formatTwoDigits(tempDate.getMonth()+1)}-${formatTwoDigits(tempDate.getDate())} ${formatTwoDigits(tempDate.getHours())}:${formatTwoDigits(tempDate.getMinutes())}:${formatTwoDigits(tempDate.getSeconds())}`;
    const itemsRef = firebase.database().ref('markers');
    const item = {
      lat: location.location.latitude,
      lng: location.location.longitude,
      amount: 0,
      date: getDate,
      userInfo: userInfo
    }
    // let blackList = this.loadBlacklist();
    // if (blackList.includes(this.state.userInfo.IPv4)){
    //   alert("Du har rapporterat för många gånger.")
    // }
    if(location.location.latitude == null || location.location.longitude == null ){
      alert("Din enhet kunde inte skicka platsdata.")
    }
    else {
      var pushedItem = itemsRef.push(item);
      setSuccessPush(true);
      setCreatedDocId(pushedItem);
      console.log("Start pushing marker to firebase ..");
    }

    setHasReported(true);

    setTimeout(() => {
      setHasReported(false);
      setSuccessPush(false);
    }, 60000);
    return () => clearTimeout(timer);
  };

  return (
  <div className="w-full h-full fixed overflow-y-scroll">
    <div ref={sidebarRef} className="bg-blue-400 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full transition duration-200 ease-in-out z-50">
    {/* <div className="w-20 h-20 -mt-4 ml-1">
      <Image
          src="/logo192.png"
          alt="Vit keps"
          width="80px"
          height="80px"
          objectFit="scale-down"
      />
      </div> */}
      <span className="text-2xl font-extrabold px-4">Kontrollanter.se</span>
      <nav className="pt-6">
        <a href="#" className="text-xl block py-2.5 px-4  hover:bg-blue-600 text-white" onClick={goToMap}>Karta</a>
        <a href="#" className="text-xl block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600 text-white" onClick={openRightsPage}>Lagen</a>
        <a href="#" className="text-xl block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600 text-white" onClick={openAboutPage}>Om sidan</a>
        <a href="#" className="text-xl block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-600 text-white" onClick={openContactPage}>Kontakta oss</a>
        <p className="text-sm pt-16 pb-1 px-4">Vi visar var folk har sett kontrollanter de senaste två timmarna.</p>
        <p className="text-sm py-1 px-4">Om inga markörer syns så har ingen rapporterat något just nu.</p>
        <p className="text-sm py-1 px-4"> Klicka på en markör för att se exakt klockslag.</p>
      </nav>
    </div>

    <div ref={rightsPageRef} className="absolute inset-0 w-screen h-full bg-white text-white flex items-center justify-center text-5xl transition duration-200 ease-in-out transform -translate-x-full slide z-50">
      <div className="w-screen h-screen relative grid grid-cols-6 grid-rows-10">
      <div className="flex flex-co row-span-1 col-span-full bg-white text-white">
      
      <button onClick={backToSidebar} className="relative w-1/7 col-span-1 row-span-1 justify-center mx-2 my-2">
        <Image
          src="/arrow.png"
          alt="Back arrow"
          layout="fill"
          objectFit="scale-down"
          priority={true}
        />
        </button>
          <div className="w-7/7 col-start-2 row-span-full text-left pt-2 pb-3 text-4xl flex justify-center items-center text-blue-400">Lagen</div>
        </div>

        <div className="row-start-2 row-span-full col-span-full bg-white text-black text-center text-base xl:mx-80 lg:mx-64 md:mx-40">
          <p className="text-center text-base px-3 py-3">
          Det är av vår uppfattning att många resenärer inte är helt säkra på vad för rättigheter som de eller kontrollanterna besitter. Vi tänker nedan försöka ge en kortare sammanfattning av vad som gäller.
          </p>
          <p className="text-center  font-bold text-xl px-3">Viktigt att komma ihåg</p>
          <p className="text-sm px-3 pb-4 pt-1">
          Om du stigit på en spårvagn/buss med en giltig biljett har en kontrollant inte rätten att gripa dig om du har tappat din biljett och ämnar gå av fordonet så fort du inser detta. Du behöver inte legitimera dig och har rätten att avböja tilläggsavgiften. Bevisbördan för att bevisa att du inte hade en giltig biljett eller visste att du inte hade en giltig biljett ligger hos dem.
          </p>
          <p className="text-center  font-bold text-xl px-3">Kontrollanternas rättigheter</p>
          <p className="text-sm px-3 pb-2 pt-1">
          En kontrollant är varken en polis eller en ordningsvakt, och har således inga fler befogenheter än en vanlig medborgare. De besitter dock tjänstemannaskydd, vilket innebär att en person kan dömas "Hot mot tjänsteman" och "Våld mot tjänsteman" om de utsätts för ett brott.
          </p>

          <p className="text-sm px-3 pt-2">
          Hur kommer det sig då att en kontrollant kan gripa en resenär? Det beror på att alla medborgare har rätt att göra ett så kallat envarsgripande. Ett envarsgripande kan bli aktuellt i samband med en resa i kollektivtrafiken eftersom att resa utan biljett räknas som ringa bedrägeri.
          </p>
          <a className="text-xs text-blue-500 px-3" href="https://lagen.nu/1942:740#K24P7S1">(24 kap. 7 § Rättegångsbalken)</a>
          <a className="text-xs text-blue-500 px-3 pb-4" href="https://lagen.nu/1962:700#K9P2S2">(9 kap 2§ 2 st. Brottsbalken)</a>

          <p className="text-center font-bold text-xl px-3">Att gripa någon</p>
          <p className="text-sm px-3 pb-2 pt-1">
          Alla som ser någon, på bar gärning, begå brottet ringa bedrägeri har alltså rätt att gripa personen. En annan resenär har alltid lika stor rätt att gripa en "tjuvåkare" som en av Västtrafiks kontrollanter.
          </p>

          <p className="text-sm px-3 py-2">
          För att någon ska ta en annan person på bar gärning krävs att personen sett att du inte betalat biljetten när du stigit på fordonet. Du kan även bli tagen på bar gärning om du uppvisar en falsk biljett eller innehar ett färdbevis som inte är giltigt. I detta fallet har då exempelvis en kontrollant rätt att gripa dig och hålla kvar dig på platsen tills polis anlänt.
          </p>

          <p className="text-sm px-3 pb-4 pt-2">
          En kontrollant får bara hålla fast dig eller hindra dig fysiskt från att lämna platsen om de gripit dig genom ett envarsgripande. Om kontrollanten håller fast dig utan att ha tagit dig på bar gärning riskerar de själva att bli anklagade för olaga frihetsberövande.
          </p>

          <p className="text-center font-bold text-xl px-3">Tilläggsavgift</p>
          <p className="text-sm px-3 pb-4 pt-1">
          Om du saknar en giltig biljett har kontrollanten rätt att ta ut en tilläggsavgift. Detta är dock inga "böter". Om du väljer att inte betala tilläggsavgiften har kontrollanten rätt att avvisa dig från fordonet.
          </p>

          <p className="text-center font-bold text-xl px-3">Legitimation</p>
          <p className="text-sm px-3 pb-2 pt-1">
          Eftersom en kontrollant inte har större rätt att kräva att någon legitimerar sig än en vanlig person har, så har du heller ingen skyldighet att visa upp legitimation. Det är endast poliser samt personer med befogenhet utgiven av polisen (ex. ordningsvakter) som har rätten att kräva dig på det.
          </p>

          <p className="text-center text-xs text px-3 py-2 font-bold">
          Vi har ingen juridisk utbildning och texten ovan är endast vår tolkning av lagen. Vi tar inget ansvar gällande felaktigheter i texten.
          </p>
        </div>
      </div>
    </div>

    <div ref={aboutPageRef} className="absolute inset-0 w-screen h-full bg-white text-white flex items-center justify-center text-5xl transition duration-200 ease-in-out transform -translate-x-full slide z-50">
      <div className="w-screen h-screen relative grid grid-cols-6 grid-rows-10">

              <div className="flex flex-co row-span-1 col-span-full bg-white text-white">
      
      <button onClick={backToSidebar} className="relative w-1/7 col-span-1 row-span-1 justify-center mx-2 my-2">
        <Image
          src="/arrow.png"
          alt="Back arrow"
          layout="fill"
          objectFit="scale-down"
          priority={true}
        />
        </button>
          <div className="w-7/7 col-start-2 row-span-full text-left pt-2 pb-3 text-4xl flex justify-center items-center text-blue-400">Om sidan</div>
        </div>

        <div className="row-start-2 row-span-full col-span-full bg-white text-black text-center text-base xl:mx-80 lg:mx-64 md:mx-40">
          <p className="text-center text-lg px-3 py-3">
            Målet med denna sida är att uttöka människors medvetenhet gällande deras rättigheter, samt var Västtrafiks kontrollanter befinner sig. Vi hoppas detta minskar mängden tjuvåkningar och eventuella konflikter i kollektivtrafiken.
          </p>

          <p className="text-center text-sm px-3 py-3">
            Enligt vår uppfattning känner sig många resenärer förvirrade och ibland till och med rädda för situationer där kontrollanter är inblandade. Vi hoppas att den här sidans existens ska bidra till en säkrare kollektivtrafik, såväl för resenärer som personal.
          </p>

          <p className="text-center text-xs px-3 pt-12">
            Vi uppmanar naturligtvis alla som använder denna sida att göra rätt för sig och följa lagen.
          </p>
        </div>
      </div>
    </div>

    <div ref={contactPageRef} className="absolute inset-0 w-screen h-full bg-white text-white flex items-center justify-center text-5xl transition duration-200 ease-in-out transform -translate-x-full slide z-50">
      <div className="w-screen h-screen relative grid grid-cols-6 grid-rows-10">

      <div className="flex flex-co row-span-1 col-span-full bg-white text-white">
      
      <button onClick={backToSidebar} className="relative w-1/7 col-span-1 row-span-1 justify-center mx-2 my-2">
        <Image
          src="/arrow.png"
          alt="Back arrow"
          layout="fill"
          objectFit="scale-down"
          priority={true}
        />
        </button>
          <div className="w-7/7 col-start-2 row-span-full text-left pt-2 pb-3 text-4xl flex justify-center items-center text-blue-400">Kontakta oss</div>
        </div>
        
        <div className="row-start-2 row-span-full col-span-full bg-white text-black text-center text-base xl:mx-80 lg:mx-64 md:mx-40">
          <p className="text-center text-lg px-3 py-3">
          Om ni har synpunkter, förbättringsförslag eller tankar om denna sida är ni välkommna att höra av er via formuläret nedan.
          </p>
          <ContactForm/>
        </div>
      </div>
    </div>

    <div className="h-full w-full"> 
      <div className="grid grid-cols-1 grid-rows-1">
        <div ref={mapRef}  className="row-span-full col-span-full z-30" onClick={goToMap}>
          <MapContainer></MapContainer>
        </div>
        
      <div className="w-screen h-screen">
        <div ref={gridRef} className="relative h-screen flex justify-center items-end gap-8 z-40 pointer-events-none bg-gray-500 bg-opacity-0" >
          <button ref={positionButtonRef} onClick={dispatchLink} className="flex-grow ml-2 mb-52 w-12 h-12 py-2 px-4 flex justify-center items-center  bg-white  text-black  text-center text-base font-semibold shadow-md  rounded-lg pointer-events-auto">
              <svg width="1.5rem" height="1.5rem" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="location-arrow" className="svg-inline--fa fa-location-arrow fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z"></path></svg>
          </button>

          { !hasReported ? 
          <button ref={reportButtonRef} onClick={getUserGeolocationDetails} className="mb-24 py-4 px-6  bg-blue-400 text-white w-full transition ease-in duration-400 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full pointer-events-auto">
            Rapportera kontrollant på min position
          </button> :
          <button ref={deleteButtonRef} onClick={deleteItem} className="py-4 px-6 mb-24 bg-red-400 text-white w-full transition ease-in duration-400 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full pointer-events-auto">
            Ångra rapport
          </button>
          }

          <button ref={menuButtonRef} onClick={openSidebar} className="mr-2 mb-52 w-12 h-12 py-2 px-4 flex justify-center items-center  bg-white  text-black text-center text-base font-semibold shadow-md rounded-lg pointer-events-auto">
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="1.5rem" height="1.5rem"><path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"/></svg>
          </button>

        </div>
      </div>
    </div>

  </div>
</div>
  )
}
