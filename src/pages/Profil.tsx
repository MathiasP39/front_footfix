import { useQuery } from "@tanstack/react-query"
import { useContext, useEffect, useState } from "react"
import { getUserInfo } from "../api/auth"
import { getMyArticles } from "../api/article"
import { AuthContext } from "../services/Auth"
import { Navigate } from "react-router-dom"

type UserInfo = {
    fullname:string
    email:string
    role:string
}

type ArticleInfo = {
    id: number,
    title: string,
    description: string,
    content: string,
}

function Profil () {

    const authContext = useContext(AuthContext)

    const [section,setSection] = useState("info")

    const [delayNavigate, setDelayNavigate] = useState(false);

    useEffect(() => {
        if (!authContext.user_status.isLogin) {
          const timer = setTimeout(() => {
            setDelayNavigate(true);
          }, 500); // 500ms delay
          return () => clearTimeout(timer); // Cleanup timeout on unmount
        }
      }, [authContext.user_status.isLogin]);

    const {data:info} = useQuery<UserInfo>({
        queryFn: async () => await getUserInfo(),
        queryKey: ["userInfo"],
        })
    
    const {data:myarticles} = useQuery<ArticleInfo[]> ({
        queryFn: async () => await getMyArticles(),
        queryKey: ["myarticlesInfo"]
    })

    return (
        <div className="pt-20">
            <a href='#'onClick={() => setSection("info")}> Mes Infos </a>
            <a href='#' onClick={() => setSection("articles")}> Mes articles </a>
            <a href='#' onClick={() => setSection("compos")}> Mes compos </a>
            <div>
                {section == "info" && <><p>Section info</p><p>fullName : {info?.fullname}</p><p>Email : {info?.email}</p><p>Role: {info?.role}</p></>}
                {section == "articles" && <><p>Section article</p>
                <div>{myarticles && myarticles.map((article) => {return article.title})}
                </div>
                </>}
                {section == "compos" && <><p>Section compo</p></>}
            </div>
            {delayNavigate ? <Navigate to="/" replace={true} /> : <div>Your Protected Component</div>}
        </div>
    )
}

export default Profil