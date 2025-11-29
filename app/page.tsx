"use client"
import { useState } from 'react'
import ShotsDropdown from '@/components/ShotsDropdown'
import { useRouter } from 'next/navigation' 
import { easeIn, motion, scale } from 'motion/react'
import { animate } from 'motion'
import { toast } from 'sonner'

const page = () => {

  const router = useRouter();

  const [shots, setShots] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/camera?shotsCount=${shots}`)
  }

  return (
    <div className='mt-3 text-center text-xl h-[72vh] flex flex-col justify-center items-center'>
      <motion.h1 className='mt-5 text-center text-[1.6rem] md:text-[2rem] font-berk-shwash text-foreground' initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ type:"spring", bounce: 0.7, duration: 1.5 }}>Welcome to Pretty Polaroids</motion.h1>
      <motion.div className="shotsForm bg-white w-[20rem] md:w-[26rem] p-6 mt-10 rounded-xl font-berk-shwash" initial={{ opacity: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
        <form onSubmit={handleSubmit} method="post">
          <label htmlFor="numShots" className="block mb-7 md:font-semibold text-foreground text-[1rem] md:text-md tracking-wide">Before entering the photobooth, please select the number of shots you want</label>
          <ShotsDropdown value={shots} onChange={setShots} />
          <br />
          <motion.button 
            type="submit" 
            className="bg-foreground text-card text-[0.7rem] md:text-[1rem] py-2 px-5 rounded-xl md:rounded-2xl hover:bg-foreground/85 transition-colors cursor-pointer"
            disabled={!shots}
            whileHover={{ scale: 1.05, transition: { ease: "easeInOut"} }}
          >
            Let's Take Photos!
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default page
