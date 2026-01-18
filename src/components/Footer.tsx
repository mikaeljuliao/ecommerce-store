export function Footer() {
  return (
    <footer
      className="
        border-t
        transition-colors duration-300
        bg-[rgb(var(--bg-secondary))]
        text-[rgb(var(--text-muted))]
        border-[rgb(var(--border))]
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-6 text-center">
        <p className="text-sm">
          © 2025 SetupStore. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}