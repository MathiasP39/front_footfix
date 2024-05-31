import { useMutation, useQuery, } from "@tanstack/react-query"
import { useContext, useEffect, useState } from "react"
import { deleteUser, getUserInfo } from "../api/auth"
import { deleteArticle, getMyArticles } from "../api/article"
import { AuthContext } from "../services/Auth"
import { Navigate, useNavigate } from "react-router-dom"
import { MyComps, deleteCompo } from "../api/composition"
import MyArticlePreview from "../components/Profil/Article_Display"
import { ArticleFields } from "../types/ArticleFields"
import CompositionPreview from "../components/Profil/Composition_display"
import Terrain from "../components/terrain_foot"

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

    const navigate = useNavigate();

    const authContext = useContext(AuthContext)

    const [section,setSection] = useState("info")

    const [delayNavigate, setDelayNavigate] = useState(false);

    useEffect(() => {
        if (!authContext.user_status.isLogin) {
          const timer = setTimeout(() => {
            setDelayNavigate(true);
          }, 1000); // 500ms delay
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

    const CompoSupp = useMutation ({
        mutationFn: deleteCompo,
        onSuccess: () => { mycomporefetch()}
      })

    const AccountSupp = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => () => navigate('/')
    }
    )

    useEffect(() => {
        articlequeryrefetch()
        inforefetch()
        mycomporefetch()
    },[section,articlequeryrefetch,inforefetch,mycomporefetch])

    function handleArticleSupp(id:number) {
        ArticleSupp.mutate(id)
    }

    function handleCompoSupp(id:number) {
        CompoSupp.mutate(id)
    }

    function handleAccountSupp() {
        AccountSupp.mutate()
    }

    function openCompo(id:number) {
        console.log(id)
        setSection("compoedit")
    }
    return (
        <div className="pt-20 flex flex-col items-center">
            <div>
            <a href='#'onClick={() => setSection("info")}> Mes Infos </a>
            <a href='#' onClick={() => setSection("articles")}> Mes articles </a>
            <a href='#' onClick={() => setSection("compos")}> Mes compos </a>
            </div>
            <div className="flex justify-center flex-col">
                {section == "info" && <><p>Section info</p><p>fullName : {info?.fullname}</p><p>Email : {info?.email}</p><p>Role: {info?.role}</p><button onClick={()=>handleAccountSupp()}>Supprimer mon compte</button> </>}
                {section == "articles" && <div><p>Vos articles</p>
                <div>{myarticles && myarticles.map((article) => {return <MyArticlePreview id={article.id} title={article.title} content={article.content} description={article.description} handleSupp={handleArticleSupp} key={article.id}/>})}
                </div>
                </div>}
                {section == "compos" && <>
                <p>Vos compos</p>
                <div>{mycomposition && mycomposition.map((compo) => <CompositionPreview id={compo.id} name={compo.nom} suppression={handleCompoSupp} open={openCompo}key={compo.id}/>)}</div></>}
                {section == "compoedit" && <><Terrain/></>}
            </div>
            {delayNavigate && <Navigate to="/" replace={true} /> }
        </div>
    )
}

export default Profil