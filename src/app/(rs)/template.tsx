export default async function Templage({
    children,
}:{
    children:React.ReactNode
}){
    return(
        <div className="animate-appear">
            {children}
        </div>
    )
}