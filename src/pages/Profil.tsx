import { useState } from "react"

function Profil () {
    const [section,setSection] = useState("info")

    return (
        <div className="pt-20">
            <a href='#'onClick={() => setSection("info")}> Mes Infos </a>
            <a href='#' onClick={() => setSection("articles")}> Mes articles </a>
            <a href='#' onClick={() => setSection("compos")}> Mes compos </a>
            <div>
                {section == "info" && <><p>Section info</p></>}
                {section == "articles" && <><p>Section article</p></>}
                {section == "compos" && <><p>Section compo</p></>}
            </div>
        </div>
    )
}

export default Profil