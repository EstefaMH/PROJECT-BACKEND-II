const handleErrors=(res,error)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(500).json(
        {
            error:`Error en el servidor`,
            detalle:`${error.message}`
        }
    )
}

export { handleErrors }