import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Markdown from 'markdown-to-jsx/react'
import type { ProjectResponse } from "../types/ProjectResponse";

function Popup() {
    const defaultProject:ProjectResponse = {
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
    
    // Define estados dentro do react para que os dados sejam reactivos
    // Para as galerias de needle play e piercings.
    const [project, setProject] = useState<ProjectResponse>(defaultProject);
    const {docId} = useParams()
    const navigate = useNavigate();
    
    useEffect(() => {
        
        // Fetch project
        axios.get<ProjectResponse>(`projects/` + docId + `/?populate=*`)
        .then((response) => {
            setProject(response.data.data);
        })
        .catch((error) => {
            console.log("Error fetching:", error);
        });
        
        
    }, []);
    
    return (
        <>
        <div className="w-full h-full bg-gray-100/20 backdrop-blur-sm absolute top-0 left-0 flex items-center justify-center">
        <div className="size-full h-auto lg:size-1/2 mx-auto flex flex-col md:flex-row items-center gap-6 rounded-lg bg-gray-100 px-12">
        <div className="w-1/2">
        <img className="rounded-lg" src={import.meta.env.VITE_STRAPI_API + project.Image[0].url} alt={project.Image[0].alternativeText} />
        </div>
        <div className="w-1/2">
        <p className="text-right">
        <a href="/projects/performance" onClick={(e) => {
            e.preventDefault()
            navigate('/projects/performances')
        }}>X</a>
        </p>
        <h1 className="text-3xl text-center font-bold my-8">{project.Title}</h1>
        <Markdown children={project.Description} className="text-base" />
        <p className="my-8 text-sm">Credits: {project.Credits}</p>
        </div>
        </div>
        </div>
        </>
    )
}

export default Popup;