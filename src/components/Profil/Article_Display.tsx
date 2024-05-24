import { ArticleFields } from "../../types/ArticleFields";

function MyArticlePreview(article:ArticleFields & {handleSupp: (id:number) => void  }) {
    return (
        <div>
            {article.title}
            <button className="border-solid border-red-200 border-3xl border-[3px] h-10" onClick={() => article.handleSupp(article.id)}>Supprimer</button>
        </div>
    )
}   

export default MyArticlePreview