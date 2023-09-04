import { useContext, createContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          image: action.image,
        },
      ];
    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    case "DROP":
      let emptyArr = [];
      return emptyArr;
    case "UPDATE":
      let arr = [...state];
      arr.find((shoes, index) => {
        if (shoes.id === action.id) {
          console.log(
            shoes.qty,
            parseInt(action.qty),
            action.price + shoes.price
          );
          arr[index] = {
            ...shoes,
            qty: parseInt(action.qty) + shoes.qty,
            price: action.price + shoes.price,
          };
        }
        return arr;
      });
      return arr;

    default:
      console.log("Unable to add items in Cart :(");
  }
};

export const CartContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
