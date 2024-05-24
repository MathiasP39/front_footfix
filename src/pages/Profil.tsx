import { useMutation, useQuery, } from "@tanstack/react-query"
import { useContext, useEffect, useState } from "react"
import { getUserInfo } from "../api/auth"
import { deleteArticle, getMyArticles } from "../api/article"
import { AuthContext } from "../services/Auth"
import { Navigate } from "react-router-dom"
import { MyComps } from "../api/composition"
import MyArticlePreview from "../components/Profil/Article_Display"
import { ArticleFields } from "../types/ArticleFields"

type UserInfo = {
    fullname:string
    email:string
    role:string
}

type CompositionInfo = {
    id: number
    nom: string
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

    const {data:info, refetch:inforefetch} = useQuery<UserInfo>({
        queryFn: async () => await getUserInfo(),
        queryKey: ["userInfo"],
        })
    
    const {data:myarticles,refetch:articlequeryrefetch} = useQuery<ArticleFields[]> ({
        queryFn: async () => await getMyArticles(),
        queryKey: ["myarticlesInfo"]
    })

    const {data:mycomposition, refetch:mycomporefetch} = useQuery<CompositionInfo[]> ( {
       queryFn: async () => await MyComps(),
       queryKey: ["mycomps"]
    })

    const ArticleSupp = useMutation ({
        mutationFn: deleteArticle,
        onSuccess: () => { articlequeryrefetch()}
      })

    useEffect(() => {
        articlequeryrefetch()
        inforefetch()
        mycomporefetch()
    },[section,articlequeryrefetch,inforefetch,mycomporefetch])

    function handleArticleSupp(id:number) {
        ArticleSupp.mutate(id)
    }

    return (
        <div className="pt-20 flex flex-col items-center">
            <div>
            <a href='#'onClick={() => setSection("info")}> Mes Infos </a>
            <a href='#' onClick={() => setSection("articles")}> Mes articles </a>
            <a href='#' onClick={() => setSection("compos")}> Mes compos </a>
            </div>
            <div className="flex justify-center flex-col">
                {section == "info" && <><p>Section info</p><p>fullName : {info?.fullname}</p><p>Email : {info?.email}</p><p>Role: {info?.role}</p><button>Supprimer mon compte</button> </>}
                {section == "articles" && <div><p>Vos articles</p>
                <div>{myarticles && myarticles.map((article) => {return <MyArticlePreview id={article.id} title={article.title} content={article.content} description={article.description} handleSupp={handleArticleSupp} key={article.id}/>})}
                </div>
                </div>}
                {section == "compos" && <><div>{mycomposition && mycomposition.map((compo) => {return compo.nom})}</div></>}
            </div>
            {delayNavigate && <Navigate to="/" replace={true} /> }
        </div>
    )
}

export default Profil