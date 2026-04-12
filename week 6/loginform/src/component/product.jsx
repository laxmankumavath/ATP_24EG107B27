function Product(props){//props-receive data from the parent component
    const {productObj}=props
    //state
    //return the component
    return(
        <div className="shadow-2xl">
            <h2 className="text-2xl">{productObj.title}</h2>
            
            <p className="font-bold">MRP(in rupee):{productObj.price}</p>
            <p className="font-mono">{productObj.description}</p>
        </div>
    )
}

export default Product