import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLayoutEffect, useState } from 'react';
import { PopupButton, useCalendlyEventListener } from "react-calendly";



function Contacts() {

  // Variavel para guardar os dados da marcação do calendly (url)
  // que a libraria do calendly envia quando marcas um novo booking
  // são injectados num input type="hidden" no final do 
  // formulário para guardar essa info no backend
  var [availability, setAvailability] = useState('')

  // Esquema/Schema do formulário de book me
  // Serve para fazer validação dos campos antes de enviar
    const book_schema = z.object({
    name: z.string().min(1, { message: 'Required' }),
    email: z.email(),
    location: z.string().min(1, { message: 'Required' }),
    type: z.enum(["performance", "piercings", "needle_play", "misc"], { message: 'Required' }),
    avail: z.url().optional().or(z.literal('')),
    message: z.string().min(10, { message: 'Required' }),
  })
  // Validação extra para obrigar a ter uma availability
  // Quando o tipo é piercing
  .superRefine((data, ctx) => {
    if (data.type == "piercings") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Availability is required.",
        path: ["avail"]
      })
    }
   });

  // Esquema/Schema do formulário de contact me
  // Serve para fazer validação dos campos antes de enviar o form
  const contact_schema = z.object({
    name: z.string().min(1, { message: 'Required' }),
    email: z.email(),
    message: z.string().min(10, { message: 'Required' }),
  });
  
  // Iniciar a libraria com o schema do formulario de contacto
  const {
    register,
    handleSubmit,
    formState: { errors:contact_error },
  } = useForm({
    resolver: zodResolver(contact_schema),
  });
  
  // Iniciar a libraria com o schema do formulario de book_me
  const {
    register:register2,
    handleSubmit:handleSubmit2,
    watch,
    formState: { errors:book_error },
  } = useForm({
    resolver: zodResolver(book_schema),
  });
  
  // Função watch() fica a 'vigiar' o formulario, 
  // neste caso o campo "type" e define a 
  // var showAvail para mostrar ou ocultar
  // o campo de disponibilidade segundo o tipo
  const book_type = watch("type")
  let showAvail = false
  if (book_type == "piercings") {
    showAvail = true
  }

  // Event Listeners para a libraria do Calendly
  // Para poder ter acesso ao evento que a pessoa 'bookeou'
  // E envia-lo ao backend. Não está terminado, temos que testar
  // Com um link real para ver o que retorna
  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: (e) => {
      console.log(e.data.payload)
      setAvailability(e.data.payload.event.uri)
    },
    onPageHeightResize: (e) => console.log(e.data.payload.height),
  });

  useLayoutEffect(() => {
     document.title = 'Contact | Gh0re.Grl';
    }, []);
  
  return (
    <>
    <h1 className='text-3xl font-bold text-center my-15'>Contact</h1>
    
    <h2 className='text-2xl font-bold text-center my-5'>Book me</h2>
    <form onSubmit={handleSubmit2((d) => console.log(d))} className='w-full lg:w-lg mx-auto'>
    <div>
    <label className='w-3xs block pr-5 mt-5 font-bold mb-2' htmlFor="name">Name:</label>
    <input id='name' className='border rounded px-4 py-2 w-full' {...register2('name')} />
    {book_error.name?.message && <p>{book_error.name?.message}</p>}
    </div>
    
    <div>
    <label className='w-3xs block pr-5 mt-5 font-bold mb-2' htmlFor="email">Email:</label>
    <input id='email' className='border rounded px-4 py-2 w-full' type="email" {...register2('email')} />
    {book_error.email?.message && <p>{book_error.email?.message}<br/></p>}
    </div>

    <div>
    <label className='w-3xs block pr-5 mt-5 font-bold mb-2' htmlFor="location">Location:</label>
    <input id='location' className='border rounded px-4 py-2 w-full' type="text" {...register2('location')} />
    {book_error.location?.message && <p>{book_error.location?.message}</p>}
    </div>

    <div>
    <label className='w-3xs block pr-5 mt-5 font-bold mb-2' htmlFor="type">Type:</label>
    <select id="type" defaultValue={""} className='border rounded px-4 py-2 w-full' {...register2('type')}>
      <option value="" disabled>----</option>
      <option value="performance">Performance</option>
      <option value="piercings">Piercings</option>
      <option value="needle_play">Needle Play</option>
      <option value="misc">Misc.</option>
    </select>
    {book_error.type?.message && <p>{book_error.type?.message}</p>}
    </div>

    <div className={showAvail ? "" : "hidden"}>
    <p className='w-3xs block pr-5 mt-5 font-bold mb-2'>Availability:</p>
     {/* Componente da libraria Calendly */}
     <PopupButton
        url="https://calendly.com/davidlillo"
        rootElement={document.getElementById("root")}
        text="Check here"
        />
      {book_error.avail?.message && <p>{book_error.avail?.message}</p>}
    </div>
    
    <div>
    <label className='w-3xs block pr-5 mt-5 font-bold mb-2' htmlFor="message">Message:</label>
    <textarea id='message' className='border rounded px-4 py-2 w-full' cols={50} {...register2('message')}/>
    {book_error.message?.message && <p>{book_error.message?.message}</p>}
    </div>
    <input type="hidden" value={availability}  {...register2('avail')}/>
    <input type="submit" value={"Book"} className='border px-4 py-2 rounded mt-5' />
    </form>
    
    <h2 className='text-2xl font-bold text-center my-5'>Contact me</h2>
    
    <form onSubmit={handleSubmit((d) => console.log(d))} className='w-full lg:w-lg mx-auto'>
    <div>
    <label className='w-3xs block pr-5 mt-5 font-bold mb-2' htmlFor="name">Name:</label>
    <input id='name' className='border rounded px-4 py-2 w-full' {...register('name')} />
    {contact_error.name?.message && <p>{contact_error.name?.message}</p>}
    </div>
    
    <div>
    <label className='w-3xs block pr-5 mt-5 font-bold mb-2' htmlFor="email">Email:</label>
    <input id='email' className='border rounded px-4 py-2 w-full' type="email" {...register('email')} />
    {contact_error.email?.message && <p>{contact_error.email?.message}</p>}
    </div>
    
    <div>
    
    <label className='w-3xs block pr-5 mt-5 font-bold mb-2' htmlFor="message">Message:</label>
    <textarea id='message' className='border rounded px-4 py-2 w-full' cols={50} {...register('message')}/>
    {contact_error.email?.message && <p>{contact_error.message?.message}</p>}
    </div>
    <input type="submit" value={"Contact"} className='border px-4 py-2 rounded mt-5' />
    </form>
    </>
  )
}

export default Contacts
