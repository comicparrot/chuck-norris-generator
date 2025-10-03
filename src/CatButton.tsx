import './style.css'

type CatButtonProp = {
    id:string,
    category:string,
    butClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    activeBorderProp:boolean;
}

const CatButton = ({id,category,butClick,activeBorderProp} : CatButtonProp) => {
    return (
        <button key={id} id={category} onClick={butClick} className={`textStyle text-capitalize ${activeBorderProp ? "border border-3 border-danger" : ""}`}>{category}</button>
    );

};

export default CatButton