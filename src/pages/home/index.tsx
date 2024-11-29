import { useEffect, useState } from "react"
import { BsCartPlus } from "react-icons/bs"
import { api } from "../../services/api"
import { useContext } from "react";
import { CartContext } from "../../components/contexts/CartContext";
import toast from "react-hot-toast";
import { Link} from "react-router-dom";

export interface ProductProps{
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}


export function Home() {
  const [products, setProducts] = useState<ProductProps[]>([])
  const { addItemCart } = useContext(CartContext); 
  
  useEffect(() => {
    async function getProcucts() {
      const response = await api.get("/products")
      setProducts(response.data);
      
   
    }
  

    getProcucts();
  },[])

  function handleAddCartItem(product: ProductProps){
   toast.success("Produto adicionado no carrinho",{
    style:{
      borderRadius: 10,
      backgroundColor: "#121212",
      color: "#FFF"
    }
   })
    addItemCart(product);
    
  }


    return (
      <div >
        <main className="w-full max-w-7xl px-4 mx-auto pt-14">
          <h1 className="text-2xl font-bold items-center justify-center flex mt-10 mb-10">Produtos para seu PET</h1>
          <div className=" flex flex-col md:flex-row md:flex md:flex-wrap mx-auto">
            {products.map( (product) => (
              <section className=" md:mr-2  max-h-sm  max-w-md mx-auto  ">
                <Link to={`/details/${product.id}`}>
                  <img 
                  className=" w-full rounded-sm mx-auto md:max-w-56 dark:bg-slate-800"
                  src={product.cover}
                  alt="imagem do produto" 
                  />
                  <p className="font-bold text-center mb-4 ">{product.title}</p>
                </Link>
            
              <div className="md:flex-1 md:ml-2 my-4 mx-auto  max-w-sm max-h-24 md:max-h-20 shadow-xl rounded-md bg-zinc-100">
                <p className="mx-4 mb-3 whitespace-nowrap overflow-hidden text-ellipsis md: max-h-24 lg:max-h-36 ">{product.description}
                </p>
                <div className="flex gap-3 items-center">
              <strong className="ml-4 text-zinc-700/90">
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
              })}
              </strong>
              <button className="bg-zinc-900 p-1 rounded" onClick={() => handleAddCartItem(product)}>
                <BsCartPlus size={20} color="#FFF"/>
              </button>

                </div>
              </div>  
            </section>
            ))}
            
          </div>
        </main>
      </div>
         
      
    )  
  }
    
  