import React ,{useState} from 'react'
import { ModeToggle } from '@/pages/profile/components/ModeToggle'
import Profile from '@/pages/profile/Profile'
import { Menu } from 'lucide-react';
import { MobileSidebar } from './component/MobileSidebar';



const TopBar = () => {
  const [open,setOpen]=useState(false)
  const unParseduser=sessionStorage.getItem("User")
  const user=JSON.parse(unParseduser)
  console.log(user)
  return (
    <div className='flex justify-around md:justify-end' >
        <div className='md:hidden mt-4 '>
        <MobileSidebar/> 
      </div>
      

         <div className=' flex  justify-end '>
    <div className=" flex  md:min-w-[200px] gap-4  p-2 rounded-md">
  <div className=" rounded-md bg-muted p-1 cursor-pointer transition">
    <ModeToggle/>
  </div>
  <div className="flex items-center p-2 bg-muted gap-2 rounded-md cursor-pointer" onClick={()=>setOpen(true)} >
    <div className="w-10 h-10 rounded-full bg-sidebar flex items-center justify-center text-white font-bold">
      {user.firstName?.[0]}{user.lastName?.[0]}
    </div>
    <span className="text-sm font-medium hidden md:flex">{user.firstName} {user.lastName}</span>
  </div>
</div>
 </div>

  <Profile open={open} setOpen={setOpen}/>
 
 
    </div>
 

  )
}

export default TopBar