interface pageContentProps {
  children: React.ReactNode
}

const pageContent: React.FC<pageContentProps> = ({ children }) => {

  return (
    <div className="flex-1 m-4 p-4 rounded-md self-stretch bg-white">
      {children}
    </div>
  )
}

export default pageContent