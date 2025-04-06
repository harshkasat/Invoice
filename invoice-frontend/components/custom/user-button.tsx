"use client"

import { useClerk, useUser } from "@clerk/nextjs"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function CustomUserButton() {
  const { user } = useUser()
  const { signOut } = useClerk()

  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState("center")
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      const dropdownRect = dropdownRef.current.getBoundingClientRect()
      const spaceOnLeft = buttonRect.left
      const halfDropdownWidth = dropdownRect.width / 2

      if (spaceOnLeft < halfDropdownWidth) {
        setDropdownPosition("left")
      } else {
        setDropdownPosition("center")
      }
    }
  }, [isOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!user) return null

  return (
    <UserProfileButton
      username={user.username || "User"}
      email={user.primaryEmailAddress?.emailAddress || ""}
      imageUrl={user.imageUrl}
      onSignOut={() => signOut()}
    />
  )
}

interface UserProfileButtonProps {
  username?: string
  email?: string
  imageUrl?: string
  onSignOut?: () => void
}

function UserProfileButton({
  username = "User",
  email = "user@example.com",
  imageUrl = "/placeholder.svg?height=32&width=32",
  onSignOut = () => console.log("Sign out clicked"),
}: UserProfileButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState("center")
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      const dropdownRect = dropdownRef.current.getBoundingClientRect()
      const spaceOnLeft = buttonRect.left
      const halfDropdownWidth = dropdownRect.width / 2

      if (spaceOnLeft < halfDropdownWidth) {
        setDropdownPosition("left")
      } else {
        setDropdownPosition("center")
      }
    }
  }, [isOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-700 hover:border-blue-500 transition-colors"
      >
        <img src={imageUrl || "/placeholder.svg"} alt={`${username}'s avatar`} className="w-full h-full object-cover" />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute bottom-full mb-2 w-48 bg-[#0f1629] rounded-md shadow-lg py-1 border border-gray-700 ${
            dropdownPosition === "center" ? "left-1/2 -translate-x-1/2" : "left-0"
          }`}
        >
          <div className="px-4 py-2 border-b border-gray-700">
            <p className="text-sm font-medium text-white truncate">
              {username[0].toUpperCase() + username.substring(1)}
            </p>
            <p className="text-xs text-gray-400 truncate">{email}</p>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/50"
            onClick={onSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      )}
    </div>
  )
}

