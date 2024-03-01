"use client"

import { HomeIcon, ListOrderedIcon, LogInIcon, LogOut, MenuIcon, Percent, ShoppingCartIcon } from "lucide-react"
import { Button } from "./button"
import { Card } from "./card"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./sheet"
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Separator } from "@radix-ui/react-separator"

const Header = () => {
  const { status, data } = useSession();

  const handleLoginClick = async () => {
    await signIn();
  }

  const handleLogoutClick = async () => {
    await signOut();
  }

  return (
    <Card className="flex justify-between p-[1.875rem] items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>

          {status === 'authenticated' && data?.user && (
            <div className="flex flex-col">
            <div className="flex items-center gap-2 py-2">
              <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>
                  {data.user.image && (
                    <AvatarImage className="w-16 rounded-full	" src={data.user.image} />
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-medium">{data.user.name}</p>
                  <p className="text-sm opacity-75">Boas compras</p>
                </div>
            </div>
                <Separator />
            </div>
          )}

          <div className="mt-4 flex flex-col gap-2">
            {status === 'unauthenticated' && (
              <Button className="w-full justify-start gap-3" variant="outline" onClick={handleLoginClick}>
                <LogInIcon />
                Fazer Login
              </Button>
            )}

            {status === 'authenticated' && (
              <Button className="w-full justify-start gap-3" variant="outline" onClick={handleLogoutClick}>
                <LogOut />
                Fazer Logout
              </Button>
            )}

            <Button className="w-full justify-start gap-3" variant="outline">
              <HomeIcon />
              Início
            </Button>

            <Button className="w-full justify-start gap-3" variant="outline">
              <Percent />
              Ofertas
            </Button>

            <SheetClose asChild>
              <Link href="/catalog">
                <Button className="w-full justify-start gap-3" variant="outline">
                  <ListOrderedIcon />
                  Catálogo
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

    <Link href="/">
      <h1 className="font-semibold text-lg">
        <span className="text-primary">FSW</span> Store
      </h1>
    </Link>

      <Button size="icon" variant="outline">
        <ShoppingCartIcon />
      </Button>
    </Card>
  )
}

export default Header;