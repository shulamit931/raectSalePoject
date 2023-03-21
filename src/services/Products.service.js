import axios from "axios";

export const getAllProducts = async() => {
  
    const result= await axios.get("../images/data.json")  
    return result.data;
}
