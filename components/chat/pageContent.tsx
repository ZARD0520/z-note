interface pageContentProps {
  children: React.ReactNode
}

const pageContent: React.FC<pageContentProps> = ({ children }) => {

  return (
    <div className="overflow-y-auto flex-1 m-4 p-4 rounded-md self-stretch bg-white">
      {children}
    </div>
  )
}

export default pageContent