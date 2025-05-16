import React ,{useState} from 'react'
import { ModeToggle } from '@/pages/profile/components/ModeToggle'
import Profile from '@/pages/profile/Profile'

const TopBar = () => {
  const [open,setOpen]=useState(false)
  return (
    <div >
         <div className=' flex  justify-end '>
    <div className=" flex  w-[200px] gap-4  p-2 rounded-md">
  <div className=" rounded-md bg-muted p-1 cursor-pointer transition">
    <ModeToggle/>
  </div>
  <div className="flex items-center p-2 bg-muted gap-2 rounded-md cursor-pointer" onClick={()=>setOpen(true)} >
    <div className="w-8 h-8 rounded-full bg-sidebar flex items-center justify-center text-white font-bold">
      JD
    </div>
    <span className="text-sm font-medium">John Doe</span>
  </div>
</div>
 </div>

  <Profile open={open} setOpen={setOpen}/>
 
 
    </div>
 

  )
}

export default TopBar