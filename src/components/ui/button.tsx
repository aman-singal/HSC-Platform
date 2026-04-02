import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-corporate-blue text-white hover:bg-corporate-blue/90 shadow-[0_0_15px_rgba(0,80,255,0.3)] hover:shadow-[0_0_25px_rgba(0,80,255,0.5)] border border-corporate-blue/20",
        destructive: "bg-red-500 text-white hover:bg-red-500/90",
        outline: "border border-divider bg-transparent hover:bg-layer-light text-heading",
        secondary: "bg-layer-dark text-heading hover:bg-layer-dark/80",
        ghost: "hover:bg-layer-light hover:text-heading",
        link: "text-corporate-blue underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-corporate-blue to-sub-accent text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all border border-white/20",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
