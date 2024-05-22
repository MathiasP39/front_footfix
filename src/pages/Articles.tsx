import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ArticleItem from '../components/ArticlePreview';
import {  useQuery } from '@tanstack/react-query';
import { getAllArticles, publishArticles } from '../api/article';
import {SubmitHandler, useForm} from 'react-hook-form'
import { ArticleFields } from '../types/ArticleFields';
import { ArticleType } from '../types/Article';
import parse from 'html-react-parser';


const Article = () => {
    const [title,setTitle] = useState('')
    const [content, setContent] = useState('');
    const [edit, setEditMode] = useState(false);
    const [mode, setMode] = useState("display all")
    const [page,setPage] = useState(1)

    const {register, handleSubmit , setValue} = useForm<ArticleFields>()

    const handleArticleOpening = (article:ArticleType) => {
        setMode("display one")
        setContent(article.content)
        setTitle(article.title)
    } 

    const onArticleSubmit: SubmitHandler<ArticleFields> = async (data) => {
        await publishArticles(data)
    }


    const {data:ListArticles, refetch:RequeteArticles} = useQuery({
        queryFn: async () => await getAllArticles(),
        queryKey: ["articles", {page}],

        })
    
    useEffect( ()=> {
        RequeteArticles()
    }, [edit, RequeteArticles])

        
    const handleContentChange = (value: string) => {
            setContent(value);
            setValue('content', value);
        };
        
    return (
        <div className='h-[66.7rem] pt-20 flex justify-center bg-gradient-to-r from-lime-900'>
        {mode == "display all" &&
        <div className='grid grid-cols-11 grid-rows-8'>
            <button className='col-start-10 row-start-1 border-solid border-4 m-5 mt-8 mb-6 text-white border-red-600 bg-red-600 rounded-3xl' onClick={() => {setEditMode(true)}}>Creer un article</button>
            <ul className='h-[80%] gap-5 col-start-3 col-span-7 row-start-2 row-end-10 grid grid-cols-3 grid-rows-3'>
                {ListArticles && Array.isArray(ListArticles) && ListArticles.map((article) => <ArticleItem article={article} handler={handleArticleOpening} />)}
            </ul>
            <p className='col-start-6 row-start-8 col-span-2'>Pagination</p>
        </div>
        }
        { mode == "edition" &&
        <div className='flex flex-col w-[50%] h-[80%] gap-5 mt-5'>
            <form onSubmit={handleSubmit(onArticleSubmit)}>
                <div className='flex flex-col justify-center'>
                    <label htmlFor="title" className='m-auto'>Titre</label>
                    <textarea {...register("title")} name="title" id="title" placeholder="Titre le de l'article" maxlength="50" rows="1" className='resize-none w-1/3 rounded-3xl m-auto p-1' />
                </div>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="description" className='m-auto'>Description</label>
                    <textarea {...register("description")} name="description" id="description" placeholder="La description de l'article" className='resize-none rounded-3xl w-1/2 m-auto p-3' />
                </div>
                <div className='m-auto'>
                    Veuillez éditer votre article
                </div>
                <div className='h-[40rem] bg-white' >
                    <ReactQuill className='h-[93%]' theme="snow" value={content} onChange={handleContentChange} />
                </div>
                <div className='grid grid-cols-3 grid-rows-1'>
                    <button  className = "col-start-1 row-start-1 border-red-600 border-solid border-4 ml-10 mr-10 mt-5 bg-red-600 rounded-3xl"onClick={() => {setEditMode(false)}}>Quit</button>
                    <button className = "col-start-2 row-start-1  border-yellow-500 border-solid border-4 ml-10 mr-10 mt-5 bg-yellow-500 rounded-3xl">Save</button>
                    <button  className = "col-start-3 row-start-1 border-red-600 border-solid border-4 ml-10 mr-10 mt-5 bg-red-600 rounded-3xl"onClick={(e) => {handlePublish}}>Publier</button>
                </div>
            </form>
        </div>}
        {
            mode == "display one" &&
            <div>
                <button onClick={()=> setMode("display all")}>Retour</button>
                <div className='bg-white'>
                    <h1>{title}</h1>
                    <div>
                        {parse(content)}
                    </div>
                </div>
            </div> 
        }
        </div>
    )
}

export default Article