export default function Footer() {
  return (
    <footer className="w-full py-6 mt-12 border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} AgriGuard AI. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/60">
          Empowering farmers with intelligent crop diagnosis
        </p>
      </div>
    </footer>
  )
}
