import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ProfileImage from "../../assets/ProfileImage.jpg"

const Profile=({open,setOpen})=> {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* <Button variant="outline"></Button> */}
      </DialogTrigger>
     <DialogContent className="flex flex-col sm:max-w-[404px] h-auto absolute right-5 top-15 translate-x-0 translate-y-0">
  <div className="relative bg-sidebar w-full h-[198px]">
    {/* Position the image absolutely relative to this parent */}
    <div className="absolute w-[250px] h-[250px] left-1/2 transform -translate-x-1/2 bottom-0 translate-y-2/5">
      <img
        src={ProfileImage}
        alt="Profile Photo of Admin"
        className="rounded-full object-cover w-full h-full"
      />
    </div>
  </div>

  {/* This spacer pushes the text below the image */}
  <div className="mt-[100px] flex flex-col items-center text-center space-y-2 pb-20">
    <p className="font-semibold text-lg">John Doe</p>
    <p className="text-muted-foreground">johndoe@gmail.com</p>

    <div className="w-full mt-4 border-t" />
    
    <div className="grid grid-cols-2 gap-y-[20px] w-full px-4 text-sm text-left mt-4">
      <span className="text-muted-foreground">Program</span>
      <span className="font-medium">Software Development</span>

      <span className="text-muted-foreground">Gender</span>
      <span className="font-medium">Male</span>

      <span className="text-muted-foreground">Contact</span>
      <span className="font-medium">+23341000012</span>

      <span className="text-muted-foreground">Location</span>
      <span className="font-medium">Accra, Ghana</span>

      <span className="text-muted-foreground">Paid</span>
      <span className="font-medium">$450.00</span>

      <span className="text-muted-foreground">Bio</span>
      <span className="font-medium">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </span>
    </div>
  </div>

  
</DialogContent>

    </Dialog>
  )
}
export default Profile
