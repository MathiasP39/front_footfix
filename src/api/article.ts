import { ArticleType } from "../types/Article"
import { ArticleFields } from "../types/ArticleFields"
import { API_service } from "./config/server_service"


export const  getAllArticles = async () => {
    const request = await API_service.get("/article?page=1")
    const {data: articles} = request
    const result : ArticleType[] = articles.map((article:ArticleType) => article)
    return [...result]
}

export const publishArticles = async (article:ArticleFields) => {
    const request = await API_service.post("/article/publish",article)
    return request.status
}

export const getMyArticles = async () => {
    const request = await API_service.get("article/getMyArticles")
    return request.data
}