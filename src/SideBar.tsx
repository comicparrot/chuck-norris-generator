import CatButton from "./CatButton";
import './sideBar.css';

type SideBarProps = {
    categories1?:string[];
    onclick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SideBar: React.FC<SideBarProps> = ({categories1 = [], onclick}) => {
    return (
        <div >
            <ul className="sideBar">
                {categories1.map((category,index) => (
                    <CatButton key={index} id={category} category={category} butClick = {onclick}></CatButton>
                ))}
            </ul>        
        </div>
    )};
    
export default SideBar