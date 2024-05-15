interface HeaderInput {
    heading: string;
    paragraph:string;
}

export default function Header({heading,paragraph}:HeaderInput){
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
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            </p>
        </div>
    )
}