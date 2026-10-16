import { useEffect, useLayoutEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import axios from './../util/axios'
import "react-image-gallery/styles/image-gallery.css";
import type { GalleryResponse } from "../types/GalleryResponse";

function Gallery() {
  
  // Conteudo default da resposta da API
  const defaultGallery:GalleryResponse = {
    Medias:[],
    Title: ""
  }
  
  // Define estados dentro do react para que os dados sejam reactivos
  // Para as galerias de needle play e piercings.
  const [needle, setNeedle] = useState<GalleryResponse>(defaultGallery);
  const [piercings, setPiercings] = useState<GalleryResponse>(defaultGallery);

  useLayoutEffect(() => {
     document.title = 'Gallery | Gh0re.Grl';
    }, []);
  
  useEffect(() => {
      
        // Fetch needle
        axios.get<GalleryResponse>(`/galleries/slotz9s8kyph0wh5uwz9zn2b?populate=*`)
        .then((response) => {
          setNeedle(response.data);
          
        })
        .catch((error) => {
          console.log("Error fetching needles:", error);
        });

        // Fetch piercings
        axios.get<GalleryResponse>(`/galleries/dauzrkx964ehi4ksa8julh15?populate=*`)
        .then((response) => {
          setPiercings(response.data);
          
        })
        .catch((error) => {
          console.log("Error fetching piercings:", error);
        });


    }, []);
  return (
    <>
    <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center my-8">Needle Play</h1>
        <div>
          {/* Componente da libraria react-image-gallery */}
            <ImageGallery items={needle.Medias ? (needle.Medias) : ([])} 
    lazyLoad={true} showPlayButton={false} autoPlay={false}/>
        </div>
        
        <h1 className="text-3xl font-bold text-center mt-15 mb-8">Piercings</h1>
        <div>
            <ImageGallery items={piercings.Medias ? (piercings.Medias) : ([])} 
    lazyLoad={true} showPlayButton={false} autoPlay={false}/>
        </div>
    </div>
    </>
  )
}

export default Gallery
