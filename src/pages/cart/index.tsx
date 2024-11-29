import { useContext} from "react"
import { CartContext } from "../../components/contexts/CartContext"
import { Link } from 'react-router-dom'
 

 export function Cart() {
    const {cart, total, addItemCart, removeItemCart} = useContext(CartContext);
    

    return (
      <div className="w-full max-w-7xl mx-auto pt-14">
        <h1 className=" text-2xl font-medium text-center mt-8 mb-10">
          Meu carrinho de compras
        </h1>
        <div>

          {cart.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-xl mb-10">Seu carrinho esta vazio...</p>
              <Link to="/" className="bg-sky-700 rounded-lg p-2 text-white font-medium">
                Acessar produtos
              </Link>
            </div>
          )}

          {cart.map( (item) => (
            <section key={item.id} className="flex items-center justify-between border-b-2 border-gray-300 px-4 mx-auto ">
            <img
             className="w-28"
             src={item.cover} alt="Imagem do produto" />
            <strong>{item.price.toLocaleString("pt-BR",{
              style: "currency",
              currency: "BRL"
            }
               
            )}</strong>          
            <div className="flex items-center justify-center gap-3">
            <button onClick={()=> removeItemCart(item)} className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
              -
            </button>
            {item.amount}
            <button onClick={() => addItemCart(item)} className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
              +
            </button>
            </div>
            <strong className="float-right">
              Subtotal: {item.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </strong>
          </section>
          ))}
         
        {cart.length !== 0 &&  <p className="mt-4 font-bold">Total: {total}</p>}
          

        </div>
      </div>
    )  
  }

  