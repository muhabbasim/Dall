import { Copy } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ChangePassword from "./ChangePassword"
 
export function ChangePasswordDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit password</DialogTitle>
          <DialogDescription>
            Make changes to your passowrd here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <ChangePassword/>
        </div>
        <DialogFooter className="sm:justify-start px-6">
          <DialogClose asChild>
            <Button className="w-full" type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}