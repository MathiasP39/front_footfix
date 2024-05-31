interface HeaderInput {
    heading: string;
    paragraph:string;
    setClick:any
}

export default function Header({heading,paragraph, setClick}:HeaderInput){
    return(
        <div className="">
            <div className="flex justify-center">
                <img 
                    alt=""
                    className="h-14 w-14"
                    src="src/assets/footfix_site_icon.svg"/>
            </div>
            <h2 className=" text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <a href="#" onClick={() => setClick(true)}>
                <p className="text-center text-sm text-gray-600 mt-5">
                {paragraph} {' '}
                </p>
            </a>
        </div>
    )
}