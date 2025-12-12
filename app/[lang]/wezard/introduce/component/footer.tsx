export const Footer: React.FC<any> = ({ dict }) => {
  return (
    <footer className="py-12 border-t border-white/10 mt-16">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400 mb-4">{dict.zard.footer.copyright}</p>
        <p className="text-gray-500 text-sm">{dict.zard.footer.description}</p>
      </div>
    </footer>
  )
}
