import { Header } from "../Home/Header"
import { useCreate } from "../../hooks/useCreate"
import { useShare } from "../../hooks/useShare"

export function Create() {

    const { input, setInput, loading, handleSubmit } = useCreate()
    const { shareLoading, handleShare } = useShare(input)

    return (
        <>
            <Header create="false"/>
            <main className="pt-10">
                <div className="container m-auto">
                    <h1 className="text-2xl font-semibold">Create</h1>
                    <p className="text-gray-500">Create everything you can imagine with the help of Dall-e OpenAI API</p>

                    <form className="pt-10 max-w-[800px]" onSubmit={e => handleSubmit(e)}>
                        <label htmlFor="prompt">Your Prompt</label>
                        <input type="text" id="prompt" name='prompt' className="block p-2 border border-gray-400 rounded-lg outline-none mt-2 w-full" placeholder="an amazing landscape" onChange={e => setInput({...input, [e.target.name]: e.target.value})}/>

                        {
                            input.image !== ''
                            ? 
                                <div className="image max-w-[500px] my-10">
                                    {
                                        loading 
                                        ?
                                        <div className="flex justify-center">
                                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role='status'>
                                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                                            </div>
                                        </div>
                                        :
                                       <img src={input.image} alt="generatedImage" />
                                    }
                                </div>
                            : 
                            <div className="preview mt-4">
                                {
                                    loading 
                                    ? 
                                        <div className="flex justify-center py-20">
                                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role='status'>
                                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                                            </div>
                                        </div>
                                    : 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="244" height="244" viewBox="0 0 24 24"><path d="M14 9l-2.519 4-2.481-1.96-5 6.96h16l-6-9zm8-5v16h-20v-16h20zm2-2h-24v20h24v-20zm-20 6c0-1.104.896-2 2-2s2 .896 2 2c0 1.105-.896 2-2 2s-2-.895-2-2z"/></svg>
                                }
                            </div>

                        }
                        <div className={`${input.image !== '' ? 'flex flex-col gap-4 md:flex-row md:items-center' : ''}`}>
                           <input type="submit" value={loading ? 'Generating...' : 'Generate!'} className={`${loading ? 'bg-gray-500 border-none' : 'bg-black'} border border-black text-white py-4 px-8 rounded-md hover:bg-white hover:text-black cursor-pointer`}/>
                            {

                                 input.image !== '' && <input type='button' onClick={(e) => handleShare(e)} className="py-4 px-8 rounded-md hover:bg-gray-500 hover:text-white border border-black hover:border-none cursor-pointer" value={shareLoading ? 'Sharing...' : 'Share with Community'}></input>
                            } 
                        </div>
                    </form>
                </div>

                
            </main>
        </>
    )
}