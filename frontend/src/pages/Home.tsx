import React from "react";
import axios from '../util/axios'
import Markdown from 'markdown-to-jsx/react'
import type {LandingResponse} from './../types/LandingResponse'
import IGIcon from "../components/IGIcon";

function Home() {
    const [showing, setShowing] = React.useState(true);
    const [landing, setLanding] = React.useState<LandingResponse>({
      Banner: { url:"",mime:"", alternativeText: "" }, 
      Description: "", Media_Fullscreen: { url:"",mime:"", alternativeText: "" },
       Name: ""});

    React.useLayoutEffect(() => {
   document.title = 'Home | Gh0re.Grl';
  }, []);

    React.useEffect(() => {
        axios.get<LandingResponse>(`/landing?populate=*`)
          .then((response) => {
            setLanding(response.data.data as LandingResponse);
          })
          .catch((error) => {
            console.log("Error fetching landing:", error);
          });
    }, [])
    
    return (
        <>
        {/* Full Screen video */}
        <div className={(!showing || localStorage.getItem("open") == "true" ? "hidden" : "")}>
          <div className="absolute overflow-hidden max-w-screen max-h-screen left-0 top-0 h-full w-full">
            <video muted autoPlay loop src={import.meta.env.VITE_STRAPI_API + (landing.Media_Fullscreen.url)} className='min-h-full min-w-full h-full w-full object-cover'>
            {/* <source src={import.meta.env.VITE_STRAPI_API + (landing.Media_Fullscreen.url)} type={landing.Media_Fullscreen.mime} /> */}
            </video>
            <div className='mx-auto text-center absolute left-[47%] top-[48%] rounded border px-4 py-2 bg-[#ebfbee] border-black'>
                <button className='cursor-pointer' onClick={() => { localStorage.setItem("open", "true"); setShowing(!showing) } }>Click to Enter</button> {showing}
            </div>
          </div>
        </div>


        {/* Actual homepage */}
            <div className={(showing && localStorage.getItem("open") == null ? "hidden" : "")}>
            <div className="w-full object-fit mb-5">
                <img src={import.meta.env.VITE_STRAPI_API + landing.Banner.url} alt={landing.Banner.alternativeText} className="rounded-xl" />
            </div>
            <h1 className="text-3xl font-bold mt-15 mb-5">{landing.Name}</h1>
            {/* As descrições apesar de texto, são markdown (como os readme do github) 
              Isto é um componente que interpreta markdown para jsx */}
            <Markdown children={landing.Description} className="text-base" />
            <ul className="my-5 text-right">
                <li className="inline-block mr-20 align-bottom"><a href="http://instagram.com" target="_blank" className="mt-2 block"><IGIcon /></a></li>
                <li className="inline-block"><a href="#" className="border-2 px-4 py-2 rounded">Call to Action</a></li>
            </ul>
            </div>
        </>
    )
}

export default Home;