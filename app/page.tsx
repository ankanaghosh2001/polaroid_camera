"use client"
import { useState } from 'react'
import ShotsDropdown from '@/components/ShotsDropdown'
import { useRouter } from 'next/navigation' 

const page = () => {

  const router = useRouter();

  const [shots, setShots] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/camera?shotsCount=${shots}`)
  }

  return (
    <div className='mt-3 text-center text-xl h-[72vh] flex flex-col justify-center items-center'>
      <h1 className='mt-5 text-center text-[2rem] font-berk-shwash text-foreground'>Welcome to Pretty Polaroids</h1>
      <div className="shotsForm bg-white w-[26rem] p-6 mt-10 rounded-xl font-berk-shwash">
        <form onSubmit={handleSubmit} method="post">
          <label htmlFor="numShots" className="block mb-7 font-semibold text-foreground text-md tracking-wide">Before entering the photobooth, please select the number of shots you want</label>
          <ShotsDropdown value={shots} onChange={setShots} />
          <br />
          <button 
            type="submit" 
            className="bg-foreground text-card text-[1rem] py-3 px-8 rounded-2xl hover:bg-foreground/85 transition-colors cursor-pointer"
            disabled={!shots}
          >
            Let's Take Photos!
          </button>
        </form>
      </div>
    </div>
  )
}

export default page
