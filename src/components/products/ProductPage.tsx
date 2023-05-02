import { useParams } from "react-router-dom";

export default function ProductPage() {
    const { id } = useParams();
    console.log(id);
    return <div>Item {id}</div>;
}
