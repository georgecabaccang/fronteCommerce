import { useParams } from "react-router-dom";

export default function ItemPage() {
    const { id } = useParams();
    console.log(id);
    return <div>Item {id}</div>;
}