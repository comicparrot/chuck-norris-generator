import CatButton from "./CatButton";
import './sideBar.css';

type SideBarProps = {
    categories1?:string[];
    onclick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    activeBorder?:boolean[];
}

const SideBar: React.FC<SideBarProps> = ({categories1 = [], onclick,activeBorder=[]}) => {
    return (
        <div >
            <ul className="sideBar">
                {categories1.map((category,index) => (
                    <CatButton key={index} id={category} category={category} butClick = {onclick} activeBorderProp = {activeBorder[index]??false}></CatButton>
                ))}
            </ul>        
        </div>
    )};
    
export default SideBar