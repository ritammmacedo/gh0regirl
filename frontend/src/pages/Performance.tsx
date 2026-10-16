import axios from "axios";
import { useState, useLayoutEffect, useEffect } from "react";
import ProjectItemLeft from "../components/ProjectItemLeft";
import type { ProjectResponse } from "../types/ProjectResponse";
import ProjectItemRight from "../components/ProjectItemRight";
import { Outlet } from "react-router";

function Performance() {
    // Conteudo default da resposta da API
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
  
  // Define estados dentro do react para que os dados sejam reactivos
  // Para as galerias de needle play e piercings.
  const [projects, setProjects] = useState<Array<ProjectResponse>>([defaultProjects]);

  useLayoutEffect(() => {
     document.title = 'Performances | Gh0re.Grl';
    }, []);
  
  useEffect(() => {
        axios.get<ProjectResponse>(`projects/?filters[Type][$eq]=Performance&populate=*`)
        .then((response) => {
          setProjects(response.data.data);
          
        })
        .catch((error) => {
          console.log("Error fetching piercings:", error);
        });


    }, []);
    return(
        <>
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl text-center font-bold my-10">Performances</h1>
            
                {projects.map((project, i) => {
                    if (i % 2 == 0) {
                        return(<ProjectItemLeft title={project.Title} docId={project.documentId} img={project.Image[0].url} alternativeText={project.Image[0].alternativeText} key={i} />)
                    } else {
                        return(<ProjectItemRight title={project.Title} docId={project.documentId} img={project.Image[0].url} alternativeText={project.Image[0].alternativeText} key={i} />)
                    }
                })}

        <Outlet />
        </div>
        </>
    )
}

export default Performance;