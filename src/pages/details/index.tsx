import { BsCartPlus } from "react-icons/bs"
import { useEffect, useState, useContext } from "react"
import { api } from "../../services/api"
import { CartContext } from "../../components/contexts/CartContext"
import { useParams, useNavigate } from "react-router-dom"
import { ProductProps } from "../home"
import toast from "react-hot-toast"

export function Details(){
    const {id} = useParams();
    const [product, setProduct] = useState<ProductProps | null>(null);
    const {addItemCart} = useContext(CartContext)
    const navigate = useNavigate();

    useEffect( () => {
        async function fetchProduct() {
            const reponse = await api.get(`/products/${id}`);
            setProduct(reponse.data);

        }
        fetchProduct();

    },[id])

    function handleAddCartItem(product:ProductProp){
        toast.success("Produto adicionado no carrinho",{
            style:{
              borderRadius: 10,
              backgroundColor: "#121212",
              color: "#FFF"
            }
           })
            addItemCart(product);
            navigate("/cart");
        
    }

    return(
        <main>
            <h1 className="mt-20 text-2xl font-bold font-serif text-center mb-10">Detalhes do produto</h1>
            <section key={product?.id} className="md:flex md: flex-row md:items-center md:justify-center">
                <div className="flex flex-col items-center justify-center">
                <img className="max-w-96 md:max-w-md" 
                src={product?.cover} 
                alt={product?.title} 
                />
                </div>
                <div className="flex flex-col items-center ">
                    <p className="text-center mt-10 font-medium">
                        {product?.title}
                    </p>
                    <p className="max-w-80 shadow-xl bg-slate-100 rounded p-4">
                        {product?.description}
                    </p>
                    <div className="mt-3">
                        <span className="font-semibold mt-4 mb-2">
                            {product?.price.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}
                        </span>
                        <button className="bg-zinc-700 rounded p-1 ml-3" onClick={ ()=> handleAddCartItem(product)}>
                        <BsCartPlus size={20} color="FFF"/>
                        </button>

                    </div>
                    
                </div>

            </section>
            
        
        </main>
    )


}