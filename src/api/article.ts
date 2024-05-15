import { ArticleItem } from "../types/Article"
import { API_service } from "./config/server_service"


export const  getAllArticles = async () => {
    const request = await API_service.get("http://localhost:3333/api/v1/article")
    const {data: articles} = request
    const result : ArticleItem[] = articles.map((article:ArticleItem) => article)
    return [...result]
}