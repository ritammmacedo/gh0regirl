import "react-image-gallery/styles/image-gallery.css";
import { NavLink } from "react-router";
import slugify from '@sindresorhus/slugify'

function ProjectItemLeft({title, docId, img, alternativeText}) {
  return (
    <>            
    <div className="flex flex-col md:flex-row items-center mb-16">

    <div className="w-full lg:w-1/2">
        <img src={import.meta.env.VITE_STRAPI_API + img} alt={alternativeText} className="rounded-lg" />
    </div>
    <div className="w-full lg:w-1/2 text-center">
        <h2 className="text-3xl font-bold my-8 w-full">{title}</h2>
        <NavLink to={"/projects/performances/" + slugify(title, { lowercase: true }) + "/" + docId} className="w-full rounded border-1 px-4 py-2 bg-[#ebfbee] border-black">More</NavLink>
    </div>
    </div>
    </>           

  )
}

export default ProjectItemLeft
