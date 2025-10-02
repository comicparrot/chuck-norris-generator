import './style.css'

type CatButtonProp = {
    id:string,
    category:string,
    butClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CatButton = ({id,category,butClick} : CatButtonProp) => {
    return (
        <button key={id} id={category} onClick={butClick} className="textStyle text-capitalize">{category}</button>
    );

};

export default CatButton