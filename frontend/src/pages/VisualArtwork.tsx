import { useEffect, useLayoutEffect, useState } from "react";
import type { ProjectResponse } from "../types/ProjectResponse";
import axios from "axios";
import Markdown from 'markdown-to-jsx/react'

function VisualArtwork() {
    
    const defaultProjects:ProjectResponse = {
        documentId: "",
        Title: "",
        Description: "",
        Credits: "",
        Image: [
            {
                url: "",
                alternativeText: ""
            }
        ]
    }
    
    const [artworks, setArtworks] = useState<Array<ProjectResponse>>([defaultProjects]);

    useLayoutEffect(() => {
        document.title = 'Visual Artwork | Gh0re.Grl';
    }, []);

    useEffect(() => {
        axios.get<ProjectResponse>(`projects/?filters[Type][$eq]=Visual Artwork&populate=*`)
        .then((response) => {
          setArtworks(response.data.data);
          console.log(artworks)
        })
        .catch((error) => {
          console.log("Error fetching visual artworks:", error);
        });
    
    }, [])
    
    return(
        <>
        <div className="max-w-6xl mx-auto">

        {artworks.map((item,i) => {
            return(<div className="w-full" key={i}>
                <img className="w-full h-auto rounded-lg" src={import.meta.env.VITE_STRAPI_API + item.Image[0].url} alt={item.Image[0].alternativeText} />
                <Markdown children={item.Description} className="my-8 mb-16 text-base" />
            </div>)
        })}

        </div>
        </>
    )
}

export default VisualArtwork;