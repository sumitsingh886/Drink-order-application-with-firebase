import db from "../firebase";
export default function Constant(order,collection1,collection2,item) {
  const mix = [...order];
  mix.splice(item, 1);
  db.collection(collection2).add({
    beverage: item.data.beverage,
    name: item.data.name,
  });
  db.collection(collection1).doc(item.id).delete();
}
