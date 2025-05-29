import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import AzubiLogo from "../../../../assets/Azubi-Logo.svg"
import { navLinks, bottomLinks } from "./data"
import NavLinkItem from './NavLinkItem'
import Logout from "@/pages/logout/Logout"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {!open && (
        <SheetTrigger asChild>
          <Button variant="outline"><Menu /></Button>
        </SheetTrigger>
      )}
      <SheetContent side="left" className="w-[200px]">
        <div className="w-full h-full bg-sidebar text-sidebar-foreground dark:bg-sidebar flex flex-col">
          {/* Logo section */}
          <div className='flex justify-center gap-1 items-center w-[150px] h-[93px]  mt-[14px] ml-2 rounded-sm'>
            <img src={AzubiLogo} alt="Logo" className='w-[30px] h-[28px]' />
            <span className='leading-[30px] text-[24px] font-bold font-lusitana text-accent dark:text-white'>
              CLient
            </span>
          </div>

          {/* Navigation */}
          <div className='flex flex-col flex-1 dark:bg-sidebar-accent'>
            <div className="flex flex-col mt-[37px] gap-4">
              {navLinks.map((link) => (
                <NavLinkItem key={link.id} item={link} />
              ))}
            </div>

            <div className="flex-grow" />

            <div className="flex flex-col gap-4 mb-10 ">
              {bottomLinks.map((link) =>
                link.type === "logout" ? (
                  <Logout key={link.id} />
                ) : (
                  <NavLinkItem key={link.id} item={link} />
                )
              )}
            </div>
          </div>
        </div>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  )
}
