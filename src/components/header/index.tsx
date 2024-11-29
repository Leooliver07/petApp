import { FiShoppingCart } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../contexts/CartContext"


export function Header(){
    const {cartAmount} = useContext(CartContext)
    
    return(
        <header className="w-full bg-zinc-800 fixed top-0 left-0 z-50 ">
            <nav className="px-5 mx-auto w-full max-w-7xl flex items-center justify-between h-14 relative">
                <Link to="/">
                    <p className="mb-2 text-5xl font-bold text-white"><span className="bg-gradient-to-r from-orange-600 to-yellow-300 bg-clip-text text-transparent">Pet</span>App</p>
                </Link>
            
            
                <Link className="relative" to="/cart">
                    <FiShoppingCart size={24} color="#FFF" />
                    {cartAmount > 0 && (
                        <span className="absolute -top-3 -right-3 px-2.5 bg-sky-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs">
                        {cartAmount}
                        </span>
                    )}
                </Link>
                
            
        </nav>
        </header>
        
    )
}