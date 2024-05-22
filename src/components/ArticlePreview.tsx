import { ArticleType } from "../types/Article"
import { ClickArticleHandler } from "../types/onArticleClickHandlerType"

function ArticleItem ({article,handler}: {article:ArticleType, handler:ClickArticleHandler} ) {


    return (
        <li className="border-solid border-4  bg-lime-700 rounded-3xl">
            <a href="#" onClick={() => handler(article)}>
            <div className="flex flex-col h-full">
                <div className="h-1/2">
                    <p className="">{article.title}</p>
                </div>
                <div className="h-1/2">
                    <p className="">{article.description}</p> 
                </div>
            </div>
            </a>
        </li>
    )
 }

 export default ArticleItem