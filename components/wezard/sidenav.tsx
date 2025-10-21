import { WezardSideNavProps } from "@/type/wezard/home";
import Link from "next/link";

const SideNav: React.FC<WezardSideNavProps> = ({contentList, isMobile}) => {
  const showContent = !isMobile ? 
  (<nav>
    {
      contentList.map((item)=>(
        <Link key={item.title} href={item.href}>
          {item.title}
        </Link>
      )) 
    }
  </nav>) : 
  (<div>点击展开</div>)
  return showContent
}

export default SideNav